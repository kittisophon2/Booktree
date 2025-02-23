import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BookService from "../Services/Book.service";
import Layout from "../components/Layout";

const Content = () => {
  const { book_id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    BookService.getBooks()
      .then((response) => {
        const foundBook = response.data.find((b) => b._id === book_id);
        if (foundBook) {
          setBook(foundBook);
        } else {
          setError("Book not found");
        }
      })
      .catch((e) => {
        setError("Error fetching book details");
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [book_id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Layout>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">{book.title}</h1>
        <img src={`${book.book_photo}`} alt={book.title} className=" h-20 object-cover rounded-md mb-4" />
        <p className="text-lg font-semibold">Author: {book.author}</p>
        <p className="text-lg font-semibold">Published Year: {book.publish_year}</p>
        <p className="text-lg font-semibold">Description: {book.description}</p>
        <p className="text-lg font-semibold">Summary: {book.summary}</p>
      </div>
    </Layout>
  );
};

export default Content;
