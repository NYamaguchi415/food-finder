import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    ActivityIndicator, StyleSheet, Button, Dimensions,
    Keyboard, View, Text, TextInput, Image, TouchableOpacity
} from 'react-native';
import SwipeCards from 'react-native-swipe-cards';
import firebase from '../firebaseInit';

import ActivePlace from './components/ActivePlace';
import InactivePlace from './components/InactivePlace';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class SwipeScreen extends Component {
    constructor(props) {
        super(props);
        let restaurants = {};
        let index = 0;
        // const eventId = 'event_id'
        let suggestedRestaurants = {}
        this.state = {
            eventId: '',
            event: null,
            restaurantList: [],
            time: 180,
            outOfTime: false,
            index: 0,
            suggestedRestaurants,
            activeRestaurant: '',
            outOfMathes: false,
            users: 0
        };

        const callback = (snapshot)=>{
            if (snapshot.val() ===1) {
                this.props.navigation.navigate('results')
                console.log('match happened!!!');
            }
        }

        let eventId;
        let userSnapshot;
        let eventSnapshot;
        function getUser() {
            return firebase.database().ref('users').child(this.props.user.uid).once('value');
        }

        function getEvents(snapshot) {
            userSnapshot = snapshot;
            return firebase.database().ref('events').once('value')
        }

        function getUserEvent(snapshot) {
            eventId = userSnapshot.val().currentEvent_id;
            firebase.database().ref(`events/${eventId}/match`).on('value',callback);
            eventSnapshot = snapshot;
            let event = eventSnapshot.child(eventId).val();
            return firebase.database().ref('restaurants').once('value')
        }

        function doWork(snapshot) {
            suggestedRestaurants = snapshot.val();
            let event = eventSnapshot.child(eventId).val();
            const users = event.users ?  Object.keys(event.users).length: -1;

            const restaurants = event.restaurants;
            const restaurantList = []
            let keys = Object.keys(restaurants);
            keys.forEach((key)=>{
                console.log('suggested of key', key, suggestedRestaurants[key]);
                restaurantList.push(
                    {key: key, restaurant: suggestedRestaurants[key]})
            })
            this.setState({
                event,
                eventId,
                restaurantList,
                restaurants,
                activeRestaurant: restaurantList[0].key,
                users
            })

        }  

        getUser.call(this)
        .then(getEvents.bind(this))
        .then(getUserEvent.bind(this))
        .then(doWork.bind(this))

        updateTime = ()=> {
            const time = this.state.time -1;
            if (time === 0) {
                clearInterval(interval);
                this.setState({
                    time: 0,
                    outOfTime: true
                })
                return;
            }
            this.setState({time: this.state.time -1});
            return;
        }
        let interval = setInterval(updateTime,1000);
    }

    shrinkList() {
        let restaurantList = this.state.restaurantList;
        restaurantList = restaurantList.slice(1)
        let activeRestaurant = restaurantList[0];
        this.setState({restaurantList, activeRestaurant});
    }

    confirmButtonPressed() {
        this.confirmAction();
        this.shrinkList();
    }
    
    confirmAction() {
        let state;
        if (typeof this.state.activeRestaurant === 'string') {
            state = this.state.activeRestaurant;
        }
         else {
            state = this.state.activeRestaurant.key;
        }
        firebase.database().ref(`events/${this.state.eventId}/restaurants/${state}/yes`)
        .transaction((votes)=>{
            return votes + 1;
        }, (error, commited, snapshot) => {
            if (error) {
                console.log('error: ', error);
            } else if (!commited) {
                console.log('not commited');
            } else {
                const updatedVotes = snapshot.val();

                if (updatedVotes === this.state.users || updatedVotes === 2) {
                    firebase.database().ref(`events/${this.state.eventId}`).child('match').set(1);
                    return;
                }
                // const index = this.state.index +1;
                const index = this.state.index;
                const restaurants = this.state.restaurantList;
                // restaurants[this.state.activeRestaurant].votes += 1;
                if (index >= Object.keys(restaurants).length) {
                    this.setState({
                        activeRestaurant: '',
                        restaurants: restaurants,
                        outOfMathes: true
                    })
                    return;
                } 

                console.log(this.state.restaurantList[0].key);
                const activeRestaurant = 
                
                    this.state.restaurantList[0].key;
                this.setState({
                    restaurants,
                    activeRestaurant, 
                    index
                })
            }
        });
    }

    cancelButtonPressed() {
        this.cancelAction();
        this.shrinkList();
    }



    cancelAction() {
        firebase.database().ref(`events/${this.state.eventId}/restaurants/${this.state.activeRestaurant}/no`)
        .transaction((votes)=>{
            return votes + 1;
        }, (error, commited, snapshot) => {
            const index = this.state.index
            const restaurants = this.state.restaurantList;
            let outOfMathes = false;
            let activeRestaurant;
            if (index >= Object.keys(restaurants).length) {
                activeRestaurant = '';
                outOfMathes = true;
            } else {
                activeRestaurant = 
                this.state.restaurantList[0].key;
            }
    
            this.setState({
                restaurants,
                activeRestaurant, 
                index,
                outOfMathes
            });    
        });
    
 

    }

    renderCancelButton() {
        if (this.props.loading) {
            return <ActivityIndicator size='large' />;
        }
        return (
            <TouchableOpacity 
                // style={{height: 100, width: 100}}
                onPress={this.cancelButtonPressed.bind(this)}>
                <Image
                style={{
                    backgroundColor: '#DDDDDD',
                    padding: 10,
                    height: 100, 
                    width: 100
                }}
                  source={
                      {uri: 'http://img.playbuzz.com/image/upload/f_auto,fl_lossy,q_auto/cdn/4a135657-26e2-4777-84c9-5326eb5458cd/6abc1710-fe29-4eef-8031-0c0aec1e0774.jpg'}
                  }
                />
            </TouchableOpacity>
            /*
            <Button
                title='Cancel'
                style={styles.confirmButtonStyle}
                onPress={this.cancelButtonPressed.bind(this)}
            />
            */
        );
    }
    
    renderConfirmButton() {
        if (this.props.loading) {
            return <ActivityIndicator size='large' />;
        }
        return (
            <TouchableOpacity 
                // style={{height: 100, width: 100}}
                onPress={this.confirmButtonPressed.bind(this)}>
                <Image
                style={{
                    backgroundColor: '#DDDDDD',
                    padding: 10,
                    height: 100, 
                    width: 100
                }}

                //   style={styles.signInButtonStyle}
                  source={
                      {uri: 'https://www.worldofcrew.com/wp-content/uploads/woc-icone-love.png'}
                  }
                />
            </TouchableOpacity>
            // <Button
            //     title='Confirm'
            //     style={styles.signInButtonStyle}
            //     onPress={this.confirmButtonPressed.bind(this)}
            // />
        );
    }

    log(snapshot) {
        console.log('function in swipe screen');
        console.log(snapshot.val());
    }

    showInActive() {
        return  (
            <InactivePlace 
                styles={styles}
                navigation={this.props.navigation}
                outOfMathes={this.state.outOfMathes}
                outOfTime={this.state.outOfTime}
                time={this.state.time}/>
        )
    }

    renderSwipeCards() {
        return (<SwipeCards
                cards={this.state.restaurantList}
                renderCard={(cardData) => <ActivePlace 
                    styles={styles}
                    time={this.state.time}
                    restaurant={cardData.restaurant} 
                    renderConfirmButton={this.renderConfirmButton.bind(this)}
                    renderCancelButton={this.renderCancelButton.bind(this)}
                    />}
                renderNoMoreCards={()=>
                    <InactivePlace 
                        styles={styles}
                        navigation={this.props.navigation}
                        outOfMathes={this.state.outOfMathes}
                        outOfTime={this.state.outOfTime}
                        time={this.state.time}/>
                }
                handleYup={this.confirmButtonPressed.bind(this)}
                handleNope={this.cancelButtonPressed.bind(this)}                
        />)
    }
    render() {
        let activePlace;
        if (this.state.activeRestaurant === '' || this.state.outOfTime) {
            activePlace = this.showInActive();
        } else {
            activePlace = this.renderSwipeCards();
        }
        return (
        <View style={styles.mainViewStyle}>
            <View style={{ height:SCREEN_HEIGHT*0.85, width: SCREEN_WIDTH * 0.85 }}>                    
                <View style={{ flex: 1 }}>
                {
                    activePlace
                }
                </View>
            </View>
        </View>
        )
    }
}

                        // {/* {
                        //     Object.keys(this.state.restaurants).map((restaurant)=>{
                        //         return (<VoteList restaurantName={restaurant} 
                        //             votes={this.state.restaurants[restaurant].votes}
                        //             />)
                        //     })
                        // } */}

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

const mapStateToProps = ({auth }) => {
    return { user: auth.user };
};

export default connect(mapStateToProps, {
})(SwipeScreen);
