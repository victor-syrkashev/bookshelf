import React, { useState } from 'react';
import Menu from './Menu';

const Header = () => {
  return (
    <>
      <header>
        <div className="icon">
          <a href="#">
            <img src="Bookshelf.svg" alt="" />
          </a>
          <h1>bookshelf</h1>
        </div>
        <Menu />
      </header>
    </>
  );
};

export default Header;
