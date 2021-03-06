import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { SearchBar, List, ListItem, Button } from 'react-native-elements';
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

  componentDidMount() {
    this.searchBarChanged();
  }

  searchBarChanged(text) {
    this.props.userSearchChanged(text);
    this.props.firebaseUserSearch(text);
  }

  userSearchItemSelected = (selectedUserId) => {
    // Function to add or delete user as friend when selected from listview
    this.userCheckFriendStatus(selectedUserId).then((isFriend) => {
			if (isFriend) {
        this.friendRemove(selectedUserId);
			} else {
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
    // Function to add user as friend

    // Set selected user id as a friend in current user's data
    firebase.database().ref(`users/${this.props.user.uid}/friends`)
    .child(selectedUserId)
    .set({
      // This needs to be changed eventually
      status: 'accepted'
    });

    // Set current user's id as a friend in selected user's data
    firebase.database().ref(`users/${selectedUserId}/friends`)
    .child(`${this.props.user.uid}`)
    .set({
      // This needs to be changed eventually
      status: 'accepted'
    });
  };

  friendRemove = (selectedUserId) => {
    // Function to remove user from friends

    // Remove selected user id as a friend in current user's data
    firebase.database().ref(`users/${this.props.user.uid}/friends`)
    .child(selectedUserId)
    .set(null);

    // Remove current user's id as a friend in selected user's data
    firebase.database().ref(`users/${selectedUserId}/friends`)
    .child(`${this.props.user.uid}`)
    .set(null);
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
            this.props.userSearchData.filter(user => user.key !== this.props.user.uid).map((data) => (
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
          title='Press Me'
          onPress={() => console.log(this.props.userSearchData)}
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
