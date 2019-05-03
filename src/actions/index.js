import { createAction } from 'redux-actions';
import axios from 'axios';
import * as routes from '../routes';

export const addChannel = createAction('CHANNEL_ADD');
export const renameChannel = createAction('CHANNEL_RENAME');
export const deleteChannel = createAction('CHANNEL_DELETE');
export const addMessage = createAction('MESSAGE_ADD');
export const setActiveChannel = createAction('SET_ACTIVE_CHANNEL');
export const showDialog = createAction('DIALOG_SHOW');
export const hideDialog = createAction('DIALOG_HIDE');

export const deleteChannelRequest = channelId => async (dispatch) => {
  const path = routes.channel(channelId);
  await axios.delete(path);
  dispatch(deleteChannel(channelId));
};

export const renameChannelRequest = (channelId, newName) => async () => {
  const path = routes.channel(channelId);
  const data = {
    attributes: {
      name: newName,
    },
  };
  await axios.patch(path, { data });
};

export const sendMessage = (message, channelId, user) => async () => {
  const path = routes.messages(channelId);
  const data = {
    attributes: {
      message,
      user,
    },
  };
  await axios.post(path, { data });
};

export const addChannelRequest = (name, removable = true) => async () => {
  const path = routes.channels();
  const data = {
    attributes: {
      name,
      removable,
    },
  };
  await axios.post(path, { data });
};

export const showError = createAction('ERROR_SHOW');
export const hideError = createAction('ERROR_HIDE');
