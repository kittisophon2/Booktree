import http from "../http-common";

const getBooks = () => {
  return http.get("/books");
};

const getTopBooks = () => {
  return http.get(`/books/top-books/top`);
};

const BookService = {
  getBooks,
  getTopBooks
};

export default BookService;
