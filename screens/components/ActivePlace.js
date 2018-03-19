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
                this.setState({
                        picture: business.image_url,
                        name: business.name,
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
        return(
            <View style={{
                justifyContent: 'center',
                alignItems: 'center'        
            }}>
                <TouchableOpacity>
                    <Image style={{width:100, height: 100}}
                        source={{uri:this.state.picture}} />
                </TouchableOpacity>
                <Text style={this.props.styles.errorTextStyle}>
                    {this.state.name}
                    {this.props.restaurant.votes}
                </Text>
                <View style={{flexDirection: 'row'}}>
                    {this.props.renderCancelButton()}
                    {this.props.renderConfirmButton()}
                </View>
                <Text style={this.props.styles.errorTextStyle}>
                    {this.props.time}
                </Text>
            </View>
                
        )
    }
}
