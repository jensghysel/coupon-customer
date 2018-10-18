import React, {Component} from 'react';
import {Header} from "react-native-elements";
import globalStyling from "../utils/global-styling";
import {View, ActivityIndicator, Text} from "react-native";
import GlobalStyling from '../utils/global-styling';
import {assignCoupon, ids} from "../../services/coupon-service";

export default class Bancontact extends Component {

    render() {
        let selectedCoupons = this.props.navigation.getParam("selectedCoupons");

        if(selectedCoupons !== null) {
            setTimeout(() => {
                this.props.navigation.setParams({'selectedCoupons': null});
                this.props.navigation.navigate("Coupons", {fromPayment: true});
            }, 5000);

            Object.keys(selectedCoupons).forEach(c => {
                for (let i = 0; i < selectedCoupons[c]; i++) {
                    assignCoupon(selectedCoupons[c], ids[0]);
                }
            });
        }

        return(
            <View style={{flex: 1}}>
                <Header
                    backgroundColor={'#fcb147'}
                    centerComponent={{
                        text: "COUPONS BETALEN",
                        style: [globalStyling.titleText, {color: 'white', fontSize: 20}]
                    }}>
                </Header>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <ActivityIndicator size="large" color="rgba(252,177,71, 2.0)" />
                    <Text style={[GlobalStyling.titleText, {marginTop: 20, fontSize: 20, textAlign: 'center'}]}>Bancontact/Payconiq betaling</Text>
                </View>
            </View>
        );
    }
}