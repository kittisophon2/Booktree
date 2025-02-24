import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BookService from "../Services/Book.service";
import ReadingListService from "../Services/ReadingList.service";
import Layout from "../components/Layout";
import UserService from "../Services/User.service";
import { jwtDecode } from "jwt-decode";


const Content = () => {
  const { id } = useParams(); // ดึง book_id จาก URL
  const [book, setBook] = useState(null);
  const [topBooks, setTopBooks] = useState([]);
  const [currentIndex2, setCurrentIndex2] = useState(0);
  const [user, setUser] = useState(null);

  // 📌 โหลดข้อมูลหนังสือจาก API
  useEffect(() => {
    const fetchBookData = async () => {
      try {
        console.log("📌 Fetching book data for ID:", id);
        const response = await BookService.getBookById(id);
        setBook(response.data);
      } catch (error) {
        console.error("❌ Error fetching book:", error);
      }
    };
    

    const fetchTopBooks = async () => {
      try {
        const response = await BookService.getTopBooks();
        setTopBooks(response.data);
      } catch (error) {
        console.error("❌ Error fetching top books:", error);
      }
    };

    fetchBookData();
    fetchTopBooks();
  }, [id]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      fetchUserData(decoded.userId);
    }
  }, []);

  const fetchUserData = async (userId) => {
    try {
      const response = await UserService.getUser(userId);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };


  // 📌 เพิ่มหนังสือไปยัง Reading List
  const handleAddToReadingList = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("กรุณาเข้าสู่ระบบก่อนเพิ่มหนังสือในคลัง!");
        return;
      }

      console.log("✅ Sending request to add book:", id);

      await ReadingListService.addToReadingList(id);
      alert("✅ เพิ่มลงคลังหนังสือเรียบร้อย!");
    } catch (error) {
      console.error("❌ Error adding to reading list:", error);
      alert("❌ ไม่สามารถเพิ่มลงคลังหนังสือได้!");
    }
  };

  if (!book) return <p>Loading...</p>;

  return (
    <Layout>
      <div className="min-h-screen flex flex-col space-y-9 justify-center items-center p-6">
        {/* 📚 แสดงข้อมูลหนังสือหลัก */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row max-w-4xl w-full">
          <img
            src={book.book_photo}
            alt={book.title}
            className="w-full md:w-1/3 object-cover rounded-md mb-4 md:mb-0 md:mr-6"
          />
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2">{book.title}</h1>
            <p className="text-lg font-semibold mb-1">โดย {book.author}</p>
            <p className="text-gray-700 mb-4">{book.description}</p>
            <button
              onClick={handleAddToReadingList}
              className="bg-blue-600 text-white text-lg px-10 py-2 rounded-lg w-full md:w-auto"
            >
              คลังหนังสือ
            </button>
          </div>
        </div>

        {/* 🔥 หนังสือยอดนิยม */}
        <div className="relative overflow-hidden w-full px-4 mt-10">
          <h1 className="text-3xl font-bold ml-5 mb-4">🔥 หนังสือยอดนิยม ตลอดกาล</h1>
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${(currentIndex2 * 100) / 5}%)` }}
          >
            {topBooks.map((topBook) => (
              <div key={topBook._id} className="w-1/5 flex-none p-2">
                <Link to={`/content/${topBook._id}`}>
                  <div className="bg-white p-3 rounded-lg shadow-lg w-auto mb-5 flex flex-col justify-between h-[500px]">
                    <img
                      src={topBook.book_photo}
                      alt={topBook.title}
                      className="w-80 h-[450px] object-cover rounded-md mb-4"
                    />
                    <h3 className="text-lg font-semibold text-center min-h-[48px] flex items-center justify-center">
                      {topBook.title}
                    </h3>
                    <p className="text-sm text-center text-gray-500 h-10">
                      {topBook.categories?.[0]?.name || "ไม่มีหมวดหมู่"}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* ปุ่มเลื่อนซ้าย-ขวา */}
          {currentIndex2 < 5 && (
            <button
              onClick={() => setCurrentIndex2((prevIndex) => Math.max(prevIndex + 5, 0))}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full"
            >
              <ChevronRight size={44} />
            </button>
          )}
          {currentIndex2 > 0 && (
            <button
              onClick={() => setCurrentIndex2((prevIndex) => Math.max(prevIndex - 5, 0))}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full"
            >
              <ChevronLeft size={44} />
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Content;
