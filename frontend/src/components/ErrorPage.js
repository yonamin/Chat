import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MainNavbar from './MainNavbar';

const ErrorPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <div>
      <MainNavbar />
      <Container fluid="sm" className="d-flex justify-content-center mt-5">
        <Card className="w-75 text-center">
          <Card.Header className="p-3">
            <h6>{t('errorPage.failure')}</h6>
          </Card.Header>
          <Card.Body className="p-5">
            <h2>{t('errorPage.pageNotFound')}</h2>
          </Card.Body>
          <Card.Footer className="p-3">
            <Button onClick={handleClick} variant="link">{t('errorPage.toTheMainPage')}</Button>
          </Card.Footer>
        </Card>
      </Container>
    </div>
  );
};

export default ErrorPage;
