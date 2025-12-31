from flask import Flask, jsonify
from flask_cors import CORS
from config import Config
from routes.issues import issues_bp
from routes.users import users_bp
import os

app = Flask(__name__)
app.config.from_object(Config)

# Enable CORS
CORS(app, resources={
    r"/api/*": {
        "origins": Config.CORS_ORIGINS,
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

# Register blueprints
app.register_blueprint(issues_bp)
app.register_blueprint(users_bp)

# Create uploads directory
os.makedirs('uploads', exist_ok=True)


@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'ok',
        'service': 'Jaipur Novexa Backend',
        'version': '1.0.0'
    }), 200


@app.route('/', methods=['GET'])
def index():
    """API documentation"""
    return jsonify({
        'name': 'Jaipur Novexa API',
        'version': '1.0.0',
        'description': 'Civic issue reporting system for Jaipur',
        'endpoints': {
            'issues': {
                'POST /api/issues/report': 'Submit new issue report',
                'GET /api/issues/list': 'List all reports',
                'GET /api/issues/<id>': 'Get specific report',
                'POST /api/issues/<id>/verify': 'Verify before/after images',
                'POST /api/issues/<id>/upvote': 'Upvote report'
            },
            'users': {
                'POST /api/users/register': 'Register new user',
                'GET /api/users/<id>': 'Get user profile',
                'GET /api/users/leaderboard': 'Get karma leaderboard'
            }
        }
    }), 200


@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Not found'}), 404


@app.errorhandler(500)
def server_error(error):
    return jsonify({'error': 'Server error'}), 500


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
