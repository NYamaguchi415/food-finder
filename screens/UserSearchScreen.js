import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { SearchBar, List, ListItem } from 'react-native-elements';
import { userSearchChanged, firebaseUserSearch } from '../src/actions/FriendsActions';


class UserSearchScreen extends Component {
  static navigationOptions = {
    title: 'User Search',
  };

  searchBarChanged(text) {
    this.props.userSearchChanged(text);
    this.props.firebaseUserSearch(text);
  }

  buttonPressed() {
    console.log(this.props.user.uid);
  }

  friendsListItemPressed() {
    console.log(this.props.user);
  }

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
          onChangeText={
            this.searchBarChanged.bind(this)
          }
          value={this.props.userSearchEntry}
        />
        <List>
          {
            this.props.userSearchData.map((data) => (
              <ListItem
                title={data.username}
                key={data.key}
                roundAvatar
                onPress={() => this.friendsListItemPressed.bind(this, data.key)}
                rightIcon={{ name: 'check',
                  type: 'font-awesome',
                  style: {
                    marginRight: 10,
                    fontSize: 15
                    // color: (data.selected) ? 'green' : 'white'
                  }
                }}
              />
            ))
          }
        </List>
        <Button
          title='test check'
          onPress={this.buttonPressed.bind(this)}
        />
      </View>
    );
  }
}

//export default UserSearchScreen;

const mapStateToProps = ({ friends, auth }) => {
  const { userSearchEntry, userSearchData } = friends;
  const { user } = auth;
  return { userSearchEntry, userSearchData, user };
};

export default connect(mapStateToProps, {
  userSearchChanged,
  firebaseUserSearch
})(UserSearchScreen);
