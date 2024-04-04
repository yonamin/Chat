import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './LoginPage';
import SignUp from './SignUpPage';
import ErrorPage from './ErrorPage';
import MainPage from './MainPage';
import 'react-toastify/dist/ReactToastify.css';

const App = () => (
  <div className="h-100">
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
    <ToastContainer />
  </div>
);

export default App;
