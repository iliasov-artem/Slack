import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';
import React from 'react';
import ReactDOM from 'react-dom';
import faker from 'faker';
import gon from 'gon';
import cookies from 'js-cookie';
// import io from 'socket.io-client';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducers from './reducers';
import App from './components/App';
import Context from './context';

const getRandomUsername = () => {
  const name = faker.name.findName();
  cookies.set('username', name);
  return name;
};

const getName = () => {
  const name = cookies.get('username');
  return name || getRandomUsername();
};

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const renderDefaultStoreChannels = (channels) => {
  const byId = channels.reduce((acc, val) => {
    const { id, name, removable } = val;
    return { ...acc, [id]: { id, name, removable } };
  }, {});
  const allIds = channels.map(({ id }) => id);
  const channelsForStore = { byId, allIds };
  return channelsForStore;
};

const username = getName();
const { channels } = gon;

/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducers, /* preloadedState, */
  {
    channels: renderDefaultStoreChannels(channels),
    messages: { byId: {}, allIds: [] },
    currentChannelId: gon.currentChannelId,
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable */
console.log(gon);
ReactDOM.render(
  <Provider store={store}>
    <Context.Provider value={username}>
      <App />
    </Context.Provider>
  </Provider>,
  document.getElementById('chat'),
);
