# Architecture Comparison

## Layered Architecture (Before)
**Context:** Monolithic application where Presentation, Business, and Data layers run within the same process.

### Pros:
- **Simplicity in Development:** โครงสร้างไม่ซับซ้อน ทุกอย่างอยู่ใน Project เดียว เรียกใช้ฟังก์ชันข้าม Layer ได้โดยตรง (Direct Function Call)
- **Zero Network Latency:** การสื่อสารระหว่าง Frontend และ Backend เกิดขึ้นใน Memory เดียวกัน ทำให้มีความเร็วสูงมาก
- **Simplified Deployment:** การ Deploy ทำได้ง่ายเพียงแค่อัปโหลด Source Code ชุดเดียวไปยัง Server

### Cons:
- **Tight Coupling:** โค้ดส่วน UI และ Logic ผูกติดกันแน่น การแก้ส่วนแสดงผลอาจกระทบ Logic และต้อง Redeploy ทั้งระบบ
- **Limited Scalability:** ไม่สามารถเลือก Scale เฉพาะส่วนได้ (เช่น ถ้าคนเข้าเว็บเยอะ ต้องเพิ่ม Server ให้ทั้งระบบ แม้ว่า Database จะทำงานหนักอยู่จุดเดียวก็ตาม)
- **Technology Lock-in:** ยากต่อการเปลี่ยนเทคโนโลยี Frontend (เช่น อยากเปลี่ยนไปใช้ React/Vue) เพราะโค้ดผูกติดกับ Backend View Engine

---

## Client-Server Architecture (After)
**Context:** Distributed system where Client (UI) and Server (API) run on different environments and communicate via Network.

### Pros:
- **Separation of Concerns:** แยกส่วนรับผิดชอบชัดเจน Backend ดูแล Data/Logic ส่วน Frontend ดูแล UX/UI ทำให้ทีมพัฒนาทำงานขนานกันได้
- **Independent Scalability:** สามารถขยาย (Scale) Backend บน Server ประสิทธิภาพสูง (VM) และฝาก Frontend ไว้บน CDN หรือ Hosting ราคาถูกได้
- **Reusability & Multi-Platform:** Backend API ชุดเดียวสามารถรองรับ Client ได้หลากหลาย (Web, Mobile App, Desktop, IoT) โดยไม่ต้องเขียน Logic ใหม่

### Cons:
- **Network Latency:** การสื่อสารต้องผ่าน HTTP Protocol ซึ่งช้ากว่า Function Call ใน Memory และขึ้นอยู่กับความเสถียรของอินเทอร์เน็ต
- **Operational Complexity:** การ Deploy ซับซ้อนขึ้น ต้องดูแลทั้ง Web Server (Frontend) และ App Server (Backend) รวมถึงต้องจัดการเรื่อง Security (CORS)

---

## Changes Made

### 1. Separation (การแยกส่วนประกอบ)
- **Refactoring:** แยกโฟลเดอร์ `frontend` (HTML/CSS/JS) ออกจาก `backend` อย่างเด็ดขาด
- **Environment:** Backend รันบน **Node.js Runtime** (VM) ส่วน Frontend รันบน **Browser Engine** (Local Machine)

### 2. Communication (การสื่อสาร)
- **Protocol:** เปลี่ยนจากการเรียกฟังก์ชันภายใน (`require`) มาเป็นการสื่อสารผ่าน **HTTP Protocol**
- **Mechanism:** ใช้ **Fetch API** ในการส่ง Request (GET, POST, PUT, DELETE) และรับส่งข้อมูลในรูปแบบ **JSON Format**

### 3. CORS (Cross-Origin Resource Sharing)
- **Implementation:** เพิ่ม Middleware ในฝั่ง Server เพื่อจัดการ HTTP Header `Access-Control-Allow-Origin: *`
- **Purpose:** อนุญาตให้ Browser (Localhost) สามารถส่ง Request ข้าม Domain ไปยัง Server (VM IP) ได้อย่างปลอดภัยตามมาตรฐาน Web Security

### 4. API Response Format (มาตรฐานการส่งข้อมูล)
- **Standardization:** กำหนดโครงสร้าง Response ให้เป็นรูปแบบเดียวกันทั้งระบบ เพื่อให้ Frontend นำไปใช้ง่าย:
```bash
  ```json
  {
      "success": true,           // สถานะการทำงาน
      "data": { ... },           // ข้อมูล payload
      "timestamp": "ISO-Date",   // เวลาที่ server ตอบกลับ
      "error": "Message"         // (Optional) ข้อความเมื่อเกิดข้อผิดพลาด
  }
```