import React from 'react';
import { Link } from 'react-router-dom';
import { FaEllipsisV } from 'react-icons/fa';
import noImage from '../no-image.svg';
import Modal from './Modal';
import { useGlobalContext } from './context';

const BookList = ({
  booksData,
  setBooksData,
  urlWithSearchParams,
  filter,
  activeButtonId,
  setAuthorsList,
  setGenresList,
}) => {
  const { openRemoveModal } = useGlobalContext();
  if (booksData.length === 0) {
    return (
      <div className="container">
        <p className="no-books">К сожалению, таких книг нет 🦄</p>
      </div>
    );
  }
  const removeBook = async (id) => {
    await fetch(`http://localhost:8000/api/book/${id}`, {
      method: 'DELETE',
    });
    const url = urlWithSearchParams(filter, activeButtonId);
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        setBooksData(result.booksData);
        result.authorsList.unshift('');
        setAuthorsList(result.authorsList);
        result.genresList.unshift('');
        setGenresList(result.genresList);
      });
  };
  return (
    <div className="container">
      {booksData.map((book) => {
        const { id, title, image } = book;
        const bookAuthor = book.author;
        return (
          <article key={id}>
            <div className="image">
              <img src={image !== '' ? image : noImage} alt={title} />
            </div>
            <div className="footer">
              <h4>{title}</h4>
              <p className="author">{bookAuthor}</p>
            </div>
            <div className="book-btn-container">
              <Link
                className="details-btn"
                to={`/${id}`}
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                  });
                }}
              >
                Подробнее
              </Link>
              <button type="button" className="more">
                <FaEllipsisV />
              </button>
              <div className="submenu">
                <Link
                  className="edit-book-btn"
                  to="add-book"
                  state={{ book }}
                  onClick={() => {
                    window.scrollTo({
                      top: 0,
                      behavior: 'smooth',
                    });
                  }}
                >
                  Редактировать
                </Link>
                <button
                  type="button"
                  id={id}
                  className="remove-book-btn"
                  onClick={(e) => {
                    openRemoveModal(e.target.id);
                  }}
                >
                  Удалить
                </button>
              </div>
            </div>
          </article>
        );
      })}
      <Modal method={removeBook} />
    </div>
  );
};

export default BookList;
