import React, { useEffect, useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import "./Profile.css"
import GitCards from './Components/GitCards/GitCards'
const Profile = () => {
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRepos = () => {
    fetch(`https://api.github.com/users/awaistahseen009/repos`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        setIsLoading(false); // Set loading to false when data is fetched
      }).catch((error=>{
        console.log(error)
      }))
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  const userElements = user.map((user) => {
    return <GitCards user={user} />;
  });

  // Wait for 2 seconds before showing userElements or loading message
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 6000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className='home'>
        <Navbar/>
        {isLoading ? (
          <div className='loading'>
          <h1>Loading...</h1>
        </div>
      ) : (
        <section className="main-git">
        {userElements}
        </section>
      )}
        <Footer/>
    </div>
  )
}

export default Profile