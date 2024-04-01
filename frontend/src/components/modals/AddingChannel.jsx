import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { addChannel } from '../../services/channelsApi';
import { setActiveChannelId } from '../../slices/ui';

const AddingChannelModal = ({ hideModal, refetch, modalInfo }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [errMessage, setErrMessage] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [addChannelFn] = addChannel();
  const channelNameSchema = Yup.string()
    .required(t('mainPage.modals.required'))
    .min(3, t('mainPage.modals.invalidLength'))
    .max(20, t('mainPage.modals.invalidLength'))
    .notOneOf(modalInfo.item.channelNames, t('mainPage.modals.notUnique'));

  const formik = useFormik({
    initialValues: {
      newChannel: '',
    },
    onSubmit: ({ newChannel }) => {
      setErrMessage(null);
      try {
        channelNameSchema.validateSync(newChannel);
        setLoading(true);
        addChannelFn({ name: newChannel })
          .then((res) => {
            const { id } = res.data;
            dispatch(setActiveChannelId({ id }));
          })
          .then(() => {
            hideModal();
            refetch();
            setLoading(false);
          });
        // hideModal();
        // refetch();
        formik.resetForm();
      } catch (err) {
        setErrMessage(err.message);
      }
    },
  });

  const handleClose = () => {
    hideModal();
    formik.resetForm();
    setErrMessage(null);
  };

  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <Modal show onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('mainPage.modals.addChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor="newChannel" visuallyHidden>{t('mainPage.modals.channelName')}</Form.Label>
            <Form.Control
              onChange={formik.handleChange}
              value={formik.values.newChannel}
              autoFocus
              className="mb-3"
              type="text"
              id="newChannel"
              name="newChannel"
              ref={inputRef}
              isInvalid={errMessage}
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

export default AddingChannelModal;
