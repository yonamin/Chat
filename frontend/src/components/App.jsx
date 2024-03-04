import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './LoginPage';
import ErrorPage from './ErrorPage';
import MainPage from './MainPage';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="*" element={<ErrorPage />} />
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
);

export default App;
