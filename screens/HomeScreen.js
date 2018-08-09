import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Button } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import { retrieveHomeEvents } from '../src/actions/HomeEventsActions';

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Food-Finder',
    headerRight:
      <Icon
      name={'md-people'}
      size={30}
      color='gray'
      onPress={() => navigation.navigate('HomeFriends')}
      />
  })

  componentDidMount() {
    this.props.retrieveHomeEvents(this.props.user.uid);
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
              />
            ))
          }
        </List>
        <Button
          title='Create New Event'
          onPress={() => this.props.navigation.navigate('EventFriends')}
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
