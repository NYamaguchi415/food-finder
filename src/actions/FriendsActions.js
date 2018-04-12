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

// export const friendAdd = (uid, friendUserId) => {
//   firebase.database().ref(`users/${uid}/friends`)
//   .child(friendUserId)
// 	.set({
// 		accepted: true
// 	});
// };

// export const friendSelected = (friendUserId) => {
// 	return {
// 		type: FRIEND_SELECTED,
// 		payload:
// 	}
// };

export const retrieveFriendsList = (currentUserId) => {
  return dispatch => {
    firebase.database().ref(`users/${currentUserId}/friends`)
    .on('value',
      (snapshot) => {
        const data = snapshot.val() || {};
        const userIds = Object.keys(data);
				const promises = userIds.map(
					userId => firebase.database().ref(`users/${userId}`).once('value')
				);

				Promise.all(promises).then(results => {
					results.forEach(result => {
						data[result.key].userName = result.val().username;
						data[result.key].selected = false;
					});
				});

        dispatch({
          type: UPDATE_FRIENDSLIST,
          payload: data
        });
      }
    );
  };
};

// return (dispatch) => {
// 	firebase.database().ref(`/feed/${currentUser.uid}`).on('value', snapshots => {
// 		const values = snapshots.val() || {};
// 		const entryIds = Object.keys(values);
// 		const promises = entryIds.map(
// 			eventId => firebase.database().ref(`/events/${eventId}`).once('value')
// 		);
//
// 		Promise.all(promises).then(results => {
// 			results.forEach(result => {
// 				values[result.key] = result.val();
// 			});
// 			dispatch({ type: EVENTS_FETCH_SUCCESS, payload: values });
// 		});
// 	});
// };
