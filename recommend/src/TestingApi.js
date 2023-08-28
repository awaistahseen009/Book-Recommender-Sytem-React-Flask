import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function TestingApi() {
  const [books, setBooks] = useState([]);
  const {name}=useParams()
  const fetchData = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/popular/`, {
        method: 'POST',
        body: JSON.stringify({}),
        headers: {
          'Content-Type': 'application/json'
        }
        ,
        mode: 'cors'
      });
      const data = await response.json();
      setBooks(data.message);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {books.map((book, index) => (
        <div key={index} className="book-card">
          <h3>{book[0]}</h3>
          <p>Author: {book[1]}</p>
          <img src={book[2]} alt={`Cover of ${book[0]}`} />
          <p>ISBN: {book[3]}</p>
          <p>Year: {book[4]}</p>
        </div>
      ))}
    </div>
  );
}

export default TestingApi;
