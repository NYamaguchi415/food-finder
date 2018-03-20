import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, StyleSheet, Button, Dimensions,
  Keyboard, View, Text, TextInput } from 'react-native';
import { emailChanged, passwordChanged, loginUser } from '../src/actions/UserLoginActions';

const SCREEN_WIDTH = Dimensions.get('window').width;

class SignUpScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmationPass: ''
    };
  }

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

  checkPasswords() {
    if (this.props.password === this.state.confirmationPass) {
      console.log('password works');
    } else {
      console.log('password mismatch');
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
              onChangeText={(text) => this.setState({ confirmationPass: text })}
            />
            <Button
              title='Create Account'
              onPress={this.checkPasswords.bind(this)}
            />
          </View>
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
    fontSize: 20,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 1
  },
  signInButtonStyle: {
    flex: 1,
    alignSelf: 'center'
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
});

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading, user } = auth;
  return { email, password, error, loading, user };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser
})(SignUpScreen);
