import http from "../http-common";

const getBooksCategory = () => {
  return http.get("/bookcategories");
}

const BookCategoryService = {
    getBooksCategory
}

export default BookCategoryService;
