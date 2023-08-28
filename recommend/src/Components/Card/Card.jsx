import React from 'react'
import "./Card.css"
const Card = ({book}) => {
  return (
    <div className='card-section'>
        <div className="image">
            <img src={book[2]} alt="image-here" />
        </div>
        <div className="text-cards">

         <div className="after-text-cards">
         <p className="title-book">
         {book[0].length > 15 ? book[0].substring(0, 35)+"...": book[0]}
            </p>
            <p className="author">
            <b>Author</b>: {book[1]}
            </p>
            <p className="votes">
            <b>ISBN</b>: {book[3]}
            </p>
            <p className="rating">
            <b>Year</b>: {book[4]}
            </p>
            
         </div>
         <a href={`/books/e/${book[0]}`} className="visit-button">Visit</a>
        </div>
    </div>
  )
}

export default Card