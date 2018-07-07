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
        dispatch({
          type: UPDATE_HOME_EVENTS,
          payload: data
        });
      }
    );
  };
};
