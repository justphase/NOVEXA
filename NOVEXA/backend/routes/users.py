from flask import Blueprint, request, jsonify
import uuid
from models import User, users_db
from utils import GamificationEngine

users_bp = Blueprint('users', __name__, url_prefix='/api/users')


@users_bp.route('/register', methods=['POST'])
def register_user():
    """Register a new user"""
    try:
        data = request.json
        
        user_id = str(uuid.uuid4())
        name = data.get('name', 'Anonymous')
        email = data.get('email', f'{user_id}@novexa.local')
        
        user = User(user_id, name, email)
        users_db[user_id] = user
        
        return jsonify({
            'success': True,
            'user_id': user_id,
            'user': user.to_dict()
        }), 201
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@users_bp.route('/<user_id>', methods=['GET'])
def get_user(user_id):
    """Get user profile"""
    try:
        user = users_db.get(user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        return jsonify({
            'success': True,
            'user': user.to_dict()
        }), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@users_bp.route('/leaderboard', methods=['GET'])
def get_leaderboard():
    """Get karma leaderboard"""
    try:
        limit = request.args.get('limit', 10, type=int)
        leaderboard = GamificationEngine.get_leaderboard(users_db, limit)
        
        return jsonify({
            'success': True,
            'leaderboard': leaderboard
        }), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
