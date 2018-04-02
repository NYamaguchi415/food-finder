import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { SearchBar } from 'react-native-elements';
import { userSearchChanged, firebaseUserSearch } from '../src/actions/FriendsActions';


class UserSearchScreen extends Component {
  static navigationOptions = {
    title: 'User Search',
  };

  searchBarChanged(text) {
    this.props.userSearchChanged(text);
    this.props.firebaseUserSearch(text);
  }

  buttonPressed() {
    console.log(this.props.userSearchData);
  }

  render() {
    return (
      <View>
        <Text>
          HELLLLOOOOOO
        </Text>
        <SearchBar
          placeholder='Search'
          autoCorrect={false}
          autoCapitalize='none'
          onChangeText={
            this.searchBarChanged.bind(this)
          }
          value={this.props.userSearchEntry}
        />
        <Button
          title='test check'
          onPress={this.buttonPressed.bind(this)}
        />
      </View>
    );
  }
}

//export default UserSearchScreen;

const mapStateToProps = ({ friends }) => {
  const { userSearchEntry, userSearchData } = friends;
  return { userSearchEntry, userSearchData };
};

export default connect(mapStateToProps, {
  userSearchChanged,
  firebaseUserSearch
})(UserSearchScreen);
