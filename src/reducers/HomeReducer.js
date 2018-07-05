import {
	UPDATE_HOME_EVENTS
} from '../actions/types';

const INITIAL_STATE = {
  currentEventsData: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_HOME_EVENTS:
      return { ...state, currentEventsData: action.payload };
  default:
    return state;
  }
};
