import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    ActivityIndicator, StyleSheet, Button, Dimensions,
    Keyboard, View, Text, TextInput, Image, TouchableOpacity
} from 'react-native';
import SwipeCards from 'react-native-swipe-cards';
import firebase from '../firebaseInit';
import {getRestaurants, restaurantSwipeYes, restaurantSwipeNo} from '../src/actions/SwipeActions'
import ActivePlace from './components/ActivePlace';
import InactivePlace from './components/InactivePlace';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class TestSwipeScreen extends Component {
    componentWillMount() {
        let uid = this.props.user.uid;
        this.props.getRestaurants(uid);        
    }

    renderRestaurants() {
        if (Object.keys(this.props.restaurants).length > 0) {
            const entries = Object.keys(this.props.restaurants);
            entries.map(key => <Text>HI: {this.props.restaurants[key].id}</Text>)
        } else {
            console.log('no restaurants')
            return null;
        }
    }

    render() {
        return (
            <View style={styles.mainViewStyle}>
                <View>
                    <Text>{this.props.index}</Text>
                    <Text>{this.props.eventId}</Text>
                    <Text>{this.props.activeRestaurant ? this.props.activeRestaurant.id: ''}</Text>
                    { this.props.outOfMatches ? <Text>Out of Matches</Text> :<Button onPress={this.good.bind(this)} title={'select me'}/> }
                    { this.props.outOfMatches ? <Text>Out of Matches</Text> :<Button onPress={this.bad.bind(this)} title={'reject me'}/> }
                    { this.props.matchOccured ? <Text>Match Occured!!!</Text> : <Text>Match Has Not Occured</Text> }
                </View>
                <View>
                <Text>Test Swipe Screen</Text>

                { Object.keys(this.props.restaurants).length > 0 ? Object.keys(this.props.restaurants).map(key => <Text>HI: {this.props.restaurants[key].id}</Text>) : null }
                { <Text>{this.props.eventId}</Text>}
                {/* { <Text>{this.props.eventId}</Text>} */}
                </View>
            </View>
        )
    }


    good() {
        this.props.restaurantSwipeYes(
            this.props.index, 
            this.props.restaurants, 
            this.props.eventId, 
            this.props.activeRestaurant, 
            this.props.users)
    }
    
    bad() {
        this.props.restaurantSwipeNo(
            this.props.index, 
            this.props.restaurants, 
            this.props.eventId, 
            this.props.activeRestaurant, 
            this.props.users)
    }
}

const styles = StyleSheet.create({
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

const mapStateToProps = ({auth, swipe}) => {
    const {restaurants, outOfMatches, matchOccured, eventId, activeRestaurant, index, users } = swipe;
    console.log(swipe);
    return { user: auth.user, outOfMatches, matchOccured, restaurants, eventId, index, activeRestaurant, users };
};

export default connect(mapStateToProps, {
    getRestaurants,
    restaurantSwipeYes,
    restaurantSwipeNo
})(TestSwipeScreen);
