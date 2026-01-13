const db = require('../database/connection');

class BookRepository {
    findAll(status) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM books';
            let params = [];
            if (status) {
                sql += ' WHERE status = ?';
                params.push(status);
            }
            db.all(sql, params, (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    }

    findById(id) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM books WHERE id = ?', [id], (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });
    }

    create(book) {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO books (title, author, isbn, status) VALUES (?, ?, ?, "available")';
            db.run(sql, [book.title, book.author, book.isbn], function(err) {
                if (err) reject(err);
                resolve({ id: this.lastID, ...book, status: 'available' });
            });
        });
    }

    update(id, book) {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE books SET title = ?, author = ?, isbn = ? WHERE id = ?';
            db.run(sql, [book.title, book.author, book.isbn, id], function(err) {
                if (err) reject(err);
                resolve({ id, ...book });
            });
        });
    }

    updateStatus(id, status) {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE books SET status = ? WHERE id = ?';
            db.run(sql, [status, id], function(err) {
                if (err) reject(err);
                resolve({ id, status });
            });
        });
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM books WHERE id = ?', [id], (err) => {
                if (err) reject(err);
                resolve(true);
            });
        });
    }
}
module.exports = new BookRepository();
