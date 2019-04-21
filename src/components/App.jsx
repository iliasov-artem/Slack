import React from 'react';
import ChannelsList from './ChannelsList';
import MainWindow from './MainWindow';
import Context from '../context';
import connect from '../connect';

const mapStateToProps = (state) => {
  const channels = Object.keys(state.channels.byId).map(key => (state.channels.byId[key]));
  const messages = Object.keys(state.messages.byId).map(key => (state.messages.byId[key]));
  const { currentChannelId } = state;
  const currentChannelName = state.channels.byId[currentChannelId].name;
  const props = {
    channels,
    messages,
    currentChannelId,
    currentChannelName,
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
      </div>
    );
  }
}

export default App;
