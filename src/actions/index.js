import { createAction } from 'redux-actions';
import axios from 'axios';
import { messages, channels, channel } from '../routes';

export const addChannel = createAction('CHANNEL_ADD');
export const renameChannel = createAction('CHANNEL_RENAME');
export const deleteChannel = createAction('CHANNEL_DELETE');
export const addMessage = createAction('MESSAGE_ADD');
export const setActiveChannel = createAction('SET_ACTIVE_CHANNEL');

export const deleteChannelRequest = channelId => async (dispatch) => {
  const path = channel(channelId);
  await axios.delete(path);
  dispatch(deleteChannel(channelId));
};

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
export const renameChannelRequest = (newName, channelId) => async (dispatch) => {
  const path = channel(channelId);
  const data = {
    attributes: {
      name: newName,
    },
  };
  await axios.patch(path, { data });
  dispatch(renameChannel({ channelId, newName }));
};
export const showError = createAction('ERROR_SHOW');
export const hideError = createAction('ERROR_HIDE');
