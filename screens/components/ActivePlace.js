import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    ActivityIndicator, StyleSheet, Button, Dimensions,
    Keyboard, View, Text, TextInput, Image, TouchableOpacity
} from 'react-native';
import {yelpAPIKey} from '../../config';
import axios from 'axios';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class ActivePlace extends Component {    
    buildUrlFromId(id) {
        let url = `https://api.yelp.com/v3/businesses/${id}`;
        return url;
    }

    getRestaurantFromYelp(keyName) {
        const url = this.buildUrlFromId(keyName);
        const options = {headers: {authorization: `Bearer ${yelpAPIKey}`}};
        return axios.get(url, options)
            .then((response)=>{
                let business = response.data;
                let categories = business.categories;
                let cats = categories.map((cat)=>{
                    return cat.title;
                })
                cats = cats.join(', ');
                console.log(cats);
                // console.log(business);
                this.setState({
                    picture: business.image_url,
                    name: business.name,
                    rating: business.rating,
                    price: business.price,
                    categories: cats
                });
        }).catch((e)=>{
            console.log(e);
            throw(e);
        })
    }

    constructor(props) {
        super(props);
        this.state= {
            picture: null,
            name: null,
            votes: 0,
            price: '',
            distance: '',
            time: -1,

        }
    }
    componentWillMount() {
        console.log(this.props);
        this.getRestaurantFromYelp(this.props.id);
    }

    componentWillReceiveProps(nextProps) {
        this.getRestaurantFromYelp(nextProps.id);
        
        // if (this.props.activeRestaurant.id !== nextProps.activeRestaurant.id) {
        //     this.props.activeRestaurant = nextProps.activeRestaurant;
        //     this.getRestaurantFromYelp(nextProps.activeRestaurant.id);
        // }
    }

    renderConfirmButton() {
        return <Button onPress={this.props.confirmButtonPressed.bind(this)} title={'good'} />
    }
    renderCancelButton() {
        return <Button onPress={this.props.cancelButtonPressed.bind(this)} title={'bad'} />
    }

    render() {        
        const {timeRowStyle, imageRowStyle, detailHeaderRowStyle, 
            detailSubHeaderRowStyle, buttonRowStyle, restaurantTouchImageStyle, restaurantImageStyle,
            nameStyle, otherStyle, nameText, actualStyle
        } = styles;
        return(
            <View style={
                { flex: 1,
                    width: SCREEN_WIDTH,}
            }>
                <View style={timeRowStyle}>
                        <Text style={styles.timeText}>
                            {parseInt(this.props.time / 60)} 
                        </Text>
                        <Text>min</Text>
                        <Text style={styles.timeText}>
                            {parseInt(this.props.time) % 60}
                        </Text>
                        <Text>sec</Text>
                </View>                
                <View style={imageRowStyle}>
                    <TouchableOpacity style={restaurantTouchImageStyle}>
                    {
                        this.state.picture ?
                        <Image style={restaurantImageStyle} 
                        source={{uri:this.state.picture}} /> : null                    
                    }
                    </TouchableOpacity>
                </View>
                <View style={detailHeaderRowStyle}>
                        <Text style={styles.nameText}>
                            {this.state.name}
                        </Text>
                        <Text style={styles.detailText}>
                            {this.state.rating} / 5
                        </Text>
                        <Text style={styles.detailText}>
                            0.3 m
                        </Text>
                </View>
                <View style={detailSubHeaderRowStyle}>
                    <View style={actualStyle}>
                    <Text style={styles.priceText}>
                        {this.state.price}
                    </Text>
                    <Text style={styles.detailText}>
                        {this.state.categories}
                    </Text>
                    </View>
                </View>
                <View style={buttonRowStyle}>
                    {this.renderCancelButton()}
                    {this.renderConfirmButton()}
                </View>            
            </View>
                
        )
    }
}

// const mapStateToProps = ({swipe}) => {
//     const {activeRestaurant} = swipe;
//     return { activeRestaurant };
// }

// export default connect(mapStateToProps)(ActivePlace)
export default ActivePlace;

const styles = {
    timeRowStyle: {
        paddingBottom: 25,
        justifyContent: 'center',
        alignItems: 'center',                                
        flexDirection: 'row'
    },
    restaurantTouchImageStyle: {
        height: SCREEN_WIDTH * 0.9, 
        flex: 1,                        
        width: null,
        marginRight: SCREEN_WIDTH * 0.05,
        marginLeft: SCREEN_WIDTH * 0.05
    },
    restaurantImageStyle: {        
        height: SCREEN_WIDTH * 0.9, 
        width: null,
        borderRadius: 25,
    },
    imageRowStyle: {
        borderBottomWidth: 1,
        paddingBottom: 20,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative'                
    },    
    nameStyle:{
        height: 50,
    }, 
    otherStyle: {
        flexDirection:'row'
    },
    detailHeaderRowStyle: {
        flexDirection:'row',
        alignItems: 'center',
        paddingHorizontal: SCREEN_WIDTH * 0.05        
    },
    actualStyle: {
        flexDirection:'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    detailSubHeaderRowStyle: {
        padding: SCREEN_WIDTH * 0.05
    },
    buttonRowStyle: {
        justifyContent: 'center',
        alignItems: 'center',                                
        flexDirection: 'row'
    },
    errorStyles: {
        fontSize: 18
    },
    nameText: {
        fontSize: 30        
    },
    timeText: {
        fontSize: 40
    },
    detailText: {
        fontSize: 12
    },
    priceText: {
        fontSize: 12,
        paddingRight: 10
    }
}