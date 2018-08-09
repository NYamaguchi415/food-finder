import {
    RESTAURANT_SWIPE_YES,
    RESTAURANT_SWIPE_YES_SUCCESS,
    RESTAURANT_SWIPE_YES_FAIL,
    RESTAURANT_SWIPE_NO,
    RESTAURANT_SWIPE_NO_SUCCESS,
    MATCH_OCCURED,
    RESTAURANT_MATCH,
    GET_RESTAURANTS,
    SET_EVENT_ID,
    SET_ACTIVE_RESTAURANT,
    INDEX_UP,
    SET_USERS,
    OUT_OF_MATCHES,
    UPDATE_TIME
} from '../actions/types';

const INITIAL_STATE = {
    restaurants: [],
    users: [],
    time: null,
    eventId: null,
    index: null,   
    matchOccured: undefined,    
    activeRestaurant: null,
    outOfMatches: undefined,
    outOfTime: undefined
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case GET_RESTAURANTS:
            return { ...state, restaurants: action.payload }
        case SET_EVENT_ID: 
            return  { ...state, eventId: action.payload }
        case SET_ACTIVE_RESTAURANT:
            return { ...state, activeRestaurant: action.payload }
        case RESTAURANT_SWIPE_YES:
            return  state;            
        case RESTAURANT_SWIPE_YES_SUCCESS:
            return {...state, activeRestaurant: action.payload, }
        case RESTAURANT_SWIPE_NO_SUCCESS:
            return {...state, activeRestaurant: action.payload, }
        case SET_USERS:
            return {...state, users: action.payload};
        case INDEX_UP:
            return {...state, index: action.payload};
        case OUT_OF_MATCHES:
            return {...state, outOfMatches: true};
        case MATCH_OCCURED:
        case RESTAURANT_MATCH:
            return {...state, matchOccured: true}
        case UPDATE_TIME:
            return {...state, time: action.payload}
        default:
			return state;
	}
};
