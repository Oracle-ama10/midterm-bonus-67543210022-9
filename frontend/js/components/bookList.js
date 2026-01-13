function renderBookList(books) {
    const container = document.getElementById('book-list');
    
    if (!books || books.length === 0) {
        container.innerHTML = '<div class="no-books">📚 No books found</div>';
        return;
    }
    
    container.innerHTML = books.map(book => `
        <div class="book-card">
            <h3>${escapeHtml(book.title)}</h3>
            <p style="color:#666">👤 ${escapeHtml(book.author)}</p>
            <p style="color:#999; font-size:12px">🔖 ${escapeHtml(book.isbn)}</p>
            <span class="status-badge status-${book.status}">
                ${book.status === 'available' ? '✅' : '📖'} ${book.status.toUpperCase()}
            </span>
            <div class="actions">
                ${book.status === 'available' 
                    ? `<button class="btn btn-success" onclick="borrowBook(${book.id})">Borrow</button>`
                    : `<button class="btn btn-warning" onclick="returnBook(${book.id})">Return</button>`
                }
                <button class="btn btn-secondary" onclick="showBookForm({id: ${book.id}, title: '${escapeHtml(book.title)}', author: '${escapeHtml(book.author)}', isbn: '${escapeHtml(book.isbn)}'})">Edit</button>
                <button class="btn btn-danger" onclick="deleteBook(${book.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

function escapeHtml(text) {
    if (!text) return '';
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return String(text).replace(/[&<>"']/g, m => map[m]);
}
