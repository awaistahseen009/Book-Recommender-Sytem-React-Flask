import React, { useRef, useState } from 'react';
import "./Navbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [menulist, setMenulist] = useState("menu-items menu-disable");
  const [disClass,setDisclass]=useState("left-arrow");
  const [searchValue, setSearchValue] = useState(""); 
  const formRef = useRef(null);
  const handleSearchIcon = () => {
    setShowSearch(!showSearch);
    if (showSearch===true){
      setDisclass("left-arrow")
    }
  }

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
    handleMenulist(); // Call handleMenulist to update the menulist state
  }
  const setLeftArrow=()=>{
    setShowMenu(false)
    setShowSearch(false)
    setDisclass("left-arrow dis-class")
    setMenulist("menu-items menu-disable")
  }
  const handleMenulist = () => {
    if (!showMenu) {
      setMenulist("menu-items menu-disable"); // Use setMenulist to update the menulist state
    } else {
      setMenulist("menu-items menu-enable"); // Use setMenulist to update the menulist state
      setDisclass("left-arrow")
    }
  }
  const handleIconClick = () => {
    // Programmatically trigger form submission when the icon is clicked
    formRef.current.submit();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Use the searchValue state to perform your form submission action
    console.log(`Submitting search for: ${searchValue}`);
  };
  return (
    <header className='header'>
      {showSearch ? (
        <nav className='navbar'>
          <h3 className='title title-short'>
            Book Recommender System
          </h3>
          <div className="search-item">
            <div className="search-bar">
              <form  ref={formRef}
              action={`/books/${searchValue}`}
              >
                <input type="text"
                  placeholder="Search"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}/>
              </form>
              {/* <button type="submit"
              style={{ display : 'none' }} // Hide the button
              ref={hiddenSubmitButtonRef} // Assign ref to the hidden button
              >
              </button> */}
              <i className="fa-solid fa-magnifying-glass search-icon"
              onClick={handleIconClick}
              ></i>
            </div>
          </div>
          <div className={disClass} onClick={setLeftArrow}><i className="fa-solid fa-arrow-left" ></i></div>
        </nav>
      ) : (
        <nav className='navbar'>
          <h3 className='title'>
            Book Recommender System
          </h3>
          <div className="menu-icon" onClick={handleMenuClick}>
            <FontAwesomeIcon icon={faBars} />
          </div>
          <div className={menulist}>
            <ul className='info menu'>
              <li className='search-icon-main' onClick={handleSearchIcon}><a href="#"><i className="fa-solid fa-magnifying-glass"></i></a></li>
              <li><a href="/">Home</a></li>
              <li><a href='/projects'>Projects</a></li>
              {/* <li><a href="#">Contact Us</a></li> */}
            </ul>
          </div>
        </nav>
      )}
    </header>
  )
}

export default Navbar;
