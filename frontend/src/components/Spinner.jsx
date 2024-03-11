import Spinner from 'react-bootstrap/Spinner';

const MainSpinner = () => (
  <Spinner animation="border" role="status">
    <span className="visually-hidden">Loading...</span>
  </Spinner>
);

export default MainSpinner;
