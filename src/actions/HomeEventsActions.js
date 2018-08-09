import firebase from '../../firebaseInit';

import {
	UPDATE_HOME_EVENTS,
	CREATE_EVENT_DRAFT,
	SELECT_EVENT,
	UNSELECT_EVENT
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

export const createEvent = () => {
	return dispatch => {

		const startTime = new Date();
		startTime.setHours(19, 30);
		const newEvent = {
			createdTime: firebase.database.ServerValue.TIMESTAMP,
			startTime: startTime.getTime(),
			name: 'Lunch!',
			match: 0,
			status: 'DRAFT'
		};

		// Creates a new event in db when user proceeds to filter screen
		const eventId = firebase.database().ref('events').push()
		eventId.set(newEvent).then(()=>{
			newEvent.id = eventId.key;
			dispatch({type:CREATE_EVENT_DRAFT, payload: newEvent})
		})
	}
}

export const selectEvent = (eventId) => {
	return { type: SELECT_EVENT, payload: eventId}
}

export const unselectEvent = () => {
	return {type: UNSELECT_EVENT }
}