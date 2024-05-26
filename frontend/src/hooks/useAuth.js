import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';
import { selectCurrentUser, setCredentials } from '../slices/authSlice';

export default () => {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const [isLogged, setIsLogged] = useState();
  const checkLogin = () => {
    const checkToken = () => {
      axios.get('/api/v1/channels', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }).then(() => {
        setIsLogged(true);
      }).catch(() => {
        setIsLogged(false);
      });
    };
    if (!user.token) {
      setIsLogged(false);
    } else {
      checkToken();
    }
    return isLogged;
  };

  const logIn = (username, token) => {
    localStorage.setItem('username', username);
    localStorage.setItem('token', token);
    dispatch(setCredentials({ username, token }));
  };

  const logOut = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    dispatch(setCredentials({ username: null, token: null }));
  };

  return {
    user,
    checkLogin,
    logIn,
    logOut,
  };
};
