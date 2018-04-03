import {
  USER_SEARCH_CHANGED,
  FIREBASE_USER_SEARCH
} from '../actions/types';


const INITIAL_STATE = {
  userSearchEntry: '',
  userSearchData: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_SEARCH_CHANGED:
      return { ...state, userSearchEntry: action.payload };
    case FIREBASE_USER_SEARCH:
      return { ...state, userSearchData: action.payload };
    default:
      return state;
  }
};
