import React, { useState, useRef, useEffect } from 'react';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './gallery.css';

const Gallery = ({ gallery, isGalleryOpen, closeGallery }) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [index, setIndex] = useState(0);
  const refPreviewContainer = useRef(null);
  const refImg = useRef(null);

  const nextImage = () => {
    setIsDisabled(!isDisabled);
    if (index < gallery.length - 1) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  };

  const previousImage = () => {
    if (index > 0) {
      setIndex(index - 1);
    } else {
      setIndex(gallery.length - 1);
    }
  };

  function openImage(i) {
    const btnArray = [...refPreviewContainer.current.children];
    btnArray.forEach((img) => {
      if (img.classList.contains(`image${i}`)) {
        img.classList.add('active-preview');
      } else {
        img.classList.remove('active-preview');
      }
    });
  }

  const functionalityKeys = (e) => {
    if (e.code === 'ArrowLeft') {
      previousImage();
    }
    if (e.code === 'ArrowRight') {
      nextImage();
    }
    if (e.code === 'Escape') {
      closeGallery();
    }
  };

  useEffect(() => {
    openImage(0);
  }, []);

  useEffect(() => {
    openImage(index);
  }, [index]);

  useEffect(() => {
    refImg.current.focus();
  }, [isGalleryOpen]);

  return (
    <div
      className={isGalleryOpen ? 'gallery show-gallery' : 'gallery'}
      tabIndex={-1}
      onKeyDown={functionalityKeys}
      ref={refImg}
    >
      <div className="gallery-container">
        <div className="main">
          <button
            type="button"
            className="gallery-previous-btn"
            onClick={previousImage}
          >
            <FaChevronLeft />
          </button>
          <img src={gallery[index]} alt="" />
          <button
            type="button"
            className="gallery-next-btn"
            onClick={nextImage}
          >
            <FaChevronRight />
          </button>
          <button
            type="button"
            className="close-gallery-btn"
            onClick={closeGallery}
          >
            <FaTimes />
          </button>
        </div>
        <div className="preview" ref={refPreviewContainer}>
          {gallery.map((image, i) => {
            return (
              <button
                type="button"
                key={i}
                className={`image${i}`}
                onClick={() => {
                  setIndex(i);
                  openImage(i);
                }}
              >
                <img src={image} alt={`${i + 1}`} />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
