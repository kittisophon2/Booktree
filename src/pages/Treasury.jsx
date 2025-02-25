import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import ReadingListService from "../Services/ReadingList.service";
import { Link } from "react-router-dom";
const Treasury = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

    fetchBooks();
  }, []);

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
            <ul className="space-y-2">
              {books.map((book) => (
                <Link to={`/content/${book.book.book_id}`}>
                  <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row max-w-4xl w-full">
                    <img
                      src={`${book.book.book_photo}`}
                      alt={book.book.title}
                      className="w-full md:w-1/3 object-cover rounded-md mb-4 md:mb-0 md:mr-6"
                    />
                    <div className="flex-1">
                      <h1 className="text-2xl font-bold mb-2">
                        {book.book.title}
                      </h1>
                      <p className="text-lg font-semibold mb-1">
                        โดย {book.book.author}
                      </p>
                      <p className="text-gray-700 mb-4">
                        {book.book.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Treasury;
