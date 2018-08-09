import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, Dimensions } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import firebase from '../firebaseInit';
import { unselectEvent } from '../src/actions/HomeEventsActions';

const SCREEN_HEIGHT = Dimensions.get('window').height;

class EventDetailScreen extends Component {
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
    
    // this.props.retrieveFriendsList(this.props.user.uid);
  }

  proceed() {
    // this.props.navigation.navigate('FoodFilters');
  }

  render() {
    return (
      <View style={{ paddingTop: SCREEN_HEIGHT * 0.05 }}>
        <Text>Details</Text>
        <View style={{ height: SCREEN_HEIGHT * 0.8 }}>
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
  unselectEvent
})(EventDetailScreen);
