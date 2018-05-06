import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { StyleSheet, View } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import ReduxThunk from 'redux-thunk';

import WelcomeScreen from './screens/WelcomeScreen';
import AuthScreen from './screens/AuthScreen';
import SignUpScreen from './screens/SignUpScreen';
import FriendsScreen from './screens/FriendsScreen';
import UserSearchScreen from './screens/UserSearchScreen';
import SwipeScreen from './screens/SwipeScreen';
import TestSwipeScreen from './screens/TestSwipeScreen';

import ResultsScreen from './screens/ResultsScreen';
import FilterScreen from './screens/FilterScreen';
import YelpTestScreen from './screens/YelpTestScreen';
import reducers from './src/reducers';

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

export default class App extends Component {
  render() {
    const MainNavigator =
    TabNavigator({
        welcome: { screen: WelcomeScreen },
        
        authStack: {
          screen: StackNavigator({
              auth: { screen: AuthScreen },
              signup: { screen: SignUpScreen }
          })
        },
        // swipe: { screen: SwipeScreen },
        // results: { screen: ResultsScreen },
        swipe: { screen: TestSwipeScreen },
        results: { screen: ResultsScreen }, 
        main: {
          screen: TabNavigator({
            friendsStack: {
              screen: StackNavigator({
                friendsScreen: { screen: FriendsScreen },
                userSearchScreen: { screen: UserSearchScreen }
              })
            },
            filterScreen: { screen: FilterScreen },
            yelpScreen: { screen: YelpTestScreen }
          })
        }
      }, {
        navigationOptions: {
          tabBarVisible: false
        },
        lazy: true
    })
    ;
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'//,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
