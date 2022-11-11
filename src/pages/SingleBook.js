/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-closing-tag-location */
import React from 'react';
import '../singleBook.css';
import { useLocation } from 'react-router-dom';
import { BsBook } from 'react-icons/bs';

const SingleBook = () => {
  const location = useLocation();
  const { book } = location.state;
  const {
    id,
    title,
    image,
    author,
    URL,
    description,
    genres,
    ageRestriction,
    publisher,
    yearOfPublishing,
    pages,
    gallery,
  } = book;

  function removeBook(identifier) {
    fetch(`http://localhost:8000/delete-book/${identifier}`, {
      method: 'DELETE',
    });
    window.history.back();
  }

  return (
    <section className="single-book">
      <div className="header-single-book">
        <img src={image} alt={title} className="hero-image" />
        <div className="text-container">
          <h1>{title}</h1>
          <h2>{author}</h2>
          <ul className="list-items">
            {genres.map((genre, index) => {
              return <li key={index}>{genre}</li>;
            })}
          </ul>
        </div>
      </div>
      <main className="main-single-book">
        <aside>
          <div className="aside-image-container">
            <img src={image} alt={title} className="book-image" />
            <div className="ageRestriction-icon">{ageRestriction}</div>
          </div>
          <a href={URL} className="buy-btn">
            Купить
          </a>
          <button
            type="button"
            className="remove-btn"
            onClick={() => removeBook(id)}
          >
            Удалить
          </button>
          {gallery && gallery.length > 0 && (
            <div className="gallery-btn">
              <BsBook />
              <p>Примеры страниц</p>
            </div>
          )}
        </aside>
        <article className="book-description">
          <div className="description">{description}</div>
          <div className="publisher-info">
            <ul className="key">
              <li>Издательство:</li>
              <li>Год издания:</li>
              <li>Количество страниц:</li>
            </ul>
            <ul className="value">
              <li>{publisher}</li>
              <li>{yearOfPublishing}</li>
              <li>{pages}</li>
            </ul>
          </div>
        </article>
      </main>
    </section>
  );
};

export default SingleBook;
