# AI Content Creator - Setup Guide

## ✅ What's Already Done
- ✅ All dependencies installed (frontend & backend)
- ✅ Environment files created (.env)
- ✅ TypeScript configuration fixed
- ✅ All code errors resolved

## 🔧 What You Need to Configure

### 1. MongoDB Database
**You need MongoDB running locally.**

**Option A: Install MongoDB Community Edition**
- Download: https://www.mongodb.com/try/download/community
- Install and run MongoDB service on port 27017
- The database `ai_content_creator` will be created automatically

**Option B: Use MongoDB Atlas (Cloud)**
- Sign up at https://www.mongodb.com/cloud/atlas
- Create a free cluster
- Get connection string and update `backend\.env`:
  ```
  MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/ai_content_creator
  ```

### 2. Google Gemini API Key
**Required for AI content generation.**

1. Go to: https://aistudio.google.com/app/apikey
2. Sign in with Google account
3. Click "Create API Key"
4. Copy the key and update `backend\.env`:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```

### 3. JWT Secret
**For secure authentication tokens.**

Update `backend\.env` with a strong random string:
```
JWT_SECRET=your_very_long_random_secret_string_here_make_it_complex
```

You can generate one in PowerShell:
```powershell
[Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes([System.Guid]::NewGuid().ToString() + [System.Guid]::NewGuid().ToString()))
```

## 🚀 How to Run the Project

### Start Backend Server
```powershell
cd "d:\content creation\backend"
npm run dev
```
Server will run on: http://localhost:5000

### Start Frontend Development Server
```powershell
cd "d:\content creation\frontend"
npm run dev
```
Frontend will run on: http://localhost:5173

## 🧪 Testing the Setup

1. Visit: http://localhost:5173
2. Register a new account
3. Login with your credentials
4. Try generating content with AI

## 📋 Quick Checklist

- [ ] MongoDB installed and running (or MongoDB Atlas configured)
- [ ] Gemini API key added to `backend\.env`
- [ ] JWT secret configured in `backend\.env`
- [ ] Backend server running on port 5000
- [ ] Frontend server running on port 5173
- [ ] Can access http://localhost:5173 in browser

## 🔍 Troubleshooting

**Backend won't start:**
- Check if MongoDB is running: `mongosh` or check Task Manager
- Verify MONGO_URI in .env is correct
- Check if port 5000 is already in use

**Frontend can't connect to backend:**
- Verify backend is running on port 5000
- Check VITE_API_BASE_URL in `frontend\.env`
- Check browser console for CORS errors

**AI generation fails:**
- Verify GEMINI_API_KEY is correct in `backend\.env`
- Check API key has not exceeded quota
- Check backend console logs for errors

## 📦 Project Structure

```
content creation/
├── backend/           # Express.js API server
│   ├── src/
│   ├── .env          # ⚠️ CONFIGURE THIS
│   └── package.json
├── frontend/          # React + Vite app
│   ├── src/
│   ├── .env          # Already configured
│   └── package.json
└── SETUP.md          # This file
```

## 🎯 Next Steps

After setup is complete:
1. The app will be accessible at http://localhost:5173
2. Register/login to test authentication
3. Use the dashboard to generate AI content
4. View your generation history

---

Need help? Check the README.md files in backend/ and frontend/ folders for more details.
