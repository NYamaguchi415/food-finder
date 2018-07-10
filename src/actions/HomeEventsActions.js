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
				const eventIds = Object.keys(data);
				const promises = eventIds.map(
					eventId => firebase.database().ref(`events/${eventId}`).once('value')
				);
				Promise.all(promises).then(results => {
					results.forEach(result => {
						console.log(result.key);
						console.log(result.val());
						data[result.key].name = result.val().name;
						data[result.key].createdTime = result.val().createdTime;
						console.log(data);
					});
					dispatch({
						type: UPDATE_HOME_EVENTS,
						payload: data
					});
				});
      }
    );
  };
};
