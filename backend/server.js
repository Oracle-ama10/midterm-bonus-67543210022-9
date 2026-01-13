const express = require('express');
const bookRoutes = require('./src/presentation/routes/bookRoutes');
const corsMiddleware = require('./src/presentation/middlewares/cors');
const errorHandler = require('./src/presentation/middlewares/errorHandler');

const app = express();

// ✅ 1. ส่วนที่เพิ่มมา: Log Middleware (ตัวชวนคุย)
app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        // ปริ้นท์: [เวลา] Method URL Status - เวลาที่ใช้
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} ${res.statusCode} - ${duration}ms`);
    });
    next();
});

// 2. Setup
app.use(corsMiddleware);
app.use(express.json());

// 3. Routes
app.use('/api/books', bookRoutes);

// 4. Error Handling
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`
╔═══════════════════════════════════════════════╗
║  Library API Server (Local Version)           ║
║  Server running on http://0.0.0.0:${PORT}      ║
║  Waiting for requests...                      ║
╚═══════════════════════════════════════════════╝
    `);
});
