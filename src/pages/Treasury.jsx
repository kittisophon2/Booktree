import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import ReadingListService from "../Services/ReadingList.service";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { jwtDecode } from "jwt-decode";


const Treasury = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const data = await ReadingListService.getUserReadingList();
      setBooks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 📌 ลบหนังสือออกจาก Reading List
  const removeFromReadingList = async (book_id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const decoded = jwtDecode(token);
      const user_id = decoded.userId;

      if (!user_id) {
        console.error("❌ Invalid userId from token:", decoded);
        throw new Error("Invalid user_id from token");
      }

      await ReadingListService.delete(`/readings/${user_id}/${book_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // อัปเดตรายการหนังสือโดยกรองหนังสือที่ถูกลบออก
      setBooks((prevBooks) => prevBooks.filter((b) => b.book.book_id !== book_id));
    } catch (error) {
      console.error("❌ Error removing from reading list:", error.response?.data || error.message);
    }
  };

  return (
    <Layout>
      <div className="p-10 h-full justify-center items-center flex">
        <div className="p-10 bg-white rounded-2xl w-full max-w-2xl">
          <h1 className="text-3xl font-semibold mb-4">คลังหนังสือ</h1>
          {loading ? (
            <p>กำลังโหลด...</p>
          ) : error ? (
            <p className="text-red-500">❌ {error}</p>
          ) : books.length === 0 ? (
            <p>ไม่มีหนังสือในคลัง</p>
          ) : (
            <ul className="space-y-4">
              {books.map((book) => (
                <li key={book.book.book_id} className="relative">
                  <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row max-w-4xl w-full">
                    <Link to={`/content/${book.book.book_id}`} className="flex-1 flex">
                      <img
                        src={book.book.book_photo}
                        alt={book.book.title}
                        className="w-full md:w-1/3 object-cover rounded-md mb-4 md:mb-0 md:mr-6"
                      />
                      <div className="flex-1">
                        <h1 className="text-2xl font-bold mb-2">{book.book.title}</h1>
                        <p className="text-lg font-semibold mb-1">โดย {book.book.author}</p>
                        <p className="text-gray-700 mb-4">{book.book.description}</p>
                      </div>
                    </Link>
                    {/* ปุ่มลบ */}
                    <button
                      onClick={() => removeFromReadingList(book.book.book_id)}
                      className="absolute bottom-4 right-4 bg-red-500 text-white p-2 rounded-full shadow-md hover:bg-red-600 transition"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Treasury;
