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
		usernameCheck(username).then((isAvailable)=>{
			if (isAvailable) {
				firebase.auth().createUserWithEmailAndPassword(email, password)
				.then(user => createUserSuccess(dispatch, user, email, username))
				.catch(() => loginUserFail(dispatch));				
			} else {
				console.log('taken');
			}
		})
	};
};

const usernameCheck = (username) => {
	return new Promise((resolve, reject)=>{
		let usernameGood = false;
		firebase.database().ref('users')
		.orderByChild('username').equalTo(username)
		.on('value', snapshot => {
			var val = snapshot.val();
			if (val) {
				return resolve(false);
			} else {
				return resolve(true);
			}
		})	
	})
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
