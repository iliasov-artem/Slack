import React from 'react';
import ChannelsList from './ChannelsList';
import MainWindow from './MainWindow';
import Context from '../context';
import connect from '../connect';
import ModalError from './modals/ModalError';

const mapStateToProps = (state) => {
  const channels = Object.keys(state.channels.byId).map(key => (state.channels.byId[key]));
  const messages = Object.keys(state.messages.byId).map(key => (state.messages.byId[key]));
  const { currentChannelId, modalError } = state;
  const currentChannelName = state.channels.byId[currentChannelId].name;
  const props = {
    channels,
    messages,
    currentChannelId,
    currentChannelName,
    modalError,
  };
  return props;
};

@connect(mapStateToProps)

class App extends React.Component {
  render() {
    const {
      channels,
      messages,
      currentChannelId,
      currentChannelName,
      modalError,
    } = this.props;
    return (
      <div className="d-flex vh-100">
        <Context.Consumer>
          { value => (
            <ChannelsList
              channels={channels}
              user={value}
              currentChannelId={currentChannelId}
            />
          )}
        </Context.Consumer>
        <MainWindow
          messages={messages}
          currentChannelId={currentChannelId}
          currentChannelName={currentChannelName}
        />
        <ModalError state={modalError} />
      </div>
    );
  }
}

export default App;
