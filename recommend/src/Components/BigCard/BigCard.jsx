import React from 'react'
import "./BigCard.css"
const BigCard = ({book}) => {
  return (
    <div className='card-main'>
        <div className="imageandinfo">
            <div className="image-book">
                <img src={book[2]} alt="image-here" />
            </div>
            <div className="desc-big">
                <h3 className="title-big">Book: {book[0]}</h3>
                <div className='paras'>
                <p className="author-big"><b>Author:</b>{book[1]}</p>
                <p className="votes-big"><b>ISBN:</b> {book[3]}</p>
                <p className="rating-big"><b>Year:</b>{book[4]}</p>
                </div>
              
            </div>
        </div>
    </div>
  )
}

export default BigCard