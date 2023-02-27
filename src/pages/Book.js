import React, { useState, useEffect } from 'react';
import '../book.css';
import { Link, useParams } from 'react-router-dom';
import { BsBook } from 'react-icons/bs';
import noImage from '../no-image.svg';
import Modal from '../components/Modal';
import Gallery from '../components/Gallery';
import Error from './Error';
import { useGlobalContext } from '../components/context';

const Book = () => {
  const [book, setBook] = useState({});
  const [isError, setIsError] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const { openRemoveModal } = useGlobalContext();
  const param = useParams();
  const id = param.bookId;

  const removeBook = async (identifier) => {
    await fetch(`/api/books/${identifier}`, {
      method: 'DELETE',
    });
    window.history.back();
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
  };

  useEffect(() => {
    const url = `/api/books/${id}`;
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          setIsError(true);
        } else {
          return res.json();
        }
      })
      .then((result) => {
        if (result) {
          setBook({ ...result });
        }
      });
  }, []);

  if (isError) {
    return (
      <section className="book">
        <Error />
      </section>
    );
  }

  if (!Object.keys(book).length) {
    return (
      <section className="book">
        <div className="header-book">
          <div className="text-container">
            <h1>...Loading</h1>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="book">
      <div className="header-book">
        <img
          src={book.image !== '' ? book.image : noImage}
          alt={book.title}
          className="hero-image"
        />
        <div className="text-container">
          <h1>{book.title}</h1>
          <h2>{book.author}</h2>
          <ul className="list-items">
            {book.genres.map((genre, index) => {
              return <li key={index}>{genre}</li>;
            })}
          </ul>
        </div>
      </div>
      <main className="main-book">
        <aside className="book-aside">
          <div className="aside-image-container">
            <img
              src={book.image !== '' ? book.image : noImage}
              alt={book.title}
              className="book-image"
            />
            <div className="ageRestriction-icon">{book.ageRestriction}</div>
          </div>
          <a
            href={book.URL}
            className={book.URL ? 'buy-btn' : 'buy-btn disabled'}
            target="_blank"
            rel="noreferrer noopener"
          >
            Купить
          </a>
          <button
            type="button"
            className="remove-btn"
            onClick={() => openRemoveModal(id)}
          >
            Удалить
          </button>
          <Link
            className="edit-btn"
            to="../add-book"
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
          {book.gallery && book.gallery.length > 0 && (
            <button
              className="gallery-btn"
              onClick={() => {
                setIsGalleryOpen(true);
              }}
            >
              <BsBook />
              <p>Примеры страниц</p>
            </button>
          )}
        </aside>
        <article className="book-description">
          <div className="description">{book.description}</div>
          <div className="publisher-info">
            <ul className="key">
              <li>Издательство:</li>
              <li>Год издания:</li>
              <li>Количество страниц:</li>
            </ul>
            <ul className="value">
              <li>{book.publisher}</li>
              <li>{book.yearOfPublishing}</li>
              <li>{book.pages}</li>
            </ul>
          </div>
        </article>
      </main>
      <Modal method={removeBook} />
      {book.gallery && (
        <Gallery
          gallery={book.gallery}
          isGalleryOpen={isGalleryOpen}
          closeGallery={closeGallery}
        />
      )}
    </section>
  );
};

export default Book;
