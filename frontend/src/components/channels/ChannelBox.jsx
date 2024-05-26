import Col from 'react-bootstrap/Col';
import { getChannels } from '../../services/channelsApi';
import MainSpinner from '../Spinner';
import ChannelList from './ChannelList';

const ChannelBox = () => {
  const { data, isLoading } = getChannels();

  return (
    <Col className="px-0 border-end d-flex flex-column border-dark h-100 col-4" md="2">
      {isLoading
        ? <MainSpinner />
        : <ChannelList data={data} />}
    </Col>
  );
};

export default ChannelBox;
