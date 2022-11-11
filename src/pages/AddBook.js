import React, { useState, useEffect, useRef } from 'react';
import CreatableSelect from 'react-select/creatable';
import '../addBook.css';

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [publisher, setPublisher] = useState('');
  const [author, setAuthor] = useState('');
  const [genres, setGenres] = useState([]);
  const [yearOfPublishing, setYearOfPublishing] = useState('');
  const [pages, setPages] = useState('');
  const [ageRestriction, setAgeRestriction] = useState('');
  const [description, setDescription] = useState('');
  const [bookshelf, setBookshelf] = useState('new');
  const [genresList, setGenresList] = useState([]);
  const [id, setId] = useState('');
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });
  const formData = {
    title,
    image,
    publisher,
    author,
    yearOfPublishing,
    pages,
    ageRestriction,
    description,
    genres,
    id,
    bookshelf,
  };
  const refContainer = useRef(null);

  function createOptions(list) {
    return list.map((item) => {
      return { value: `${item}`, label: `${item}` };
    });
  }

  const optionsGenres = createOptions(genresList);

  function resetState() {
    setTitle('');
    setImage('');
    setPublisher('');
    setAuthor('');
    setYearOfPublishing('');
    setPages('');
    setAgeRestriction('');
    setDescription('');
  }

  const removeAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    refContainer.current.clearValue();
    fetch('http://localhost:8000/add-book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((result) => {
        setAlert({ show: true, msg: result.answer, type: 'success' });
        setId(new Date().getTime().toString());
        resetState();
        window.scroll(0, 0);
        const alertContainer = document.querySelector('.alert-container');
        alertContainer.classList.add('show');
        setTimeout(() => {
          removeAlert();
          alertContainer.classList.remove('show');
        }, 6000);
      });
  };

  const newBookshelf = () => {
    const formContainer = document.querySelector('.form-container');
    formContainer.classList.remove('finished');
  };

  const finishedBookshelf = () => {
    const formContainer = document.querySelector('.form-container');
    formContainer.classList.add('finished');
  };

  useEffect(() => {
    setId(new Date().getTime().toString());
    const textArea = document.querySelector('textarea');
    function changeHight(element) {
      textArea.style.height = '10rem';
      const scHeight = element.target.scrollHeight;
      textArea.style.height = `${scHeight}px`;
    }
    textArea.addEventListener('keyup', changeHight);
    fetch('http://localhost:8000/add-book')
      .then((res) => res.json())
      .then((result) => {
        setGenresList(result);
      });
  }, []);

  return (
    <main>
      <section className="add-book-section">
        <div className="title">
          <h1>Добавить книгу</h1>
          <p>
            Вы можете добавить книгу в свою книжную полку, заполнив форму ниже.
          </p>
        </div>
        <div className="form-container">
          <div className="switch">
            <div className="alert-container">
              {alert.show && (
                <p className={`alert alert-${alert.type}`}>{alert.msg}</p>
              )}
            </div>
            <p className="switch-title">На какую полку добавить книгу? </p>
            <div className="switch-container">
              <div className="switch-btn">
                <input
                  type="radio"
                  name="switch"
                  id="new"
                  className="switch-input"
                  onClick={newBookshelf}
                  defaultChecked="true"
                  onChange={() => setBookshelf('new')}
                />
                <label htmlFor="new" className="switch-label">
                  Новые книги
                </label>
                <input
                  type="radio"
                  name="switch"
                  id="finished"
                  className="switch-input"
                  onClick={finishedBookshelf}
                  onChange={() => setBookshelf('finished')}
                />
                <label htmlFor="finished" className="switch-label">
                  Прочитанные книги
                </label>
              </div>
            </div>
          </div>
          <form className="add-book-form" onSubmit={handleSubmit}>
            <div className="form-fields-container">
              <div className="book-title">
                <label htmlFor="book-title">Название: </label>
                <input
                  type="text"
                  id="book-title"
                  name="book-title"
                  placeholder="Руслан и Людмила"
                  required
                  onChange={(e) => setTitle(e.target.value)}
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
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </div>
              <div className="image">
                <label htmlFor="image">Обложка: </label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  placeholder="https://img-gorod.ru/..."
                  onChange={(e) => setImage(e.target.value)}
                />
                <p className="footnote">Приложите ссылку на изображение</p>
              </div>
              <div className="genre">
                <label htmlFor="genre">Жанр: </label>
                <div className="genre-container">
                  <CreatableSelect
                    isMulti
                    ref={refContainer}
                    options={optionsGenres}
                    onChange={(e) => {
                      setGenres(e.map((item) => item.label));
                    }}
                  />
                </div>
                <p className="footnote">
                  Выберите жанры книги из предложенных или напишите свои
                </p>
              </div>
              <div className="publisher">
                <label htmlFor="title">Издательство: </label>
                <input
                  type="text"
                  id="publisher"
                  name="publisher"
                  onChange={(e) => setPublisher(e.target.value)}
                />
              </div>
              <div className="pages-year-age-container">
                <div className="pages">
                  <label htmlFor="pages">Кол-во страниц: </label>
                  <input
                    type="number"
                    id="pages"
                    name="pages"
                    min={0}
                    max={3604}
                    step={1}
                    onChange={(e) => setPages(e.target.value)}
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
                    onChange={(e) => setYearOfPublishing(e.target.value)}
                  />
                </div>
                <div className="ageRestriction">
                  <p>Возрастное ограничение:</p>
                  <div
                    className="ageRestriction-container"
                    onChange={(e) => {
                      setAgeRestriction(e.target.labels[0].innerHTML);
                    }}
                  >
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
              </div>
              <div className="description">
                <label htmlFor="description">Аннотация: </label>
                <textarea
                  name="description"
                  id="description"
                  spellCheck="false"
                  placeholder="Аннотация к книге..."
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <button type="submit" className="submit-btn">
                Положить на полку
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default AddBook;
