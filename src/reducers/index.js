import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import SwipeReducer from './SwipeReducer';

export default combineReducers({
	auth: AuthReducer,
	swipe: SwipeReducer
});
