import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
// import { yelpAPIKey } from '../config';

// const yelp = require('yelp-fusion')
// const searchRequest = {
//   term: 'Four Barrel Coffee',
//   location: 'san francisco, ca'
// };
// const client = yelp.client(yelpAPIKey);

// return fetch('https://facebook.github.io/react-native/movies.json')
//   .then((response) => response.json())
//   .then((responseJson) => {
//     return responseJson.movies;
//   })
//   .catch((error) => {
//     console.error(error);
//   });

//const yelp = require('yelp-fusion');


class YelpTestScreen extends Component {
  getYelpData() {
    console.log('API CALL');
    return fetch('https://api.yelp.com/v3/businesses/search');
  }

  render() {
    return (
      <View>
        <Text>hello</Text>
        <Button
          title='Make Yelp API Call'
          onPress={this.getYelpData}
        />
      </View>
    );
  }
}

export default YelpTestScreen;
