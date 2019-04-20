import { createAction } from 'redux-actions';
import axios from 'axios';
import { messages } from '../routes';

export const addChannel = createAction('ADD_CHANNEL');
export const addMessage = createAction('ADD_MESSAGE');
export const setActiveChannel = createAction('SET_ACTIVE_CHANNEL');

export const sendMessage = (message, channelId, user) => async (dispatch) => {
  const path = messages(channelId);
  const data = {
    attributes: {
      message,
      user,
    },
  };
  await axios.post(path, { data });
  //const response = await axios.post(path, { data });
  //dispatch(addMessage(response));
};
