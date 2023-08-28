import Navbar from './Components/Navbar/Navbar';
import Card from './Components/Card/Card';
import './Home.css'
import Footer from './Components/Footer/Footer';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Home = () => {
  const [books, setBooks] = useState([]);
  const {name}=useParams()
  const fetchData = async () => {
    try {
      const response = await fetch(`/api/popular/`, {
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
      <div className='home'>
      <Navbar/>
  
      <section className='main'>
      { books.map((book)=>{
        return <Card book={book}/>
      })}
      </section>
      <Footer/>
      </div>
    );
}

export default Home