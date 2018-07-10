import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, Dimensions } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import firebase from '../firebaseInit';
import { retrieveFriendsList, selectFriend } from '../src/actions/FriendsActions';

const SCREEN_HEIGHT = Dimensions.get('window').height;

class FriendsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Food-Finder',
    headerRight: (
      <Button
        title='+'
        color='blue'
        onPress={() => navigation.navigate('UserSearch')}
      />
    )
  })

  componentDidMount() {
    this.props.retrieveFriendsList(this.props.user.uid);
  }

  userIdMapper() {
    const userIds = {};
    const selectedFriends = this.state.friends.filter(friend => friend.selected === true);
    selectedFriends.forEach((userId) => {
      userIds[userId.key] = 0;
    });
    return userIds;
  }

  friendSelected(friendUserId) {
    this.props.selectFriend(friendUserId);
  }

  proceed() {
    const users = this.props.selectedFriends;
    users[this.props.user.uid] = true;
    const newEvent = {
      createdTime: new Date(),
      name: 'Lunch!',
      match: 0,
      users
    };
    // Creates a new event in db when user proceeds to filter screen
    const eventId = firebase.database().ref('events').push();
    eventId.set(newEvent);

    //
    Object.keys(users).forEach((userId) => {
      firebase.database().ref('users')
      .child(userId)
      .child('events')
      .child(eventId.key)
      .set({ complete: false });
    });
    this.props.navigation.navigate('FoodFilters');
  }

  render() {
    return (
      <View style={{ paddingTop: SCREEN_HEIGHT * 0.05 }}>
        <Text>FRIENDS</Text>
        <View style={{ height: SCREEN_HEIGHT * 0.8 }}>
          <List>
            {
              (Object.keys(this.props.friendsList)).map((key) => (
                <ListItem
                  title={this.props.friendsList[key].userName}
                  key={key}
                  roundAvatar
                  onPress={this.friendSelected.bind(this, key)}
                  rightIcon={{ name: 'check',
                    type: 'font-awesome',
                    style: {
                      marginRight: 10,
                      fontSize: 15,
                      color: (this.props.selectedFriends[key]) ? 'green' : 'white'
                    }
                  }}
                />
              ))
            }
          </List>
          <Button
            title='Proceed'
            onPress={this.proceed.bind(this)}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ auth, friends }) => {
  const { user } = auth;
  const { friendsList, selectedFriends } = friends;
  return { user, friendsList, selectedFriends };
};

export default connect(mapStateToProps, {
  retrieveFriendsList, selectFriend
})(FriendsScreen);
