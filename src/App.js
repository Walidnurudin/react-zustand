import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/home/home';
import Login from './pages/login/login';
import About from './pages/about/about';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='login' element={<Login />} />
          <Route path='/' element={<Home />} />
          <Route path='about' element={<About />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
