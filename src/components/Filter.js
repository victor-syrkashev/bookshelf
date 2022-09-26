import React from 'react';

const Filter = () => {
  return (
    <section className="filter">
      <div className="filter-container">
        <p>Сортировать по:</p>
        <div className="filter-btn-container">
          <button type="button" className="filter-btn">
            Умолчанию
          </button>
          <button type="button" className="filter-btn">
            Алфавиту
          </button>
          <button type="button" className="filter-btn">
            Авторам
          </button>
          <button type="button" className="filter-btn">
            Жанрам
          </button>
          <button type="button" className="filter-btn">
            Новые/Прочитанные
          </button>
        </div>
      </div>
    </section>
  );
};

export default Filter;
