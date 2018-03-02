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
        this.state = {
            cards: [
                {text: 'hey', backgroundColor: 'white'}
            ],
            restaurantList: [],
            time: 2,
            outOfTime: false,
            index: 0,
            restaurants,
            activeRestaurant: '',
            outOfMathes: false
        };
        firebase.database().ref('restaurants').once('value')
        .then((snapshot)=>{        
            restaurants = snapshot.val();
            console.log('constructor', restaurants);
            const restaurantList = []
            Object.keys(restaurants).forEach((key)=> {
                restaurantList.push({name:key, restaurant: restaurants[key]})
            })
            this.setState({
                restaurantList,
                restaurants: restaurants,
                activeRestaurant: Object.keys(restaurants)[0]
            })
        })
        const callback = 
        firebase.database().ref('restaurants').on('value',(snapshot)=>{
                this.setState({
                    restaurants: snapshot.val()
                })
        });

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
    
    confirmButtonPressed() {
        console.log('confirm button pressed');
        firebase.database().ref(`restaurants/${this.state.activeRestaurant}/votes`)
        .transaction((votes)=>{
            return votes + 1;
        }, (error, commited, snapshot) => {
            if (error) {
                console.log('error: ', error);
            } else if (!commited) {
                console.log('not commited');
            } else {
                console.log('success');
                const index = this.state.index +1;
                const restaurants = this.state.restaurants;
                // restaurants[this.state.activeRestaurant].votes += 1;
                if (index >= Object.keys(restaurants).length) {
                    this.setState({
                        activeRestaurant: '',
                        restaurants: restaurants,
                        outOfMathes: true
                    })
                    return;
                } 

                const activeRestaurant = 
                    Object.keys(this.state.restaurants)[index];
                this.setState({
                    restaurants,
                    activeRestaurant, 
                    index
                })
            }
        });
    }

    cancelButtonPressed() {
        const index = this.state.index +1;
        const restaurants = this.state.restaurants;
        let outOfMathes = false;
        let activeRestaurant;
        if (index >= Object.keys(restaurants).length) {
            activeRestaurant = '';
            outOfMathes = true;
        } else {
            activeRestaurant = Object.keys(this.state.restaurants)[index];
        }

        this.setState({
            restaurants,
            activeRestaurant, 
            index,
            outOfMathes
        })


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

    showActiveRestaurant() {
        return (
            <ActivePlace 
            styles={this.styles}
            time={this.state.time}
            renderConfirmButton={this.renderConfirmButton.bind(this)}
            renderCancelButton={this.renderCancelButton.bind(this)}
            restaurant={this.state.restaurants[this.state.activeRestaurant]}
            restaurantName={this.state.activeRestaurant}
            />
        )
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
                    restaurantName={cardData.activeRestaurant} 
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

const mapStateToProps = ({ }) => {
    return {}
};

export default connect(mapStateToProps, {
})(SwipeScreen);
