import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    ActivityIndicator, StyleSheet, Button, Dimensions,
    Keyboard, View, Text, TextInput, Image, TouchableOpacity
} from 'react-native';

export class ResultRow extends Component {
    render() {
        return(
            <Text style={this.props.styles.resultRow}>
                {this.props.restaurantName}
                {this.props.votes}
            </Text>
        )
    }
}
export default ResultRow;