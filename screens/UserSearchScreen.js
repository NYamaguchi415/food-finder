import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { SearchBar } from 'react-native-elements';
import { userSearchChanged } from '../src/actions/FriendsActions';


class UserSearchScreen extends Component {
  static navigationOptions = {
    title: 'User Search',
  };
  // constructor(props) {
  //     super(props);
  //     this.state = {
  //         searchEntry: ''
  //     };
  // }

  // searchBarChanged(text) {
  //   this.setState(searchEntry) = text;
  // }

  render() {
    return (
      <View>
        <Text>
          HELLLLOOOOOO
        </Text>
        <SearchBar
          placeholder='Search'
          autoCorrect={false}
          autoCapitalize='none'
          onChangeText={this.props.userSearchChanged}
          value={this.props.userSearchEntry}
        />
      </View>
    );
  }
}

//export default UserSearchScreen;

const mapStateToProps = ({ friends }) => {
  const { userSearchEntry } = friends;
  return { userSearchEntry };
};

export default connect(mapStateToProps, {
  userSearchChanged
})(UserSearchScreen);
