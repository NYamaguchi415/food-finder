import {
  USER_SEARCH_CHANGED
} from '../actions/types';


const INITIAL_STATE = {
  userSearchEntry: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_SEARCH_CHANGED:
      return { ...state, userSearchEntry: action.payload };
    default:
      return state;
  }
};
