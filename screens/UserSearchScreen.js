import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SearchBar } from 'react-native-elements';

class UserSearchScreen extends Component {
  static navigationOptions = {
    title: 'User Search',
  };

  render() {
    return (
      <View>
        <Text>
          HELLLLOOOOOO
        </Text>
        <SearchBar
          placeholder='Search'
        />
      </View>
    );
  }
}

export default UserSearchScreen;
