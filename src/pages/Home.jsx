import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import BookService from "../Services/Book.service";
import BookCategoryService from "../Services/BookCategory.service";
import Layout from "../components/Layout";
import Slideshow from "../components/Slideshow";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [bookCategories, setBookCategories] = useState([]);
  const [topBooks, setTopBooks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIndex2, setCurrentIndex2] = useState(0);

  useEffect(() => {
    BookService.getBooks()
      .then((response) => {
        setBooks(response.data);
      })
      .catch((e) => console.log(e));


      BookService.getTopBooks(10)
      .then((response) => {
        setTopBooks(response.data);
      })
      .catch((e) => console.log(e));
      
    BookCategoryService.getBooksCategory()
      .then((response) => {
        setBookCategories(response.data);
      })
      .catch((e) => console.log(e));
  }, []);

  // ฟังก์ชันดึง categoryName ตาม book_id
  const getCategoryName = (bookId) => {
    const bookCategory = bookCategories.find((bc) => bc.book_id === bookId);
    return bookCategory ? bookCategory.category.name : "ไม่ระบุหมวดหมู่";
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 5) % books.length);
  };

  const nextSlide2 = () => {
    setCurrentIndex2((prevIndex) => (prevIndex + 5) % books.length);
  };


  return (
    <Layout>
      <Slideshow />
      <div className="relative w-full overflow-hidden">
  <img
    src="/bg/bgtree.gif"
    alt="Background Animation"
    className="absolute top-0 left-0 w-full h-40 object-cover"
  />
  <div className="relative flex justify-center items-center w-full h-40 bg-black bg-opacity-50">
    <h1 className="text-6xl text-white logo">Welcome To BookTree</h1>
  </div>
</div>

       <div className=" p-6">
        {/* หนังสือใหม่ รายสัปดาห์ */}
        <div className="relative overflow-hidden w-full px-4">
          <h1 className="text-3xl font-bold ml-5 mb-4">📚 หนังสือใหม่ รายสัปดาห์</h1>
          <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${(currentIndex * 100) / 5}%)` }}>
            {books.map((book) => (
              <div key={book._id} className="w-1/5 flex-none p-2">
                <Link to={`/content/${book._id}`}>
                  <div className="bg-white p-4 rounded-lg shadow-lg">
                    <img src={`${book.book_photo}`} alt={book.title} className="w-full h-80 object-cover rounded-md mb-4" />
                    <h3 className="text-lg font-semibold text-center">{book.title}</h3>
                    <p className="text-sm text-center text-gray-500">{getCategoryName(book._id)}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <button onClick={nextSlide} className="absolute right-2 top-1/2 transform -translate-y-1/2  p-2 rounded-full  ">
            <ChevronRight size={36} />
          </button>
        </div>

       {/* หนังสือยอดนิยม ตลอดกาล */}
       <div className="relative overflow-hidden w-full px-4 mt-10">
          <h1 className="text-3xl font-bold ml-5 mb-4">🔥 หนังสือยอดนิยม ตลอดกาล</h1>
          <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${(currentIndex2 * 100) / 5}%)` }}>
            {topBooks.map((book) => (
              <div key={book._id} className="w-1/5 flex-none p-2">
                <Link to={`/content/${book._id}`}>
                  <div className="bg-white p-4 rounded-lg shadow-lg">
                    <img src={`${book.book_photo}`} alt={book.title} className="w-full h-80 object-cover rounded-md mb-4" />
                    <h3 className="text-lg font-semibold text-center">{book.title}</h3>
                    <p className="text-sm text-center text-gray-500">{getCategoryName(book._id)}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <button onClick={nextSlide2} className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full">
            <ChevronRight size={36} />
          </button>
        </div>
      </div>


{/* จัดอันดับหนังสือ/นักอ่าน */}
<div className="w-full px-4 mt-10 pb-20">
  <h1 className="text-3xl font-bold ml-10 mb-6 text-gray-800 ">🏆 จัดอันดับหนังสือ/นักอ่าน</h1>

  <div className="grid grid-cols-3 gap-6">
    {/* หนังสือยอดนิยม */}
    <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col min-h-[450px]">
            <h2 className="text-xl font-bold text-center mb-4 text-gray-700">📖 หนังสือยอดนิยม</h2>
            <div className="space-y-4 flex-grow">
              {topBooks.slice(0, 5).map((book, index) => (
                <Link to={`/content/${book._id}`} key={book._id}>
                  <div className="flex items-center space-x-4 p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                    <span className="text-lg font-semibold text-gray-700">#{index + 1}</span>
                    <img src={book.book_photo} alt={book.title} className="w-14 h-20 object-cover rounded-md shadow-md" />
                    <div>
                      <h3 className="text-md font-semibold text-gray-800">{book.title}</h3>
                      <p className="text-gray-600 text-sm">{book.author}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

    {/* นักอ่านที่อ่านเยอะที่สุด */}
    <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col min-h-[450px]">
      <h2 className="text-xl font-bold text-center mb-4 text-gray-700">👨‍💻 นักอ่านที่อ่านเยอะที่สุด</h2>
      <div className=" flex-grow">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="flex items-center space-x-4 p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
            <span className="text-lg font-semibold text-gray-700">#{index + 1}</span>
            <img src="/pic/booktree2.png" className="w-20 h-20  rounded-full border" alt="user" />
            <div>
              <h3 className="text-md font-semibold text-gray-800">Username {index + 1}</h3>
              <p className="text-gray-600 text-sm">50+ หนังสือ</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* นักอ่านที่อ่านไวที่สุด */}
    <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col min-h-[450px]">
      <h2 className="text-xl font-bold text-center mb-4 text-gray-700">⭐ นักอ่านที่อ่านไวที่สุด</h2>
      <div className=" flex-grow">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="flex items-center space-x-4 p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
            <span className="text-lg font-semibold text-gray-700">#{index + 1}</span>
            <img src="/pic/booktree2.png" className="w-20 h-20 rounded-full border" alt="user" />
            <div>
              <h3 className="text-md font-semibold text-gray-800">Reader {index + 1}</h3>
              <p className="text-gray-600 text-sm">10 เล่ม/เดือน</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>


    
    </Layout>
  );
};

export default BookList;
