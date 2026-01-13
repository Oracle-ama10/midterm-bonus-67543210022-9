const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.get('/', (req, res, next) => bookController.getAllBooks(req, res, next));
router.get('/:id', (req, res, next) => bookController.getBookById(req, res, next));
router.post('/', (req, res, next) => bookController.createBook(req, res, next));
router.put('/:id', (req, res, next) => bookController.updateBook(req, res, next));
router.patch('/:id/borrow', (req, res, next) => bookController.borrowBook(req, res, next));
router.patch('/:id/return', (req, res, next) => bookController.returnBook(req, res, next));
router.delete('/:id', (req, res, next) => bookController.deleteBook(req, res, next));

module.exports = router;
