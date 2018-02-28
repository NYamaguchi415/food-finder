import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import { StyleSheet, View } from 'react-native';
import { TabNavigator } from 'react-navigation';
import ReduxThunk from 'redux-thunk';

import firebase from './firebaseInit';
import WelcomeScreen from './screens/WelcomeScreen';
import AuthScreen from './screens/AuthScreen';
import reducers from './src/reducers';

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

export default class App extends Component {
  render() {
    const MainNavigator = TabNavigator({
      welcome: { screen: WelcomeScreen },
      auth: { screen: AuthScreen }
    }, {
      navigationOptions: {
        tabBarVisible: false
      },
      lazy: true
    })
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
