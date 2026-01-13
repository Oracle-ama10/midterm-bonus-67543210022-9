class BookValidator {
    validateBook(data) {
        if (!data.title || !data.author || !data.isbn) {
            throw new Error('Missing required fields');
        }
        if (!data.isbn.startsWith('978') && !data.isbn.startsWith('979')) {
            throw new Error('Invalid ISBN format');
        }
    }
}
module.exports = new BookValidator();
