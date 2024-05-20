import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import routes from '../../routes';
import MainSpinner from '../Spinner';

const PrivateRoute = ({ children }) => {
  const { pagesPaths } = routes;
  const { checkLogin } = useAuth();
  const [isLogged, setIsLogged] = useState();
  useEffect(() => {
    const check = async () => {
      const res = await checkLogin();
      setIsLogged(res);
    };
    check();
  }, [checkLogin]);
  if (isLogged === false) {
    return <Navigate to={pagesPaths.loginPage()} />;
  }
  if (isLogged === true) {
    return children;
  }
  return <MainSpinner />;
};

export default PrivateRoute;
