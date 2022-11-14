import React from 'react';
import Select from 'react-select';

const Filter = ({
  setBooksData,
  setNumberOfPages,
  setFilter,
  activeButtonId,
  setActiveButtonId,
  authors,
  genres,
  filter,
  urlWithSearchParams,
}) => {
  const optionsSorting = [
    { value: 'add-asc', label: 'По добавлению (сначала новые)' },
    { value: 'add-desc', label: 'По добавлению (сначала старые)' },
    { value: 'name-asc', label: 'Алфавиту А-Я' },
    { value: 'name-desc', label: 'Алфавиту Я-А' },
  ];

  const optionsBookshelf = [
    { value: '', label: 'Все книги' },
    { value: 'new', label: 'Новые' },
    { value: 'finished', label: 'Прочитанные' },
  ];

  function createOptions(list, label) {
    return list.map((item) => {
      if (item === '') {
        return { value: `${item}`, label: `${label}` };
      }
      return { value: `${item}`, label: `${item}` };
    });
  }
  const optionsGenres = createOptions(genres, 'Все жанры');
  const optionsAuthor = createOptions(authors, 'Все авторы');

  const fetchingData = (selectOption, filterOption) => {
    const selectedSort = selectOption.value;
    const newFilter = { ...filter, [filterOption]: selectedSort };
    setFilter(newFilter);
    const url = urlWithSearchParams(newFilter, activeButtonId);
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        setBooksData(result.booksData);
        setNumberOfPages(result.numberOfPages);
        setActiveButtonId(result.pageIndex);
      });
  };

  return (
    <section className="filter">
      <div className="sort-container">
        <p>Сортировать:</p>
        <Select
          options={optionsSorting}
          defaultValue={() => {
            return optionsSorting.filter(
              (option) => option.value === filter.sort
            );
          }}
          isSearchable
          onChange={(option) => {
            fetchingData(option, 'sort');
          }}
        />
      </div>
      <div className="filter-container">
        <p>Фильтры:</p>
        <Select
          options={optionsBookshelf}
          defaultValue={() => {
            return optionsBookshelf.filter(
              (option) => option.value === filter.bookshelf
            );
          }}
          onChange={(option) => {
            fetchingData(option, 'bookshelf');
          }}
        />
        <Select
          options={optionsAuthor}
          defaultValue={() => {
            return optionsAuthor.filter(
              (option) => option.value === filter.author
            );
          }}
          isSearchable
          onChange={(option) => {
            fetchingData(option, 'author');
          }}
        />
        <Select
          options={optionsGenres}
          defaultValue={() => {
            return optionsGenres.filter(
              (option) => option.value === filter.genre
            );
          }}
          isSearchable
          onChange={(option) => {
            fetchingData(option, 'genre');
          }}
        />
      </div>
    </section>
  );
};

export default Filter;
