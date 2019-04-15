import { createAction } from 'redux-actions';
import axios from 'axios';

export const addChannel = createAction('ADD_CHANNEL');
export const addMessage = createAction('ADD_MESSAGE');
export const setActiveChannel = createAction('SET_ACTIVE_CHANNEL');

export const sendMessage = () => {
  const path = '123';
  const data = 'message';
  axios.post(path, { data });
};
