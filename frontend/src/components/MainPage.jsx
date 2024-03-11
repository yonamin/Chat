import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';

import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import useAuth from '../hooks/useAuth';
import Channels from './Channels';
import Messages from './Messages';

// add edit button on channels
// create more files
// normalize spinner
// fix messages, add button to send msg

const MainPage = () => {
  const { token } = useAuth();
  const [activeChannel, setActiveChannel] = useState({});

  if (!token) {
    return (
      <Navigate to="/login" />
    );
  }

  // const [messagesCount, setMessagesCount] = useState(0);

  return (
    <div className="h-100">
      <div className="d-flex flex-column h-100">
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand>ChatKit</Navbar.Brand>
            <Button className="primary">Выйти</Button>
          </Container>
        </Navbar>
        <Container className="h-100 rounded overflow-hidden bg-light my-4">
          <Row className="h-100">
            <Channels
              active={{ activeChannel, setActiveChannel }}
            />
            <Messages
              activeChannel={activeChannel}
            />
          </Row>
        </Container>
      </div>
    </div>
  );
};

// const Redirect = () => {
//   const { token } = useAuth();
//   return token
//     ? (<MainPage />)
//     : (<Navigate to="/login" />);
// };
export default MainPage;
