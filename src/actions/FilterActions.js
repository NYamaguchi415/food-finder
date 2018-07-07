import firebase from '../../firebaseInit';
import {yelpAPIKey} from '../../config';
import axios from 'axios';

import {
  SET_RESTAURANTS_AS_OWNER,
  SET_RESTAURANTS_AS_OWNER_FAILURE,
  FILTER_SELECTED,
  FILTERS_FINALIZED
} from './types';

export const selectFilter = (filter) => {
    return {
		type: FILTER_SELECTED,
		payload: filter
	};    
}

export const setRestaurantsAsGroupOwner = (filters, auth) => {
  return (dispatch) => {
    dispatch({type: FILTERS_FINALIZED});
    const filterObject = filters;
    const categories = Object.keys(filterObject);
    const url = buildUrlFromCategories(categories);  
    const options = {headers: {authorization: `Bearer ${yelpAPIKey}`}};
    axios.get(url, options)
    .then(response=>proceed(dispatch, response, auth))
    .catch((e)=>{
      dispatch({type: SET_RESTAURANTS_AS_OWNER_FAILURE});
    })
  }
}

proceed = (dispatch, response, auth) => {
  let businesses = response.data && response.data.businesses;    
  const uId = auth.user.uid; 
  firebase.database().ref('users').child(uId).once('value', snapshot => {
    const eventId = snapshot.val().currentEvent_id;
    let restaurants = {};
    businesses.forEach((r)=>{
      const key = r.id;
      restaurants[key] = {
          name: r.name, no: 0, yes: 0, id: r.id
        }
      });
      firebase.database().ref('events').child(eventId).update(
        {restaurants: restaurants}
      ).then(()=>{
        dispatch({type: SET_RESTAURANTS_AS_OWNER});
      })
  })
  
}

buildUrlFromCategories= (categories) => {
  categories.forEach((c, i)=> {
    categories[i] = c.toLowerCase();
  })
  const categoryString = categories.join(",");
  let url = 'https://api.yelp.com/v3/businesses/search?term=restaurants&location=NewYork';
  url += '&categories=' + categoryString;
  return url;
}
