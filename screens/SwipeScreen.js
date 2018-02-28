import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    ActivityIndicator, StyleSheet, Button, Dimensions,
    Keyboard, View, Text, TextInput, Image
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

class SwipeScreen extends Component {
    confirmButtonPressed() {
        console.log('confirm button pressed');
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
    render() {
        const src = { uri: 'http://experiencenomad.com/wp-content/uploads/2014/02/essen-1024x764.jpg' }
        return (
            <View style={styles.mainViewStyle}>
                <View style={{ height: 80, width: SCREEN_WIDTH * 0.85 }}>
                    <Image style={styles.swipeImageStyle} source={src} />
                    <View style={{ flex: 1 }}>
                        <Text style={styles.errorTextStyle}>
                            {this.props.error}
                        </Text>
                        {this.renderConfirmButton()}
                        {this.renderCancelButton()}
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
        alignSelf: 'center',
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
