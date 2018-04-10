import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, Dimensions } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import firebase from '../firebaseInit';
import { retrieveFriendsList } from '../src/actions/FriendsActions';

const SCREEN_HEIGHT = Dimensions.get('window').height;

class FriendsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Food-Finder',
    headerRight: (
      <Button
        title='+'
        color='blue'
        onPress={() => navigation.navigate('userSearchScreen')}
      />
    )
  })

  constructor(props) {
    super(props);
    this.state = { friends: [] };
  }

  componentWillMount() {
    // Check whether user has a current Event to send them to an Event if they have
    firebase.database().ref('users').child(this.props.user.uid).once('value')
    .then((userSnapshot) => {
        const eventId = userSnapshot.val().currentEvent_id;
        if (eventId) {
              this.props.navigation.navigate('swipe');
        }
      }
    );

    retrieveFriendsList(this.props.user.uid);

    firebase.database().ref('users')
    .child(this.props.user.uid)
    .child('friends')
    .on('value', (snapshot) => {
      const result = snapshot.val();
      const friends = [];
      Object.keys(result).forEach((key) => {
        if (key === this.props.user.uid) {
          friends.push({ key, email: result[key].email, selected: true });
        } else {
          friends.push({ key, email: result[key].email, selected: false });
        }
      });
      this.setState({ friends });
    });
  }

  userIdMapper() {
    const userIds = {};
    const selectedFriends = this.state.friends.filter(friend => friend.selected === true);
    selectedFriends.forEach((userId) => {
      userIds[userId.key] = 0;
    });
    return userIds;
  }

  friendSelected(index) {
    const data = this.state.friends;
    data[index].selected = !data[index].selected;
    this.setState({ friends: data });
  }

  proceed() {
    retrieveFriendsList(this.props.user.uid);
    console.log(this.props.friendsList);
    // const users = this.userIdMapper();
    // const newEvent = {
    //   createdTime: new Date(),
    //   match: 0,
    //   users
    // };
    // // Creates a new event in db when user proceeds to filter screen
    // const eventId = firebase.database().ref('events').push();
    // eventId.set(newEvent);
    // // Sets the created event id on every user involved as a currentEvent_id
    // Object.keys(users).forEach((userId) => {
    //   firebase.database().ref('users')
    //   .child(userId)
    //   .child('currentEvent_id')
    //   .set(eventId.key);
    // });
    // this.props.navigation.navigate('filterScreen');
  }

  render() {
    return (
      <View style={{ paddingTop: SCREEN_HEIGHT * 0.05 }}>
        <Text>FRIENDS</Text>
        <View style={{ height: SCREEN_HEIGHT * 0.8 }}>
          <List>
            {
              this.state.friends.filter(
                user => user.key !== this.props.user.uid
              ).map((item, i) => (
                <ListItem
                  title={item.email}
                  key={i}
                  roundAvatar
                  onPress={this.friendSelected.bind(this, i)}
                  rightIcon={{ name: 'check',
                    type: 'font-awesome',
                    style: { marginRight: 10,
                      fontSize: 15,
                      color: (item.selected) ? 'green' : 'white'
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
  const { friendsList } = friends;
  return { user, friendsList };
};

export default connect(mapStateToProps, {
  retrieveFriendsList
})(FriendsScreen);
