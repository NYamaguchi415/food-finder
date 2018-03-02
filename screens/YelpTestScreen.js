import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { yelpAPIKey } from '../config';

class YelpTestScreen extends Component {
  getYelpData() {
    console.log(`Bearer ${yelpAPIKey}`);
    return fetch('https://api.yelp.com/v3/businesses/search?term=essen&location=10010', {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${yelpAPIKey}`,
        'Content-Type': 'application/json'
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
      })
      .catch((error) => {
        console.log(error);
      });
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
