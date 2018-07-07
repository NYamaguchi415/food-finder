import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Button } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { retrieveHomeEvents } from '../src/actions/HomeEventsActions';
// import firebase from '../firebaseInit';

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Food-Finder',
    headerRight: (
      <Button
        title='F'
        color='blue'
        onPress={() => navigation.navigate('Friends')}
      />
    )
  })

  componentDidMount() {
    this.props.retrieveHomeEvents(this.props.user.uid);
    console.log(this.props.user.uid);
  }

  render() {
    return (
      <View>
        <List>
          {
            (Object.keys(this.props.events)).map((key) => (
              <ListItem
                title={this.props.events[key].name}
                key={key}
                // onPress={this.friendSelected.bind(this, key)}
              />
            ))
          }
        </List>
        <Button
          title='Create New Event'
          onPress={() => this.props.navigation.navigate('NewEvent')}
        />
      </View>
    );
  }
}

function mapStateToProps({ auth, home }) {
  return {
    user: auth.user,
    events: home.currentEventsData
  };
}

export default connect(mapStateToProps, {
  retrieveHomeEvents
})(HomeScreen);
