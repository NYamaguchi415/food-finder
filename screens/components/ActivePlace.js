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

export default class ActivePlace extends Component {    
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
        })    

    }

    constructor(props) {
        super(props);
        this.state= {
            picture: null,
            name: null,
            votes: 0
        }
    }
    componentWillMount() {
        this.getRestaurantFromYelp(this.props.keyName);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.keyName !== nextProps.keyName) {
            console.log('SOMETHING CHANGED');
            console.log(this.props.keyName, nextProps.keyName);
            this.props.keyName = nextProps.keyName;
            this.getRestaurantFromYelp(nextProps.keyName);
        }
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
                    {this.props.renderCancelButton()}
                    {this.props.renderConfirmButton()}
                </View>            
            </View>
                
        )
    }
}


const styles = {
    timeRowStyle: {
        // height: 50,

        // flex: 1,
        // paddingTop: 50,
        paddingBottom: 25,
        // justifyContent: 'space-around',
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
        // flex: 1,                        
        width: null,
        borderRadius: 25,
        // marginRight: SCREEN_WIDTH * 0.05,
        // marginLeft: SCREEN_WIDTH * 0.05
    },
    imageRowStyle: {
        // flex: 1,
        borderBottomWidth: 1,
        // padding: 5,
        paddingBottom: 20,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative'                
    },    
    nameStyle:{
        height: 50,
        // width: SCREEN_WIDTH,
        
        // maxHeight: 100,    
        // flex: 3
        // flexShrink: 2
    }, 
    otherStyle: {
        // flex: 1,
        flexDirection:'row'
    },
    detailHeaderRowStyle: {
        // flex: 1,      
        flexDirection:'row',
        // justifyContent: 'center',
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
        // flex: 1,
        // height: 50,
        // paddingTop: 10,
        // paddingLeft: 20,
        // paddingRight: 20,
        // justifyContent: 'flex-start',
        // justifyContent: 'center',        
        // alignItems: 'center',                                
        // flexDirection: 'row'
    },
    buttonRowStyle: {
        // flex: 1,
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