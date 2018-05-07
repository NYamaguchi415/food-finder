import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import SwipeReducer from './SwipeReducer';
import FriendsReducer from './FriendsReducer';
import FilterReducer from './FilterReducer';

export default combineReducers({
	auth: AuthReducer,
	friends: FriendsReducer,
	swipe: SwipeReducer,
	filters: FilterReducer
});
