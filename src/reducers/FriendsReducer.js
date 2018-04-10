import {
  USER_SEARCH_CHANGED,
  FIREBASE_USER_SEARCH,
  UPDATE_FRIENDSLIST
} from '../actions/types';


const INITIAL_STATE = {
  userSearchEntry: '',
  userSearchData: [],
  friendsList: 'a'
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_SEARCH_CHANGED:
      return { ...state, userSearchEntry: action.payload };
    case FIREBASE_USER_SEARCH:
      return { ...state, userSearchData: action.payload };
    case UPDATE_FRIENDSLIST:
      return { ...state, friendsList: action.payload };
    default:
      return state;
  }
};
