import firebase from '../../firebaseInit';

import {
	USER_SEARCH_CHANGED,
  FIREBASE_USER_SEARCH,
  UPDATE_FRIENDSLIST
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
        if (data) {
          Object.keys(data).forEach((key) => {
            userList.push({ key, username: data[key].username });
          });
        }
        dispatch({
          type: FIREBASE_USER_SEARCH,
          payload: userList
        });
      }
    );
  };
};

// export const friendAddDelete = (key) => {
//   return dispatch => {
//     firebase.database().ref('users').child('z61EzxVAi4dpUbNB9kvkAmI3o2n1')
//     .child('friends')
//     .child(key)
//     .update()
//   };
// };

export const retrieveFriendsList = (uid) => {
  console.log(uid);
  return dispatch => {
    firebase.database().ref('users')
    .child(uid)
    .child('friends')
    .on('value',
      (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        dispatch({
          type: UPDATE_FRIENDSLIST,
          payload: 'friendsList'
        });
      }
    );
  };
};
