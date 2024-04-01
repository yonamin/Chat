/* eslint-disable max-len */
import Nav from 'react-bootstrap/Nav';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
// import SplitButton from 'react-bootstrap/SplitButton';
import Col from 'react-bootstrap/Col';
//
import classNames from 'classnames';
// import { isEmpty } from 'lodash';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getChannels } from '../services/channelsApi';
import {
  setActiveChannelId,
  // setDefaultChannel,
  selectActiveChannelId,
  // selectDefaultChannel,
} from '../slices/ui';
import MainSpinner from './Spinner';
import getModal from './modals/index';

const renderModal = ({ modalInfo, hideModal, refetch }) => {
  if (!modalInfo.type) {
    return null;
  }

  const Modal = getModal(modalInfo.type);
  return <Modal modalInfo={modalInfo} hideModal={hideModal} refetch={refetch} />;
};

const Channels = ({ data, refetch }) => {
  const { t } = useTranslation();
  // const { data, isLoading, refetch } = getChannels();
  // const { activeChannel, setActiveChannel } = active;
  const [modalInfo, setModalInfo] = useState({ type: null, item: null });
  const activeChannelId = useSelector(selectActiveChannelId);
  const dispatch = useDispatch();

  const channelNames = data.map((c) => c.name);
  const showModal = (type, item = null) => {
    setModalInfo({ type, item });
  };
  const hideModal = () => {
    setModalInfo({
      type: null,
      item: null,
    });
  };

  // useEffect(() => {
  //   if (activeChannel === null) {
  //     const defChannel = data.find((channel) => parseInt(channel.id, 10) === defaultChannelId);
  //     dispatch(setActiveChannel({ activeChannel: defChannel }));
  //   }
  // });

  const buildChannel = (c) => {
    const { name, id, removable } = c;

    const handleClick = () => {
      dispatch(setActiveChannelId({ id }));
    };

    const isActive = activeChannelId === id;

    const btnClasses = classNames({
      'btn-primary': isActive,
      'btn-light': !isActive,
    });

    const builder = () => {
      const channel = (
        <Button onClick={handleClick} className={['w-100', 'text-start', 'text-truncate', btnClasses]}>
          <span className="me-1"># </span>
          {name}
        </Button>
      );
      if (!removable) {
        return channel;
      }

      return (
        <Dropdown className="d-flex" as={ButtonGroup}>
          {channel}
          <Dropdown.Toggle className={btnClasses} id={`channel-control-${id}`} />
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => showModal('removing', { id })}
            >
              {t('mainPage.modals.remove')}
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => showModal('editing', { id, name, channelNames })}
            >
              {t('mainPage.modals.edit')}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );
    };

    return (
      <Nav.Item key={id} as="li" className="w-100">
        {builder()}
      </Nav.Item>
    );
  };

  return (
    <>
      <div className="d-flex bg-secondary rounded border-3 border-bottom border-end border-primary justify-content-between mb-2 ps-3 pe-2 p-4">
        <b className="mt-2">{t('mainPage.channels')}</b>
        <Button
          name="addChannel"
          variant="link"
          onClick={() => showModal('adding', { channelNames })}
          className="p-0 text-dark"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-patch-plus" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5" />
            <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911z" />
          </svg>
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <Nav as="ul" className="overflow-auto h-100 nav-fill nav-pills d-block mb-3 px-2">
        {data.map((channel) => buildChannel(channel))}
      </Nav>
      {renderModal({ modalInfo, hideModal, refetch })}
    </>
  );
};

const ChannelBox = () => {
  // const activeChannel = useSelector(selectActiveChannel);
  // const defaultChannelId = useSelector(selectDefaultChannel);
  // const dispatch = useDispatch();
  const { data, isLoading, refetch } = getChannels();

  // eslint-disable-next-line consistent-return
  // if (activeChannel === null) {
  //   const defChannel = data?.find((channel) => parseInt(channel.id, 10) === defaultChannelId);
  //   dispatch(setActiveChannel({ activeChannel: defChannel }));
  // }
  return (
    <Col className="px-0 border-end d-flex flex-column border-primary h-100 col-4" md="2">
      {isLoading
        ? <MainSpinner />
        : <Channels data={data} refetch={refetch} />}
    </Col>
  );
};

export default ChannelBox;
// const Channels = () => {
//   const { t } = useTranslation();
//   const { data, isLoading, refetch } = getChannels();
//   // const { activeChannel, setActiveChannel } = active;
//   const [modalInfo, setModalInfo] = useState({ type: null, item: null });
//   const activeChannel = useSelector(selectActiveChannel);
//   const defaultChannelId = useSelector(selectDefaultChannel);
//   const dispatch = useDispatch();

//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   // eslint-disable-next-line consistent-return

//   if (isLoading) {
//     return <MainSpinner />;
//   }

//   const channelNames = data.map((c) => c.name);
//   const showModal = (type, item = null) => {
//     setModalInfo({ type, item });
//   };
//   const hideModal = () => {
//     setModalInfo({
//       type: null,
//       item: null,
//     });
//   };

//   const buildChannel = (c) => {
//     if (activeChannel === null) {
//       const defChannel = data.find((channel) => parseInt(channel.id, 10) === defaultChannelId);
//       console.log(defChannel, 'def', data);
//       dispatch(setActiveChannel({ activeChannel: defChannel }));
//       console.log(activeChannel, defaultChannelId, 'active');
//     }
//     const { name, id, removable } = c;

//     const handleClick = () => {
//       dispatch(setActiveChannel(c));
//     };
//     console.log(activeChannel, 'active????');
//     const isActive = activeChannel.id === id;
//     const btnClasses = classNames({
//       'btn-primary': isActive,
//       'btn-light': !isActive,
//     });

//     const builder = () => {
//       const channel = (
//         <Button onClick={handleClick} className={['w-100', 'text-start', btnClasses]}>
//           <span className="me-1"># </span>
//           {name}
//         </Button>
//       );
//       if (!removable) {
//         return channel;
//       }

//       return (
//         <Dropdown className="d-flex" as={ButtonGroup}>
//           {channel}
//           <Dropdown.Toggle className={btnClasses} id={`channel-control-${id}`} />
//           <Dropdown.Menu>
//             <Dropdown.Item
//               onClick={() => showModal('removing', { id })}
//             >
//               {t('mainPage.modals.remove')}
//             </Dropdown.Item>
//             <Dropdown.Item
//               onClick={() => showModal('editing', { id, name, channelNames })}
//             >
//               {t('mainPage.modals.edit')}
//             </Dropdown.Item>
//           </Dropdown.Menu>
//         </Dropdown>
//       );
//     };

//     return (
//       <Nav.Item key={id} as="li" className="w-100">
//         {builder()}
//       </Nav.Item>
//     );
//   };

//   return (
//     <Col className="px-0 border-end d-flex flex-column border-primary h-100 col-4" md="2">
//       <div className="d-flex bg-secondary rounded border-3 border-bottom border-end border-primary justify-content-between mb-2 ps-3 pe-2 p-4">
//         <b className="mt-2">{t('mainPage.channels')}</b>
//         <Button
//           name="addChannel"
//           variant="link"
//           onClick={() => showModal('adding', { channelNames })}
//           className="p-0 text-dark"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-patch-plus" viewBox="0 0 16 16">
//             <path fillRule="evenodd" d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5" />
//             <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911z" />
//           </svg>
//           <span className="visually-hidden">+</span>
//         </Button>
//       </div>
//       <Nav as="ul" className="overflow-auto h-100 nav-fill nav-pills d-block mb-3 px-2">
//         {data.map((channel) => buildChannel(channel))}
//       </Nav>
//       {renderModal({ modalInfo, hideModal, refetch })}
//     </Col>
//   );
// };

// export default Channels;
