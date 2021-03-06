import {
	EMAIL_CHANGED,
	PASSWORD_CHANGED,
	CONFIRMATION_PASSWORD_CHANGED,
	USERNAME_CHANGED,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAIL,
	LOGIN_USER } from '../actions/types';

const INITIAL_STATE = {
	email: 'naoki@havenlife.com',
	password: 'Password123',
	confirmationPassword: 'Password123',
	username: '',
	user: null,
	error: '',
	loading: false
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case EMAIL_CHANGED:
			return { ...state, email: action.payload, error: '' };
		case PASSWORD_CHANGED:
			return { ...state, password: action.payload, error: '' };
		case CONFIRMATION_PASSWORD_CHANGED:
			return { ...state, confirmationPassword: action.payload, error: '' };
		case USERNAME_CHANGED:
			return { ...state, username: action.payload, error: '' };
		case LOGIN_USER_SUCCESS:
			return { ...state, ...INITIAL_STATE, user: action.payload, };
		case LOGIN_USER_FAIL:
			return { ...state, error: action.payload, password: '', loading: false };
		case LOGIN_USER:
			return { ...state, loading: true, error: '' };
		default:
			return state;
	}
};
