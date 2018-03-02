import React, { Component } from 'react';
import { View, Text, FlatList, Button, Dimensions, StyleSheet } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import firebase from '../firebaseInit';
import { connect } from 'react-redux';

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
    this.state = { users: [] };
  }

  componentWillMount() {
    //const self = this;
    const url = 'users';
    firebase.database().ref('users').child(this.props.user.uid).once('value')
    .then((userSnapshot)=>{
        const eventId = userSnapshot.val().currentEvent_id;
        console.log(eventId);
        if (eventId) {
              this.props.navigation.navigate('swipe');
        }});
        
    firebase.database().ref(url).once('value', (snapshot) => {
      const result = snapshot.val();
      const users = [];
      Object.keys(result).forEach((key) => {
        users.push({ key, email: result[key].email });
      });
      this.setState({ users });
    });
  }

  userIdMapper() {
    const userIds = {};
    console.log(this.state.users);
    this.state.users.forEach((userId) => {
      userIds[userId.key] = 0;
    });
    return userIds;
  }

  proceed() {
    console.log('proceed');
    const users = this.userIdMapper();
    const userKeys = Object.keys(users);

    const newEvent = {
      createdTime: new Date(),
      match: 0,
      users
    };

    const eventId = firebase.database().ref('events').push();
    eventId.set(newEvent, (val) => {
      console.log('oncomplete');
      console.log(val);
    });

    userKeys.forEach((userId) => {
      firebase.database().ref('users')
      .child(userId)
      .child('currentEvent_id')
      .set(eventId.key);
    });

    this.props.navigation.navigate('filterScreen');
    // this.props.navigation.navigate('swipe');

  }

  render() {
    return (
      <View style={{ paddingTop: SCREEN_HEIGHT * 0.05 }}>
        <Text>FRIENDS</Text>
        <View style={{ height: SCREEN_HEIGHT * 0.8 }}>
          <List>
            <FlatList
              data={this.state.users}
              renderItem={({ item }) =>
                <ListItem
                  title={item.email}
                  roundAvatar
                  avatar={{uri:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Default_profile_picture_%28male%29_on_Facebook.jpg/600px-Default_profile_picture_%28male%29_on_Facebook.jpg'}}
                  subtitle=' '
                  onPress={() => console.log('friendPressed')}
                  hideChevron
                />
              }
            />
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
function mapStateToProps({ auth }) {
  return { user: auth.user };
}

export default connect(mapStateToProps)(MainScreen);

// export default MainScreen;
