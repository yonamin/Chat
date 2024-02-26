import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useFormik } from 'formik';

const Login = () => {
  const formikObj = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    // add onSubmit
  });
  return (
    <Container fluid="sm">
      <Card border="primary" className="text-center">
        <Card.Header>Вход</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="username">Ваш ник</Form.Label>
              <Form.Control
                name="username"
                id="username"
                placeholder="Ваш ник"
                onChange={formikObj.handleChange}
                value={formikObj.values.email}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="password">Пароль</Form.Label>
              <Form.Control
                name="password"
                id="password"
                type="password"
                placeholder="Пароль"
                onChange={formikObj.handleChange}
                value={formikObj.values.password}
              />
            </Form.Group>
            <Button variant="outline-primary" type="submit">
              Войти
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};
export default Login;
