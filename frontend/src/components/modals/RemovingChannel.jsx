import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { removeChannel } from '../../services/channelsApi';
import { selectActiveModal, setActiveModal } from '../../slices/ui';

const RemovingChannelModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const activeModal = useSelector(selectActiveModal);
  const [removeChannelFn, { isLoading }] = removeChannel();

  const hideModal = () => {
    dispatch(setActiveModal({
      type: null,
      item: null,
    }));
  };

  const handleRemove = () => {
    removeChannelFn(activeModal.item.id)
      .then(() => {
        hideModal();
        toast.success(t('toast.channelRemoved'));
      });
  };

  return (
    <Modal show onHide={hideModal}>
      <div className="bg-light">
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
      </div>
    </Modal>
  );
};

export default RemovingChannelModal;
