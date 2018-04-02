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
    .limitToLast(2)
    .on('value',
      (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        dispatch({
          type: FIREBASE_USER_SEARCH,
          payload: data
        });
      }
    );
  };
};
