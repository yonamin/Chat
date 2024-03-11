import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Col from 'react-bootstrap/Col';

import classNames from 'classnames';
import { isEmpty } from 'lodash';
import { useEffect } from 'react';
import { getChannels } from '../services/channelsApi';
import MainSpinner from './Spinner';

const Channels = ({ active }) => {
  const { data, isLoading } = getChannels();
  const { activeChannel, setActiveChannel } = active;
  useEffect(() => {
    if (isEmpty(activeChannel) && data) {
      setActiveChannel(data[0]);
    }
  });
  const buildChannel = (c) => {
    const { name, id } = c;
    const handleClick = () => {
      setActiveChannel(c);
    };
    const isActive = activeChannel.id === id;
    const btnClasses = classNames('w-100', 'text-start', 'rounded-0', {
      'border-dark': isActive,
      'btn-primary': isActive,
      'btn-light': !isActive,
    });

    return (
      <Nav.Item key={id} as="li">
        <Button onClick={handleClick} className={btnClasses}>
          <span className="me-1">#</span>
          {name}
        </Button>
      </Nav.Item>
    );
  };

  return (
    <Col className="px-0 border-end border-primary" md="2">
      <div className="d-flex bg-secondary rounded border-3 border-bottom border-end border-primary justify-content-between mb-2 ps-3 pe-2 p-4">
        <b>Каналы</b>
        <ButtonGroup vertical size="sm">
          <Button variant="outline-dark">+</Button>
          {/* add button icon */}
        </ButtonGroup>
      </div>
      <Nav as="ul" className="h-100 flex-column overflow-auto nav-fill nav-pills d-block mb-3 px-2">
        {isLoading
          ? <MainSpinner className="justify-content-between" />
          : data.map((channel) => buildChannel(channel))}
      </Nav>
    </Col>
  );
};

export default Channels;
