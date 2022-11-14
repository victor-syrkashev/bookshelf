import React from 'react';
import { FaTimes } from 'react-icons/fa';
import './modal.css';
import { useGlobalContext } from './context';

const Modal = ({ removeBook }) => {
  const { isModalOpen, closeModal, deletedId } = useGlobalContext();

  return (
    <div className={isModalOpen ? 'modal-overlay show-modal' : 'modal-overlay'}>
      <div className="modal-container">
        <p>Вы уверены что хотите удалить книгу?</p>
        <button
          type="button"
          className="submit"
          onClick={() => {
            removeBook(deletedId);
            closeModal();
          }}
        >
          Удалить
        </button>
        <button type="button" className="decline" onClick={closeModal}>
          Отмена
        </button>
        <button type="button" className="close-modal" onClick={closeModal}>
          <FaTimes />
        </button>
      </div>
    </div>
  );
};

export default Modal;
