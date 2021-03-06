import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Dimensions } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
//import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { retrieveFriendsList } from '../src/actions/FriendsActions';

const SCREEN_HEIGHT = Dimensions.get('window').height;

class HomeFriendsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Food-Finder',
    headerLeft:
      <Icon
      name={'ios-arrow-back'}
      size={30}
      onPress={() => { navigation.goBack(); }}
      />,
    headerRight:
      <Icon
      name={'md-person-add'}
      size={30}
      color='gray'
      onPress={() => navigation.navigate('UserSearch')}
      />
  })

  componentDidMount() {
    this.props.retrieveFriendsList(this.props.user.uid);
  }

  render() {
    return (
      <View style={{ paddingTop: SCREEN_HEIGHT * 0.05 }}>
        <Text>FRIENDS</Text>
        <View style={{ height: SCREEN_HEIGHT * 0.8 }}>
          <List>
            {
              (Object.keys(this.props.friendsList)).map((key) => (
                <ListItem
                  title={this.props.friendsList[key].userName}
                  key={key}
                  roundAvatar
                  hideChevron
                  // onPress={this.friendSelected.bind(this, key)}
                />
              ))
            }
          </List>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ auth, friends }) => {
  const { user } = auth;
  const { friendsList } = friends;
  return { user, friendsList };
};

export default connect(mapStateToProps, {
  retrieveFriendsList
})(HomeFriendsScreen);
