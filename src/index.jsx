import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';
import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import faker from 'faker';
import gon from 'gon';
import cookies from 'js-cookie';
import io from 'socket.io-client';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { keyBy } from 'lodash';
import reducers from './reducers';
import App from './components/App';
import Context from './context';
import * as actions from './actions';

library.add(faTrash, faEdit);

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

const renderDefaultStoreData = data => (
  {
    byId: keyBy(data, 'id'),
    allIds: data.map(({ id }) => id),
  }
);
const username = getName();
const { channels, messages, currentChannelId } = gon;

const store = createStore(
  reducers, /* preloadedState, */
  {
    channels: renderDefaultStoreData(channels),
    messages: renderDefaultStoreData(messages),
    currentChannelId,
  },
  composeWithDevTools(applyMiddleware(thunk)),
);

const socket = io();

socket.on('newMessage', (payload) => {
  store.dispatch(actions.addMessage(payload));
});

socket.on('newChannel', (payload) => {
  console.log(payload);
  store.dispatch(actions.addChannel(payload));
});

/* eslint-enable */
ReactDOM.render(
  <Provider store={store}>
    <Context.Provider value={username}>
      <App />
    </Context.Provider>
  </Provider>,
  document.getElementById('chat'),
);
