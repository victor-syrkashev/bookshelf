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
  searchParams,
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
    const url = searchParams(newFilter, activeButtonId);
    fetch(`/api/books/?${url.toString()}`)
      .then((res) => res.json())
      .then((result) => {
        setBooksData(result.booksData);
        setNumberOfPages(result.numberOfPages);
        setActiveButtonId(result.pageIndex);
      });
  };

  return (
    <section className="filter">
      <div className="filter-container">
        <p>Фильтры:</p>
        <Select
          options={optionsBookshelf}
          defaultValue={() => {
            return optionsBookshelf.filter(
              (option) => option.value === filter.bookshelf
            );
          }}
          isSearchable={false}
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
      <div className="sort-container">
        <Select
          className="select-sort"
          options={optionsSorting}
          styles={{
            control: (baseStyle) => ({
              ...baseStyle,
              border: 'none',
              color: 'hsl(214, 100%, 63%)',
            }),
            singleValue: (baseStyle) => ({
              ...baseStyle,
              color: 'hsl(214, 100%, 63%)',
            }),
            dropdownIndicator: (baseStyle, state) => ({
              ...baseStyle,
              ':hover': { color: 'hsl(214, 100%, 55%)' },
              color: state.isFocused
                ? 'hsl(214, 100%, 55%)'
                : 'hsl(214, 100%, 70%)',
            }),
            indicatorSeparator: (baseStyle) => ({
              ...baseStyle,
              backgroundColor: 'hsl(214, 100%, 70%)',
              width: '1px',
            }),
          }}
          defaultValue={() => {
            return optionsSorting.filter(
              (option) => option.value === filter.sort
            );
          }}
          isSearchable={false}
          onChange={(option) => {
            fetchingData(option, 'sort');
          }}
        />
      </div>
    </section>
  );
};

export default Filter;
