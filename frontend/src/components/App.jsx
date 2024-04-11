import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './LoginPage';
import SignUp from './SignUpPage';
import ErrorPage from './ErrorPage';
import MainPage from './MainPage';
import PrivateRoute from './PrivateRoute';
import 'react-toastify/dist/ReactToastify.css';
import routes from '../routes';

const App = () => {
  const { pagesPaths } = routes;
  return (
    <div className="h-100">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<ErrorPage />} />
          <Route
            path={pagesPaths.mainPage()}
            element={(
              <PrivateRoute>
                <MainPage />
              </PrivateRoute>
            )}
          />
          <Route path={pagesPaths.loginPage()} element={<Login />} />
          <Route path={pagesPaths.signupPage()} element={<SignUp />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
};

export default App;
