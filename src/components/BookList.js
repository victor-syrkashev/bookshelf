import React from 'react';
import { Link } from 'react-router-dom';
import { FaEllipsisV } from 'react-icons/fa';

const BookList = ({ booksData }) => {
  return (
    <div className="container">
      {booksData.map((book) => {
        const { id, title, image, author } = book;
        return (
          <article key={id}>
            <div className="image">
              <img src={image} alt={title} />
            </div>
            <div className="footer">
              <h4>{title}</h4>
              <p className="author">{author}</p>
            </div>
            <div className="book-btn-container">
              <Link className="details-btn" to={`/${id}`} state={{ book }}>
                Подробнее
              </Link>
              <button type="button" className="more">
                <FaEllipsisV />
              </button>
              <div className="submenu">
                <button type="button">Редактировать</button>
                <button type="button" className="remove-book">
                  Удалить
                </button>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default BookList;
