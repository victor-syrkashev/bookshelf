import React, { useState } from 'react';

const BookList = ({ booksData }) => {
  return (
    <>
      <div className="container">
        {booksData.map(({ id, title, image, author, ageRestriction }) => {
          return (
            <article key={id}>
              <div className="image">
                <img src={image} alt={title} />
              </div>
              <div className="footer">
                <h4>{title}</h4>
                <p className="author">{author}</p>
              </div>
              <button className="more">Подробнее</button>
            </article>
          );
        })}
      </div>
    </>
  );
};

export default BookList;
