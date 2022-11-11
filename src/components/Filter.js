import React from 'react';
import Select from 'react-select';

const Filter = ({
  setBooksData,
  setPageNumbers,
  setFilter,
  activeButtonId,
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
    { value: 'finished', label: 'Прочитанные' },
    { value: 'new', label: 'Новые' },
  ];

  function createOptions(list) {
    return list.map((item) => {
      return { value: `${item}`, label: `${item}` };
    });
  }
  const optionsGenres = createOptions(genres);
  const optionsAuthor = createOptions(authors);

  const fetchingData = (selectOption, filterOption) => {
    const selectedSort = selectOption.value;
    const newFilter = { ...filter, [filterOption]: selectedSort };
    setFilter(newFilter);
    const url = urlWithSearchParams(newFilter, activeButtonId);
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        setBooksData(result.booksData);
        setPageNumbers(result.pageNumbers);
      });
  };

  return (
    <section className="filter">
      <div className="filter-container">
        <p>Сортировать:</p>

        <Select
          value={optionsSorting.value}
          options={optionsSorting}
          defaultValue={optionsSorting[0]}
          isSearchable
          onChange={(option) => {
            fetchingData(option, 'sort');
          }}
        />
        <Select
          value={optionsSorting.value}
          options={optionsAuthor}
          defaultValue={optionsAuthor[0]}
          isSearchable
          onChange={(option) => {
            fetchingData(option, 'author');
          }}
        />
        <Select
          value={optionsSorting.value}
          options={optionsGenres}
          defaultValue={optionsGenres[0]}
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
