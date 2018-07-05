import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button } from 'react-native';
import { retrieveHomeEvents } from '../src/actions/HomeEventsActions';
import { List, ListItem } from 'react-native-elements';
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
        <Text> Hello </Text>
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
          onPress={() => console.log(this.props.events)}
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
