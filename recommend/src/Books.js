import React, { useEffect, useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import './Books.css'
import BigCard from './Components/BigCard/BigCard'
import Card from './Components/Card/Card'
import Footer from './Components/Footer/Footer'
import { useParams } from 'react-router-dom'

const Books = ({option,exact}) => {
    const {name}=useParams()
    const [isLoading, setIsLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [bigCard,setBigCard]=useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch((option && exact) ? `/api/books/e/${name}` : `/api/books/${name}`, {
        method: 'POST',
        body: JSON.stringify({}),
        headers: {
          'Content-Type': 'application/json'
        }
        ,
        mode: 'cors'
      });
      const data = await response.json();
      if (option && exact){
         setBigCard(data.message.shift())
      }
      setBooks(data.message);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    let timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  
    return () => clearTimeout(timeoutId);
  }, []);
  
  return (
    <div className='home'>
        <Navbar/>
        
        {isLoading ? (
  <div className='loading'>
    <h1>Loading...</h1>
  </div>
) : (
  <>
    {(option && exact) ? <BigCard book={bigCard} /> : null}
    <h3 className='recommended-books-title'>
      Recommended Books
    </h3>
    <section className='main'>
      {books.map((book) => (
        <Card key={book.id} book={book} />
      ))}
    </section>
  </>
)}




        
        <Footer/>
        </div>
  )
}

export default Books