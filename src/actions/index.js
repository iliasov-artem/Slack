import { createAction } from 'redux-actions';
import axios from 'axios';
import { messages, channels } from '../routes';

export const addChannel = createAction('ADD_CHANNEL');
export const addMessage = createAction('ADD_MESSAGE');
export const setActiveChannel = createAction('SET_ACTIVE_CHANNEL');

export const sendMessage = (message, channelId, user) => async () => {
  const path = messages(channelId);
  const data = {
    attributes: {
      message,
      user,
    },
  };
  await axios.post(path, { data });
};

export const createChannel = (name, removable = true) => async (dispatch) => {
  const path = channels();
  const data = {
    attributes: {
      name,
      removable,
    },
  };
  const response = await axios.post(path, { data });
  const { data: { data: attributes } } = response;
  dispatch(addChannel(attributes));
};
