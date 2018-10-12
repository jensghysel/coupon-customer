import React, {Component} from 'react';
import {View, Text} from 'react-native';
import CouponBar from '../../utils/coupon-bar';
import colors from '../../utils/colorsForLists';
import GlobalStyling  from '../../utils/global-styling';

export default class MyCoupons extends Component {
    data = [
        // {
        //     name: 'Ontbijt',
        //     expiryDate: '28/11/2018',
        //     amount: 20
        // },
        // {
        //     name: 'Krant',
        //     expiryDate: '28/11/2018',
        //     amount: 7
        // },
        // {
        //     name: 'Binnenspeeltuin',
        //     expiryDate: '28/11/2018',
        //     amount: 5
        // },
        // {
        //     name: '3 gangen buffet',
        //     expiryDate: '28/11/2018',
        //     amount: 2
        // },
        // {
        //     name: 'Bowlen',
        //     expiryDate: '28/11/2018',
        //     amount: 1
        // },
        // {
        //     name: 'Fietsen',
        //     expiryDate: '28/11/2018',
        //     amount: 4
        // },
    ];

    render(){
        if(this.data <= 0){
            return (
                <View>
                    <Text style={[GlobalStyling.regularText, {textAlign: 'center'}]}>
                        Uw account bevat nog geen coupons.
                    </Text>
                </View>
            );
        }
        return (
            <View style={{marginTop: -20}}>
                {this.renderCouponBars()}
            </View>
        );
    }

    renderCouponBars(){
        let couponList = [];
        this.data.forEach((d, index) => {
            couponList.push(
                <CouponBar color={colors[index]} leftText={d.amount + 'x'} centerText={d.name} centerSubText={'Geldig tot '+d.expiryDate} />
            );
        });
        return couponList;
    }
}