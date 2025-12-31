# JAIPUR NOVEXA - STEP-BY-STEP INSTALLATION GUIDE

## 📋 Pre-Installation Checklist

- [ ] Python 3.12.10 installed (`python --version`)
- [ ] Node.js v22.20.0 installed (`node --version`)
- [ ] npm 10.9.3 installed (`npm --version`)
- [ ] VS Code ready
- [ ] Gemini API key (from https://ai.google.dev/)

---

## 🪟 WINDOWS SETUP (PowerShell)

### Option A: Automatic Setup (Recommended)
```powershell
# Navigate to project folder
cd c:\Users\Dell\OneDrive\Desktop\NOVEXA2\NOVEXA

# Run auto-setup
powershell -ExecutionPolicy Bypass -File .\setup.ps1
```

### Option B: Manual Setup

#### Step 1: Create Environment File
```powershell
# Create backend/.env
cd backend
echo "GEMINI_API_KEY=your_api_key_here" > .env
echo "FLASK_ENV=development" >> .env
echo "FLASK_DEBUG=True" >> .env

# IMPORTANT: Edit .env and replace your_api_key_here with actual key from https://ai.google.dev/
notepad .env
```

#### Step 2: Setup Backend
```powershell
# Create virtual environment
python -m venv venv

# Activate it
.\venv\Scripts\Activate.ps1

# Install dependencies
pip install -r requirements.txt

# Start server
python app.py
```

**You should see:**
```
 * Running on http://127.0.0.1:5000
 * Debug mode: on
```

#### Step 3: Setup Frontend (New PowerShell Window)
```powershell
cd c:\Users\Dell\OneDrive\Desktop\NOVEXA2\NOVEXA\frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

**You should see:**
```
  VITE v4.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
```

#### Step 4: Open in Browser
```
http://localhost:5173
```

---

## 🍎 MAC SETUP (Terminal)

### Option A: Automatic Setup
```bash
cd ~/Desktop/NOVEXA2/NOVEXA
chmod +x setup.sh
./setup.sh
```

### Option B: Manual Setup

#### Step 1: Create Environment File
```bash
cd backend
echo "GEMINI_API_KEY=your_api_key_here" > .env
echo "FLASK_ENV=development" >> .env
echo "FLASK_DEBUG=True" >> .env

# Edit and add your actual API key
nano .env
```

#### Step 2: Setup Backend
```bash
# Create virtual environment
python3 -m venv venv

# Activate it
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start server
python app.py
```

#### Step 3: Setup Frontend (New Terminal)
```bash
cd ~/Desktop/NOVEXA2/NOVEXA/frontend
npm install
npm run dev
```

#### Step 4: Open Browser
```
http://localhost:5173
```

---

## 🐧 LINUX SETUP (Bash)

### Ubuntu/Debian
```bash
# Install dependencies (if needed)
sudo apt-get update
sudo apt-get install python3.12 python3-venv python3-pip nodejs npm

# Clone/navigate to project
cd ~/novexa2/novexa

# Backend setup
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Create .env
echo "GEMINI_API_KEY=your_key" > .env
# Edit with nano/vim to add actual key

python app.py
```

### Frontend (new terminal)
```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 GETTING YOUR GEMINI API KEY (5 Minutes)

### Step 1: Go to Google AI Studio
```
https://ai.google.dev/
```

### Step 2: Click "Get API Key"
- Top right corner
- "Create API key in new Google Cloud project"

### Step 3: Copy the Key
- Key will be displayed
- Copy the entire string

### Step 4: Add to .env
```
GEMINI_API_KEY=goog_your_long_key_string_here
```

### Step 5: Verify
```bash
# Restart backend
python app.py

# Should not show "Invalid API key"
```

---

## ✅ VERIFICATION CHECKLIST

After setup, verify everything works:

### 1. Backend Health Check
```bash
curl http://localhost:5000/api/health
```

Should return:
```json
{
  "status": "ok",
  "service": "Jaipur Novexa Backend",
  "version": "1.0.0"
}
```

### 2. Frontend Access
Open browser: `http://localhost:5173`
Should see: Jaipur Novexa home page

### 3. User Registration
- Enter name "Test User"
- Click "Start Reporting"
- Should create account

### 4. Report Issue
- Click "Report Issue"
- Upload a test image
- Click "Get Current Location"
- Add description
- Click "Submit"
- Should show Gemini AI analysis

### 5. Dashboard
- Click "Dashboard"
- Should see your reported issue
- Try upvoting it
- Should show karma points

---

## 🐛 TROUBLESHOOTING

### Problem: "Python not found"
```powershell
# Windows: Check if Python is in PATH
python --version

# If not, reinstall Python from https://www.python.org
# Make sure to check "Add Python to PATH" during installation
```

### Problem: "pip command not found"
```bash
# Try
python -m pip install package_name

# Or ensure venv is activated
source venv/bin/activate  # Mac/Linux
.\venv\Scripts\Activate.ps1  # Windows
```

### Problem: "Port 5000 already in use"
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>
```

### Problem: "Port 5173 already in use"
```bash
npm run dev -- --port 5174
```

### Problem: "Gemini API key invalid"
- Check key in `backend/.env` (exact match)
- Verify at https://console.cloud.google.com
- Check quota isn't exceeded
- Regenerate key if needed

### Problem: "CORS error in browser console"
- Ensure backend is running on port 5000
- Check frontend is on port 5173
- Restart both servers

### Problem: "Image upload fails"
- Check image size < 10MB
- Use JPG or PNG format
- Verify backend `/uploads` folder exists
- Check backend is running

### Problem: "Location not detected"
- Allow GPS permission in browser
- Test location: 26.9124, 75.7873 (Jaipur center)
- Refresh page after enabling
- Use HTTPS or localhost (exempt)

---

## 📊 QUICK API TESTING

### Test with curl or Postman

#### Health Check
```bash
curl http://localhost:5000/api/health
```

#### List All Reports
```bash
curl http://localhost:5000/api/issues/list
```

#### Get Leaderboard
```bash
curl http://localhost:5000/api/users/leaderboard?limit=10
```

#### Register User
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com"}'
```

#### Submit Report (with image)
```bash
curl -X POST http://localhost:5000/api/issues/report \
  -F "image=@/path/to/image.jpg" \
  -F "user_id=user123" \
  -F "user_name=John" \
  -F "latitude=26.9124" \
  -F "longitude=75.7873" \
  -F "description=Pothole on MI Road"
```

---

## 📁 EXPECTED FOLDER STRUCTURE

After setup:
```
NOVEXA/
├── backend/
│   ├── venv/              ← Created by setup
│   ├── uploads/           ← Created by app.py
│   ├── routes/
│   ├── app.py
│   ├── .env              ← IMPORTANT: Add your API key here
│   └── requirements.txt
│
├── frontend/
│   ├── node_modules/     ← Created by npm install
│   ├── src/
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── README.md
├── QUICKSTART.md
├── BUILDINFO.md
└── setup.ps1/setup.sh
```

---

## 🚀 LAUNCH COMMANDS (Final)

### Terminal 1 (Backend)
```bash
cd backend
source venv/bin/activate    # Mac/Linux
.\venv\Scripts\Activate.ps1 # Windows
python app.py
```

### Terminal 2 (Frontend)
```bash
cd frontend
npm run dev
```

### Browser
```
http://localhost:5173
```

**That's it! You're live! 🎉**

---

## 📈 NEXT STEPS

### Test Features
- [ ] Upload image → See Gemini analysis
- [ ] Check GPS location detection
- [ ] Upvote a report
- [ ] View leaderboard
- [ ] Filter by zone/status

### Prepare for Demo
- [ ] Test on mobile device
- [ ] Pre-upload 5 test images
- [ ] Screenshot key features
- [ ] Practice 2-min walkthrough

### Production (Later)
- [ ] Add authentication
- [ ] Switch to PostgreSQL
- [ ] Deploy to Vercel (frontend)
- [ ] Deploy to Railway (backend)

---

## 💡 USEFUL COMMANDS

### Backend
```bash
# Restart server
Ctrl+C (stop)
python app.py (restart)

# View API docs
http://localhost:5000/

# Check virtual environment
which python  # Mac/Linux
where python  # Windows
```

### Frontend
```bash
# Build for production
npm run build

# Preview build
npm run preview

# Clear cache
rm -rf node_modules
npm install
```

### Both
```bash
# Update packages
npm update           # Frontend
pip install --upgrade -r requirements.txt  # Backend
```

---

## ✨ SUCCESS INDICATORS

When everything is working:

1. ✅ Backend shows: `Running on http://127.0.0.1:5000`
2. ✅ Frontend shows: `Local: http://localhost:5173/`
3. ✅ Browser loads home page
4. ✅ Can register user
5. ✅ Can upload image
6. ✅ GPS coordinates appear
7. ✅ Gemini AI analyzes image
8. ✅ Report appears in dashboard
9. ✅ Karma points awarded
10. ✅ Leaderboard shows users

---

## 📞 STILL STUCK?

1. Check QUICKSTART.md for quick reference
2. Check BUILDINFO.md for architecture details
3. Review README.md for full documentation
4. Verify all prerequisites are installed
5. Ensure .env file has valid Gemini API key
6. Check both servers are running
7. Clear browser cache (Ctrl+Shift+Del)
8. Restart both terminals
9. Check firewall isn't blocking ports

---

## 🎓 LEARNING RESOURCES

While installing:
- Python: https://python.org
- Node.js: https://nodejs.org
- Flask: https://flask.palletsprojects.com/
- React: https://react.dev/
- Gemini: https://ai.google.dev/docs

---

**Ready to make Jaipur smarter? Let's go! 🚀**

*For hackathon teams with 3-4 hours: You can have this live in 20 minutes of setup.*
