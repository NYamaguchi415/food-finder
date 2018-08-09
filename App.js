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
import HomeFriendsScreen from './screens/HomeFriendsScreen';
import EventFriendsScreen from './screens/EventFriendsScreen';
import EventDetailScreen from './screens/EventDetailScreen';
import UserSearchScreen from './screens/UserSearchScreen';
import FilterScreen from './screens/FilterScreen';
import SwipeScreen from './screens/SwipeScreen';
import ResultsScreen from './screens/ResultsScreen';
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
    HomeFriends: HomeFriendsScreen,
    UserSearch: UserSearchScreen
  }),
  NewEvent: createStackNavigator({
    EventFriends: EventFriendsScreen,
    EventDetail: EventDetailScreen,
    FoodFilters: FilterScreen,
    Swipe: SwipeScreen,
    Results: ResultsScreen
  })
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
