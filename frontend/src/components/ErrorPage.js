import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import MainNavbar from './MainNavbar';

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <div>
      <MainNavbar />
      <Container fluid="sm" className="d-flex justify-content-center mt-5">
        <Card className="w-75 text-center">
          <Card.Header className="p-3">
            <h6>Неудача...</h6>
          </Card.Header>
          <Card.Body className="p-5">
            <h2>Страница не найдена:(</h2>
          </Card.Body>
          <Card.Footer className="p-3">
            <Button onClick={handleClick} variant="link">Перейти на главную</Button>
          </Card.Footer>
        </Card>
      </Container>
    </div>
  );
};

export default ErrorPage;
