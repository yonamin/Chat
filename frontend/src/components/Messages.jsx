import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import { useState } from 'react';
import MainSpinner from './Spinner';
import { getMessages, addMessage } from '../services/messagesApi';
import useAuth from '../hooks/useAuth';

// make correct overflow in messageBox

const MessageBox = ({ activeChannelId, messages, setCount }) => {
  const { data, isLoading } = messages;
  if (isLoading) {
    return <MainSpinner />;
    // change spinner
  }
  if (data.length === 0) {
    return null;
  }
  const currentMessages = data.filter((m) => m.channelId === activeChannelId);

  setCount(currentMessages.length);

  const buildMessage = (m) => (
    <div className="text-break mb-2">
      <b>{m.username}</b>
      {`: ${m.body}`}
    </div>
  );
  return (
    <div id="messages-box" className="px-5 overflow-auto">
      {currentMessages.map((msg) => buildMessage(msg))}
    </div>
  );
};

const Messages = ({ activeChannel }) => {
  const { user } = useAuth();
  const { data, isLoading, refetch } = getMessages();
  const [addMessageFunc] = addMessage();
  const [messagesCount, setMessagesCount] = useState(0);
  const formikObj = useFormik({
    initialValues: { message: '' },
    onSubmit: (values) => {
      const msgObj = {
        body: values.message,
        channelId: activeChannel.id,
        username: user,
      };
      addMessageFunc(msgObj);
      refetch();
      formikObj.values.message = '';
    },
  });
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
          <span className="text-muted">{`${messagesCount} сообщений`}</span>
        </div>
        <MessageBox
          activeChannelId={activeChannel.id}
          messages={{ data, isLoading }}
          setCount={setMessagesCount}
        />
        <div className="py-3 px-5 mt-auto">
          <Form onSubmit={formikObj.handleSubmit}>
            <Form.Group>
              <Form.Control
                onChange={formikObj.handleChange}
                value={formikObj.values.message}
                type="text"
                placeholder="Введите сообщение"
                id="message"
              />
            </Form.Group>
          </Form>
        </div>
      </div>
    </Col>
  );
};

export default Messages;
