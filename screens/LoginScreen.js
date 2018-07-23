import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, Button, Dimensions,
  Keyboard, View, Text, TextInput } from 'react-native';
import { emailChanged, passwordChanged, loginUser } from '../src/actions/UserLoginActions';
import { authScreenStyles as styles } from './styles/Styles';
const SCREEN_WIDTH = Dimensions.get('window').width;

class LoginScreen extends Component {
  componentWillReceiveProps(newProps) {
    this.onAuthComplete(newProps);
  }

  onAuthComplete(props) {
    if (props.user) {
      this.props.navigation.navigate('Main');
      Keyboard.dismiss();
    }
  }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  loginButtonPressed() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
    Keyboard.dismiss();
  }

  signupButtonPressed() {
    this.props.navigation.navigate('signup');
  }

  renderButton() {
    if (this.props.loading) {
      return <ActivityIndicator size='large' />;
    }
    return (
      <Button
        title='Log In'
        style={styles.loginButtonStyle}
        onPress={this.loginButtonPressed.bind(this)}
      />
    );
  }

  render() {
    return (
        <View style={styles.mainViewStyle}>
          <View style={{ height: 160, width: SCREEN_WIDTH * 0.85 }}>
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
              placeholder='password'
              autoCorrect={false}
              secureTextEntry
              autoCapitalize='none'
              onChangeText={this.onPasswordChange.bind(this)}
              value={this.props.password}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.errorTextStyle}>
                {this.props.error}
              </Text>
              {this.renderButton()}
            </View>
            <View>
              <Button
                title='Sign Up'
                style={styles.signInButtonStyle}
                onPress={() => this.props.navigation.navigate('SignUp')}
              />
            </View>
          </View>
        </View>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading, user } = auth;
  return { email, password, error, loading, user };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser
})(LoginScreen);
