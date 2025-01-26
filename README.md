# 🚀 ERP Leads Management System  

## 📌 Project Overview  
The **ERP Leads Management System** is a full-stack application designed to **streamline lead management** across multiple industries (**construction, retail, manufacturing, etc.**).  
It features **AI-powered lead conversion predictions, Google Forms & Excel data import, and a real-time dashboard** for sales and marketing teams.

---

## 🎯 Features  
✅ **Lead Management Module** – Add, edit, delete, and update leads.  
✅ **AI-Powered Lead Conversion Predictions** – Predict which leads are likely to convert.  
✅ **Google Forms & Excel Lead Import** – Sync leads automatically from Google Sheets & import Excel files.  
✅ **Real-Time Dashboard & Analytics** – View lead data with interactive charts.  
✅ **JWT Authentication** – Secure access with role-based permissions.  

---

## 🏗️ Tech Stack  
| Layer         | Technology Used |
|--------------|----------------|
| **Frontend** | React (Vite), Material-UI, Axios |
| **Backend**  | Node.js, Express.js, Socket.io |
| **Database** | SQLite (Sequelize ORM) |
| **API** | REST API (Express-based) |
| **Hosting** | Frontend on Vercel, Backend on Render |
| **Authentication** | JWT-based Auth |
| **File Uploads** | Multer (for Excel import) |
| **AI Integration** | Python-based AI model (FastAPI, Flask) |

---

## 🔧 Setup Instructions  

### 📌 1️⃣ Clone the Repository  
```sh
git clone https://github.com/Phani69/ERP_Project_leads_module.git
cd ERP_Project_leads_module

📌 2️⃣ Install Dependencies

cd leads-backend
npm install
cd ../leads-frontend
npm install

3️⃣ Configure Environment Variables
Create a .env file inside leads-backend/ and add:

PORT=5001
DB_STORAGE=./database.sqlite
JWT_SECRET=your_secret_key
GOOGLE_APPLICATION_CREDENTIALS=./config/google-credentials.json

📌 4️⃣ Run the Backend
cd leads-backend
npm run dev

📌 5️⃣ Run the Frontend
sh
Copy
Edit
cd leads-frontend
npm run dev
📌 The frontend will start at http://localhost:5173/, and the backend at http://localhost:5001/


📌 Frontend Features
✅ Lead Form – Add/Edit/Delete leads with validation.
✅ Dashboard – Real-time analytics with Pie & Bar charts.
✅ Lead Table – Display all leads with sorting & filtering.
✅ Excel Import – Upload .xlsx files for bulk lead import.
✅ Google Forms Sync – Fetch new leads from Google Sheets.

📌 Backend API Endpoints
📌 Base URL: http://localhost:5001/api/

Method	Endpoint	Description
GET	/leads	Fetch all leads
POST	/leads	Add a new lead
PUT	/leads/:id	Update an existing lead
DELETE	/leads/:id	Remove a lead
POST	/upload/import-excel	Upload Excel file & import leads
GET	/upload/sync-google-forms	Sync leads from Google Forms
GET	/dashboard	Fetch dashboard analytics

🔒 Security
✅ JWT Authentication – Secure token-based access.
✅ Data Validation & Sanitization – Prevent SQL Injection & XSS attacks.
✅ CORS Policy – Only allow frontend-origin requests.
✅ Environment Variables – Prevent secrets from being stored in GitHub.

🧪 Testing
📌 Frontend Testing
Framework: Vitest & React Testing Library

sh
Copy
Edit
cd leads-frontend
npm test
📌 Backend Testing
Framework: Jest & Supertest

sh
Copy
Edit
cd leads-backend
npm test
✅ API tests include checking CRUD operations and AI predictions.

📖 Usage Instructions
📌 User Guide
Login/Register using an admin or sales account.
Manage Leads using the form.
Sync Data from Google Forms & Excel.
View Insights in the dashboard.
📌 Admin Guide
Manage Users – Add, remove, or update permissions.
Monitor Dashboard & Reports.


🔍 Troubleshooting
Issue	Solution
Backend not starting	Check if DB_STORAGE path is correct.
Frontend fails to load	Restart using npm run dev.
Google Forms Sync not working	Ensure Google API credentials are correctly configured.
Push to GitHub blocked	Remove secrets from Git history using BFG.


🔮 Future Enhancements
✅ AI-driven Lead Scoring – Machine Learning integration.
✅ SMS & Email Notifications – Twilio Integration.
✅ Role-Based Dashboard Customization.
✅ PWA Support for Offline Mode.


🤝 Contributing
Contributions are welcome! 🚀

Fork the repository
Create a new branch (git checkout -b feature-branch)
Commit your changes (git commit -m "Added new feature")
Push to the branch (git push origin feature-branch)
Open a Pull Request
