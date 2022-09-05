import { useState, useEffect } from 'react';
import books from './data';
import Header from './Header';
import BookList from './BookList';

function App() {
  const [booksData, setBooksData] = useState(books);
  return (
    <>
      <Header />
      <main>
        <section className="section">
          <div className="title">
            <h1>Книжная полка</h1>
          </div>
          <BookList booksData={booksData} />
        </section>
      </main>
    </>
  );
}

export default App;
