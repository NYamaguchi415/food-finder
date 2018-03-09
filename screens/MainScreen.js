import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, Dimensions } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import firebase from '../firebaseInit';


const SCREEN_HEIGHT = Dimensions.get('window').height;

class MainScreen extends Component {

  static navigationOptions = {
    headerTitle: 'Food-Finder',
    headerRight: (
      <Button
        onPress={() => alert('this will be used later')}
        title='+'
        color='blue'
      />
    )
  }

  constructor(props) {
    super(props);
    this.state = { friends: [] };
  }

  componentWillMount() {
    //const self = this;
    const url = 'users';
    // firebase.database().ref('users').child(this.props.user.uid).once('value')
    // .then((userSnapshot) => {
    //     const eventId = userSnapshot.val().currentEvent_id;
    //     console.log(eventId);
    //     if (eventId) {
    //           this.props.navigation.navigate('swipe');
    //     }
    //   });

    firebase.database().ref(url).once('value', (snapshot) => {
      const result = snapshot.val();
      const friends = [];
      Object.keys(result).forEach((key) => {
        friends.push({ key, email: result[key].email, selected: false });
      });
      this.setState({ friends });
    });
  }

  // userIdMapper() {
  //   const userIds = {};
  //   this.state.users.forEach((userId) => {
  //     userIds[userId.key] = 0;
  //   });
  //   return userIds;
  // }

  friendSelected(index) {
    const data = this.state.friends;
    data[index].selected = !data[index].selected;
    this.setState({ friends: data });
  }

  proceed() {
    const users = this.userIdMapper();
    const userKeys = Object.keys(users);

    const newEvent = {
      createdTime: new Date(),
      match: 0,
      users
    };

    // Creates a new event in db when user proceeds to filter screen
    const eventId = firebase.database().ref('events').push();
    eventId.set(newEvent, (val) => {
      console.log('oncomplete');
      console.log(val);
    });

    // Sets the created event id on every user involved as a currentEvent_id
    userKeys.forEach((userId) => {
      firebase.database().ref('users')
      .child(userId)
      .child('currentEvent_id')
      .set(eventId.key);
    });

    this.props.navigation.navigate('filterScreen');
  }

  render() {
    return (
      <View style={{ paddingTop: SCREEN_HEIGHT * 0.05 }}>
        <Text>FRIENDS</Text>
        <View style={{ height: SCREEN_HEIGHT * 0.8 }}>
          <List>
            {
              this.state.friends.map((item, i) => (
                <ListItem
                  title={item.email}
                  key={i}
                  roundAvatar
                  onPress={this.friendSelected.bind(this, i)}
                  rightIcon={{ name: 'check',
                    type: 'font-awesome',
                    style: { marginRight: 10, fontSize: 15 }
                  }}
                />
              ))
            }
          </List>
        </View>
        <Button
          title='Proceed'
          onPress={this.proceed.bind(this)}
        />
      </View>
    );
  }
}
// function mapStateToProps({ auth }) {
//   return { user: auth.user };
// }

export default (MainScreen);

// export default MainScreen;
