import Spinner from 'react-bootstrap/Spinner';

const MainSpinner = () => (
  <Spinner animation="grow" className="ms-5 mt-3" role="status">
    <span className="visually-hidden">Loading...</span>
  </Spinner>
);

export default MainSpinner;
