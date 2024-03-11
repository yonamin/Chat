import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useFormik } from 'formik';

import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setCredentials } from '../services/authSlice';
import routes from '../routes';

const Login = () => {
  const inputRef = useRef();
  const [authFailed, setAuthFailed] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formikObj = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        const res = await axios.post(routes.loginPath(), values);
        const { data } = res;
        localStorage.setItem('user', data.username);
        localStorage.setItem('token', data.token);
        dispatch(setCredentials({ user: values.username, token: data.token }));
        navigate('/');
      } catch (err) {
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });

  return (
    <Container className="justify-content-center" fluid="sm">
      <Card border="primary" className="justify-content-center w-50 mx-auto">
        <Card.Header className="text-center">Вход</Card.Header>
        <Card.Body>
          <Form onSubmit={formikObj.handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="username">Ваш ник</Form.Label>
              <Form.Control
                name="username"
                id="username"
                placeholder="Ваш ник"
                onChange={formikObj.handleChange}
                value={formikObj.values.username}
                ref={inputRef}
                isInvalid={authFailed}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="password">Пароль</Form.Label>
              <Form.Control
                name="password"
                id="password"
                type="password"
                placeholder="Пароль"
                onChange={formikObj.handleChange}
                value={formikObj.values.password}
                isInvalid={authFailed}
                required
              />
              <Form.Control.Feedback type="invalid">Неверный логин или пароль (x.x)</Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">
              Войти
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};
export default Login;
