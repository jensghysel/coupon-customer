import React, {Component} from 'react';
import {allCoupons, ids} from "../../../services/coupon-service";
import {View, Text, TouchableOpacity, ScrollView, Alert} from "react-native";
import GlobalStyling from '../../utils/global-styling';
import colors from '../../utils/colorsForLists';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Overview extends Component {
    state = {
        coupons: [],
        couponCount: {},
        retrievedCoupons: false
    };

    render() {
        this._retrieveData();
        return (
            <View style={{flex: 1}}>
                <ScrollView>
                    {this._renderCoupons()}
                </ScrollView>
                <View>
                    {this._renderTotal()}
                </View>
            </View>
        );
    }

    _retrieveData() {
        if(!this.state.retrievedCoupons){
            allCoupons().then(response => {
                this.setState({retrievedCoupons: true});
                this.setState({coupons: response});
            });
        }
    }

    _renderCoupons() {
        let content = [];
        this.state.coupons.forEach((c, index) => {
            if(this.state.couponCount[c.id] === undefined){
                this.state.couponCount[c.id] = 0;
            }
            content.push(
                <View style={{borderRadius: 20, backgroundColor: colors[index], margin: 10}}>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity style={{flex: 1, borderRightWidth: 1, borderColor: 'white', borderStyle: 'solid', justifyContent: 'center'}} onPress={() => {this._removeCoupon(c.id)}}>
                            <Icon style={{padding: 10}} name='remove' size={30} color='white' />
                        </TouchableOpacity>
                        <View style={[GlobalStyling.regularText, {flex: 6, padding: 10}]}>
                            <Text style={{textAlign: 'center', fontSize: 20, color: 'white',}}>{c.description}</Text>
                            <Text style={[{color: 'white', textAlign: 'center', fontSize: 15, marginTop: 10}]}>Aantal: {this.state.couponCount[c.id]}</Text>
                        </View>
                        <TouchableOpacity style={{flex: 1, alignItems: 'flex-end', borderLeftWidth: 1, borderColor: 'white', borderStyle: 'solid', justifyContent: 'center'}} onPress={() => {this._addCoupon(c.id)}}>
                            <Icon name='add' size={30} color='white' style={{padding: 10}} />
                        </TouchableOpacity>
                    </View>
                </View>
            );
        });
        return content;
    }

    _renderTotal(){
        let newTotal = 0;
        Object.keys(this.state.couponCount).forEach(c => {
           newTotal += this.state.couponCount[c];
        });
        if(newTotal > 0){
            return (
                <View style={{flexDirection: 'row', backgroundColor: 'rgba(252,177,71, 0.6)', padding: 10}}>
                    <Text style={[GlobalStyling.regularText, {flex: 4, fontSize: 15, color: 'white'}]}>{newTotal} coupon(s) toevoegen aan je ID's?</Text>
                    <TouchableOpacity style={{flex: 1, borderRadius: 5, backgroundColor: 'rgba(252,177,71, 1.0)'}}>
                        <Text style={[GlobalStyling.titleText, {fontSize: 12, color: 'white', textAlign: 'center', padding: 5}]}>KLIK HIER</Text>
                    </TouchableOpacity>
                </View>
            );
        }
    }

    _addCoupon(id){
        if(this._customerHasCards()){
            this.state.couponCount[id] = this.state.couponCount[id] + 1;
            this.setState({couponCount: this.state.couponCount});
        }
    }

    _removeCoupon(id){
        if(this._customerHasCards()) {
            if (this.state.couponCount[id] > 0) {
                this.state.couponCount[id] = this.state.couponCount[id] - 1;
                this.setState({couponCount: this.state.couponCount});
            }
        }
    }

    _customerHasCards(){
        if(ids.length > 0){
            return true;
        } else {
            Alert.alert("U hebt nog geen ID gelinkt aan je app");
            return false;
        }
    }
}