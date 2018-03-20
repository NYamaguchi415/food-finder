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
            picture: '',
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
        const {timeRowStyle, imageRowStyle, detailHeaderRowStyle, detailSubHeaderRowStyle, buttonRowStyle} = styles;
        return(
            <View>
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
                    <TouchableOpacity
                    style={{
                        height: 300, 
                        flex: 1,                        
                        width: null,
                        // padding: 10
                        }}
                    >
                        <Image style={{
                            height: 300, 
                            flex: 1,                        
                            width: null,
                            padding: 20,
                            marginRight: 20,
                            marginLeft: 20,
                            borderRadius: 50
                            }}
                            source={{uri:this.state.picture}} />
                    </TouchableOpacity>
                </View>
                <View style={detailHeaderRowStyle}>
                    <Text style={styles.timeText}>
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
                    <Text style={styles.priceText}>
                        {this.state.price}
                    </Text>
                    <Text style={styles.detailText}>
                        {this.state.categories}
                    </Text>
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
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',                                
        flexDirection: 'row'
    },
    imageRowStyle: {
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative'                
    },    
    detailHeaderRowStyle: {
        height: 50,
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: 'space-between',
        alignItems: 'center',                                
        flexDirection: 'row'
    },
    detailSubHeaderRowStyle: {
        height: 50,
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: 'flex-start',
        alignItems: 'center',                                
        flexDirection: 'row'
    },
    buttonRowStyle: {
        justifyContent: 'center',
        alignItems: 'center',                                
        flexDirection: 'row'
    },
    errorStyles: {
        fontSize: 18
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