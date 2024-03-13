import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { useFormik } from 'formik';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { uniqueId } from 'lodash';

import MainSpinner from './Spinner';
import { getMessages, addMessage } from '../services/messagesApi';
import useAuth from '../hooks/useAuth';

// make correct overflow in messageBox

const MessageBox = ({ activeChannelId, messages, setCount }) => {
  const { data } = messages;
  const currentMessages = data.filter((m) => m.channelId === activeChannelId);
  const messageBoxRef = useRef(null);

  useEffect(() => {
    setCount(currentMessages.length);
    messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
  });

  const buildMessage = (m) => (
    <div key={uniqueId()} className="text-break mb-2">
      <b>{m.username}</b>
      {`: ${m.body}`}
    </div>
  );

  return (
    <div ref={messageBoxRef} id="messages-box" className="px-5 overflow-auto">
      {currentMessages.map((msg) => buildMessage(msg))}
    </div>
  );
};

const Messages = ({ activeChannel }) => {
  const { t } = useTranslation();
  const { username } = useAuth();
  const { data, isLoading, refetch } = getMessages();
  const [addMessageFunc] = addMessage();
  const [messagesCount, setMessagesCount] = useState(0);
  const inputRef = useRef(null);

  const formikObj = useFormik({
    initialValues: { message: '' },
    onSubmit: (values) => {
      const msgObj = {
        body: values.message,
        channelId: activeChannel.id,
        username,
      };
      addMessageFunc(msgObj);
      refetch();
      formikObj.values.message = '';
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  });

  const messageBoxRender = () => {
    if (isLoading) {
      return <MainSpinner />;
    // change spinner
    }
    if (data.length === 0) {
      return null;
    }

    return (
      <MessageBox
        activeChannelId={activeChannel.id}
        messages={{ data, isLoading }}
        setCount={setMessagesCount}
      />
    );
  };

  return (
    <Col className="p-0 h-100">
      <div className="d-flex h-100 flex-column">
        <div className="chat bg-secondary rounded p-3 pe-2 ">
          <p className="m-0">
            <b>
              #
              {activeChannel.name}
            </b>
          </p>
          <span className="text-muted">{t('mainPage.messages.counter.count', { count: messagesCount })}</span>
        </div>
        {messageBoxRender()}
        <div className="py-3 px-5 mt-auto">
          <Form onSubmit={formikObj.handleSubmit}>
            <Form.Group className="d-flex">
              <Form.Control
                onChange={formikObj.handleChange}
                value={formikObj.values.message}
                type="text"
                placeholder={t('mainPage.messages.input')}
                id="message"
                ref={inputRef}
              />
              <Button type="submit" variant="outline-dark" size="sm" className="border-dark rounded-end border-2 ms-2 pb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-arrow" viewBox="0 0 16 16">
                  <path d="M6.707 9h4.364c-.536 1.573 2.028 3.806 4.929-.5-2.9-4.306-5.465-2.073-4.929-.5H6.707L4.854 6.146a.5.5 0 1 0-.708.708L5.293 8h-.586L2.854 6.146a.5.5 0 1 0-.708.708L3.293 8h-.586L.854 6.146a.5.5 0 1 0-.708.708L1.793 8.5.146 10.146a.5.5 0 0 0 .708.708L2.707 9h.586l-1.147 1.146a.5.5 0 0 0 .708.708L4.707 9h.586l-1.147 1.146a.5.5 0 0 0 .708.708z" />
                </svg>
              </Button>
            </Form.Group>
          </Form>
        </div>
      </div>
    </Col>
  );
};

export default Messages;
