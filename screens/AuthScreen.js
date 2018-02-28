import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, StyleSheet, Button, Dimensions,
  Keyboard, View, Text } from 'react-native';
import { emailChanged, passwordChanged, loginUser } from '../src/actions/UserLoginActions';

const SCREEN_WIDTH = Dimensions.get('window').width;

class AuthScreen extends Component {
  componentWillReceiveProps(newProps) {
    this.onAuthComplete(newProps);
  }

  onAuthComplete(props) {
    if (props.user) {
      // change this to navigate to next screen
      console.log('user found');
    }
  }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  signInButtonPressed() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
    Keyboard.dismiss();
  }

  renderButton() {
    if (this.props.loading) {
      return <ActivityIndicator size='large' />;
    }
    return (
      <Button
        onPress={this.signInButtonPressed.bind(this)}
        style={styles.signInButtonStyle}
        title='Sign In'
      />
    );
  }

  render() {
    return (
        <View style={styles.mainViewStyle}>
          <Text>Hello</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  mainViewStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#009688'
  },
  textInputStyle: {
    flex: 1,
    paddingLeft: 5,
    height: 40,
    fontSize: 20
  }
});

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading, user } = auth;
  return { email, password, error, loading, user };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser
})(AuthScreen);
