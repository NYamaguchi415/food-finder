import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import FriendsReducer from './FriendsReducer';
import HomeReducer from './HomeReducer';

export default combineReducers({
	auth: AuthReducer,
	friends: FriendsReducer,
	home: HomeReducer
});
