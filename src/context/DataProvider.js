import React, { createContext } from 'react';
import useData from '../hooks/useData';

export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const DataProviderContext = useData();
  return <DataContext.Provider value={DataProviderContext}>{children}</DataContext.Provider>;
};

export default DataProvider;
