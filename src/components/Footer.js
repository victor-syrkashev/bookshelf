import React from 'react';
import Menu from './Menu';

const Footer = () => {
  return (
    <footer className="footer">
      <Menu />
      <p className="copyright">
        &#169; bookshelf &nbsp;
        {new Date().getFullYear()}
      </p>
    </footer>
  );
};

export default Footer;
