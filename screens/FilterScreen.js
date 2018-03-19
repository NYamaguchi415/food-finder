import React, { Component } from 'react';
import { View, FlatList, TouchableHighlight, Dimensions, Button, StyleSheet } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import firebase from '../firebaseInit';
import {yelpAPIKey} from '../config';
import axios from 'axios';
//const SCREEN_HEIGHT = Dimensions.get('window').height;

import FilterList from './components/filters/FilterList';

class FilterScreen extends Component {

  buildUrlFromCategories(categories) {
    let url = 'https://api.yelp.com/v3/businesses/search?term=restaurants&location=NewYork';
    url += '&categories=';
    categories.forEach((c)=> {
      url += c + ',';
    })
    return url;
  }

  getRestaurants() {
    const categories = ['italian', 'mexican', 'thai'];
    const url = this.buildUrlFromCategories(categories);
    const options = {headers: {authorization: `Bearer ${yelpAPIKey}`}};
    return axios.get(url, options);
  }

  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
    }
  }

  static navigationOptions = {
    title: 'Filters',
  };


  proceed(response) {
    let businesses = response.data && response.data.businesses;    
    const uId = firebase.auth().currentUser.uid;    
    firebase.database().ref('users').child(uId).once('value', snapshot => {
      const eventId = snapshot.val().currentEvent_id;

      // let restaurants = 
      let restaurants = {};

      // problem with this is that by using the name as keys we get weird errors, maybe just strip out special characters for now
      businesses.forEach((r)=>{
        // const key = r.name.replace(/[\.\#\$\[\]\/]/g, "");
        const key = r.id;
        restaurants[key] = {
            name: r.name, no: 0, yes: 0, id: r.id
          }
        });
      firebase.database().ref('events').child(eventId).update(
        {restaurants: restaurants}
      );

      businesses.forEach((r)=>{
        firebase.database().ref('restaurants').push(r);
      })
      this.props.navigation.navigate('swipe');
      
    });
  }

  getRestaurantsAndProceed() {
    this.getRestaurants.call(this)
      .then(this.proceed.bind(this));      
  }

  render() {
    return (
      <View>
        <View>
          <List>
            <FlatList
              data={[{ key: 'American' }, { key: 'Chinese' }, { key: 'Halal' },
               { key: 'Indian' }, { key: 'Italian' }, { key: 'Japanese' },
               { key: 'Mexican' }, { key: 'Thai' }, { key: 'Ukranian' }]}
              renderItem={({ item }) =>
                <ListItem
                  title={item.key}
                  hideChevron
                />
              }
            />
          </List>
        </View>
        <Button
          title='Start Swiping'
          onPress={this.getRestaurantsAndProceed.bind(this)}
        />
      </View>
    );
  }
}

export default FilterScreen;

const styles = StyleSheet.create({
  filterButtonStyle: {
    flex: 1,
    height: 50,
    width: 50,
    borderWidth: 2,
    borderRadius: 10,
    padding: 2,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
