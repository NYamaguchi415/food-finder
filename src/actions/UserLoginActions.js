// import firebase from 'firebase';
import firebase from '../../firebaseInit';

import {
	EMAIL_CHANGED,
	PASSWORD_CHANGED,
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

export const loginUser = ({ email, password }) => {
	return (dispatch) => {
		dispatch({ type: LOGIN_USER });
		// Try logging in user. If error is thrown, try creating new
		// account for email this needs to be changed in the future
		// into a real account create vs login feature
		firebase.auth().signInWithEmailAndPassword(email, password)
			.then(user => loginUserSuccess(dispatch, user))
			.catch((error) => {
				firebase.auth().createUserWithEmailAndPassword(email, password)
					.then(user => createUserSuccess(dispatch, user, email))
					//.then(user => writeUserData(user))
					.catch(() => loginUserFail(dispatch));
				console.log(error);
			});
	};
};

const writeUserData = (user, email) => {
	const uid = user.uid;
	firebase.database().ref(`users/${uid}`).set({
		email
	});
};

const createUserSuccess = (dispatch, user, email) => {
	loginUserSuccess(dispatch, user);
	writeUserData(user, email);
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
