import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

class MainScreen extends Component {
  render() {
    return (
      <View>
        <Text> OK TESTING </Text>
        <Button
          title='Press This'
          onPress={() => this.props.navigation.navigate('swipe')}
        /> 
      </View>
    );
  }
}

export default MainScreen;
