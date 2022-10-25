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
  const [author, setAuthor] = useState('Все авторы');
  const [genre, setGenre] = useState('Все жанры');
  const [sort, setSort] = useState('default');

  const history = createBrowserHistory();

  // Попытка реализовать хранение переменных в URL
  useEffect(() => {
    const filterParams = history.location.search.substring(1);
    const filtersFromParams = qs.parse(filterParams);
    if (filtersFromParams.page) {
      console.log(Number(filtersFromParams.page));
    }
  }, []);

  useEffect(() => {
    fetch(
      `http://localhost:8000/?page=${activeButtonId}&author=${author}&genre=${genre}&sort=${sort}`
    )
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
    history.push(
      `?page=${activeButtonId}&author=${author}&genre=${genre}&sort=${sort}`
    );
  }, [activeButtonId, author, genre, sort]);

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
          setAuthor={setAuthor}
          setGenre={setGenre}
          setSort={setSort}
          activeButtonId={activeButtonId}
          authors={authorsList}
          genres={genresList}
          author={author}
          genre={genre}
          sort={sort}
        />
        <BookList booksData={booksData} />
        <Pagination
          setBooksData={setBooksData}
          setPageNumbers={setPageNumbers}
          setActiveButtonId={setActiveButtonId}
          activeButtonId={activeButtonId}
          pageNumbers={pageNumbers}
          author={author}
          genre={genre}
          sort={sort}
        />
      </section>
    </main>
  );
};

export default Home;
