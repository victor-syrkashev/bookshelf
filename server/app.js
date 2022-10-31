const express = require('express');
const fs = require('fs');

const app = express();
const booksJson = fs.readFileSync('data.json', 'utf8');
const booksList = JSON.parse(booksJson);
const port = 8000;
const itemsPerPage = 12;

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Methods', 'DELETE');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With, content-type'
  );
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

function reverseArray(array) {
  const newArray = [];
  array.map((items, index) => {
    newArray[array.length - 1 - index] = items;
    return 0;
  });
  return newArray;
}

function getListByParam(list, param, index) {
  const listByParam = [];

  list.forEach((obj) => {
    if (Array.isArray(obj[param])) {
      index || index === 0
        ? listByParam.push(obj[param][index])
        : listByParam.push(...obj[param]);
    } else {
      listByParam.push(obj[param]);
    }
  });
  const uniqueValues = new Set(listByParam);
  return [...uniqueValues];
}

app.get('/', (req, res) => {
  const { sort } = req.query;
  const { author } = req.query;
  const { genre } = req.query;
  let pageIndex = Number(req.query.page);
  let filteredBooks = [];
  let sortedBooks = [];

  filteredBooks = booksList
    .filter((book) => !author || book.author === author)
    .filter((book) => !genre || book.genres[0] === genre);

  const collator = new Intl.Collator('ru', {
    sensitivity: 'accent',
  });
  switch (sort) {
    case 'name-asc':
      sortedBooks = filteredBooks.sort((a, b) => {
        return collator.compare(a.title, b.title);
      });
      break;
    case 'name-desc':
      sortedBooks = reverseArray(
        filteredBooks.sort((a, b) => {
          return collator.compare(a.title, b.title);
        })
      );
      break;
    case 'add-asc':
      sortedBooks = reverseArray(filteredBooks);
      break;
    case 'finished':
      sortedBooks = filteredBooks.filter(
        (book) => book.bookshelf === 'finished'
      );
      pageIndex = 0;
      break;
    case 'new':
      sortedBooks = filteredBooks.filter((book) => book.bookshelf === 'new');
      pageIndex = 0;
      break;
    default:
      sortedBooks = filteredBooks;
  }
  if (!pageIndex) {
    pageIndex = 0;
  }

  const authorsList = getListByParam(booksList, 'author');
  const genresList = getListByParam(booksList, 'genres', 0);
  let pageNumbers = 0;
  let booksData = [];
  if (sortedBooks.length <= itemsPerPage) {
    booksData = sortedBooks;
    pageIndex = 0;
    pageNumbers = 0;
  } else {
    booksData = sortedBooks.slice(
      pageIndex * itemsPerPage,
      (pageIndex + 1) * itemsPerPage
    );
    pageNumbers = Math.ceil(booksList.length / itemsPerPage);
  }
  res.json({
    pageIndex,
    booksData,
    pageNumbers,
    authorsList,
    genresList,
  });
});

app.get('/add-book', (req, res) => {
  const allGenresList = getListByParam(booksList, 'genres');
  res.json(allGenresList);
});

app.post('/add-book', (req, res) => {
  const newBook = req.body;
  booksList.push(newBook);
  fs.writeFileSync('data.json', JSON.stringify(booksList));
  res.json({
    answer: 'Книга была успешно добавлена на полку',
  });
});

app.delete('/delete-book/:id', (req, res) => {
  const idToDelete = req.params.id;
  const newBooksList = booksList.filter((book) => book.id !== idToDelete);
  fs.writeFileSync('data.json', JSON.stringify(newBooksList));
  res.end();
});

app.listen(port, () => {
  console.log(`Bookshelf app listen on port ${port}`);
});
