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

export const setRestaurantsAsGroupOwner = (filters, auth, home) => {
  return (dispatch) => {
    dispatch({type: FILTERS_FINALIZED});
    console.log(filters);
    const filterObject = filters;
    const categories = Object.keys(filterObject);
    const url = buildUrlFromCategories(categories);  
    const options = {headers: {authorization: `Bearer ${yelpAPIKey}`}};
    axios.get(url, options)
    .then(response=>proceed(dispatch, response, auth, home))
    .catch((e)=>{
      dispatch({type: FILTERS_FINALIZED});
    })

  }
}

getRestaurants = () => {
  return axios.get(url, options);
}

proceed = (dispatch, response, auth, home) => {
  let businesses = response.data && response.data.businesses;    
  const uId = auth.user.uid; 
  const eventId = home.currentEvent.id;
  const restaurants = {};
  businesses.forEach((r)=>{
    const key = r.id;
    restaurants[key] = {
        name: r.name, 
        no: 0,
        yes: 0, 
        id: r.id
      }
  });
  
  const updates = {}
  updates['events/' + eventId + '/restaurants'] = restaurants;
  updates['events/' + eventId + '/status'] = 'STARTED';
  updates['users/' + uId + '/events/' + eventId + '/status'] = 'STARTED';
  firebase.database().ref().update(updates)
    .then(()=>{
      dispatch({type: SET_RESTAURANTS_AS_OWNER});
    })  
}

buildUrlFromCategories= (categories) => {
  categories.forEach((c, i)=> {
    categories[i] = c.toLowerCase();
    // url += c.toLowerCase() + ',';
  })

  const categoryString = categories.join(",");

  let url = 'https://api.yelp.com/v3/businesses/search?term=restaurants&location=NewYork';
  url += '&categories=' + categoryString;
  // categories.forEach((c)=> {
  //   url += c.toLowerCase() + ',';
  // })
  return url;
}
