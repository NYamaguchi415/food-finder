import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import SwipeReducer from './SwipeReducer';
import FriendsReducer from './FriendsReducer';
import HomeReducer from './HomeReducer';
import FilterReducer from './FilterReducer';

export default combineReducers({
	auth: AuthReducer,
	friends: FriendsReducer,
	home: HomeReducer,
	swipe: SwipeReducer,
	filters: FilterReducer
});
