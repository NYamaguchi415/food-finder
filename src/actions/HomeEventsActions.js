import firebase from '../../firebaseInit';

import {
	UPDATE_HOME_EVENTS
} from './types';

export const retrieveHomeEvents = (currentUserId) => {
	// function to retrieve data for friendsList
	// retrieve logged in user's friends' uids
  return dispatch => {
    firebase.database().ref(`users/${currentUserId}/events`)
    .on('value',
      (snapshot) => {
        const data = snapshot.val() || {};
				console.log(data);
        // const eventIds = Object.keys(data);
        dispatch({
          type: UPDATE_HOME_EVENTS,
          payload: data
        });
				// const promises = eventIds.map(
				// 	userId => firebase.database().ref(`users/${userId}`).once('value')
				// );
        //
				// // retrieve friends' usernames by using uids
				// Promise.all(promises).then(results => {
				// 	results.forEach(result => {
				// 		data[result.key].userName = result.val().username;
				// 		data[result.key].selected = false;
				// 	});
				// 	dispatch({
				// 		type: UPDATE_FRIENDSLIST,
				// 		payload: data
				// 	});
				// });
      }
    );
  };
};
