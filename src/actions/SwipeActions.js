import {yelpAPIKey} from '../../config';
import firebase from '../../firebaseInit';
import {
    RESTAURANT_SWIPE_YES,
    RESTAURANT_SWIPE_YES_SUCCESS,
    RESTAURANT_SWIPE_YES_FAIL,
    RESTAURANT_SWIPE_NO,
    RESTAURANT_SWIPE_NO_SUCCESS,
    RESTAURANT_MATCH,
    GET_RESTAURANTS,
    SET_EVENT_ID,
    SET_ACTIVE_RESTAURANT,
    INDEX_UP,
    SET_USERS,
    OUT_OF_MATCHES,
    MATCH_OCCURED
} from './types';

export const getRestaurant = (keyName) => {
    const url = this.buildUrlFromId(keyName);
    const options = {headers: {authorization: `Bearer ${yelpAPIKey}`}};
    axios.get(url, options).then((response)=>{
      let business = response.data;
      console.log('active place', business);

    //   dispatch({type: GET_RESTAURANTS, payload: })
      this.setState({
        restaurant: {
            picture: business.image_url,
            name: business.name,
            votes: 0
        }
      });
    })
}

export const matchOccured = (dispatch, snapshot) => {
    if (snapshot.val() ===1) {
        dispatch({type: MATCH_OCCURED})
    }
}

export const getRestaurants = (uId, eventId) => {
    return dispatch => {    
        firebase.database().ref(`events/${eventId}/match`).on('value', (snapshot)=>{matchOccured(dispatch, snapshot)});
        dispatch({ type: SET_EVENT_ID, payload: eventId});
        firebase.database().ref('events').once('value')
        .then((eventSnapshot)=> {                
            const event = eventSnapshot.child(eventId).val();

            
            const users = event.users;
            const restaurants = event.restaurants;
            const activeRestaurantKey = Object.keys(restaurants)[0];
            const activeRestaurant = restaurants[activeRestaurantKey];
            const payload = {
                restaurants,
                index: 0,
                activeRestaurant                    
            }
            dispatch({type: INDEX_UP, payload: 0});                
            dispatch({type: SET_USERS, payload: users});                
            dispatch({type: GET_RESTAURANTS, payload: restaurants})
            dispatch({type: SET_ACTIVE_RESTAURANT, payload: activeRestaurant})
        })        
    }
}

export const match = () => {
    dispatch({ type: RESTAURANT_MATCH })
}

export const restaurantSwipeNo = (index, restaurants, event, restaurant, users) => {
    return (dispatch) => {
        index = index +1;
        dispatch({type: RESTAURANT_SWIPE_NO});
        dispatch({type: INDEX_UP, payload: index});
        const restaurantKey = restaurant.id;
        firebase.database().ref(`events/${event}/restaurants/${restaurantKey}/no`)
        .transaction((votes)=>{
            return votes + 1;
        }, (error, commited, snapshot) => {
            if (error) {
            } else if (!commited) {
            } else {
                if (index > Object.keys(restaurants).length - 1) {
                    dispatch({type: OUT_OF_MATCHES, payload: true})
                    return;
                }                 
                const key = Object.keys(restaurants)[index];
                const active = restaurants[key];                
                dispatch({type: RESTAURANT_SWIPE_NO_SUCCESS, payload: active});
            }})

    }
        
}    

export const restaurantSwipeYes = (index, restaurants, event, restaurant, users) => {
    return (dispatch) => {
        index = index +1;
        dispatch({type: RESTAURANT_SWIPE_YES});
        dispatch({type: INDEX_UP, payload: index});        
        const restaurantKey = restaurant.id;
        firebase.database().ref(`events/${event}/restaurants/${restaurantKey}/yes`)        
        .transaction((votes)=>{
            return votes + 1;
        }, (error, commited, snapshot) => {
            if (error) {
            } else if (!commited) {
            } else {
                const updatedVotes = snapshot.val();
                const userLength = Object.keys(users).length;
                if (updatedVotes === userLength) {
                    firebase.database().ref(`events/${event}`).child('match').set(1);
                    return;
                }
                if (index > Object.keys(restaurants).length - 1) {
                    dispatch({type: OUT_OF_MATCHES, payload: true})
                    return;
                }                 
                const key = Object.keys(restaurants)[index];
                const active = restaurants[key];
                
                dispatch({type: RESTAURANT_SWIPE_YES_SUCCESS, payload: active});
            }
        })
    }
}

export const restaurantSwipeYesSuccess = (restaurant) =>{
    dispatch({
        type: RESTAURANT_SWIPE_YES,
        payload: restaurant
    })     
}

export const setRestaurant = (restaurant) => {
    dispatch({
        type: SET_ACTIVE_RESTAURANT,
        payload: restaurant
    })
}