import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Coupons extends Component{
    static navigationOptions = {
        tabBarLabel: 'Coupons',
        tabBarIcon: () => (<Icon size={24} color="rgba(255,255,255, 0.5)" name="receipt" />)
    };

    render() {
        return (
            <View style={{'margin-top': 10}}>
                <Text>Coupon View</Text>
            </View>
        );
    }
}