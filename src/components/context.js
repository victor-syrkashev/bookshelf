import React, { useState, useContext } from 'react';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletedId, setDeletedId] = useState();
  const [isButtons, setIsButtons] = useState(true);
  const [text, setText] = useState('');

  function openRemoveModal(id) {
    setIsModalOpen(true);
    setDeletedId(id);
    setText('Вы уверены что хотите удалить книгу?');
  }
  function openCleanUpModal() {
    setIsModalOpen(true);
    setText('Вы уверены что хотите очистить форму?');
  }
  function closeModal() {
    setIsModalOpen(false);
    setDeletedId(undefined);
    setText('');
    setIsButtons(true);
  }
  function openInformModal() {
    setIsModalOpen(true);
    setIsButtons(false);
    setText('Изменения успешно сохранены');
    setTimeout(() => {
      closeModal();
    }, 3000);
  }

  return (
    <AppContext.Provider
      value={{
        isModalOpen,
        deletedId,
        isButtons,
        text,
        closeModal,
        openRemoveModal,
        openCleanUpModal,
        openInformModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
