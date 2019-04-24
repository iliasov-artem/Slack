import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import _ from 'lodash';
import * as actions from '../actions';

const channels = handleActions({ /*
  [actions.addChannel](state, { payload: { attributes } }) {
    const { id, name, removable } = attributes;
    return {
      byId: { ...state.byId, [id]: { id, name, removable } },
      allIds: [...state.allIds, id],
    };
  }, */
  [actions.addChannel](state, { payload }) {
    const { data: { attributes: { id, name, removable } } } = payload;
    return {
      byId: { ...state.byId, [id]: { id, name, removable } },
      allIds: [...state.allIds, id],
    };
  },
  [actions.renameChannel](state, { payload }) {
    const { channelId, newName } = payload;
    const renamedChannel = { ...state.byId[channelId], name: newName };
    return {
      byId: { ...state.byId, [channelId]: renamedChannel },
      allIds: state.allIds,
    };
  },
  [actions.deleteChannel](state, { payload }) {
    return {
      byId: _.omit(state.byId, payload),
      allIds: state.allIds.filter(id => id !== payload),
    };
  },
}, { byId: {}, allIds: [] });

const messages = handleActions({
  [actions.addMessage](state, { payload }) {
    const { data: { attributes } } = payload;
    const {
      message,
      id,
      channelId,
      user,
    } = attributes;
    const newMessage = {
      id, message, channelId, user,
    };
    return {
      byId: { ...state.byId, [id]: newMessage },
      allIds: [...state.allIds, id],
    };
  },
  [actions.deleteChannel](state, { payload }) {
    const newById = _.omitBy(state.byId, message => message.channelId === payload);
    const newAllIds = state.allIds.filter(id => newById[id]);
    return {
      byId: newById,
      allIds: newAllIds,
    };
  },
}, { byId: {}, allIds: [] });

const currentChannelId = handleActions({
  [actions.setActiveChannel](state, { payload }) {
    return payload;
  },
  [actions.deleteChannel](state, { payload }) {
    return state === payload ? 1 : state;
  },
}, 1);

const modalError = handleActions({
  [actions.showError](state, { payload }) {
    const errorMesage = `${payload.name}: ${payload.message}`;
    return { visible: true, error: errorMesage };
  },
  [actions.hideError]() {
    return { visible: false, error: '' };
  },
}, { visible: false, error: '' });

export default combineReducers({
  channels,
  messages,
  currentChannelId,
  modalError,
  form: formReducer,
});
