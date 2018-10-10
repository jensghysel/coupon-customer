import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Header} from "react-native-elements";
import globalStyling from "../utils/global-styling";
import CouponBar from "../utils/coupon-bar";
import colors from "../utils/colorsForLists";

export default class Account extends Component {
    static navigationOptions = {
        tabBarLabel: 'Account',
        tabBarIcon: () => (<Icon size={24} color="rgba(255,255,255, 0.5)" name="person"/>)
    };

    cardsByType = {
        card: {
            data: [
                {
                    type: 'fysieke kaart',
                    id: '123',
                    lastUsed: '27/04/2018'
                }
            ],
            icon: 'credit-card'
        },
        kids:
            {
                data: [
                    {
                        type: 'kids-bandje',
                        id: '123',
                        lastUsed: '27/04/2018'
                    },
                    {
                        type: 'kids-bandje',
                        id: '123',
                        lastUsed: '27/04/2018'
                    }
                ],
                icon: 'control-point-duplicate'
            }
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <Header
                    backgroundColor={'#fcb147'}
                    centerComponent={{
                        text: "ID'S",
                        style: [globalStyling.titleText, {color: 'white', fontSize: 20}]
                    }}
                    rightComponent={{icon: 'add-box', color: 'white'}}>
                </Header>
                <View>
                    {this.renderCouponBars()}
                </View>
            </View>
        );
    }

    renderCouponBars() {
        let couponList = [];
        let keys = Object.keys(this.cardsByType);
        keys.forEach((k, index) => {
            let cards = this.cardsByType[k];
            couponList.push(
                <CouponBar icon={cards.icon} color={colors[index]} centerText={cards.data.length + 'x '+cards.data[0].type} data={this.cardsByType[k].data} centerSubText={'Laatst gebruikt: '+cards.data[0].lastUsed} />
            );
        });
        return couponList;
    }
}