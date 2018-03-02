import React, { Component } from 'react';
import { View, Text, FlatList, Button, Dimensions } from 'react-native';
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
    this.state = { users: [] };
  }

  componentWillMount() {
    //const self = this;
    const url = 'users';
    firebase.database().ref(url).once('value', (snapshot) => {
      const result = snapshot.val();
      const users = [];
      Object.keys(result).forEach((key) => {
        users.push({ key, email: result[key].email });
      });
      this.setState({ users });
    });
  }

  // const friendPressed() = {
  //   console.log('friend was pressed');
  // }

  userIdMapper() {
    let userIds = {};
    console.log(this.state.users);
    this.state.users.forEach((userId)=>{
      userIds[userId.key] = 0;
    })
    return userIds;
  }
  
  proceed() {
    console.log('proceed');
    let newEvent = {
      createdTime: new Date(),
      match: 0,
      users: this.userIdMapper()
    }
    let eventId = firebase.database().ref('events').push();
    eventId.set(newEvent, function(val) {
      console.log('oncomplete');
      console.log(val);
    })
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

export default MainScreen;
