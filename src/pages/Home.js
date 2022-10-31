import React, { useState, useEffect } from 'react';
import { createBrowserHistory } from 'history';
import qs from 'qs';
import Pagination from '../components/Pagination';
import BookList from '../components/BookList';
import Filter from '../components/Filter';

const Home = () => {
  const [booksData, setBooksData] = useState();
  const [activeButtonId, setActiveButtonId] = useState(0);
  const [pageNumbers, setPageNumbers] = useState(0);
  const [authorsList, setAuthorsList] = useState([]);
  const [genresList, setGenresList] = useState([]);
  const [filter, setFilter] = useState({
    author: '',
    genre: '',
    sort: 'add-asc',
  });

  const history = createBrowserHistory();
  const urlWithSearchParams = (object, pageIndex) => {
    const url = new URL('http://localhost:8000/');
    url.searchParams.set('page', pageIndex);
    for (const key in object) {
      if (object[key] !== '') {
        url.searchParams.set(key, object[key]);
      }
    }
    return url;
  };

  // Попытка реализовать хранение переменных в URL
  useEffect(() => {
    const filterParams = history.location.search.substring(1);
    console.log(filterParams);
    const filtersFromParams = qs.parse(filterParams);
    if (filtersFromParams.page) {
      console.log(Number(filtersFromParams.page));
    }
  }, []);

  useEffect(() => {
    const url = urlWithSearchParams(filter, activeButtonId);
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        setBooksData(result.booksData);
        setPageNumbers(result.pageNumbers);
        setActiveButtonId(result.pageIndex);
        result.authorsList.unshift('Все авторы');
        setAuthorsList(result.authorsList);
        result.genresList.unshift('Все жанры');
        setGenresList(result.genresList);
      });
  }, []);

  useEffect(() => {
    const url = urlWithSearchParams(filter, activeButtonId);
    history.push(url.search);
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
          setPageNumbers={setPageNumbers}
          setFilter={setFilter}
          activeButtonId={activeButtonId}
          authors={authorsList}
          genres={genresList}
          filter={filter}
          urlWithSearchParams={urlWithSearchParams}
        />
        <BookList booksData={booksData} setBooksData={setBooksData} />
        <Pagination
          setBooksData={setBooksData}
          setPageNumbers={setPageNumbers}
          setActiveButtonId={setActiveButtonId}
          activeButtonId={activeButtonId}
          pageNumbers={pageNumbers}
          filter={filter}
          urlWithSearchParams={urlWithSearchParams}
        />
      </section>
    </main>
  );
};

export default Home;
