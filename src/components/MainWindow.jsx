import React from 'react';
import SendMessageForm from './SendMessageForm';
import Context from '../context';

const renderMessages = (messages, currentChannelId) => {
  const filterdMessages = messages.filter(msg => msg.channelId === currentChannelId);
  return (
    <div className="flex-column-reverse align-items-end overflow-auto">
      {filterdMessages.map(({ id, message, user }) => (
        <div className="mb-1" key={id} id={id}>
          <span className="d-block"><strong>{user}</strong></span>
          <span className="d-block">{message}</span>
        </div>
      ))}
    </div>
  );
};

const MainWindow = ({ messages, currentChannelId }) => (
  <div className="col">
    <div className="container-fluid d-flex flex-column h-100">
      <div className="row flex-shrink-0">
        <div className="col py-2">
          <h5 className="mb-0">Header</h5>
        </div>
      </div>
      <div className="row flex-fill d-flex flex-column justify-content-start overflow-auto">
        <div className="col py-2 overflow-auto">
          <div className="message_box">
            {messages.length ? renderMessages(messages, currentChannelId) : null}
          </div>
        </div>
        <Context.Consumer>
          {value => <SendMessageForm user={value} currentChannelId={currentChannelId} />}
        </Context.Consumer>
      </div>
    </div>
  </div>
);

export default MainWindow;
