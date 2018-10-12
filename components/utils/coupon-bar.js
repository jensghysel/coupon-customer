import React, {Component} from 'react';
import {View, Text} from 'react-native';
import globalStyling from '../utils/global-styling';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CollapseView from "react-native-collapse-view";

export default class CouponBar extends Component {

    renderFirstPart() {
        if (this.props.leftText) {
            return (
                <Text style={[globalStyling.titleText, {
                    color: 'white',
                    textAlign: 'center',
                    fontSize: 20
                }]}>{this.props.leftText}</Text>
            );
        } else {
            return (
                <Icon name={this.props.icon} color='#fff' size={40} style={{marginLeft: 0, marginRight: 0}}></Icon>
            )
        }
    }

    renderCollapseIcon = (collapse) => {
        if (this.props.data) {
            let iconName = collapse ? 'keyboard-arrow-up' : 'keyboard-arrow-down';
            return (
                <View style={globalStyling.viewCenterAlign}>
                    <Icon name={iconName} size={30}/>
                </View>
            );
        }
    };

    _renderCardData = (collapse) => {
        let cards = [];
        this.props.data.forEach(d => {
            cards.push(
                <View style={{flexDirection: 'row', marginTop: 10, padding: 10}}>
                    <Text style={[globalStyling.regularText, {fontSize: 20, flex: 6}]}>{d.id}</Text>
                    <Icon name='delete' size={20} style={{color: 'red', fontSize: 20, flex: 1}}
                          onPress={() => this.props.removeCard(d.id)}/>
                </View>
            );
        });
        return (
            <View style={{
                marginLeft: 20,
                marginRight: 20,
                borderBottomLeftRadius: 5,
                borderBottomRightRadius: 5,
                borderColor: 'rgba(204,204,204, 0.3)',
                borderWidth: 1
            }}>
                {cards}
            </View>
        );
    };

    _renderContent = (collapse) => {
        return (
            <View style={{
                marginLeft: 20,
                marginRight: 20,
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
                height: 50,
                backgroundColor: 'rgba(204,204,204, 0.3)',
                marginTop: 20,
            }}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={[globalStyling.viewCenterAlign, {
                        backgroundColor: this.props.color,
                        borderRadius: 5
                    }]}>
                        {this.renderFirstPart()}
                    </View>
                    <View style={{flex: 5, marginLeft: 10}}>
                        <Text style={[globalStyling.regularText, {fontSize: 30}]}>{this.props.centerText}</Text>
                        <Text style={[globalStyling.regularText, {fontSize: 10}]}>{this.props.centerSubText}</Text>
                    </View>
                    {this.renderCollapseIcon(collapse)}
                </View>
            </View>
        );
    };

    render() {
        if (this.props.data) {
            return (
                <CollapseView renderView={this._renderContent} renderCollapseView={this._renderCardData}/>
            );
        } else {
            return this._renderContent();
        }
    }
}