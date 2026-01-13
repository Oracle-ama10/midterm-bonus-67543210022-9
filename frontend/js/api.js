class LibraryAPI {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async getAllBooks(status = null) {
        let url = `${this.baseURL}/books`;
        if (status) url += `?status=${status}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch books');
        const result = await response.json(); 
        return result.data; // ดึง field data จาก response format ใหม่
    }

    async getBookById(id) {
        const response = await fetch(`${this.baseURL}/books/${id}`);
        if (!response.ok) throw new Error('Failed to fetch book');
        const result = await response.json();
        return result.data;
    }

    async createBook(bookData) {
        const response = await fetch(`${this.baseURL}/books`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookData)
        });
        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error || 'Failed to create');
        }
        return await response.json();
    }

    async updateBook(id, bookData) {
        const response = await fetch(`${this.baseURL}/books/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookData)
        });
        if (!response.ok) throw new Error('Failed to update');
        return await response.json();
    }

    async borrowBook(id) {
        const response = await fetch(`${this.baseURL}/books/${id}/borrow`, { method: 'PATCH' });
        if (!response.ok) throw new Error('Failed to borrow');
        return await response.json();
    }

    async returnBook(id) {
        const response = await fetch(`${this.baseURL}/books/${id}/return`, { method: 'PATCH' });
        if (!response.ok) throw new Error('Failed to return');
        return await response.json();
    }

    async deleteBook(id) {
        const response = await fetch(`${this.baseURL}/books/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete');
        return await response.json();
    }
}

// จุดสำคัญ: เปลี่ยน URL ตรงนี้ถ้าจะไป Deploy บน VM
const api = new LibraryAPI('http://192.168.56.101:3000/api');
