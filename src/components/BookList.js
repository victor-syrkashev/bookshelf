import React from 'react';

const BookList = ({ booksData }) => {
  return (
    <div className="container">
      {booksData.map(({ id, title, image, author }) => {
        return (
          <article key={id}>
            <div className="image">
              <img src={image} alt={title} />
            </div>
            <div className="footer">
              <h4>{title}</h4>
              <p className="author">{author}</p>
            </div>
            <button type="button" className="more">
              Подробнее
            </button>
          </article>
        );
      })}
    </div>
  );
};

export default BookList;
