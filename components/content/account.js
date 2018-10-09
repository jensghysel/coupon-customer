import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Header} from "react-native-elements";
import globalStyling from "../utils/global-styling";
import CouponBar from "../utils/coupon-bar";
import colors from "../utils/colorsForLists";

export default class Account extends Component{
    static navigationOptions = {
        tabBarLabel: 'Account',
        tabBarIcon: () => (<Icon size={24} color="rgba(255,255,255, 0.5)" name="person" />)
    };

    cardsByType = {
        card: [
            {
                type: 'card',
                id: '123',
                lastUsed: '27/04/2018'
            }
        ],
        kids: [
            {
                type: 'kids',
                id: '123',
                lastUsed: '27/04/2018'
            },
            {
                type: 'kids',
                id: '123',
                lastUsed: '27/04/2018'
            }
        ]
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <Header
                    backgroundColor={'#fcb147'}
                    centerComponent={{text: 'ACCOUNT', style: [globalStyling.titleText, {color: 'white', fontSize: 20}]}}
                    rightComponent={{icon: 'add-box', color: 'white'}}>
                </Header>
                <View>
                    {this.renderCouponBars()}
                </View>
            </View>
        );
    }

    renderCouponBars(){
        let couponList = [];
        //TODO: Start here again
        // this.cardsByType.forEach((d, index) => {
        //     couponList.push(
        //         <CouponBar color={colors[index]} leftText={d.amount + 'x'} centerText={d.name} centerSubText={'Geldig tot '+d.expiryDate} />
        //     );
        // });
        return couponList;
    }
}