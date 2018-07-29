import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, Dimensions } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import firebase from '../firebaseInit';
import { retrieveFriendsList, selectFriend } from '../src/actions/FriendsActions';
import { unselectEvent } from '../src/actions/HomeEventsActions';

const SCREEN_HEIGHT = Dimensions.get('window').height;

class EventFriendsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Food-Finder',
    headerLeft: (
      <Button
        title='Cancel'
        color='black'
        onPress={() => { navigation.navigate('Home');
          navigation.state.params.unselect();
         } }
      />
    )
  })

  navigateHome(navigation) {
    this.props.unselectEvent();
    navigation.navigate('Home')
  }
  componentDidMount() {
    this.props.navigation.setParams({unselect: this.props.unselectEvent.bind(this)});
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
    // const eventKey = this.props.currentEvent;
    const eventKey = this.props.currentEvent.id;
    let updates = {};
    Object.keys(users).forEach((userId) => {
      updates['/events/' + eventKey + '/users/' + userId + '/status'] = 'PENDING';
      updates['/users/' + userId + '/events/' + eventKey + '/status'] = 'DRAFT';
    })
    updates['/events/' + eventKey + '/users/' + this.props.user.uid + '/status'] = 'ACCEPTED';
    updates['/users/' + this.props.user.uid + '/events/' + eventKey + '/status'] = 'DRAFT';
    
    firebase.database().ref().update(updates)
    .then(()=> {
      this.props.navigation.navigate('FoodFilters');      
    })
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
                      color: (this.props.selectedFriends[key] && this.props.selectedFriends[key].selected) ? 'green' : 'white'
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

const mapStateToProps = ({ auth, friends, home }) => {
  const { currentEvent } = home;
  const { user } = auth;
  const { friendsList, selectedFriends } = friends;
  return { user, friendsList, selectedFriends, currentEvent };
};

export default connect(mapStateToProps, {
  retrieveFriendsList, selectFriend, unselectEvent
})(EventFriendsScreen);
