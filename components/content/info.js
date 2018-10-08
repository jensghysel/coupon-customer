import React, {Component} from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Info extends Component {
    static navigationOptions = {
        tabBarLabel: 'Info',
        tabBarIcon: () => (<Icon size={24} color="rgba(255,255,255, 0.5)" name="info" />)
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <ImageBackground source={require('../../images/family_bg.jpg')} style={styles.welcomeContainer}>
                    <View style={styles.overlay}>
                    </View>
                    <Text style={styles.welcomeText}>Welcome</Text>
                </ImageBackground>
                <View style={{flex: 1}}>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create ({
    welcomeContainer: {
        flex: 1
    },
    welcomeText: {
        marginTop: 150,
        marginLeft: 100,
        fontSize: 50,
        color: 'white'
    },
    overlay: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'black',
        opacity: 0.3
    }
});