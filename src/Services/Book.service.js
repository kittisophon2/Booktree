import http from "../http-common";

const getBooks = () => {
  return http.get("/books");
};

const getTopBooks = () => {
  return http.get(`/books/top-books/top`);
};

const getBookById = (book_id) => {
  return http.get(`/books/${book_id}`);
};


const addReview = (book_id, user_id, comment, rating = 5) => {
  const token = localStorage.getItem("token"); // ดึง token จาก localStorage
  return http
    .post(
      "/books/add-review",
      { book_id, user_id, comment, rating },
      {
        headers: { Authorization: `Bearer ${token}` }, // แก้ไข Syntax ตรงนี้
      }
    )
    .then((response) => {
      return response.data; // คืนค่าเฉพาะข้อมูลที่ต้องใช้
    })
    .catch((error) => {
      console.error("Error submitting review:", error);
      throw error; // โยน error ออกไปเพื่อให้ handle ภายนอกได้
    });
};

const BookService = {
  getBooks,
  getTopBooks,
  getBookById,
  addReview, // ✅ เพิ่มเข้า object เพื่อให้เรียกใช้ได้
};

export default BookService;
