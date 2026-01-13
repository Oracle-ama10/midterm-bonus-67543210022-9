function showBookForm(book = null) {
    const title = document.getElementById('modal-title');
    const form = document.getElementById('book-form');
    
    // Reset form
    form.reset();
    
    if (book) {
        // Edit Mode
        title.textContent = 'Edit Book';
        document.getElementById('book-id').value = book.id;
        document.getElementById('title').value = book.title;
        document.getElementById('author').value = book.author;
        document.getElementById('isbn').value = book.isbn;
    } else {
        // Create Mode
        title.textContent = 'Add New Book';
        document.getElementById('book-id').value = '';
    }
    
    document.getElementById('book-modal').style.display = 'flex';
}

function hideBookForm() {
    document.getElementById('book-modal').style.display = 'none';
}

async function handleFormSubmit(event) {
    event.preventDefault();
    
    const id = document.getElementById('book-id').value;
    const bookData = {
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        isbn: document.getElementById('isbn').value
    };
    
    try {
        if (id) {
            await api.updateBook(id, bookData);
            alert('Book updated successfully!');
        } else {
            await api.createBook(bookData);
            alert('Book added successfully!');
        }
        hideBookForm();
        loadBooks(currentFilter === 'all' ? null : currentFilter);
    } catch (error) {
        alert('Error: ' + error.message);
    }
}
