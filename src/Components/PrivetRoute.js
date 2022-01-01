import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import WaitingSpinner from './WaitingSpinner/WaitingSpinner';

const PrivetRoute = ({ children }) => {
  const { userData, isLoading } = useAuth();
  if (isLoading) return <WaitingSpinner loadingDependency={isLoading} />;
  return userData?.email ? children : <Navigate to="/login" />;
};

export default PrivetRoute;
