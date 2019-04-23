import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import _ from 'lodash';
import * as actions from '../actions';

const channels = handleActions({
  [actions.addChannel](state, { payload: { attributes } }) {
    const { id, name, removable } = attributes;
    return {
      byId: { ...state.byId, [id]: { id, name, removable } },
      allIds: [...state.allIds, id],
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
}, { byId: {}, allIds: [] });

const currentChannelId = handleActions({
  [actions.setActiveChannel](state, { payload }) {
    return payload;
  },
}, 1);

export default combineReducers({
  channels,
  messages,
  currentChannelId,
  form: formReducer,
});
