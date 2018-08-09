import {
  UPDATE_HOME_EVENTS,
  CREATE_EVENT_DRAFT,
  UNSELECT_EVENT,
  SELECT_EVENT
} from '../actions/types';

const INITIAL_STATE = {
  currentEventsData: {},
  currentEvent: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_HOME_EVENTS:
      return { ...state, currentEventsData: action.payload };
    case SELECT_EVENT:
      const event = state.currentEventsData[action.payload];
      return { ...state, currentEvent: event };
    case CREATE_EVENT_DRAFT:
      return { ...state, currentEvent: action.payload };
    case UNSELECT_EVENT:
      return { ...state, currentEvent: null}  
    default:
      return state;
    }
};
