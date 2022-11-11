import React, { useState, useContext } from 'react';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletedId, setDeletedId] = useState();

  function openModal(id) {
    setIsModalOpen(true);
    setDeletedId(id);
  }
  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <AppContext.Provider
      value={{ isModalOpen, deletedId, closeModal, openModal }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
