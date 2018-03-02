import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    ActivityIndicator, StyleSheet, Button, Dimensions,
    Keyboard, View, Text, TextInput, Image, TouchableOpacity
} from 'react-native';

import firebase from '../firebaseInit';
import {VoteList} from './SwipeScreen';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class ResultsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurants: {}        
        }
        firebase.database().ref('restaurants').once('value')
        .then((snapshot)=>{       
            this.setState({
                restaurants: snapshot.val()
            }) 
        })
        
    }
    render() {
        return(
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                height: SCREEN_HEIGHT *0.8
            }}>
                <Text>
                    Winners
                </Text>
                {
                    Object.keys(this.state.restaurants).map((restaurant)=>{
                        return (
                            <VoteList 
                                restaurantName={restaurant}
                                votes={this.state.restaurants[restaurant].votes}
                            />
                        )
                    })

                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
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

const mapStateToProps = ({ }) => {
    return {}
};

export default connect(mapStateToProps, {
})(ResultsScreen);
