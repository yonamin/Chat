import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth';
import Channels from './Channels';
import Messages from './Messages';
import MainNavbar from './MainNavbar';

const MainPage = () => {
  const { t } = useTranslation();
  const { logOut } = useAuth();

  const handleLogOut = () => logOut();
  const logOutBtn = (
    <Button
      onClick={handleLogOut}
      className="border-dark border-start-0
        border-top-0 border-3"
    >
      {t('mainPage.logOut')}
    </Button>
  );

  return (
    <div className="h-100">
      <div className="d-flex flex-column h-100">
        <MainNavbar logOutBtn={logOutBtn} />
        <Container className="h-100 rounded overflow-hidden bg-light my-4">
          <Row className="h-100">
            <Channels />
            <Messages />
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default MainPage;
