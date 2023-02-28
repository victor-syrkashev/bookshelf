import React, { useState, useEffect } from 'react';
import { createBrowserHistory } from 'history';
import Pagination from '../components/Pagination';
import BookList from '../components/BookList';
import Filter from '../components/Filter';

const Home = () => {
  const currentUrl = new URL(window.location);
  const [booksData, setBooksData] = useState();
  const [activeButtonId, setActiveButtonId] = useState(
    currentUrl.searchParams.get('page') || '1'
  );
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [authorsList, setAuthorsList] = useState([]);
  const [genresList, setGenresList] = useState([]);
  const [filter, setFilter] = useState({
    author: currentUrl.searchParams.get('author') || '',
    genre: currentUrl.searchParams.get('genre') || '',
    sort: currentUrl.searchParams.get('sort') || 'add-asc',
    bookshelf: currentUrl.searchParams.get('bookshelf') || '',
  });

  const history = createBrowserHistory();
  const searchParams = (object, pageIndex) => {
    const url = new URLSearchParams();
    url.append('page', pageIndex);
    for (const key in object) {
      if (object[key] !== '') {
        url.append(key, object[key]);
      }
    }
    return url;
  };

  useEffect(() => {
    const url = searchParams(filter, activeButtonId);
    fetch(`/api/books/?${url.toString()}`)
      .then((res) => res.json())
      .then((result) => {
        setBooksData(result.booksData);
        setNumberOfPages(result.numberOfPages);
        setActiveButtonId(result.pageIndex);
        result.authorsList.unshift('');
        setAuthorsList(result.authorsList);
        result.genresList.unshift('');
        setGenresList(result.genresList);
      });
  }, []);

  useEffect(() => {
    const url = searchParams(filter, activeButtonId);
    history.push(`?${url.toString()}`);
  }, [activeButtonId, filter]);

  if (!booksData) {
    return (
      <main>
        <section className="section">
          <div className="title">
            <h1>Книжная полка</h1>
          </div>
          <div className="preloader">Loading...</div>
        </section>
      </main>
    );
  }
  return (
    <main>
      <section className="section">
        <div className="title">
          <h1>Книжная полка</h1>
        </div>
        <Filter
          setBooksData={setBooksData}
          setNumberOfPages={setNumberOfPages}
          setFilter={setFilter}
          activeButtonId={activeButtonId}
          setActiveButtonId={setActiveButtonId}
          authors={authorsList}
          genres={genresList}
          filter={filter}
          searchParams={searchParams}
        />
        <BookList
          booksData={booksData}
          setBooksData={setBooksData}
          searchParams={searchParams}
          filter={filter}
          activeButtonId={activeButtonId}
          setActiveButtonId={setActiveButtonId}
          setAuthorsList={setAuthorsList}
          setGenresList={setGenresList}
          setNumberOfPages={setNumberOfPages}
        />
        {numberOfPages > 0 && (
          <Pagination
            setBooksData={setBooksData}
            setNumberOfPages={setNumberOfPages}
            setActiveButtonId={setActiveButtonId}
            activeButtonId={activeButtonId}
            numberOfPages={numberOfPages}
            filter={filter}
            searchParams={searchParams}
          />
        )}
      </section>
    </main>
  );
};

export default Home;
