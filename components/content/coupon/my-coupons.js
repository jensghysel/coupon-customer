import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import CouponBar from '../../utils/coupon-bar';
import colors from '../../utils/colorsForLists';
import GlobalStyling from '../../utils/global-styling';
import {getCoupons, ids} from "../../../services/coupon-service";

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

    state = {
        coupons: [],
        ids: []
    };

    componentDidMount() {
        setInterval(() => {
            if (JSON.stringify(this.state.ids) !== JSON.stringify(ids)) {
                this.setState({ids: JSON.parse(JSON.stringify(ids))});
                this._retrieveData();
            }
        }, 2000);
    }

    render() {
        this._retrieveData();
        if (!this.state) {
            return (
                <View>
                    <Text style={[GlobalStyling.regularText, {textAlign: 'center'}]}>
                        Uw account bevat nog geen coupons.
                    </Text>
                </View>
            );
        }
        return (
            <ScrollView style={{marginTop: -20}}>
                {this.renderCouponBars()}
            </ScrollView>
        );
    }

    _retrieveData() {
        getCoupons().then(response => {
            if (JSON.stringify(this.state.coupons) !== JSON.stringify(response)) {
                this.setState({
                    coupons: response
                });
            }
        });
    }

    renderCouponBars() {
        let couponList = [];
        this.state.coupons.forEach((d, index) => {
            couponList.push(
                <CouponBar color={colors[index]} leftText={d.amount + 'x'} centerText={d.coupon.couponDescription}
                           centerSubText={'Geldig tot ' + d.coupon.expirationDate}/>
            );
        });
        return couponList;
    }

    refresh() {
        this._retrieveData();
    }
}