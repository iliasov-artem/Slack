import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const channels = handleActions({
  [actions.addChannel](state) {
    return state;
  },
}, { byId: {}, allIds: [] });

const messages = handleActions({
  [actions.addMessage](state, { payload }) {
    const {
      data: {
        data: {
          attributes: {
            id, message, channelId, user,
          },
        },
      },
    } = payload;
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
  [actions.setActiveChannel](state) {
    return state;
  },
}, 1);

export default combineReducers({
  channels,
  messages,
  currentChannelId,
  form: formReducer,
});
