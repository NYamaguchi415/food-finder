import React, { Component } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View, Text } from 'react-native';
import { connect } from 'react-redux';

class WelcomeScreen extends Component {
  componentWillMount() {
    // this.props.navigation.navigate('userSearchScreen');
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('authStack')}>
        <View style={styles.mainViewStyle}>
          <Text style={styles.titleTextStyle}>
            Food Finder
          </Text>
        </View>
      </TouchableWithoutFeedback>
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
    backgroundColor: '#FF875E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleTextStyle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white'
  }
});
