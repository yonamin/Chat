import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

import classNames from 'classnames';
import { isEmpty } from 'lodash';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getChannels } from '../services/channelsApi';
import MainSpinner from './Spinner';

const Channels = ({ active }) => {
  const { t } = useTranslation();
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
    const btnClasses = classNames('w-100', 'text-start', 'rounded-1', {
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
        <b className="mt-2">{t('mainPage.channels')}</b>
        <Button variant="dark" size="sm" className="pb-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-patch-plus" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5" />
            <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911z" />
          </svg>
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <Nav as="ul" className="h-100 flex-column overflow-auto nav-fill nav-pills d-block mb-3 px-2">
        {isLoading
          ? <MainSpinner />
          : data.map((channel) => buildChannel(channel))}
      </Nav>
    </Col>
  );
};

export default Channels;
