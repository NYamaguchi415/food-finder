import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    ActivityIndicator, StyleSheet, Button, Dimensions,
    Keyboard, View, Text, TextInput, Image, TouchableOpacity
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class ActivePlace extends Component {
    render() {
        return(
            <View style={{
                justifyContent: 'center',
                alignItems: 'center'        
            }}>
                <TouchableOpacity>
                    <Image style={{width:100, height: 100}}
                        source={{uri:this.props.restaurant.uri}} />
                </TouchableOpacity>
                <Text style={this.props.styles.errorTextStyle}>
                    {this.props.restaurantName}
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
