import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    ActivityIndicator, StyleSheet, Button, Dimensions,
    Keyboard, View, Text, TextInput, Image, TouchableOpacity
} from 'react-native';

import firebase from '../firebaseInit';
import {ResultRow} from './components/ResultRow';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class ResultsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurants: {}
        }
        let eventId = "event_id";
        firebase.database().ref(`events/${eventId}/restaurants`).once('value')
        .then((snapshot)=>{       
            console.log('resturants in snap',snapshot.val());
            this.setState({
                restaurants: snapshot.val()
            }) 
        })
        
    }
    render() {
        let restaurants = [];
        if (this.state.restaurants) {
            Object.keys(this.state.restaurants).forEach((key)=>{
                let restaurant = this.state.restaurants[key];
                console.log('in for each', restaurant)
                restaurants.push(restaurant);
            })
        }
        return(
            <View style={styles.mainViewStyle}>
                <View style={{ height:SCREEN_HEIGHT*0.85, width: SCREEN_WIDTH * 0.85 }}>                    
                    <View>
                    <Text>
                        Winners
                    </Text>
                    {
                            Object.keys(this.state.restaurants).map((key)=>{
                                let restaurant = this.state.restaurants[key];
                                console.log('in for each', restaurant)
                                    return (
                                    <ResultRow 
                                        styles={styles}
                                        names={restaurant.name}                                    
                                        no={restaurant.no}
                                        yes={restaurant.yes}
                                    />        
                            )
                        })
                    }
                    </View>
                </View>
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
