const express = require('express');
const booksList = require('./data');

const app = express();
const port = 8000;
const itemsPerPage = 12;
const sortedBooksList = booksList;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With, content-type'
  );
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// function sortByName(list) {
//   if (list.length <= 1) {
//     return list;
//   }

//   const pivot = list[list.length - 1];
//   const leftList = [];
//   const rightList = [];
//   for (let i = 0; i < list.length - 1; i++) {
//     if (list[i].title < pivot.title) {
//       leftList.push(list[i]);
//     } else {
//       rightList.push(list[i]);
//     }
//   }
//   return [...sortByName(leftList), pivot, ...sortByName(rightList)];
// }

function preparedBooksList(list) {
  const newBooksList = list.map((book) => {
    const modifiedBook = book;
    modifiedBook.title = modifiedBook.title.replace(/ё/gi, 'е');
    return modifiedBook;
  });
  return newBooksList;
}

// function sortListByName(list) {
//   const books = preparedBooksList(list);
//   return sortByName(books);
// }

function sortByName(list, direction) {
  const books = preparedBooksList(list);
  return books.sort((a, b) => {
    if (
      (a.title < b.title && direction === 'straight') ||
      (a.title > b.title && direction === 'reverse')
    ) {
      return -1;
    }
    if (
      (a.title < b.title && direction === 'reverse') ||
      (a.title > b.title && direction === 'straight')
    ) {
      return 1;
    }
    return 0;
  });
}

function getAuthors(list) {
  const allAuthors = list.map((book) => {
    return book.author;
  });
  const authorsObject = new Set(allAuthors);
  return [...authorsObject];
}

function getGenres(list) {
  const allGenres = list.map((book) => {
    return book.genres[0];
  });
  const genresObject = new Set(allGenres);
  return [...genresObject];
}

app.get('/', (req, res) => {
  const { sort } = req.query;
  const { author } = req.query;
  const { genre } = req.query;
  let pageIndex = Number(req.query.page);
  let booksSortByAuthor = [];
  let booksSortByGenre = [];
  let sortedBooks = [];

  if (author !== 'Все авторы') {
    booksSortByAuthor = booksList.filter((book) => book.author === author);
    pageIndex = 0;
  } else {
    booksSortByAuthor = sortedBooksList;
  }

  if (genre !== 'Все жанры') {
    booksSortByGenre = booksSortByAuthor.filter(
      (book) => book.genres[0] === genre
    );
    pageIndex = 0;
  } else {
    booksSortByGenre = booksSortByAuthor;
  }

  if (sort === 'name') {
    sortedBooks = sortByName(booksSortByGenre, 'straight');
  }
  if (sort === 'nameReverse') {
    sortedBooks = sortByName(booksSortByGenre, 'reverse');
  }
  if (sort === 'default') {
    sortedBooks = booksSortByGenre;
  }
  if (!pageIndex) {
    pageIndex = 0;
  }

  const authorsList = getAuthors(booksList);
  const genresList = getGenres(booksList);
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
    pageNumbers = Math.ceil(sortedBooksList.length / itemsPerPage);
  }
  res.json({
    pageIndex,
    booksData,
    pageNumbers,
    authorsList,
    genresList,
  });
});

app.listen(port, () => {
  console.log(`Bookshelf app listen on port ${port}`);
});
