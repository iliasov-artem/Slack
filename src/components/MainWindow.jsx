import React from 'react';
import SendMessageForm from './SendMessageForm';
import Context from '../context';
import connect from '../connect';

const mapStateToProps = (state) => {
  const { currentChannelId } = state;
  const currentMessages = Object.keys(state.messages.byId)
    .map(key => (state.messages.byId[key]))
    .filter(message => message.channelId === currentChannelId);
  return { currentMessages };
};

@connect(mapStateToProps)

class MainWindow extends React.Component {
  renderMessages = messages => (
    <div className="flex-column-reverse align-items-end overflow-auto">
      {messages.map(({ id, message, user }) => (
        <div className="mb-1" key={id} id={id}>
          <span className="d-block"><strong>{user}</strong></span>
          <span className="d-block">{message}</span>
        </div>
      ))}
    </div>
  );

  render() {
    const { currentMessages, currentChannelName, currentChannelId } = this.props;
    return (
      <div className="col">
        <div className="container-fluid d-flex flex-column h-100">
          <div className="row flex-shrink-0">
            <div className="col py-2">
              <h5 className="mb-0">{currentChannelName}</h5>
            </div>
          </div>
          <div className="row flex-fill d-flex flex-column justify-content-start overflow-auto">
            <div className="col py-2 overflow-auto">
              <div className="message_box">
                {currentMessages.length ? this.renderMessages(currentMessages) : null}
              </div>
            </div>
            <Context.Consumer>
              {value => <SendMessageForm user={value} currentChannelId={currentChannelId} />}
            </Context.Consumer>
          </div>
        </div>
      </div>
    );
  }
}

export default MainWindow;
