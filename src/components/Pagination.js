import React, { useEffect } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const Pagination = ({
  setBooksData,
  setNumberOfPages,
  setActiveButtonId,
  activeButtonId,
  numberOfPages,
  filter,
  urlWithSearchParams,
}) => {
  const addActiveBtn = (index) => {
    const paginationBtns = document.querySelectorAll('.pagination-btn');
    paginationBtns.forEach((button) => {
      if (button.id === `page-${index}`) {
        button.classList.add('active-btn');
      } else {
        button.classList.remove('active-btn');
      }
    });
  };

  const prevAndNextBtnsCheck = (index) => {
    const previousBtn = document.querySelector('.previous-btn');
    const nextBtn = document.querySelector('.next-btn');
    if (index === 1) {
      previousBtn.disabled = true;
    } else {
      previousBtn.disabled = false;
    }
    if (index === numberOfPages) {
      nextBtn.disabled = true;
    } else {
      nextBtn.disabled = false;
    }
  };

  const pagination = (index) => {
    if (index > 0 && index <= numberOfPages) {
      index !== activeButtonId ? addActiveBtn(index) : false;
      prevAndNextBtnsCheck(index);
      const url = urlWithSearchParams(filter, index);
      fetch(url)
        .then((res) => res.json())
        .then((result) => {
          setBooksData(result.booksData);
          setNumberOfPages(result.numberOfPages);
          setActiveButtonId(result.pageIndex);
          window.scroll(0, 0);
        });
    }
  };

  const paginationIndex = () => {
    const indexArray = [];
    for (let i = 0; i < numberOfPages; i++) {
      indexArray.push(i);
    }
    return indexArray;
  };

  useEffect(() => {
    addActiveBtn(activeButtonId);
    prevAndNextBtnsCheck(activeButtonId);
  }, []);

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
        const pageIndex = index + 1;
        return (
          <button
            type="button"
            id={`page-${pageIndex}`}
            key={index}
            className="pagination-btn"
            onClick={() => pagination(pageIndex)}
          >
            {pageIndex}
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
};

export default Pagination;
