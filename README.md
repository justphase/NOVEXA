# Jaipur Novexa - Complete Setup Guide

## Project Overview
Jaipur Novexa is a civic issue reporting app with:
- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Flask + Google Gemini AI
- **Features**: Image upload with AI detection, GPS zone mapping, gamification system

## Prerequisites
- Node.js v22.20.0, npm 10.9.3
- Python 3.12.10
- Google AI Studio API key (Gemini)
- VS Code

---

## Backend Setup (Flask)

### 1. Navigate to Backend Directory
```bash
cd backend
```

### 2. Create Python Virtual Environment
```bash
python -m venv venv
# Windows
venv\Scripts\activate
# Mac/Linux
source venv/bin/activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Create .env File
Create a `.env` file in the backend folder:
```
GEMINI_API_KEY=your_actual_gemini_api_key_here
FLASK_ENV=development
FLASK_DEBUG=True
```

**Get your Gemini API Key:**
1. Go to https://ai.google.dev/
2. Click "Get API Key"
3. Create a new API key in Google Cloud
4. Copy and paste into .env

### 5. Run Flask Server
```bash
python app.py
```

Expected output:
```
 * Running on http://127.0.0.1:5000
```

**Flask API will be available at**: `http://localhost:5000`

### API Endpoints (Testing with Postman/curl)

#### Health Check
```bash
curl http://localhost:5000/api/health
```

#### Submit Issue Report
```bash
curl -X POST http://localhost:5000/api/issues/report \
  -F "image=@path/to/image.jpg" \
  -F "user_id=user123" \
  -F "user_name=John" \
  -F "latitude=26.9124" \
  -F "longitude=75.7873" \
  -F "description=Pothole on MI Road"
```

#### List All Reports
```bash
curl http://localhost:5000/api/issues/list
```

#### Register User
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com"}'
```

#### Get Leaderboard
```bash
curl http://localhost:5000/api/users/leaderboard?limit=10
```

---

## Frontend Setup (React + Vite)

### 1. Navigate to Frontend Directory (New Terminal)
```bash
cd frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```

Expected output:
```
  VITE v4.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

**Frontend will be available at**: `http://localhost:5173`

### 4. Build for Production
```bash
npm run build
```

This creates an optimized build in the `dist/` folder.

---

## Running Both Servers (Final Setup)

### Terminal 1 - Backend (Flask)
```bash
cd backend
source venv/bin/activate  # or venv\Scripts\activate on Windows
python app.py
```

### Terminal 2 - Frontend (React)
```bash
cd frontend
npm run dev
```

### Open in Browser
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

---

## Complete Workflow

### 1. **User Registration**
- Opens homepage
- Enters name and email
- Gets redirected to report page

### 2. **Report Issue**
- Uploads image (Camera/Gallery)
- Taps "Get Location" - uses GPS coordinates
- Adds optional description
- Submits - Gemini AI analyzes image automatically
- Earns 10 karma points

### 3. **View Dashboard**
- See all reported issues
- Filter by status/zone
- View karma points and stats
- Upvote helpful reports (+5 karma to reporter)

### 4. **Leaderboard**
- Top 50 contributors sorted by karma
- View badges and achievements
- Track progress

---

## Key Features Implemented

### ✅ AI Image Analysis (Gemini)
- Detects issue type (pothole, garbage, waterlogging, etc.)
- Determines severity (low, medium, high, critical)
- Returns confidence score
- Provides AI description

### ✅ GPS Zone Detection
- Auto-detects Heritage vs Greater Jaipur zone
- Maps coordinates to ward boundaries
- Stores location with every report

### ✅ Gamification System
- **Karma Points**:
  - Report submitted: 10 points
  - Report verified: 50 points
  - Before/After approved: 100 points
  - Upvote received: 5 points
  - Issue resolved: 75 points

- **Leaderboard**: Top users by karma points
- **Badges**: Champion, Reporter, Verifier, Legend

### ✅ Before/After Verification
- Upload after image for resolved issue
- Gemini compares and confirms resolution
- Awards verification bonus karma

### ✅ Mobile Responsive
- Tailwind CSS responsive design
- Works on mobile, tablet, desktop
- Touch-friendly buttons and forms
- Mobile camera integration

---

## Project Structure

```
NOVEXA/
├── backend/
│   ├── app.py                 # Flask main application
│   ├── config.py              # Configuration
│   ├── models.py              # Data models (in-memory DB)
│   ├── utils.py               # Gemini AI, zone mapping, gamification
│   ├── routes/
│   │   ├── issues.py          # Issue endpoints
│   │   └── users.py           # User endpoints
│   ├── requirements.txt        # Python dependencies
│   ├── .env.example          # Example .env file
│   └── uploads/              # Uploaded images (created at runtime)
│
└── frontend/
    ├── package.json           # Node dependencies
    ├── vite.config.js        # Vite configuration
    ├── tailwind.config.js    # Tailwind CSS config
    ├── postcss.config.js     # PostCSS config
    ├── index.html            # HTML entry point
    ├── src/
    │   ├── main.jsx          # React entry point
    │   ├── App.jsx           # Main app component
    │   ├── index.css         # Tailwind & custom styles
    │   ├── components/       # Reusable components
    │   │   ├── Navbar.jsx
    │   │   ├── Footer.jsx
    │   │   ├── ReportCard.jsx
    │   │   ├── KarmaDisplay.jsx
    │   │   └── LeaderboardRow.jsx
    │   ├── pages/            # Page components
    │   │   ├── HomePage.jsx
    │   │   ├── ReportPage.jsx
    │   │   ├── DashboardPage.jsx
    │   │   └── LeaderboardPage.jsx
    │   └── utils/            # Utility functions
    │       ├── api.js        # API calls
    │       └── helpers.js    # Helper functions
    └── dist/                # Build output (created after npm run build)
```

---

## Troubleshooting

### Port 5000 Already in Use (Flask)
```bash
# Kill process on port 5000
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>
```

### Port 5173 Already in Use (Vite)
```bash
npm run dev -- --port 5174
```

### Gemini API Key Not Working
- Verify API key is correct in `.env`
- Check API quota at console.cloud.google.com
- Ensure billing is enabled

### CORS Errors
- Flask CORS is configured for `http://localhost:5173`
- Add more origins in `backend/config.py` if needed

### No Location Permission
- Open in HTTPS (localhost is exempt)
- Check browser location permissions
- Use manual coordinates input

---

## Performance Tips

### Frontend
- Vite provides HMR (Hot Module Replacement)
- Tailwind CSS is tree-shaken for production
- Build is optimized and minified

### Backend
- In-memory database is fast for demo
- For production, use SQLAlchemy + PostgreSQL
- Implement image caching for before/after

---

## Next Steps (Production)

1. **Database**: Replace in-memory DB with PostgreSQL + SQLAlchemy
2. **Authentication**: Add JWT tokens for user sessions
3. **Image Storage**: Use AWS S3 or Google Cloud Storage
4. **Deployment**: Deploy on Vercel (frontend) + Railway/Render (backend)
5. **Monitoring**: Add error tracking with Sentry
6. **Rate Limiting**: Implement API rate limiting
7. **Notifications**: Add email/SMS notifications for issue updates

---

## Support & Contribution

This is a hackathon project. For production use:
- Add comprehensive error handling
- Implement database transactions
- Add user authentication
- Set up CI/CD pipeline
- Add unit and integration tests

---

## License

MIT License - Use freely for hackathon and learning purposes.

---

**Made with ❤️ for Jaipur**

Get started: `npm run dev` in frontend & `python app.py` in backend! 🚀
