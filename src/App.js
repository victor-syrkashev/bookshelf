import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SharedLayout from './pages/SharedLayout';
import Home from './pages/Home';
import AddBook from './pages/AddBook';
import SingleBook from './pages/SingleBook';
import Error from './pages/Error';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="add-book" element={<AddBook />} />
          <Route path=":bookId" element={<SingleBook />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
