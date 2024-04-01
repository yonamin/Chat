import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { Navigate } from 'react-router-dom';
// import { useState } from 'react';
import useAuth from '../hooks/useAuth';
import Channels from './Channels';
import Messages from './Messages';
import MainNavbar from './MainNavbar';

// add edit button on channels
// normalize spinner

const MainPage = () => {
  const { loggedIn } = useAuth();
  // const [activeChannel, setActiveChannel] = useState({});

  if (!loggedIn) {
    return (
      <Navigate to="/login" />
    );
  }

  return (
    <div className="h-100">
      <div className="d-flex flex-column h-100">
        <MainNavbar />
        <Container className="h-100 rounded overflow-hidden bg-light my-4">
          <Row className="h-100">
            <Channels />
            {/* // active={{ activeChannel, setActiveChannel }} */}
            <Messages />
            {/* activeChannel={activeChannel}  */}
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
