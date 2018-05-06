import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import SwipeReducer from './SwipeReducer';
import FriendsReducer from './FriendsReducer';

export default combineReducers({
	auth: AuthReducer,
	friends: FriendsReducer,
	swipe: SwipeReducer
});
