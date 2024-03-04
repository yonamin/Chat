import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const MainPage = () => {
  const test = 'this is main page';
  return <div>{test}</div>;
};

const Redirect = () => {
  const auth = useAuth();
  return auth
    ? (<MainPage />)
    : (<Navigate to="/login" />);
};
export default Redirect;
