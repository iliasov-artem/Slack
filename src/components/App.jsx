import React from 'react';
import ChannelsList from './ChannelsList';
import MainWindow from './MainWindow';

const App = ({ channels }) => (
  <div className="d-flex vh-100">
    <ChannelsList channels={channels} />
    <MainWindow />
  </div>
);

export default App;
