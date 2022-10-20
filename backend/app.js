const express = require('express');
const booksList = require('./data');

const app = express();
const port = 8000;
const itemsPerPage = 12;
const pageNumbers = Math.ceil(booksList.length / itemsPerPage);

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

app.get('/', (req, res) => {
  const pageIndex = Number(req.query.page);
  const booksData = booksList.slice(
    pageIndex * itemsPerPage,
    (pageIndex + 1) * itemsPerPage
  );
  res.json({
    pageIndex,
    booksData,
    pageNumbers,
  });
});

app.listen(port, () => {
  console.log(`Bookshelf app listen on port ${port}`);
});
