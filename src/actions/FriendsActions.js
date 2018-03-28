import firebase from '../../firebaseInit';

import {
	USER_SEARCH_CHANGED
} from './types';

export const userSearchChanged = (text) => {
	return {
		type: USER_SEARCH_CHANGED,
		payload: text
	};
};
