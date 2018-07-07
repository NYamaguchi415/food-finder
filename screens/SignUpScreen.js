import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, StyleSheet, Button, Dimensions,
  Keyboard, View, TextInput } from 'react-native';
import { emailChanged,
  passwordChanged,
  confirmationPasswordChanged,
  usernameChanged,
  loginUser,
  signupUser } from '../src/actions/UserLoginActions';
  
import { signUpScreenStyles as styles } from './styles/Styles';

const SCREEN_WIDTH = Dimensions.get('window').width;
  
class SignUpScreen extends Component {
  componentWillReceiveProps(newProps) {
    this.onAuthComplete(newProps);
  }

  onAuthComplete(props) {
    if (props.user) {
      this.props.navigation.navigate('mainScreen');
    }
  }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onConfirmationPasswordChange(text) {
    this.props.confirmationPasswordChanged(text);
  }

  onUsernameChange(text) {
    this.props.usernameChanged(text);
  }

  checkPasswords() {
    if (this.props.password === this.props.confirmationPassword) {
      return true;
    }
  }

  signupButtonPressed() {
    const { email, password, username } = this.props;
    const pwCheck = this.checkPasswords();
    if (pwCheck) {
      this.props.signupUser({ email, password, username });
    }
  }

  render() {
    return (
        <View style={styles.mainViewStyle}>
          <View style={{ height: 160, width: SCREEN_WIDTH * 0.85 }}>
            <TextInput
              style={styles.textInputStyle}
              placeholder='Username'
              autoCorrect={false}
              autoCapitalize='none'
              onChangeText={this.onUsernameChange.bind(this)}
              value={this.props.username}
            />
            <TextInput
              style={styles.textInputStyle}
              placeholder='email@gmail.com'
              autoCorrect={false}
              autoCapitalize='none'
              onChangeText={this.onEmailChange.bind(this)}
              value={this.props.email}
            />
            <TextInput
              style={styles.textInputStyle}
              placeholder='Password'
              autoCorrect={false}
              secureTextEntry
              autoCapitalize='none'
              onChangeText={this.onPasswordChange.bind(this)}
              value={this.props.password}
            />
            <TextInput
              style={styles.textInputStyle}
              placeholder='Confirm Password'
              autoCorrect={false}
              secureTextEntry
              autoCapitalize='none'
              onChangeText={this.onConfirmationPasswordChange.bind(this)}
              value={this.props.confirmationPassword}              
            />
            <Button
              title='Create Account'
              onPress={this.signupButtonPressed.bind(this)}
            />
          </View>
        </View>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { email, password, confirmationPassword, username, error, loading, user } = auth;
  return { email, password, confirmationPassword, username, error, loading, user };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, usernameChanged, loginUser, signupUser, confirmationPasswordChanged
})(SignUpScreen);
