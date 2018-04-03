import firebase from '../../firebaseInit';

import {
	USER_SEARCH_CHANGED,
  FIREBASE_USER_SEARCH
} from './types';

export const userSearchChanged = (text) => {
	return {
		type: USER_SEARCH_CHANGED,
		payload: text
	};
};

export const firebaseUserSearch = (text) => {
  return dispatch => {
    firebase.database().ref('users')
    .orderByChild('username')
    .startAt(text)
    .endAt(`${text}zzzz`)
    .on('value',
      (snapshot) => {
        const data = snapshot.val();
        const userList = [];
        Object.keys(data).forEach((key) => {
          userList.push({ key, username: data[key].username });
        });
        dispatch({
          type: FIREBASE_USER_SEARCH,
          payload: userList
        });
      }
    );
  };
};
