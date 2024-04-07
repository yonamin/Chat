import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useFormik } from 'formik';

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth';
import { login } from '../services/usersApi';
// import routes from '../routes';
import MainNavbar from './MainNavbar';

const Login = () => {
  const inputRef = useRef();
  const { t } = useTranslation();
  const [authFailed, setAuthFailed] = useState(false);
  const navigate = useNavigate();
  const { logIn } = useAuth();
  const [loginToServer] = login();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formikObj = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => {
      setAuthFailed(false);
      loginToServer(values)
        .unwrap()
        .then(({ username, token }) => {
          logIn(username, token);
          navigate('/');
        })
        .catch((err) => {
          switch (err.status) {
            case 401:
              setAuthFailed(true);
              inputRef.current.select();
              break;
            case 'FETCH_ERROR':
              toast.error(t('toast.connectionError'));
              break;
            default:
              toast.error(t('unknownError'));
              console.log(err);
          }
        });
    },
  });

  return (
    <div className="d-flex flex-column h-100">
      <MainNavbar />
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
                  controlId="username"
                  label={t('loginPage.username')}
                >
                  <Form.Control
                    name="username"
                    // id="username"
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
                  controlId="password"
                  label={t('loginPage.password')}
                >
                  <Form.Control
                    name="password"
                    // id="password"
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
          <Card.Footer className="text-center p-3">
            <Button variant="link" onClick={() => navigate('/signup')}>
              {t('signUpPage.signingUp')}
            </Button>
          </Card.Footer>
        </Card>
      </Container>
    </div>
  );
};
export default Login;
