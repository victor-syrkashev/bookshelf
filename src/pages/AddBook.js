import React, { useEffect } from 'react';
import '../addBook.css';

const AddBook = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const textArea = document.querySelector('textarea');
    textArea.addEventListener('keyup', (e) => {
      textArea.style.height = '2rem';
      const scHeight = e.target.scrollHeight;
      textArea.style.height = `${scHeight}px`;
    });
  }, []);

  const changeBookshelf = () => {
    const form = document.querySelector('.add-book-form');
    const bookshelfType = document.querySelector('.bookshelf-type');
    const switchBtn = document.querySelector('.switch-input');
    form.classList.toggle('finished');
    if (switchBtn.checked) {
      bookshelfType.innerHTML = 'Прочитанные книги';
    } else {
      bookshelfType.innerHTML = 'Новые книги';
    }
  };

  return (
    <main>
      <section className="add-book section">
        <div className="title">
          <h1>Добавить книгу</h1>
          <p>
            Вы можете добавить книгу в свою книжную полку, заполнив форму ниже.
          </p>
        </div>
        <form className="add-book-form" onSubmit={handleSubmit}>
          <div className="form-container">
            <div className="switch">
              <p className="switch-title">На какую полку добавить книгу: </p>
              <div className="switch-container">
                <div className="switch-btn">
                  <input
                    type="checkbox"
                    name="switch"
                    id="new"
                    className="switch-input"
                    onChange={changeBookshelf}
                  />
                  <label htmlFor="new" className="switch-label" />
                </div>
                <p className="bookshelf-type">Новые книги</p>
              </div>
            </div>
            <div className="book-title">
              <label htmlFor="book-title">Название: </label>
              <input
                type="text"
                id="book-title"
                name="book-title"
                placeholder="Руслан и Людмила"
                required
              />
            </div>
            <div className="author">
              <label htmlFor="author">Автор: </label>
              <input
                type="text"
                id="author"
                name="author"
                placeholder="Пушкин А.С."
                required
              />
            </div>
            <div className="image">
              <label htmlFor="image">Обложка: </label>
              <div className="image-container">
                <input
                  type="url"
                  id="image"
                  name="image"
                  placeholder="https://img-gorod.ru/..."
                />
                <p className="footnote">Приложите ссылку на изображение</p>
              </div>
            </div>
            <div className="genre">
              <label htmlFor="genre">Жанр: </label>
              <div className="genre-container">
                <select name="genre" id="genre">
                  <option value="поэма">Поэма</option>
                  <option value="ужасы">Ужасы</option>
                  <option value="мистика">Мистика</option>
                  <option value="триллер">Триллер</option>
                  <option value="исторический">Исторический</option>
                  <option value="роман">Роман</option>
                  <option value="вестерн">Вестерн</option>
                  <option value="фэнтези">Фэнтези</option>
                  <option value="own-version">Свой вариант</option>
                </select>
                <input type="text" id="genre" className="own-version" />
                <p className="footnote">
                  Выберите жанр книги из предложенных. Если не нашли подходящий,
                  то выберите и напишите свой вариант.
                </p>
              </div>
            </div>
            <div className="publisher">
              <label htmlFor="title">Издательство: </label>
              <input type="text" id="publisher" name="publisher" />
            </div>
            <div className="pages-yearOfWriting-container">
              <div className="pages">
                <label htmlFor="pages">Количество страниц: </label>
                <input
                  type="number"
                  id="pages"
                  name="pages"
                  min={0}
                  max={3604}
                  step={1}
                />
              </div>
              <div className="yearOfWriting">
                <label htmlFor="title">Год издания: </label>
                <input
                  type="number"
                  id="yearOfWriting"
                  name="yearOfWriting"
                  min={1000}
                  max={2100}
                  step={1}
                />
              </div>
            </div>
            <div className="ageRestriction">
              <p>Выберите возрастное ограничение:</p>
              <div className="ageRestriction-container">
                <input type="radio" name="ageRestriction" id="zero" />
                <label htmlFor="zero" className="age-label first">
                  0+
                </label>
                <input type="radio" name="ageRestriction" id="six" />
                <label htmlFor="six" className="age-label">
                  6+
                </label>
                <input type="radio" name="ageRestriction" id="twelve" />
                <label htmlFor="twelve" className="age-label">
                  12+
                </label>
                <input type="radio" name="ageRestriction" id="sixteen" />
                <label htmlFor="sixteen" className="age-label">
                  16+
                </label>
                <input type="radio" name="ageRestriction" id="eighteen" />
                <label htmlFor="eighteen" className="age-label last">
                  18+
                </label>
              </div>
            </div>
            <div className="description">
              <label htmlFor="description">Аннотация: </label>
              <textarea
                name="description"
                id="description"
                spellCheck="false"
                placeholder="Аннотация к книге..."
              />
            </div>
            <button type="submit" className="submit-btn">
              Положить на полку
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default AddBook;
