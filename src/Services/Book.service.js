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

const BookService = {
  getBooks,
  getTopBooks,
  getBookById
};

export default BookService;
