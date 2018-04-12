import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { SearchBar, List, ListItem } from 'react-native-elements';
import {
  userSearchChanged,
  firebaseUserSearch,
  retrieveFriendsList
 } from '../src/actions/FriendsActions';
import firebase from '../firebaseInit';

class UserSearchScreen extends Component {
  static navigationOptions = {
    title: 'User Search',
  };

  searchBarChanged(text) {
    this.props.userSearchChanged(text);
    this.props.firebaseUserSearch(text);
  }

  friendAdd = (friendUserId) => {
    firebase.database().ref(`users/${this.props.user.uid}/friends`)
    .child(friendUserId)
    .set({
      accepted: true
    });
  };

  buttonPressed() {
    retrieveFriendsList(this.props.user.uid);
    console.log(this.props.friendsList);
  }

  friendsListItemPressed() {
    console.log('hello');
    // console.log(friendUserId);
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
        <List>
          {
            this.props.userSearchData.map((data) => (
              <ListItem
                title={data.username}
                key={data.key}
                roundAvatar
                onPress={() => this.friendsListItemPressed}
                rightIcon={{ name: 'check',
                  type: 'font-awesome',
                  style: {
                    marginRight: 10,
                    fontSize: 15
                    // color: (data.selected) ? 'green' : 'white'
                  }
                }}
              />
            ))
          }
        </List>
        <Button
          title='test check'
          onPress={this.buttonPressed.bind(this)}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ friends, auth }) => {
  const { userSearchEntry, userSearchData, friendsList } = friends;
  const { user } = auth;
  return { userSearchEntry, userSearchData, user, friendsList };
};

export default connect(mapStateToProps, {
  userSearchChanged,
  firebaseUserSearch,
  retrieveFriendsList
})(UserSearchScreen);
