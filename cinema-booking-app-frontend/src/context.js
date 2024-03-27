import React, { useState, useContext } from 'react';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [authModalShow, setAuthModalShow] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AppContext.Provider
      value={{
        authModalShow,
        setAuthModalShow,
        setIsAuthenticated,
        isAuthenticated,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
