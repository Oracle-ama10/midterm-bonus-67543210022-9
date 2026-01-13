# API Tests

## 1. สร้างหนังสือใหม่ (Create Book)
```bash
curl --location --request POST 'http://192.168.56.101:3000/api/books' \
--header 'Content-Type: application/json' \
--data '{
    "title": "Software Architecture 101",
    "author": "Robert C. Martin",
    "isbn": "978-0134494166"
}'
<img width="902" height="756" alt="image" src="https://github.com/user-attachments/assets/51362c90-56c0-491a-a8c1-d5d37a89d6d5" />
```

## 2. ดึงหนังสือทั้งหมด (Get All Books)
```bash
curl --location --request GET'http://192.168.56.101:3000/api/books'
<img width="864" height="694" alt="image" src="https://github.com/user-attachments/assets/d6296769-c3a3-452b-a995-33cb5ba77333" />
```

## 3. ค้นหาตามสถานะ (Filter by Status)
```bash
curl --location --request GET 'http://192.168.56.101:3000/api/books?status=available'
<img width="896" height="761" alt="image" src="https://github.com/user-attachments/assets/44649541-9af0-44aa-8cd2-53d08b27f0aa" />
```

## 4. แก้ไขข้อมูลหนังสือ (Update Book)
```bash
curl --location --request PUT 'http://192.168.56.101:3000/api/books/7' \
--header 'Content-Type: application/json' \
--data '{
    "title": "Clean Architecture (Updated)",
    "author": "Uncle Bob",
    "isbn": "978-0134494166"
}'
<img width="901" height="714" alt="image" src="https://github.com/user-attachments/assets/bc0da553-7a37-4fb6-b888-2c4b423165e8" />
```

## 5. ยืมหนังสือ (Borrow Book)
```bash
curl --location --request PATCH 'http://192.168.56.101:3000/api/books/1/borrow'
<img width="905" height="714" alt="image" src="https://github.com/user-attachments/assets/60670830-f5ac-4e65-a204-e87615db1037" />
```

## 6. คืนหนังสือ (Return Book)
```bash
curl --location --request PATCH 'http://192.168.56.101:3000/api/books/1/return'
<img width="908" height="714" alt="image" src="https://github.com/user-attachments/assets/552bfad4-9090-4b57-a13b-5f7f0cf79396" />
```

## 7. ลบหนังสือ (Delete Book)
```bash
curl --location --request DELETE 'http://192.168.56.101:3000/api/books/1'
<img width="896" height="719" alt="image" src="https://github.com/user-attachments/assets/91d7b935-6d29-47c9-8dd5-33be5c2670ad" />
```