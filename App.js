import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { StyleSheet, View } from 'react-native';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import ReduxThunk from 'redux-thunk';

import TitleScreen from './screens/TitleScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import FriendsScreen from './screens/FriendsScreen';
import UserSearchScreen from './screens/UserSearchScreen';
import SwipeScreen from './screens/SwipeScreen';
import ResultsScreen from './screens/ResultsScreen';
import FilterScreen from './screens/FilterScreen';
import YelpTestScreen from './screens/YelpTestScreen';
import reducers from './src/reducers';

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <AppNavigator />
        </View>
      </Provider>
    );
  }
}

const AuthStackNavigator = createStackNavigator({
  Login: LoginScreen,
  SignUp: SignUpScreen
});

const AppNavigator = createSwitchNavigator({
  Title: TitleScreen,
  Auth: AuthStackNavigator,
  Main: createStackNavigator({
    Home: HomeScreen,
    Friends: FriendsScreen,
    UserSearch: UserSearchScreen
  }),
  NewEvent: createStackNavigator({
    EventFriends: FriendsScreen,
    FoodFilters: FilterScreen
  })
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
