import React, { useEffect } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const Pagination = ({
  setBooksData,
  setPageNumbers,
  setActiveButtonId,
  activeButtonId,
  pageNumbers,
  filter,
  urlWithSearchParams,
}) => {
  const addActiveBtn = (index) => {
    if (index !== activeButtonId) {
      const paginationBtns = document.querySelectorAll('.pagination-btn');
      paginationBtns.forEach((button) => {
        if (button.id === `page-${index}`) {
          button.classList.add('active-btn');
        } else {
          button.classList.remove('active-btn');
        }
      });
    }
  };

  const prevAndNextBtnsCheck = (index) => {
    const previousBtn = document.querySelector('.previous-btn');
    const nextBtn = document.querySelector('.next-btn');
    if (index === 0) {
      previousBtn.disabled = true;
    } else {
      previousBtn.disabled = false;
    }
    if (index === pageNumbers - 1) {
      nextBtn.disabled = true;
    } else {
      nextBtn.disabled = false;
    }
  };

  const pagination = (index) => {
    if (index >= 0 && index < pageNumbers) {
      addActiveBtn(index);
      prevAndNextBtnsCheck(index);
      const url = urlWithSearchParams(filter, index);
      fetch(url)
        .then((res) => res.json())
        .then((result) => {
          setBooksData(result.booksData);
          setPageNumbers(result.pageNumbers);
          setActiveButtonId(result.pageIndex);
          window.scroll(0, 0);
        });
    }
  };

  const paginationIndex = () => {
    const indexArray = [];
    for (let i = 0; i < pageNumbers; i++) {
      indexArray.push(i);
    }
    return indexArray;
  };

  useEffect(() => {
    prevAndNextBtnsCheck(activeButtonId);
  }, []);

  if (pageNumbers > 1) {
    return (
      <div className="pagination">
        <button
          type="button"
          className="previous-btn"
          onClick={() => pagination(activeButtonId - 1)}
        >
          <FaAngleLeft />
        </button>
        {paginationIndex().map((index) => {
          if (index === 0) {
            return (
              <button
                type="button"
                id={`page-${index}`}
                key={index}
                className="active-btn pagination-btn"
                onClick={() => pagination(index)}
              >
                {index + 1}
              </button>
            );
          }
          return (
            <button
              type="button"
              id={`page-${index}`}
              key={index}
              className="pagination-btn"
              onClick={() => pagination(index)}
            >
              {index + 1}
            </button>
          );
        })}
        <button
          type="button"
          className="next-btn"
          onClick={() => pagination(activeButtonId + 1)}
        >
          <FaAngleRight />
        </button>
      </div>
    );
  }
};

export default Pagination;
