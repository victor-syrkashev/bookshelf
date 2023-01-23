import React from 'react';
import '../error.css';

const Error = () => {
  return (
    <div className="error-container">
      <div className="text-block">
        <h1 className="error-header">404</h1>
        <p className="error-text">
          Что-то пошло не так, такой страницы не существует...
        </p>
      </div>
    </div>
  );
};

export default Error;
