import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    ActivityIndicator, StyleSheet, Button, Dimensions,
    Keyboard, View, Text, TextInput, Image
} from 'react-native';

import firebase from '../firebaseInit';

const SCREEN_WIDTH = Dimensions.get('window').width;

class VoteList extends Component {
    render() {
        return(
            <Text style={styles.errorTextStyle}>
                {this.props.restaurantName}
                {this.props.votes}
            </Text>
        )
    }
}

class ActivePlace extends Component {
    render() {
        return(
            <View>
                <Image style={{width:100, height: 100}} source={{uri:this.props.restaurant.uri}} />
                <Text style={styles.errorTextStyle}>
                    {this.props.restaurantName}
                    {this.props.restaurant.votes}
                </Text>
            </View>
        )
    }
}

class SwipeScreen extends Component {
    constructor(props) {
        super(props);
        let restaurants = {};
        let index = 0;
        this.state = {
            index: 0,
            restaurants,
            activeRestaurant: ''
        };
        firebase.database().ref('restaurants').once('value')
        .then((snapshot)=>{        
            restaurants = snapshot.val();
            console.log('constructor', restaurants);
            this.setState({
                restaurants: restaurants,
                activeRestaurant: Object.keys(restaurants)[0]
            })
        })

    }
    
    confirmButtonPressed() {
        console.log('confirm button pressed');
        firebase.database().ref('restaurants/essen/votes')
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
                if (index > Object.keys(this.restaurants)
                const restaurants = this.state.restaurants;
                restaurants[this.state.activeRestaurant].votes += 1;
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
        console.log('cancel button pressed');
    }

    renderCancelButton() {
        if (this.props.loading) {
            return <ActivityIndicator size='large' />;
        }
        return (
            <Button
                title='Cancel'
                style={styles.confirmButtonStyle}
                onPress={this.cancelButtonPressed.bind(this)}
            />
        );
    }
    renderConfirmButton() {
        if (this.props.loading) {
            return <ActivityIndicator size='large' />;
        }
        return (
            <Button
                title='Confirm'
                style={styles.signInButtonStyle}
                onPress={this.confirmButtonPressed.bind(this)}
            />
        );
    }

    log(snapshot) {
        console.log('function in swipe screen');
        console.log(snapshot.val());
    }

    showActiveRestaurant() {
        return (
            <ActivePlace 
            restaurant={this.state.restaurants[this.state.activeRestaurant]}
            restaurantName={this.state.activeRestaurant}
            />
        )
    }
    render() {
        firebase.database().ref('restaurants').on('child_changed', this.log);

        const activePlace = 
            this.state.activeRestaurant !== '' ? this.showActiveRestaurant() : null;
        // const src = { uri: 'http://experiencenomad.com/wp-content/uploads/2014/02/essen-1024x764.jpg' }
        return (
            <View style={styles.mainViewStyle}>
                <View style={{ height: 80, width: SCREEN_WIDTH * 0.85 }}>
                    
                    <View style={{ flex: 1 }}>
                        <Text style={styles.errorTextStyle}>
                            {this.props.error}
                        </Text>
                        {this.renderConfirmButton()}
                        {this.renderCancelButton()}
                        {
                            activePlace
                        }
                        <View style={{ flex: 1 }}>
                        {
                            Object.keys(this.state.restaurants).map((restaurant)=>{
                                return (<VoteList restaurantName={restaurant} 
                                    votes={this.state.restaurants[restaurant].votes}
                                    />)
                            })
                        }
                        </View>
                    </View>
                </View>
            </View>
        );
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
})(SwipeScreen);
