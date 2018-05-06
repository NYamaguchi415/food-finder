import React, { Component } from 'react';
import { View, Button } from 'react-native';
import { connect } from 'react-redux';
import { SearchBar, List, ListItem } from 'react-native-elements';
import {
  userSearchChanged,
  userSearchItemSelected,
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

  userSearchItemSelected = (selectedUserId) => {
    this.userCheckFriendStatus(selectedUserId).then((isFriend) => {
			if (isFriend) {
        console.log('delete friend');
        this.friendRemove(selectedUserId);
			} else {
        console.log('add friend');
				this.friendAdd(selectedUserId);
			}
    });
  };

  userCheckFriendStatus = (selectedUserId) => {
  // Function to check whether the selected user is already a friend or not
    return new Promise((resolve) => {
      const ref = firebase.database().ref(`users/${this.props.user.uid}/friends`);
      ref.once('value', snapshot => {
        const val = snapshot.hasChild(selectedUserId);
        if (val) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  };

  friendAdd = (selectedUserId) => {
    firebase.database().ref(`users/${this.props.user.uid}/friends`)
    .child(selectedUserId)
    .set({
      accepted: true
    });
  };

  friendRemove = (selectedUserId) => {
    firebase.database().ref(`users/${this.props.user.uid}/friends`)
    .child(selectedUserId)
    .set(null);
  }

  buttonPressed() {
    console.log('hello');
  }

  friendsListItemPressed(friendUserId) {
    this.friendSelected(friendUserId);
  }

  render() {
    return (
      <View>
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
                onPress={this.userSearchItemSelected.bind(this, data.key)}
                rightIcon={{ name: 'check',
                  type: 'font-awesome',
                  style: {
                    marginRight: 10,
                    fontSize: 15,
                    color: (this.props.friendsList[data.key]) ? 'green' : 'white'
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
  userSearchItemSelected,
  firebaseUserSearch,
  retrieveFriendsList
})(UserSearchScreen);
