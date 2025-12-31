import google.generativeai as genai
from PIL import Image
import io
import base64
from config import Config
from typing import Dict, Tuple

genai.configure(api_key=Config.GEMINI_API_KEY)


class ZoneMapper:
    """Map coordinates to JMC zones"""
    
    # Heritage Zone (Old City) - approximate boundaries
    HERITAGE_ZONE = {
        'name': 'Heritage Zone',
        'center': (26.9254, 75.8245),
        'radius_km': 2.5
    }
    
    # Greater Jaipur Zone
    GREATER_ZONE = {
        'name': 'Greater Jaipur Zone',
        'center': (26.9124, 75.7873),
        'radius_km': 15
    }
    
    # Detailed ward boundaries (lat1, lng1, lat2, lng2)
    WARD_BOUNDARIES = {
        'C-Ward': {'lat_min': 26.90, 'lat_max': 26.93, 'lng_min': 75.81, 'lng_max': 75.84},
        'D-Ward': {'lat_min': 26.87, 'lat_max': 26.90, 'lng_min': 75.81, 'lng_max': 75.84},
        'E-Ward': {'lat_min': 26.90, 'lat_max': 26.93, 'lng_min': 75.84, 'lng_max': 75.87},
        'F-Ward': {'lat_min': 26.87, 'lat_max': 26.90, 'lng_min': 75.84, 'lng_max': 75.87},
    }
    
    @staticmethod
    def get_distance(lat1, lon1, lat2, lon2):
        """Calculate distance in km using Haversine formula"""
        from math import radians, cos, sin, asin, sqrt
        
        lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])
        dlon = lon2 - lon1
        dlat = lat2 - lat1
        a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
        c = 2 * asin(sqrt(a))
        km = 6371 * c
        return km
    
    @staticmethod
    def detect_zone(latitude: float, longitude: float) -> Dict:
        """Detect zone and ward from coordinates"""
        
        # Check heritage zone
        heritage_dist = ZoneMapper.get_distance(
            latitude, longitude,
            ZoneMapper.HERITAGE_ZONE['center'][0],
            ZoneMapper.HERITAGE_ZONE['center'][1]
        )
        
        if heritage_dist <= ZoneMapper.HERITAGE_ZONE['radius_km']:
            zone_type = 'Heritage'
        else:
            zone_type = 'Greater'
        
        # Detect ward
        ward = 'Unknown'
        for ward_name, bounds in ZoneMapper.WARD_BOUNDARIES.items():
            if (bounds['lat_min'] <= latitude <= bounds['lat_max'] and
                bounds['lng_min'] <= longitude <= bounds['lng_max']):
                ward = ward_name
                break
        
        return {
            'zone': zone_type,
            'ward': ward,
            'coordinates': {'lat': latitude, 'lng': longitude}
        }


class AIIssueDetector:
    """Detect issue type and severity using Gemini"""
    
    ISSUE_CATEGORIES = {
        'pothole': ['pothole', 'hole', 'pit', 'crack in road'],
        'waterlogging': ['waterlogging', 'water', 'flooding', 'stagnant'],
        'garbage': ['garbage', 'waste', 'litter', 'trash', 'dumping'],
        'street_light': ['street light', 'light', 'dark', 'electricity'],
        'drainage': ['drainage', 'drain', 'sewer', 'blockage'],
        'tree_cutting': ['tree', 'vegetation', 'plant', 'green'],
        'construction': ['construction', 'debris', 'broken', 'building'],
        'traffic': ['traffic', 'signal', 'road', 'vehicle'],
        'other': []
    }
    
    @staticmethod
    def analyze_image(image_data) -> Dict:
        """Analyze image with Gemini AI"""
        try:
            # Convert bytes to PIL Image
            img = Image.open(io.BytesIO(image_data))
            
            # Send to Gemini
            model = genai.GenerativeModel('gemini-pro-vision')
            
            prompt = """Analyze this image and identify:
1. Type of civic issue (pothole, waterlogging, garbage, street light, drainage, tree cutting, construction debris, traffic signal, or other)
2. Severity level (low, medium, high, critical)
3. Description of the issue
4. Confidence level (0-100%)

Format response as JSON with keys: issue_type, severity, description, confidence"""
            
            response = model.generate_content([
                prompt,
                img
            ])
            
            # Parse response
            response_text = response.text
            
            # Extract JSON from response
            import json
            try:
                start = response_text.find('{')
                end = response_text.rfind('}') + 1
                json_str = response_text[start:end]
                result = json.loads(json_str)
            except:
                result = {
                    'issue_type': 'other',
                    'severity': 'medium',
                    'description': response_text,
                    'confidence': 70
                }
            
            return result
        
        except Exception as e:
            return {
                'issue_type': 'other',
                'severity': 'medium',
                'description': f'Error analyzing image: {str(e)}',
                'confidence': 0
            }
    
    @staticmethod
    def compare_images(before_image, after_image) -> Dict:
        """Compare before and after images"""
        try:
            model = genai.GenerativeModel('gemini-pro-vision')
            
            before_img = Image.open(io.BytesIO(before_image))
            after_img = Image.open(io.BytesIO(after_image))
            
            prompt = """Compare these two images (before and after):
1. Has the issue been resolved? (yes/no/partial)
2. Percentage of resolution (0-100%)
3. Any remaining issues?
4. Confidence level (0-100%)

Format as JSON with keys: resolved, resolution_percentage, remaining_issues, confidence"""
            
            response = model.generate_content([
                prompt,
                before_img,
                after_img
            ])
            
            response_text = response.text
            
            import json
            try:
                start = response_text.find('{')
                end = response_text.rfind('}') + 1
                json_str = response_text[start:end]
                result = json.loads(json_str)
            except:
                result = {
                    'resolved': 'partial',
                    'resolution_percentage': 50,
                    'remaining_issues': response_text,
                    'confidence': 60
                }
            
            return result
        
        except Exception as e:
            return {
                'resolved': 'unknown',
                'resolution_percentage': 0,
                'remaining_issues': str(e),
                'confidence': 0
            }


class GamificationEngine:
    """Handle karma points and leaderboards"""
    
    KARMA_RULES = {
        'report_submitted': 10,
        'report_verified': 50,
        'before_after_approved': 100,
        'upvote_received': 5,
        'downvote_received': -2,
        'resolved_issue': 75,
        'first_reporter': 25
    }
    
    @staticmethod
    def calculate_karma(action: str) -> int:
        """Calculate karma points for an action"""
        return GamificationEngine.KARMA_RULES.get(action, 0)
    
    @staticmethod
    def get_leaderboard(users_db, limit=10) -> list:
        """Get top karma users"""
        sorted_users = sorted(
            users_db.values(),
            key=lambda u: u.karma_points,
            reverse=True
        )
        return [u.to_dict() for u in sorted_users[:limit]]
