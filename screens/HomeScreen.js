import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Button } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { retrieveHomeEvents, createEvent, selectEvent } from '../src/actions/HomeEventsActions';

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
  }

  componentDidUpdate() {
    if (this.props.currentEvent && this.props.currentEvent.status === 'DRAFT') {
      this.props.navigation.navigate('EventFriends');
    } else if (this.props.currentEvent && this.props.currentEvent.status === 'STARTED') {
      this.props.navigation.navigate('EventDetail')
    }
  }

  render() {
    return (
      <View>
        <List>
          {
            (Object.keys(this.props.events)).map((key) => (
              <ListItem
                onPress={()=>this.props.selectEvent(key)}
                title={this.props.events[key].name}
                key={key}
              />
            ))
          }
        </List>
        <Button
          title='Create New Event'
          onPress={() => this.props.createEvent()}
        />
      </View>
    );
  }
}

function mapStateToProps({ auth, home }) {
  return {
    user: auth.user,
    currentEvent: home.currentEvent,
    events: home.currentEventsData
  };
}

export default connect(mapStateToProps, {
  retrieveHomeEvents, createEvent, selectEvent
})(HomeScreen);
