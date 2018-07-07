import { StyleSheet, Dimensions } from 'react-native';
const SCREEN_WIDTH = Dimensions.get('window').width;
export const authScreenStyles = StyleSheet.create({
    mainViewStyle: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FF875E'
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
    loginButtonStyle: {
      flex: 1,
      alignSelf: 'center'
    },
    errorTextStyle: {
      fontSize: 20,
      alignSelf: 'center',
      color: 'red'
    }
  });

export const signUpScreenStyles = StyleSheet.create({
    mainViewStyle: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FF875E'
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


export const swipeScreenStyles = StyleSheet.create({
  card: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 300,
      height: 300,
    },
  mainViewStyle: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white'
  },
  confirmButtonStyle: {
      flex: 1,
      paddingLeft: 5,
      height: 40,
      fontSize: 20,
      backgroundColor: 'green',
      borderColor: 'gray',
      borderWidth: 1
  },
  cancelButtonStyle: {
      flex: 1,
      paddingLeft: 5,
      height: 40,
      fontSize: 20,
      backgroundColor: 'red',
      borderColor: 'gray',
      borderWidth: 1
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
      // alignSelf: 'center',
      color: 'red'
  },
  swipeImageStyle: {
      flex: 1,
      justifyContent: 'center'
  }
});