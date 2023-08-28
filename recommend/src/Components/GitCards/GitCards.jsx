import React from 'react'
import "./GitCards.css"
const GitCards = ({user}) => {
  return (
    <div className='card-section-git'>
    <div className="text">
     <div className="after-text">
     <p className="title-project">
     {user.name.length > 13
        ? `${user.name.substring(0, 11)}..`
    : user.name}
        </p>
        <div className="text-text">
        <p className="description">
        <b>Id :</b> {user.id}
        </p>
        <p className="language">
        <b>Language :</b> {user.language}
        </p>
        <p className="start-date-&-time">
        <b>Start date & time :</b> {user.created_at}
        </p>
        <p className="visibility">
        <b>Visibility :</b> {user.visibility}
        </p>
        </div>
        
     </div>
     <a href="https://github.com/awaistahseen009" target="_blank" className="visit-button">Visit</a>
    </div>
</div>
  )
}

export default GitCards