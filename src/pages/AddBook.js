import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CreatableSelect from 'react-select/creatable';
import '../addBook.css';
import Modal from '../components/Modal';
import { useGlobalContext } from '../components/context';

const getLocalStorage = (type) => {
  const data = localStorage.getItem(type);
  if (data) {
    return JSON.parse(data);
  }
  return '';
};

const AddBook = () => {
  const { openCleanUpModal, openInformModal } = useGlobalContext();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(getLocalStorage('title'));
  const [genres, setGenres] = useState(getLocalStorage('genres'));
  const [ageRestriction, setAgeRestriction] = useState(
    getLocalStorage('ageRestriction')
  );
  const [image, setImage] = useState(getLocalStorage('image'));
  const [publisher, setPublisher] = useState(getLocalStorage('publisher'));
  const [author, setAuthor] = useState(getLocalStorage('author'));
  const [yearOfPublishing, setYearOfPublishing] = useState(
    getLocalStorage('yearOfPublishing')
  );
  const [pages, setPages] = useState(getLocalStorage('pages'));
  const [description, setDescription] = useState(
    getLocalStorage('description')
  );
  const [bookshelf, setBookshelf] = useState(getLocalStorage('bookshelf'));
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

  const refBookshelf = useRef(null);
  const refGenres = useRef(null);
  const refAgeRestriction = useRef(null);
  const refNewBtn = useRef(null);
  const refFinishedBtn = useRef(null);
  const refSubmit = useRef(null);
  const refAlertContainer = useRef(null);
  const refTitle = useRef(null);

  const location = useLocation();

  function createOptions(list) {
    return list.map((item) => {
      return { value: `${item}`, label: `${item}` };
    });
  }

  const optionsGenres = createOptions(genresList);

  function activateBookshelfBtn(data) {
    if (data === 'finished') {
      refBookshelf.current.classList.add('finished');
      refFinishedBtn.current.checked = true;
    }
    if (data !== bookshelf) {
      setBookshelf('finished');
    }
  }

  async function resetState() {
    setTitle('');
    setAgeRestriction('');
    setImage('');
    setPublisher('');
    setAuthor('');
    setYearOfPublishing('');
    setPages('');
    setDescription('');
    refGenres.current.clearValue();
    setBookshelf('new');
    refBookshelf.current.classList.remove('finished');
    refNewBtn.current.checked = true;
  }

  const removeAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg });
  };

  function activateAgeRestrictionBtn(btnIndex) {
    const arrayFromAgeRestriction = Array.from(
      refAgeRestriction.current.children
    );
    arrayFromAgeRestriction.forEach((el, index) => {
      if (el.innerHTML === btnIndex) {
        refAgeRestriction.current.children[index - 1].checked = true;
        setAgeRestriction(el.innerHTML);
      }
    });
  }

  const showAlert = (message = 'Форма очищена', type = 'success') => {
    setAlert({ show: true, msg: message, type });
    resetState();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    refAlertContainer.current.classList.add('show');
    setTimeout(() => {
      removeAlert();
      refAlertContainer.current.classList.remove('show');
    }, 5000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      fetch('http://localhost:8000/API/put-book', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      }).then((res) => {
        if (res.ok) {
          openInformModal();
          navigate(-1);
        }
      });
    } else {
      fetch('http://localhost:8000/API/post-new-book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      }).then((res) => {
        if (res.ok) {
          setId(new Date().getTime().toString());
          showAlert('Книга была успешно добавлена на полку', 'success');
        }
      });
    }
  };

  function createUseEffects(array) {
    for (const key in array) {
      useEffect(() => {
        isEditing || localStorage.setItem(`${key}`, JSON.stringify(array[key]));
      }, [array[key]]);
    }
  }

  const inputList = {
    title,
    author,
    publisher,
    pages,
    image,
    yearOfPublishing,
    description,
    genres,
    ageRestriction,
    bookshelf,
  };
  createUseEffects(inputList);

  useEffect(() => {
    if (location.state) {
      refTitle.current.innerHTML =
        '<h1>Редактировать книгу</h1><p>Внесите необходимые изменения и нажмите кнопку сохранить</p>';
      setIsEditing(true);
      const { book } = location.state;
      setAuthor(book.author);
      setTitle(book.title);
      setImage(book.image);
      setDescription(book.description);
      setPages(book.pages);
      setYearOfPublishing(book.yearOfPublishing);
      setPublisher(book.publisher);
      setId(book.id);

      activateBookshelfBtn(book.bookshelf);

      activateAgeRestrictionBtn(book.ageRestriction);

      const optionsEditing = createOptions(book.genres);
      refGenres.current.setValue(optionsEditing);
      setGenres(book.genres);

      refSubmit.current.innerHTML = 'Сохранить изменения';
    } else {
      activateBookshelfBtn(bookshelf);
      setId(new Date().getTime().toString());
      if (ageRestriction !== '') {
        activateAgeRestrictionBtn(ageRestriction);
      }
    }
    const textArea = document.querySelector('textarea');
    function changeHight(element) {
      textArea.style.height = '10rem';
      const scHeight = element.target.scrollHeight;
      textArea.style.height = `${scHeight}px`;
    }
    textArea.addEventListener('keyup', changeHight);
    fetch('http://localhost:8000/API/get-books-genres')
      .then((res) => res.json())
      .then((result) => {
        setGenresList(result);
      });
  }, []);

  return (
    <main>
      <section className="add-book-section">
        <div className="title" ref={refTitle}>
          <h1>Добавить книгу</h1>
          <p>Вы можете добавить книгу на книжную полку, заполнив форму ниже.</p>
        </div>
        <div className="form-container" ref={refBookshelf}>
          <div className="switch">
            <div className="alert-container" ref={refAlertContainer}>
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
                  onClick={() => {
                    refBookshelf.current.classList.remove('finished');
                    setBookshelf('new');
                  }}
                  defaultChecked="true"
                  ref={refNewBtn}
                />
                <label htmlFor="new" className="switch-label">
                  Новые книги
                </label>
                <input
                  type="radio"
                  name="switch"
                  id="finished"
                  className="switch-input"
                  onClick={() => {
                    refBookshelf.current.classList.add('finished');
                    setBookshelf('finished');
                  }}
                  ref={refFinishedBtn}
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
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  value={title}
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
                  onChange={(e) => {
                    setAuthor(e.target.value);
                  }}
                  value={author}
                />
              </div>
              <div className="image">
                <label htmlFor="image">Обложка: </label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  placeholder="https://img-gorod.ru/..."
                  onChange={(e) => {
                    setImage(e.target.value);
                  }}
                  value={image}
                />
                <p className="footnote">Приложите ссылку на изображение</p>
              </div>
              <div className="genre">
                <label htmlFor="genre">Жанр: </label>
                <div className="genre-container">
                  <CreatableSelect
                    isMulti
                    ref={refGenres}
                    options={optionsGenres}
                    onChange={(e) => {
                      setGenres(e.map((item) => item.label));
                    }}
                    defaultValue={() => {
                      return genres && createOptions(genres);
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
                  onChange={(e) => {
                    setPublisher(e.target.value);
                  }}
                  value={publisher}
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
                    onChange={(e) => {
                      setPages(e.target.value);
                    }}
                    value={pages}
                  />
                </div>
                <div className="yearOfPublishing">
                  <label htmlFor="title">Год издания: </label>
                  <input
                    type="number"
                    id="yearOfPublishing"
                    name="yearOfPublishing"
                    min={0}
                    max={2100}
                    step={1}
                    onChange={(e) => {
                      setYearOfPublishing(e.target.value);
                    }}
                    value={yearOfPublishing}
                  />
                </div>
                <div className="ageRestriction">
                  <p>Возрастное ограничение:</p>
                  <div
                    className="ageRestriction-container"
                    ref={refAgeRestriction}
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
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  value={description}
                />
              </div>
              <button type="submit" className="submit-btn" ref={refSubmit}>
                Положить на полку
              </button>
              <button
                type="reset"
                className="reset-btn"
                onClick={() => {
                  openCleanUpModal();
                }}
              >
                Очистить форму
              </button>
            </div>
          </form>
        </div>
      </section>
      <Modal method={showAlert} />
    </main>
  );
};

export default AddBook;
