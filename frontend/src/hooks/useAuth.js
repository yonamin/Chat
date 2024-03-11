import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../services/authSlice';

export default () => {
  const auth = useSelector(selectCurrentUser);
  // const loggedIn = auth?.user;
  // const logOut = () => {
  //     localStorage.removeItem('userId');

  // }
  // console.log(auth);
  return auth;
};
