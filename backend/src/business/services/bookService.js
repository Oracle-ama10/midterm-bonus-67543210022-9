const bookRepository = require('../../data/repositories/bookRepository');
const bookValidator = require('../validators/bookValidator');

class BookService {
    async getAllBooks(status) {
        const books = await bookRepository.findAll(status);
        const stats = {
            available: books.filter(b => b.status === 'available').length,
            borrowed: books.filter(b => b.status === 'borrowed').length,
            total: books.length
        };
        return { books, statistics: stats };
    }

    async getBookById(id) {
        return await bookRepository.findById(id);
    }

    async createBook(bookData) {
        bookValidator.validateBook(bookData);
        return await bookRepository.create(bookData);
    }

    async updateBook(id, bookData) {
        bookValidator.validateBook(bookData);
        return await bookRepository.update(id, bookData);
    }

    async borrowBook(id) {
        const book = await bookRepository.findById(id);
        if (!book) throw new Error('Book not found');
        if (book.status !== 'available') throw new Error('Book is not available');
        return await bookRepository.updateStatus(id, 'borrowed');
    }

    async returnBook(id) {
        const book = await bookRepository.findById(id);
        if (!book) throw new Error('Book not found');
        if (book.status !== 'borrowed') throw new Error('Book is not borrowed');
        return await bookRepository.updateStatus(id, 'available');
    }

    async deleteBook(id) {
        const book = await bookRepository.findById(id);
        if (!book) throw new Error('Book not found');
        if (book.status === 'borrowed') throw new Error('Cannot delete borrowed book');
        return await bookRepository.delete(id);
    }
}
module.exports = new BookService();
