import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useFormik } from 'formik';

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth';
import routes from '../routes';

const Login = () => {
  const inputRef = useRef();
  const { t } = useTranslation();
  const [authFailed, setAuthFailed] = useState(false);
  const navigate = useNavigate();
  const { logIn } = useAuth();
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
        const { data: { username, token } } = res;
        logIn(username, token);
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
    <Container fluid="sm" className="justify-content-center d-flex pt-5">
      <Card
        bg="light"
        style={{ width: '30rem' }}
      >
        <Card.Header as="h2" className="text-center">
          ChatKit
        </Card.Header>
        <Card.Body className="m-3">
          <Form onSubmit={formikObj.handleSubmit} className="d-flex flex-column justify-content-center mt-2">
            <Form.Group className="mb-4">
              <FloatingLabel
                htmlFor="username"
                label={t('loginPage.username')}
              >
                <Form.Control
                  name="username"
                  id="username"
                  placeholder={t('loginPage.username')}
                  onChange={formikObj.handleChange}
                  value={formikObj.values.username}
                  ref={inputRef}
                  isInvalid={authFailed}
                  required
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-4">
              <FloatingLabel
                htmlFor="password"
                label={t('loginPage.password')}
              >
                <Form.Control
                  name="password"
                  id="password"
                  type="password"
                  placeholder={t('loginPage.password')}
                  onChange={formikObj.handleChange}
                  value={formikObj.values.password}
                  isInvalid={authFailed}
                  required
                />
                <Form.Control.Feedback type="invalid">{t('loginPage.invalidFeedback')}</Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
            <Button variant="outline-dark" type="submit">
              {t('loginPage.logIn')}
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer className="text-center p-3">Регистрация</Card.Footer>
      </Card>
    </Container>
  );
};
export default Login;
