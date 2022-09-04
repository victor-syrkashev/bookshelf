import React, { useState } from 'react';

const Menu = () => {
  const items = ['Главная', 'Добавить книгу'];
  const [menuItems, setMenuItems] = useState(items);
  return (
    <>
      <nav className="header-menu">
        <ul>
          {menuItems.map((menuItem, index) => {
            return (
              <li key={index}>
                <a href="#">{menuItem}</a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default Menu;
