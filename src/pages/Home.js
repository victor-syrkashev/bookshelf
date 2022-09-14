import React, { useState } from 'react';
import books from '../data';
import BookList from '../components/BookList';
import Filter from '../components/Filter';

const Home = () => {
  // eslint-disable-next-line no-unused-vars
  const [booksData, setBooksData] = useState(books);
  return (
    <main>
      <section className="section">
        <div className="title">
          <h1>Книжная полка</h1>
        </div>
        <Filter />
        <BookList booksData={booksData} />
      </section>
    </main>
  );
};

export default Home;
