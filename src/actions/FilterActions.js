import firebase from '../../firebaseInit';

import {
  GET_RESTAURANTS,
  FILTER_SELECTED
} from './types';

export const selectFilter = (filter) => {
    return {
		type: FILTER_SELECTED,
		payload: filter
	};    
}