import React from 'react';
import { NavLink } from 'react-router-dom';

const Menu = () => {
  return (
    <nav className="header-menu">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? 'active link' : 'link')}
      >
        Главная
      </NavLink>
      <NavLink
        to="/addBook"
        className={({ isActive }) => (isActive ? 'active link' : 'link')}
      >
        Добавить книгу
      </NavLink>
    </nav>
  );
};

export default Menu;
