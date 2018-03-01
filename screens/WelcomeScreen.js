import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import firebase from '../firebaseInit';

class WelcomeScreen extends Component {
  componentWillMount() {
    this.props.navigation.navigate('swipe')
  }

  render() {
    firebase.database().ref('restaurants').once('value')
    .then((snap)=>{
      console.log(snap.val());
    })

    return (
      <View style={styles.mainViewStyle}>
        <Text>
          Welcome!
        </Text>
        <Button
          title='Press This'
          onPress={() => this.props.navigation.navigate('auth')}
        />
      </View>
    );
  }

}

function mapStateToProps({ auth }) {
  return { user: auth.user };
}

export default connect(mapStateToProps)(WelcomeScreen);

const styles = StyleSheet.create({
  mainViewStyle: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
