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
          onPress={() => console.log('proceed')}
        />
      </View>
    );
  }
}

export default MainScreen;
