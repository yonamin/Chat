import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useState, useRef, useEffect } from 'react';
import * as censor from 'leo-profanity';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { editChannel } from '../../services/channelsApi';

const EditingChannelModal = ({
  modalInfo,
  refetch,
  hideModal,
}) => {
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const [errMessage, setErrMessage] = useState(null);
  const [isLoading, setLoading] = useState(false);
  // const channels = useSelector((state) => state.channels);
  const [editChannelFn] = editChannel();
  const channelNameSchema = Yup.string()
    .required(t('validationFeedback.required'))
    .min(3, t('validationFeedback.invalidLength'))
    .max(20, t('validationFeedback.invalidLength'))
    .notOneOf(modalInfo.item.channelNames, t('mainPage.modals.notUnique'));
  const { id, name } = modalInfo.item;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      newChannelName: name,
    },
    onSubmit: ({ newChannelName }) => {
      setErrMessage(null);
      try {
        channelNameSchema.validateSync(newChannelName);
        setLoading(true);
        const channelObj = {
          newName: { name: censor.clean(newChannelName) },
          channelId: id,
        };
        editChannelFn(channelObj)
          .then(() => {
            setLoading(false);
            hideModal();
            formik.resetForm();
            refetch();
            toast.success(t('toast.channelRenamed'));
          });
      } catch (err) {
        setErrMessage(err.message);
      }
    },
  });

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);

  const handleClose = () => {
    hideModal();
    formik.resetForm();
    setErrMessage(null);
  };

  return (
    <Modal show onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('mainPage.modals.renameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor="newChannelName" visuallyHidden>{t('mainPage.modals.channelName')}</Form.Label>
            <Form.Control
              onChange={formik.handleChange}
              value={formik.values.newChannelName}
              className="mb-3"
              type="text"
              id="newChannelName"
              name="newChannelName"
              isInvalid={errMessage}
              ref={inputRef}
            />
            <Form.Control.Feedback type="invalid">{errMessage}</Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button className="me-2" variant="outline-dark" onClick={handleClose}>{t('mainPage.modals.cancel')}</Button>
              <Button disabled={isLoading} type="submit">{t('mainPage.modals.send')}</Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditingChannelModal;
