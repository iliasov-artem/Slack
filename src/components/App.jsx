import React from 'react';
import ChannelsList from './ChannelsList';
import MainWindow from './MainWindow';
import Context from '../context';
import connect from '../connect';

const mapStateToProps = (state) => {
  const channels = Object.keys(state.channels.byId).map(key => (state.channels.byId[key]));
  const messages = Object.keys(state.messages).map(key => (state.messages[key]));
  const props = {
    channels,
    messages,
  };
  return props;
};

@connect(mapStateToProps)

class App extends React.Component {
  render() {
    const { channels, messages } = this.props;
    return (
      <div className="d-flex vh-100">
        <Context.Consumer>
          {({ value }) => (
            <ChannelsList channels={channels} user={value} />
          )}
        </Context.Consumer>
        <MainWindow messages={messages} />
      </div>
    );
  }
}

export default App;
