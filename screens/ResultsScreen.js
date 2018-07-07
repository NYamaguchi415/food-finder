import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    ActivityIndicator, StyleSheet, Button, Dimensions,
    Keyboard, View, Text, TextInput, Image, TouchableOpacity, ScrollView
} from 'react-native';

import firebase from '../firebaseInit';
import {ResultRow} from './components/ResultRow';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class ResultsScreen extends Component {

    resetCurrentUser() {
        const uId = firebase.auth().currentUser.uid;    
        console.log(uId);
        firebase.database().ref('users').child(uId)
        .child('currentEvent_id')
        .set('');
    }

    next() {
        this.resetCurrentUser();
        this.props.navigation.navigate('mainScreen');
    }
    constructor(props) {
        super(props);
        this.state = {
            restaurants: {}
        }
        let eventId;

        firebase.database().ref('users').child(this.props.user.uid).once('value')
        .then((userSnapshot)=>{
            eventId = userSnapshot.val().currentEvent_id;
            firebase.database().ref(`events/${eventId}/restaurants`).once('value')
            .then((snapshot)=>{
                this.setState({
                    restaurants: snapshot.val()
                }) 
            })    
        })    
    }
  
    render() {
        return(
            <View style={styles.mainViewStyle}>
                <ScrollView style={{ height:SCREEN_HEIGHT*0.85, width: SCREEN_WIDTH * 0.85 }}>                    
                    <View>
                    <Text>
                        Winners
                    </Text>
                    {
                            Object.keys(this.state.restaurants).map((key)=>{
                                let restaurant = this.state.restaurants[key];
                                console.log(restaurant);
                                    return (
                                    <ResultRow 
                                        key={restaurant.name}
                                        styles={styles}
                                        name={restaurant.name}                                    
                                        no={restaurant.no}
                                        yes={restaurant.yes}
                                    />        
                            )
                        })
                    }
                    <Button onPress={this.next.bind(this)} title={'go home'}></Button>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    resultRow: {
        fontSize: 22,
        color: 'blue'
    },
    mainViewStyle: {
        flex: 1,
        paddingTop: 30,
        paddingBottom: 30,        
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

const mapStateToProps = ({ auth }) => {
    return {user: auth.user}
};

export default connect(mapStateToProps, {
})(ResultsScreen);
