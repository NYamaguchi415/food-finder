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
import { swipeScreenStyles as styles } from './styles/Styles';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class TestSwipeScreen extends Component {
    componentWillMount() {
        let uid = this.props.user.uid;
        this.props.getRestaurants(uid);        
    }

    renderSwipeCards() {
        if (this.props.error) {
            return (<Text>ERROR</Text>)
        }

        if (this.props.matchOccured) {
            this.props.navigation.navigate('results');
        }
        
        if (!this.props.activeRestaurant) return; 
        if (!this.props.restaurantList.length) {
            return;
        }

        console.log(this.props.restaurantList);
        return (<SwipeCards
                cards={this.props.restaurantList}
                renderCard={(cardData) => <ActivePlace 
                    styles={styles}
                    time={this.props.time}
                    id={cardData.id} 
                    confirmButtonPressed={this.good.bind(this)}
                    cancelButtonPressed={this.bad.bind(this)}
                    />}
                renderNoMoreCards={()=>
                    <InactivePlace 
                        styles={styles}
                        navigation={this.props.navigation}
                        outOfMatches={this.props.outOfcMathes}
                        outOfTime={this.props.outOfTime}
                        time={this.props.time}/>
                }
                handleYup={this.good.bind(this)}
                handleNope={this.bad.bind(this)}                
        />)
    }

    render() {
        return (
            <View style={styles.mainViewStyle}>
                <View style={{ height:SCREEN_HEIGHT*0.85, width: SCREEN_WIDTH * 0.85 }}>                    
                    <View style={{ flex: 1 }}>
                        {this.renderSwipeCards()}
                    </View>
                </View>
                {/* <View> */}
                    {/* <Text>{this.props.index}</Text> */}
                    {/* <Text>{this.props.eventId}</Text> */}
                    {/* <Text>{this.props.activeRestaurant ? this.props.activeRestaurant.id: ''}</Text> */}
                    {/* { this.props.outOfMatches ? <Text>Out of Matches</Text> :<Button onPress={this.good.bind(this)} title={'select me'}/> } */}
                    {/* { this.props.outOfMatches ? <Text>Out of Matches</Text> :<Button onPress={this.bad.bind(this)} title={'reject me'}/> } */}
                    {/* { this.props.matchOccured ? <Text>Match Occured!!!</Text> : <Text>Match Has Not Occured</Text> } */}
                {/* </View> */}
                {/* <View> */}
                {/* <Text>Test Swipe Screen</Text> */}

                {/* { Object.keys(this.props.restaurants).length > 0 ? Object.keys(this.props.restaurants).map(key => <Text>HI: {this.props.restaurants[key].id}</Text>) : null } */}
                {/* { <Text>{this.props.eventId}</Text>} */}
                {/* { <Text>{this.props.eventId}</Text>} */}
                {/* </View> */}
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

const mapStateToProps = ({auth, swipe}) => {
    const {
        error,
        restaurants, 
        activeRestaurant, 
        index,
        outOfMatches, 
        matchOccured, 
        eventId, 
        users } = swipe;
    const restaurantList = restaurants ? Object.values(restaurants).slice(index) || [] : [];
    const time = 120;
    const outOfTime = false;
    console.log(swipe);
    return { user: auth.user, 
        error,
        time, outOfTime, 
        outOfMatches, matchOccured, 
        restaurants, eventId, index, activeRestaurant, users, restaurantList };
};

export default connect(mapStateToProps, {
    getRestaurants,
    restaurantSwipeYes,
    restaurantSwipeNo
})(TestSwipeScreen);
