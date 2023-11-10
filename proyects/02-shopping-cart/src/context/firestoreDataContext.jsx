import { createContext, useContext, useState } from 'react';

const FirestoreDataContext = createContext();

export const FirestoreDataProvider = ({ children }) => {
  const [firestoreData, setFirestoreData] = useState([]);

  return (
    <FirestoreDataContext.Provider value={{ firestoreData, setFirestoreData }}>
      {children}
    </FirestoreDataContext.Provider>
  );
};

export const useFirestoreData = () => {
  return useContext(FirestoreDataContext);
};
