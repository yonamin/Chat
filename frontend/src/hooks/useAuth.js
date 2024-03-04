import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../slices/authSlice';

export default () => {
  const auth = useSelector(selectCurrentUser);
  // const loggedIn = auth?.user;
  // const logOut = () => {
  //     localStorage.removeItem('userId');

  // }
  return auth;
};
