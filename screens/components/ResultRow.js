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
                Restaurant: {this.props.name}
                No: {this.props.no}
                Yes: {this.props.yes}
            </Text>
        )
    }
}
export default ResultRow;