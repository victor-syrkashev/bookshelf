import React from 'react';
import Menu from './Menu';

const Header = () => {
  return (
    <header>
      <div className="icon">
        <img src="/Bookshelf.svg" alt="" />
        <h1>bookshelf</h1>
      </div>
      <Menu />
    </header>
  );
};

export default Header;
