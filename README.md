# 🚀 PixelA2 Backend API

This is the Node.js + Express backend for the OTControl application.

## 🛠️ Setup Instructions

### 1. Install Dependencies
Run this command in the `otcontrol-backend` folder:
```bash
npm install
```

### 2. Database Setup
1. Open **phpMyAdmin** from your hosting panel.
2. Select your database (or create one if allowed).
3. Import the `schema.sql` file provided in this folder.
   - This will create `users`, `orders`, `clients`, `appointments`, and `ai_logs` tables.

### 3. Environment Variables
Open the `.env` file and update these values:
- `DB_NAME`: **(CRITICAL)** Ask client for the database name.
- `GEMINI_API_KEY`: Paste your Google AI Studio API Key here.

### 4. Run Server
To start the backend:
```bash
npm start
```
Server will run at `http://localhost:5000` (or your server IP).

## 📡 API Endpoints

### AI Features
- **POST** `/api/ai/insight`: Generates business insights.
- **POST** `/api/ai/suggest-service`: Suggests technical descriptions.

### Health Check
- **GET** `/`: Returns "PixelA2 Backend is Running".
- **GET** `/api/status`: Checks database connection.

---

## 📂 Deployment (FTP)
1. Delete `node_modules` folder locally.
2. Upload all files to your hosting server via FTP.
3. In hosting panel, go to **"Setup Node.js App"**.
4. Set "Application Startup File" to `server.js`.
5. Run `npm install` from the panel or button.
6. Start the app.
