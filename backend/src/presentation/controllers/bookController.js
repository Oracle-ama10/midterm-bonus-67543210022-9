const bookService = require('../../business/services/bookService');

class BookController {
    async getAllBooks(req, res, next) {
        try {
            const { status } = req.query;
            const result = await bookService.getAllBooks(status);
            res.json({ success: true, data: result, timestamp: new Date().toISOString() });
        } catch (error) { next(error); }
    }

    async getBookById(req, res, next) {
        try {
            const book = await bookService.getBookById(req.params.id);
            if (!book) return res.status(404).json({ success: false, error: 'Book not found' });
            res.json({ success: true, data: book, timestamp: new Date().toISOString() });
        } catch (error) { next(error); }
    }

    async createBook(req, res, next) {
        try {
            const newBook = await bookService.createBook(req.body);
            res.status(201).json({ success: true, data: newBook, timestamp: new Date().toISOString() });
        } catch (error) { 
            if (error.message.includes('ISBN')) return res.status(400).json({ success: false, error: error.message });
            next(error); 
        }
    }

    async borrowBook(req, res, next) {
        try {
            const result = await bookService.borrowBook(req.params.id);
            res.json({ success: true, data: result, timestamp: new Date().toISOString() });
        } catch (error) { 
            res.status(400).json({ success: false, error: error.message }); 
        }
    }

    async returnBook(req, res, next) {
        try {
            const result = await bookService.returnBook(req.params.id);
            res.json({ success: true, data: result, timestamp: new Date().toISOString() });
        } catch (error) { 
            res.status(400).json({ success: false, error: error.message }); 
        }
    }

    async deleteBook(req, res, next) {
        try {
            await bookService.deleteBook(req.params.id);
            res.json({ success: true, message: 'Book deleted successfully', timestamp: new Date().toISOString() });
        } catch (error) { 
            res.status(400).json({ success: false, error: error.message }); 
        }
    }

    async updateBook(req, res, next) {
        try {
            const updatedBook = await bookService.updateBook(req.params.id, req.body);
            res.json({ success: true, data: updatedBook, timestamp: new Date().toISOString() });
        } catch (error) { 
            next(error); 
        }
    }
}
module.exports = new BookController();
