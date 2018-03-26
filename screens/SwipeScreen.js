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

    buildUrlFromId(id) {
        let url = `https://api.yelp.com/v3/businesses/${id}`;
        return url;
    }

    getRestaurantFromYelp() {
        const url = this.buildUrlFromId(this.props.keyName);
        const options = {headers: {authorization: `Bearer ${yelpAPIKey}`}};
        axios.get(url, options).then((response)=>{
          let business = response.data;
          console.log('active place', business);
          this.setState({
            restaurant: {
                picture: business.image_url,
                name: business.name,
                votes: 0
            }
          });
        })    
    }

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
            const uId = this.props.user.uid;
            return firebase.database().ref('users').child(uId).once('value');
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
            let suggestedRestaurants = event.restaurants;
            const users = event.users ?  Object.keys(event.users).length: -1;
            const restaurants = event.restaurants;
            const restaurantList = []
            let keys = Object.keys(restaurants);
            keys.forEach((key)=>{
                // console.log('suggested of key', key, suggestedRestaurants[key]);
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

                // console.log(this.state.restaurantList[0].key);
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
        if (typeof this.state.activeRestaurant === 'string') {
            state = this.state.activeRestaurant;
        }
         else {
            state = this.state.activeRestaurant.key;
        }
        firebase.database().ref(`events/${this.state.eventId}/restaurants/${state}/no`)
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
                      {uri: 'data:image/jpeg;base64,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'}
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
        // console.log(this.state.restaurantList);
        return (<SwipeCards
                cards={this.state.restaurantList}
                renderCard={(cardData) => <ActivePlace 
                    styles={styles}
                    time={this.state.time}
                    restaurant={cardData.restaurant} 
                    keyName={cardData.key} 
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
