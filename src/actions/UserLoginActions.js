import firebase from '../../firebaseInit';

import {
	EMAIL_CHANGED,
	PASSWORD_CHANGED,
	USERNAME_CHANGED,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAIL,
	LOGIN_USER
} from './types';

export const emailChanged = (text) => {
	return {
		type: EMAIL_CHANGED,
		payload: text
	};
};

export const passwordChanged = (text) => {
	return {
		type: PASSWORD_CHANGED,
		payload: text
	};
};

export const usernameChanged = (text) => {
	return {
		type: USERNAME_CHANGED,
		payload: text
	};
};

export const loginUser = ({ email, password }) => {
	return (dispatch) => {
		dispatch({ type: LOGIN_USER });
		// Try logging in user
		firebase.auth().signInWithEmailAndPassword(email, password)
			.then(user => loginUserSuccess(dispatch, user))
			.catch((error) => {
				loginUserFail(dispatch);
				console.log(error);
			});
	};
};

export const signupUser = ({ email, password, username }) => {
	return (dispatch) => {
		dispatch({ type: LOGIN_USER });
		if (usernameCheck(username)) {
			firebase.auth().createUserWithEmailAndPassword(email, password)
				.then(user => createUserSuccess(dispatch, user, email, username))
				.catch(() => loginUserFail(dispatch));
		} else {
			console.log('username taken');
		}
	};
};

const usernameCheck = (username) => {
	let usernameGood = false;
	firebase.database().ref('users')
	.orderByChild('username').equalTo(username)
	.on('value', snapshot => {
		if (snapshot.exists()) {
			usernameGood = false;
		} else {
			usernameGood = true;
		}
	});
	return (usernameGood);
};

const writeUserData = (user, email, username) => {
	const uid = user.uid;
	firebase.database().ref(`users/${uid}`).set({
		email,
		username
	});
};

const createUserSuccess = (dispatch, user, email, username) => {
	loginUserSuccess(dispatch, user);
	writeUserData(user, email, username);
};

const loginUserSuccess = (dispatch, user) => {
	dispatch({
		type: LOGIN_USER_SUCCESS,
		payload: user
	});
};

const loginUserFail = (dispatch) => {
	dispatch({
		type: LOGIN_USER_FAIL
	});
};
