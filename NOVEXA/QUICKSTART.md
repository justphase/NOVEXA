# 🚀 JAIPUR NOVEXA - QUICK REFERENCE

## ⚡ 3 MINUTES TO LAUNCH

### Prerequisites ✅
- ✓ Node.js v22.20.0, npm 10.9.3
- ✓ Python 3.12.10
- ✓ Google Gemini API key (5 min setup)
- ✓ VS Code

---

## 📋 GETTING YOUR GEMINI API KEY (5 minutes)

1. **Go to**: https://ai.google.dev/
2. **Click**: "Get API Key" (top right)
3. **Select**: "Create API key in new Google Cloud project"
4. **Copy** the key shown
5. **Paste** into `backend/.env` (see below)

---

## 🎯 SETUP & RUN (Windows PowerShell)

### Step 1: Get API Key & Create .env
```powershell
# Create backend/.env file with your API key
echo "GEMINI_API_KEY=your_api_key_here" > backend\.env
echo "FLASK_ENV=development" >> backend\.env
echo "FLASK_DEBUG=True" >> backend\.env
```

### Step 2: Terminal 1 - Start Backend
```powershell
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
```
✅ Should show: `Running on http://127.0.0.1:5000`

### Step 3: Terminal 2 - Start Frontend
```powershell
cd frontend
npm install
npm run dev
```
✅ Should show: `Local: http://localhost:5173/`

### Step 4: Open Browser
```
http://localhost:5173
```

---

## 🎮 USING THE APP (Workflow)

### 1️⃣ **Home Page**
- Enter your name
- Click "Start Reporting 🚀"

### 2️⃣ **Report Issue**
- 📷 Upload image or take photo
- 📍 Click "Get Current Location" (enable GPS)
- 💬 Add description (optional)
- ✅ Submit

**Automatics:**
- ✨ Gemini AI identifies issue type & severity
- 🗺️ GPS auto-detects zone (Heritage/Greater)
- ⭐ You earn 10 karma points

### 3️⃣ **Dashboard**
- 👀 See all reported issues
- ⬆️ Upvote helpful reports (+5 karma to reporter)
- 🔍 Filter by status/zone

### 4️⃣ **Leaderboard**
- 🏆 View top contributors
- ⭐ Check your karma ranking

---

## 📊 ISSUE TYPES & SEVERITY

### Issue Types Detected
🕳️ Pothole | 💧 Waterlogging | 🗑️ Garbage | 💡 Street Light | 🔌 Drainage | 🌳 Tree | 🏗️ Construction | 🚦 Traffic | ❓ Other

### Severity Levels
- 🟢 **Low**: Minor issues
- 🟡 **Medium**: Moderate impact
- 🟠 **High**: Significant damage
- 🔴 **Critical**: Safety hazard

---

## ⭐ KARMA POINTS SYSTEM

| Action | Points |
|--------|--------|
| Report submitted | +10 |
| Report upvoted | +5 |
| Report verified | +50 |
| Before/After approved | +100 |
| Issue resolved | +75 |

---

## 📱 MOBILE OPTIMIZATION

✅ **Fully Responsive**
- Works on mobile, tablet, desktop
- Touch-friendly buttons
- Mobile camera integration
- Mobile-optimized images

---

## 🔧 API ENDPOINTS (Testing)

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Submit Report
```bash
curl -X POST http://localhost:5000/api/issues/report \
  -F "image=@photo.jpg" \
  -F "user_id=user123" \
  -F "user_name=John" \
  -F "latitude=26.9124" \
  -F "longitude=75.7873"
```

### Get Reports
```bash
curl http://localhost:5000/api/issues/list?zone=Heritage
```

### Get Leaderboard
```bash
curl http://localhost:5000/api/users/leaderboard?limit=10
```

---

## 🐛 TROUBLESHOOTING

### ❌ "Cannot find python"
```powershell
# Check installation
python --version
# If not installed: https://www.python.org
```

### ❌ "Cannot find npm"
```powershell
# Check installation
npm --version
# If not installed: https://nodejs.org
```

### ❌ "Port 5000 already in use"
```powershell
# Find and kill process
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### ❌ "Gemini API key invalid"
- Verify key in `backend/.env`
- Check quota at console.cloud.google.com
- Ensure billing is enabled

### ❌ "No location permission"
- Allow GPS in browser settings
- Try on HTTPS or localhost
- Refresh page after enabling

### ❌ "Image upload fails"
- Check image size < 10MB
- Use JPG/PNG format
- Check backend is running

---

## 📁 PROJECT STRUCTURE

```
NOVEXA/
├── backend/           # Flask API
│   ├── app.py        # Main app
│   ├── config.py     # Configuration
│   ├── models.py     # Data models
│   ├── utils.py      # Gemini, zones, karma
│   ├── routes/       # API routes
│   ├── requirements.txt
│   ├── .env          # API key (create this!)
│   └── uploads/      # Images (auto-created)
│
└── frontend/          # React app
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    ├── index.html
    └── src/
        ├── App.jsx
        ├── pages/    # Home, Report, Dashboard, Leaderboard
        ├── components/ # Navbar, Footer, Cards
        └── utils/    # API calls, helpers
```

---

## 🎨 CUSTOMIZATION

### Change App Colors
Edit `frontend/tailwind.config.js`:
```javascript
colors: {
  primary: '#FF6B35',      // Orange
  secondary: '#004E89',    // Blue
  accent: '#F7B801',       // Yellow
}
```

### Add More Issue Types
Edit `backend/utils.py` in `AIIssueDetector.ISSUE_CATEGORIES`

### Adjust Karma Points
Edit `backend/utils.py` in `GamificationEngine.KARMA_RULES`

---

## 📈 PRODUCTION DEPLOYMENT

### Backend (Flask)
- ✅ Use Gunicorn: `pip install gunicorn`
- ✅ Deploy to Railway, Render, or Heroku
- ✅ Use PostgreSQL instead of in-memory DB

### Frontend (React)
- ✅ Build: `npm run build`
- ✅ Deploy to Vercel, Netlify, or AWS S3
- ✅ Update API URL in `frontend/src/utils/api.js`

---

## 🎓 KEY TECHNOLOGIES

### Backend
- **Flask**: Web framework
- **Gemini AI**: Image analysis
- **Haversine Formula**: GPS distance calculation
- **CORS**: Cross-origin requests

### Frontend
- **React 18**: UI library
- **Vite**: Fast build tool
- **Tailwind CSS**: Styling
- **Axios**: HTTP client
- **React Router**: Navigation

---

## 💡 TIPS FOR HACKATHON

1. **Prepare test images** beforehand for demo
2. **Pre-populate GPS coordinates** for indoor demo
3. **Use Firefox/Chrome** for best compatibility
4. **Screenshot everything** for presentation
5. **Keep backend terminal visible** to show API calls
6. **Practice your demo** (1-2 min walkthrough)
7. **Have backup**: Static demo data in case API fails

---

## 🚨 IMPORTANT!

### Before Demo:
1. ✅ Test on your laptop (not just localhost)
2. ✅ Test on mobile device (responsive design)
3. ✅ Pre-upload test image to show AI detection
4. ✅ Verify Gemini API quota
5. ✅ Have internet connection (API calls)

---

## 📞 SUPPORT

- **API Docs**: `http://localhost:5000/` (when running)
- **Gemini Docs**: https://ai.google.dev/docs
- **React Docs**: https://react.dev
- **Tailwind Docs**: https://tailwindcss.com

---

## ✨ READY TO LAUNCH?

```bash
# Terminal 1
cd backend && python app.py

# Terminal 2
cd frontend && npm run dev

# Browser
http://localhost:5173
```

**Happy hacking! 🚀**
