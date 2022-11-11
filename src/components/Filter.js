import React from 'react';
import Select from 'react-select';

const Filter = ({
  setBooksData,
  setPageNumbers,
  setAuthor,
  setGenre,
  setSort,
  activeButtonId,
  authors,
  genres,
  author,
  genre,
  sort,
}) => {
  const optionsSorting = [
    { value: 'default', label: 'Умолчанию' },
    { value: 'name', label: 'Алфавиту А-Я' },
    { value: 'nameReverse', label: 'Алфавиту Я-А' },
  ];

  function createOptions(list) {
    return list.map((item) => {
      return { value: `${item}`, label: `${item}` };
    });
  }
  const optionsGenres = createOptions(genres);
  const optionsAuthor = createOptions(authors);

  return (
    <section className="filter">
      <div className="filter-container">
        <p>Сортировать по:</p>

        <Select
          value={optionsSorting.value}
          options={optionsSorting}
          defaultValue={optionsSorting[0]}
          isSearchable
          onChange={(option) => {
            const selectedSort = option.value;
            setSort(selectedSort);
            fetch(
              `http://localhost:8000/?page=${activeButtonId}&author=${author}&genre=${genre}&sort=${selectedSort}`
            )
              .then((res) => res.json())
              .then((result) => {
                setBooksData(result.booksData);
              });
          }}
        />
        <Select
          value={optionsSorting.value}
          options={optionsAuthor}
          defaultValue={optionsAuthor[0]}
          isSearchable
          onChange={(option) => {
            const selectedAuthor = option.value;
            setAuthor(selectedAuthor);
            fetch(
              `http://localhost:8000/?page=${activeButtonId}&author=${selectedAuthor}&genre=${genre}&sort=${sort}`
            )
              .then((res) => res.json())
              .then((result) => {
                setBooksData(result.booksData);
                setPageNumbers(result.pageNumbers);
              });
          }}
        />
        <Select
          value={optionsSorting.value}
          options={optionsGenres}
          defaultValue={optionsGenres[0]}
          isSearchable
          onChange={(option) => {
            const selectedGenre = option.value;
            setGenre(selectedGenre);
            fetch(
              `http://localhost:8000/?page=${activeButtonId}&author=${author}&genre=${selectedGenre}&sort=${sort}`
            )
              .then((res) => res.json())
              .then((result) => {
                setBooksData(result.booksData);
                setPageNumbers(result.pageNumbers);
              });
          }}
        />
      </div>
    </section>
  );
};

export default Filter;
