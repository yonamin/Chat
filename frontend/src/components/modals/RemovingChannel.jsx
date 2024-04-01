import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { removeChannel } from '../../services/channelsApi';

const RemovingChannelModal = ({ hideModal, refetch, modalInfo }) => {
  const { t } = useTranslation();
  const [removeChannelFn] = removeChannel();
  const [isLoading, setLoading] = useState(false);

  const handleRemove = () => {
    setLoading(true);
    removeChannelFn(modalInfo.item.id)
      .then(() => {
        setLoading(false);
        hideModal();
      });
    refetch();
  };

  return (
    <Modal show onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t('mainPage.modals.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('mainPage.modals.ensuring')}</p>
        <div className="d-flex justify-content-end">
          <Button className="me-2" variant="outline-dark" onClick={hideModal}>{t('mainPage.modals.cancel')}</Button>
          <Button onClick={handleRemove} disabled={isLoading} variant="danger">{t('mainPage.modals.remove')}</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemovingChannelModal;
