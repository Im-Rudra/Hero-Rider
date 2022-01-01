import { useContext } from 'react';
import { DataContext } from '../context/DataProvider';

const useUserData = () => useContext(DataContext);

export default useUserData;
