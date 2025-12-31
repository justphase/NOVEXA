import json
from datetime import datetime
from typing import Dict, List

# In-memory database for hackathon (use SQLAlchemy for production)
class Report:
    def __init__(self, user_id, issue_type, severity, location, image_path, coordinates):
        self.id = datetime.now().isoformat()
        self.user_id = user_id
        self.issue_type = issue_type
        self.severity = severity
        self.location = location
        self.image_path = image_path
        self.coordinates = coordinates
        self.created_at = datetime.now().isoformat()
        self.status = "pending"
        self.votes = 0
        self.zone = None
        self.before_image = image_path
        self.after_image = None
        self.ai_confidence = 0.0
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'issue_type': self.issue_type,
            'severity': self.severity,
            'location': self.location,
            'image_path': self.image_path,
            'coordinates': self.coordinates,
            'created_at': self.created_at,
            'status': self.status,
            'votes': self.votes,
            'zone': self.zone,
            'before_image': self.before_image,
            'after_image': self.after_image,
            'ai_confidence': self.ai_confidence
        }


class User:
    def __init__(self, user_id, name, email):
        self.user_id = user_id
        self.name = name
        self.email = email
        self.karma_points = 0
        self.reports_count = 0
        self.verified_count = 0
        self.created_at = datetime.now().isoformat()
    
    def to_dict(self):
        return {
            'user_id': self.user_id,
            'name': self.name,
            'email': self.email,
            'karma_points': self.karma_points,
            'reports_count': self.reports_count,
            'verified_count': self.verified_count,
            'created_at': self.created_at
        }


# In-memory database
reports_db: List[Report] = []
users_db: Dict[str, User] = {}
