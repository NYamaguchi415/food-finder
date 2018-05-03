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
	// function to search for users based on user input
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

export const retrieveFriendsList = (currentUserId) => {
	// function to retrieve data for friendsList

	// retrieve logged in user's friends' uids
  return dispatch => {
    firebase.database().ref(`users/${currentUserId}/friends`)
    .on('value',
      (snapshot) => {
        const data = snapshot.val() || {};
        const userIds = Object.keys(data);
				const promises = userIds.map(
					userId => firebase.database().ref(`users/${userId}`).once('value')
				);

				// retrieve friends' usernames by using uids
				Promise.all(promises).then(results => {
					results.forEach(result => {
						data[result.key].userName = result.val().username;
						data[result.key].selected = false;
					});
					dispatch({
						type: UPDATE_FRIENDSLIST,
						payload: data
					});
				});
      }
    );
  };
};
