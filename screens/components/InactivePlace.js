import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    ActivityIndicator, StyleSheet, Button, Dimensions,
    Keyboard, View, Text, TextInput, Image, TouchableOpacity
} from 'react-native';

export default class InactivePlace extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let outOfMatchesMessage;
        let outOfTimeMessage;
        if (this.props.outOfMathes) {
            outOfMatchesMessage =  (
                <Text style={this.props.styles.errorTextStyle}>
                    Out of matches womp womp
                </Text>
            )
        }

        if (this.props.outOfTime) {
            outOfTimeMessage =  (
                <Text style={this.props.styles.errorTextStyle}>
                    You ran out of time
                </Text>
            )

            setTimeout(()=>{
                this.props.navigation.navigate('results')
            },100);
        } else {
            outOfTimeMessage =  (
                <Text style={this.props.styles.errorTextStyle}>
                    {this.props.time}
                </Text>
            )            
        }
        return(
            <View style={{
                justifyContent: 'center',
                alignItems: 'center'        
            }}>
                {
                    outOfMatchesMessage                    
                }
                {
                    outOfTimeMessage
                }
            </View>
        )
    }
}
