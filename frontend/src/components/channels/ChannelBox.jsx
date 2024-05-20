import Col from 'react-bootstrap/Col';
// import { useEffect } from 'react';
import { getChannels } from '../../services/channelsApi';
import MainSpinner from '../Spinner';
import ChannelList from './ChannelList';
// import useAuth from '../../hooks/useAuth';

const ChannelBox = () => {
  const { data, isLoading } = getChannels();

  return (
    <Col className="px-0 border-end d-flex flex-column border-primary h-100 col-4" md="2">
      {isLoading
        ? <MainSpinner />
        : <ChannelList data={data} />}
    </Col>
  );
};

export default ChannelBox;
