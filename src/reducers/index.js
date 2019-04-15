import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const channels = handleActions({
  [actions.addChannel](state) {
    return state;
  },
}, { byId: {}, allIds: [] });

const messages = handleActions({
  [actions.addMessage](state) {
    return state;
  },
}, { byId: {}, allIds: [] });

const currentChannelId = handleActions({
  [actions.setActiveChannel](state, { payload: { id } }) {
    return id;
  },
}, 1);

export default combineReducers({
  channels,
  messages,
  currentChannelId,
});
