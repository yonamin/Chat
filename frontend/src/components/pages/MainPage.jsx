import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ChannelBox from '../channels/ChannelBox';
import MessageBox from '../messages/MessageBox';
import MainNavbar from './MainNavbar';

const MainPage = () => (
  <div className="h-100 bg-light">
    <div className="d-flex flex-column h-100">
      <MainNavbar hasLogoutBtn />
      <Container className="h-100 rounded overflow-hidden bg-light my-4">
        <Row className="h-100">
          <ChannelBox />
          <MessageBox />
        </Row>
      </Container>
    </div>
  </div>
);

export default MainPage;
