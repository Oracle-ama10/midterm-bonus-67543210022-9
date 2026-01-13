let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    loadBooks();
});

function setupEventListeners() {
    // ใช้ showBookForm จาก bookForm.js
    document.getElementById('add-btn').addEventListener('click', () => showBookForm());
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const filter = e.target.dataset.filter;
            filterBooks(filter);
        });
    });
    
    // ใช้ hideBookForm จาก bookForm.js
    document.querySelector('.close').addEventListener('click', hideBookForm);
    document.getElementById('cancel-btn').addEventListener('click', hideBookForm);
    
    // ใช้ handleFormSubmit จาก bookForm.js
    document.getElementById('book-form').addEventListener('submit', handleFormSubmit);
}

async function loadBooks(status = null) {
    try {
        document.getElementById('loading').style.display = 'block';
        document.getElementById('book-list').style.display = 'none';
        
        const data = await api.getAllBooks(status);
        
        // ใช้ renderBookList จาก bookList.js
        renderBookList(data.books);
        
        updateStatistics(data.statistics);
        
        document.getElementById('loading').style.display = 'none';
        document.getElementById('book-list').style.display = 'grid';
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to load books: ' + error.message);
        document.getElementById('loading').style.display = 'none';
    }
}

function updateStatistics(stats) {
    if(!stats) return;
    document.getElementById('stat-available').textContent = stats.available;
    document.getElementById('stat-borrowed').textContent = stats.borrowed;
    document.getElementById('stat-total').textContent = stats.total;
}

function filterBooks(status) {
    currentFilter = status;
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === status) btn.classList.add('active');
    });
    loadBooks(status === 'all' ? null : status);
}

// Global functions for inline HTML clicks
async function borrowBook(id) {
    if (!confirm('Do you want to borrow this book?')) return;
    try {
        await api.borrowBook(id);
        loadBooks(currentFilter === 'all' ? null : currentFilter);
    } catch (error) { alert('Error: ' + error.message); }
}

async function returnBook(id) {
    if (!confirm('Do you want to return this book?')) return;
    try {
        await api.returnBook(id);
        loadBooks(currentFilter === 'all' ? null : currentFilter);
    } catch (error) { alert('Error: ' + error.message); }
}

async function deleteBook(id) {
    if (!confirm('Are you sure?')) return;
    try {
        await api.deleteBook(id);
        loadBooks(currentFilter === 'all' ? null : currentFilter);
    } catch (error) { alert('Error: ' + error.message); }
}
