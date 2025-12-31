from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import os
import uuid
from datetime import datetime
from models import Report, User, reports_db, users_db
from utils import ZoneMapper, AIIssueDetector, GamificationEngine
from config import Config

issues_bp = Blueprint('issues', __name__, url_prefix='/api/issues')

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in Config.ALLOWED_EXTENSIONS


@issues_bp.route('/report', methods=['POST'])
def submit_report():
    """Submit a new issue report"""
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image provided'}), 400
        
        file = request.files['image']
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        if not allowed_file(file.filename):
            return jsonify({'error': 'Invalid file type'}), 400
        
        # Get form data
        user_id = request.form.get('user_id', str(uuid.uuid4()))
        user_name = request.form.get('user_name', 'Anonymous')
        user_email = request.form.get('user_email', f'{user_id}@novexa.local')
        latitude = float(request.form.get('latitude', 0))
        longitude = float(request.form.get('longitude', 0))
        description = request.form.get('description', '')
        
        # Create user if new
        if user_id not in users_db:
            users_db[user_id] = User(user_id, user_name, user_email)
        
        # Save image
        filename = secure_filename(f"{uuid.uuid4()}_{file.filename}")
        file_path = os.path.join(UPLOAD_FOLDER, filename)
        file.save(file_path)
        
        # Analyze image with Gemini
        with open(file_path, 'rb') as img_file:
            image_data = img_file.read()
            ai_analysis = AIIssueDetector.analyze_image(image_data)
        
        # Detect zone
        zone_info = ZoneMapper.detect_zone(latitude, longitude)
        
        # Create report
        report = Report(
            user_id=user_id,
            issue_type=ai_analysis.get('issue_type', 'other'),
            severity=ai_analysis.get('severity', 'medium'),
            location=description,
            image_path=file_path,
            coordinates={'lat': latitude, 'lng': longitude}
        )
        report.zone = zone_info['zone']
        report.ai_confidence = ai_analysis.get('confidence', 0)
        
        reports_db.append(report)
        
        # Award karma points
        user = users_db[user_id]
        user.karma_points += GamificationEngine.calculate_karma('report_submitted')
        user.reports_count += 1
        
        return jsonify({
            'success': True,
            'report': report.to_dict(),
            'ai_analysis': ai_analysis,
            'zone': zone_info,
            'karma_awarded': GamificationEngine.calculate_karma('report_submitted')
        }), 201
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@issues_bp.route('/<report_id>/verify', methods=['POST'])
def verify_before_after(report_id):
    """Verify issue resolution with before/after images"""
    try:
        if 'after_image' not in request.files:
            return jsonify({'error': 'No after image provided'}), 400
        
        # Find report
        report = next((r for r in reports_db if r.id == report_id), None)
        if not report:
            return jsonify({'error': 'Report not found'}), 404
        
        file = request.files['after_image']
        if not allowed_file(file.filename):
            return jsonify({'error': 'Invalid file type'}), 400
        
        # Save after image
        filename = secure_filename(f"after_{uuid.uuid4()}_{file.filename}")
        file_path = os.path.join(UPLOAD_FOLDER, filename)
        file.save(file_path)
        
        # Compare images
        with open(report.before_image, 'rb') as before_f:
            before_data = before_f.read()
        
        with open(file_path, 'rb') as after_f:
            after_data = after_f.read()
        
        comparison = AIIssueDetector.compare_images(before_data, after_data)
        
        # Update report
        report.after_image = file_path
        report.status = 'verified' if comparison.get('resolved') == 'yes' else 'partial'
        
        # Award karma if resolved
        if comparison.get('resolved') == 'yes':
            user = users_db.get(report.user_id)
            if user:
                user.karma_points += GamificationEngine.calculate_karma('before_after_approved')
                user.verified_count += 1
        
        return jsonify({
            'success': True,
            'report': report.to_dict(),
            'comparison': comparison
        }), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@issues_bp.route('/list', methods=['GET'])
def list_reports():
    """Get all reports with filters"""
    try:
        zone = request.args.get('zone', None)
        severity = request.args.get('severity', None)
        status = request.args.get('status', None)
        
        filtered = reports_db
        
        if zone:
            filtered = [r for r in filtered if r.zone == zone]
        if severity:
            filtered = [r for r in filtered if r.severity == severity]
        if status:
            filtered = [r for r in filtered if r.status == status]
        
        return jsonify({
            'success': True,
            'count': len(filtered),
            'reports': [r.to_dict() for r in filtered]
        }), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@issues_bp.route('/<report_id>', methods=['GET'])
def get_report(report_id):
    """Get specific report"""
    try:
        report = next((r for r in reports_db if r.id == report_id), None)
        if not report:
            return jsonify({'error': 'Report not found'}), 404
        
        return jsonify({
            'success': True,
            'report': report.to_dict()
        }), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@issues_bp.route('/<report_id>/upvote', methods=['POST'])
def upvote_report(report_id):
    """Upvote a report"""
    try:
        report = next((r for r in reports_db if r.id == report_id), None)
        if not report:
            return jsonify({'error': 'Report not found'}), 404
        
        report.votes += 1
        
        # Award karma to reporter
        user = users_db.get(report.user_id)
        if user:
            user.karma_points += GamificationEngine.calculate_karma('upvote_received')
        
        return jsonify({
            'success': True,
            'votes': report.votes
        }), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
