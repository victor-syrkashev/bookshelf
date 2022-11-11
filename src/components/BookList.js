import React from 'react';
import { Link } from 'react-router-dom';
import { FaEllipsisV } from 'react-icons/fa';

const BookList = ({ booksData, setBooksData }) => {
  if (booksData.length === 0) {
    return (
      <div className="container">
        <p className="no-books">К сожалению, таких книг нет 🦄</p>
      </div>
    );
  }
  function removeBook(id) {
    fetch(`http://localhost:8000/delete-book/${id}`, {
      method: 'DELETE',
    });
    setBooksData(booksData.filter((book) => book.id !== id));
  }
  return (
    <div className="container">
      {booksData.map((book) => {
        const { id, title, image } = book;
        const bookAuthor = book.author;
        return (
          <article key={id}>
            <div className="image">
              <img src={image} alt={title} />
            </div>
            <div className="footer">
              <h4>{title}</h4>
              <p className="author">{bookAuthor}</p>
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
                <button
                  type="button"
                  id={id}
                  className="remove-book"
                  onClick={(e) => {
                    removeBook(e.target.id);
                  }}
                >
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
