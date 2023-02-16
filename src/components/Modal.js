import React from 'react';
import { FaTimes } from 'react-icons/fa';
import './modal.css';
import { useGlobalContext } from './context';

const Modal = ({ method }) => {
  const { isModalOpen, closeModal, deletedId, text, isButtons } =
    useGlobalContext();
  return (
    <div className={isModalOpen ? 'modal-overlay show-modal' : 'modal-overlay'}>
      <div className="modal-container">
        <p>{text}</p>
        {isButtons && (
          <div className="btn-container">
            <button
              type="button"
              className="submit"
              onClick={() => {
                if (deletedId) {
                  method(deletedId);
                }
                method();
                closeModal();
              }}
            >
              {deletedId ? 'Удалить' : 'Очистить'}
            </button>
            <button type="button" className="decline" onClick={closeModal}>
              Отмена
            </button>
          </div>
        )}
        <button type="button" className="close-modal" onClick={closeModal}>
          <FaTimes />
        </button>
      </div>
    </div>
  );
};

export default Modal;
