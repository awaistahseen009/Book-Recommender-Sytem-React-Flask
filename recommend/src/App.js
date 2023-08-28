import Home from "./Home";
import Books from "./Books";
import Profile from "./Profile";
import React from "react";
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import PageError from "./PageError";

function App() {
  return<>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/projects" element={<Profile/>}/>
        <Route path="/books/:name" element={<Books option={true} exact={false}/>}/>
        <Route path="/books/e/:name" element={<Books option={true} exact={true}/>}/>
        <Route path="*" element={<PageError/>} />
      </Routes>
    </BrowserRouter>
  </>
}

export default App;
