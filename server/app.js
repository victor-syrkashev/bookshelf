const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const booksJson = fs.readFileSync(
  path.resolve(__dirname, '../db/data.json'),
  'utf8'
);

let booksList = JSON.parse(booksJson);
const port = 8000;
const itemsPerPage = 12;

app.use(express.json());

app.use(express.static(path.resolve(__dirname, '../build')));
app.use(express.static(path.resolve(__dirname, '../build/static')));

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

app.get('/API/get-books', (req, res) => {
  const { sort } = req.query;
  const { author } = req.query;
  const { genre } = req.query;
  const { bookshelf } = req.query;
  let pageIndex = Number(req.query.page);
  let filteredBooks = [];
  let sortedBooks = [];
  filteredBooks = booksList
    .filter((book) => !author || book.author === author)
    .filter((book) => !genre || book.genres[0] === genre)
    .filter((book) => !bookshelf || book.bookshelf === bookshelf);

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
    default:
      sortedBooks = filteredBooks;
  }
  if (!pageIndex) {
    pageIndex = 1;
  }

  const authorsList = getListByParam(booksList, 'author');
  const genresList = getListByParam(booksList, 'genres', 0);
  let numberOfPages = 0;
  let booksData = [];
  if (sortedBooks.length <= itemsPerPage) {
    booksData = sortedBooks;
    pageIndex = 1;
    numberOfPages = 0;
  } else {
    booksData = sortedBooks.slice(
      (pageIndex - 1) * itemsPerPage,
      pageIndex * itemsPerPage
    );
    numberOfPages = Math.ceil(booksList.length / itemsPerPage);
  }
  res.json({
    pageIndex,
    booksData,
    numberOfPages,
    authorsList,
    genresList,
  });
});

app.get('/API/get-books-genres', (req, res) => {
  const allGenresList = getListByParam(booksList, 'genres');
  res.json(allGenresList);
});

app.post('/API/post-new-book', (req, res) => {
  const newBook = req.body;
  booksList.push(newBook);
  fs.writeFileSync('./db/data.json', JSON.stringify(booksList));
  res.status(200).send();
});

app.put('/API/put-book', (req, res) => {
  const editBook = req.body;
  booksList.forEach((el, index) => {
    if (el.id === editBook.id) {
      booksList[index] = editBook;
    }
  });
  fs.writeFileSync('./db/data.json', JSON.stringify(booksList));
  res.status(200).send();
});

app.get('/API/get-book/:id', (req, res) => {
  const { id } = req.params;
  const bookData = booksList.filter((book) => book.id === id);
  if (bookData.length) {
    res.json(bookData[0]);
  } else {
    res.status(404).send();
  }
});

app.delete('/API/delete-book/:id', (req, res) => {
  const idToDelete = req.params.id;
  const newBooksList = booksList.filter((book) => book.id !== idToDelete);
  fs.writeFileSync('./db/data.json', JSON.stringify(newBooksList));
  booksList = newBooksList;
  res.end();
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build/index.html'));
});

app.listen(port, () => {
  console.log(`Bookshelf app listen on port ${port}`);
});
