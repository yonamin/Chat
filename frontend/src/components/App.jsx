import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './LoginPage';
import SignUp from './SignUpPage';
import ErrorPage from './ErrorPage';
import MainPage from './MainPage';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="*" element={<ErrorPage />} />
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  </BrowserRouter>
);

export default App;
