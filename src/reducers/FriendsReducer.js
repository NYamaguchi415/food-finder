import {
  USER_SEARCH_CHANGED,
  FIREBASE_USER_SEARCH,
  UPDATE_FRIENDSLIST,
  ADD_FRIEND,
  SELECT_FRIEND
} from '../actions/types';


const INITIAL_STATE = {
  userSearchEntry: '',
  userSearchData: [],
  friendsList: {},
  selectedFriends: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_SEARCH_CHANGED:
      return { ...state, userSearchEntry: action.payload };
    case FIREBASE_USER_SEARCH:
      return { ...state, userSearchData: action.payload };
    case UPDATE_FRIENDSLIST:
      return { ...state, friendsList: action.payload };
    case ADD_FRIEND:
      return { ...state };
    case SELECT_FRIEND:
      const { selectedFriends } = state;
      if (selectedFriends[action.payload]) {
        delete selectedFriends[action.payload];
      } else {
        selectedFriends[action.payload] = true;
      }
      return { ...state, selectedFriends };
    default:
      return state;
  }
};
