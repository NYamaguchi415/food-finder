import React, { Component } from 'react';
import { View, Image, TouchableHighlight, Dimensions, Button, StyleSheet } from 'react-native';
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
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', paddingTop: 50 }}>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableHighlight onPress={() => console.log('ok')}>
            <Image
              source={{ uri: 'https://cdn.foodbeast.com/wp-content/uploads/2017/06/Webp.net-compress-image.jpg' }}
            />
          </TouchableHighlight>
          <Button
            title='Chinese'
            onPress={() => console.log('abc')}
            style={styles.filterButtonStyle}
          />
          <Button
            title='Halal'
            onPress={() => console.log('abc')}
            style={styles.filterButtonStyle}
          />
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button
            title='Indian'
            onPress={() => console.log('abc')}
            style={styles.filterButtonStyle}
          />
          <Button
            title='Italian'
            onPress={() => console.log('abc')}
            style={styles.filterButtonStyle}
          />
          <Button
            title='Japanese'
            onPress={() => console.log('abc')}
            style={styles.filterButtonStyle}
          />
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button
            title='Mexican'
            onPress={() => console.log('abc')}
            style={styles.filterButtonStyle}
          />
          <Button
            title='Thai'
            onPress={() => console.log('abc')}
            style={styles.filterButtonStyle}
          />
          <Button
            title='Ukranian'
            onPress={() => console.log('abc')}
            style={styles.filterButtonStyle}
          />
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

// <List>
//   <FlatList
//     data={[{ key: 'American' }, { key: 'Chinese' }, { key: 'Halal' },
//      { key: 'Indian' }, { key: 'Italian' }, { key: 'Japanese' },
//      { key: 'Mexican' }, { key: 'Thai' }, { key: 'Ukranian' }]}
//     renderItem={({ item }) =>
//       <ListItem
//         title={item.key}
//         hideChevron
//       />
//     }
//   />
// </List>
