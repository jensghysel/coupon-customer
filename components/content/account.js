import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Account extends Component{
    static navigationOptions = {
        tabBarLabel: 'Account',
        tabBarIcon: () => (<Icon size={24} color="rgba(255,255,255, 0.5)" name="person" />)
    };
    render() {
        return (
            <View>
                <Text>Account View</Text>
            </View>
        );
    }
}