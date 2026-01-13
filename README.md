# 📚 Library Management System - Client-Server Architecture

## Project Information
- **Student Name:** [นายภูริณัฐ เต๋จ๊ะ]
- **Student ID:** [67543210022-9]
- **Course:** ENGSE207 - Software Architecture (Bonus Exam)
- **Section:** [1]

---

## 🏗️ Architecture

This project refactors a monolithic system into a distributed **Client-Server Architecture**.

### 🔄 Before: Layered Architecture (Monolith)
- **Structure:** Single application unit where Frontend and Backend are tightly coupled.
- **Limitation:** Hard to scale individually; UI changes require full server redeployment.
- **Deployment:** Deployed as a single unit on one machine.

### 🚀 After: Client-Server Architecture (Distributed)
- **Separation of Concerns:**
  - **Backend (Server):** Focuses on Business Logic, Data Persistence, and API Security.
  - **Frontend (Client):** Focuses on User Interface and User Experience.
- **Communication:** Data exchange via **HTTP/JSON** (RESTful API).
- **Tech Stack:**
  - **Backend:** Node.js, Express.js, SQLite3 (Running on Ubuntu VM).
  - **Frontend:** HTML5, CSS3, Vanilla JavaScript (Running on Local Machine).
- **Key Features:**
  - **CORS Enabled:** Allows cross-origin requests from Local Client to Remote VM.
  - **Layered Backend:** Organized into Presentation, Business, and Data layers.

---

## 📂 Project Structure

```bash
midterm-bonus-<STUDENT_ID>/
├── backend/                  # Server-Side Application (Deployed on VM)
│   ├── src/
│   │   ├── presentation/     # Controllers & Routes & Middlewares
│   │   ├── business/         # Service Logic & Validators
│   │   └── data/             # Repositories & Database Connection
│   ├── server.js             # Entry Point (starts Express server)
│   ├── package.json          # Dependencies (express, sqlite3)
│   └── library.db            # SQLite Database (Auto-generated)
│
└── frontend/                 # Client-Side Application (Running Locally)
    ├── css/                  # Stylesheets
    ├── js/
    │   ├── components/       # UI Components (List, Form)
    │   ├── api.js            # API Client (Fetches data from VM)
    │   └── app.js            # Main Application Logic
    └── index.html            # Main User Interface
```
## ⚙️ How to Run
### Backend (Server - VM)
```bash
cd backend
npm install
# Start the server (Listens on 0.0.0.0:3000)
npm start
```
### Frontend (Client - Local)
```bash
1.Configure IP: Open frontend/js/api.js and set the VM's IP address:
const api = new LibraryAPI('http://<YOUR_VM_IP>:3000/api');
```
```bash
2.Run: Open frontend/index.html directly in your browser. (Optional: You can use Live Server or Python HTTP server)
# Optional
cd frontend
python3 -m http.server 8000
```

## 🔌 API Endpoints
| Method | Endpoint | Description | Constraints / Notes |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/books` | ดึงหนังสือทั้งหมดพร้อมสถิติ | รองรับ Query `?status=available` หรือ `borrowed` |
| **GET** | `/api/books/:id` | ดึงข้อมูลหนังสือรายเล่ม | คืนค่า 404 หากไม่พบหนังสือ |
| **POST** | `/api/books` | เพิ่มหนังสือใหม่ | ต้องมี `title`, `author`, `isbn` (ISBN ต้องไม่ซ้ำ) |
| **PUT** | `/api/books/:id` | อัปเดตข้อมูลหนังสือ | ตรวจสอบรูปแบบ ISBN และความมีอยู่ของหนังสือ |
| **PATCH**| `/api/books/:id/borrow`| ยืมหนังสือ | เปลี่ยนสถานะเป็น `borrowed` (ต้องมีสถานะเดิมเป็น `available`) |
| **PATCH**| `/api/books/:id/return`| คืนหนังสือ | เปลี่ยนสถานะเป็น `available` (ต้องมีสถานะเดิมเป็น `borrowed`) |
| **DELETE**| `/api/books/:id` | ลบหนังสือออก | **ห้ามลบ** หากหนังสือมีสถานะเป็น `borrowed` |

## Screenshots
<img width="2559" height="1312" alt="image" src="https://github.com/user-attachments/assets/3c564e1c-cd1c-4034-b64b-6ac8adc98df7" />