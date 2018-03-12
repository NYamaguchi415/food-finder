import React, { Component } from 'react';
import { View, FlatList, TouchableHighlight, Dimensions, Button, StyleSheet } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import firebase from '../firebaseInit';

//const SCREEN_HEIGHT = Dimensions.get('window').height;

class FilterScreen extends Component {
  static navigationOptions = {
    title: 'Filters',
  };


  proceed() {
    this.props.navigation.navigate('swipe');
    const uId = firebase.auth().currentUser.uid;
    firebase.database().ref('users').child(uId).once('value', snapshot => {
      const eventId = snapshot.val().currentEvent_id;
      firebase.database().ref('events').child(eventId).update(
        { restaurants: {
          restaurant_id_1: {
            name: 'Essen',
            no: 0,
            yes: 0
          },
          restaurant_id_2: {
            name: 'SweetGreen',
            no: 0,
            yes: 0
          },
          restaurant_id_3: {
            name: 'Chipotle',
            no: 0,
            yes: 0
          }
        }, }
      );
    });
    //const eventId = firebase.database().ref();
    // const eventId = firebase.database().ref('events').push();
    // eventId.set(newEvent, (val) => {
    //   console.log('oncomplete');
    //   console.log(val);
    // });
  }

  render() {
    return (
      <View>
        <View>
          <List>
            <FlatList
              data={[{ key: 'American' }, { key: 'Chinese' }, { key: 'Halal' },
               { key: 'Indian' }, { key: 'Italian' }, { key: 'Japanese' },
               { key: 'Mexican' }, { key: 'Thai' }, { key: 'Ukranian' }]}
              renderItem={({ item }) =>
                <ListItem
                  title={item.key}
                  hideChevron
                />
              }
            />
          </List>
        </View>
        <Button
          title='Start Swiping'
          onPress={this.proceed.bind(this)}
        />
      </View>
    );
  }
}

export default FilterScreen;

const styles = StyleSheet.create({
  filterButtonStyle: {
    flex: 1,
    height: 50,
    width: 50,
    borderWidth: 2,
    borderRadius: 10,
    padding: 2,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
