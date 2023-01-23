import React, { useState, useEffect } from 'react';
import '../singleBook.css';
import { Link, useParams } from 'react-router-dom';
import noImage from '../no-image.svg';
import Modal from '../components/Modal';
import Gallery from '../components/Gallery';
import { useGlobalContext } from '../components/context';

const SingleBook = () => {
  const [book, setBook] = useState({});
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const { openRemoveModal } = useGlobalContext();
  const param = useParams();
  const id = param.bookId;

  const removeBook = async (identifier) => {
    await fetch(`http://localhost:8000/books/${identifier}`, {
      method: 'DELETE',
    });
    window.history.back();
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
  };

  useEffect(() => {
    const url = `http://localhost:8000/books/${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setBook({ ...result[0] });
      });
  }, []);

  if (!Object.keys(book).length) {
    return (
      <section className="single-book">
        <div className="header-single-book">
          <div className="text-container">
            <h1>...Loading</h1>
          </div>
        </div>
      </section>
    );
  }

  if (book?.answer) {
    return (
      <section className="single-book">
        <div className="header-single-book no-book">
          <div className="text-container">
            <h1>{`${book.answer} 🦄`}</h1>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="single-book">
      <div className="header-single-book">
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
      <main className="main-single-book">
        <aside className="single-book-aside">
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
            className="edit-single-book-btn"
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

export default SingleBook;
