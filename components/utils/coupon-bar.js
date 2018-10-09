import React, {Component} from 'react';
import {View, Dimensions, Text, Button} from 'react-native';
import globalStyling from '../utils/global-styling';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class CouponBar extends Component{

    renderFirstPart(){
        if(this.props.leftText){
            return (
                <Text style={[globalStyling.titleText, {color: 'white', textAlign: 'center', fontSize: 20}]}>{this.props.leftText}</Text>
            );
        } else {
            return (
                <Icon name={this.props.icon} color='#fff' size={20}></Icon>
            )
        }
    }

    renderData(){
        if(this.props.data){
            return (
              <Button title='>'></Button>
            );
        }
    }

    render(){
        return (
            <View style={{marginLeft: 20, marginRight: 20, borderRadius: 5, height: 50, backgroundColor: 'rgba(204,204,204, 0.3)', marginTop: 20,}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 1, justifyContent: 'center', backgroundColor: this.props.color, borderRadius: 5}}>
                        {this.renderFirstPart()}
                    </View>
                    <View style={{flex: 5, marginLeft: 10}}>
                        <Text style={[globalStyling.regularText, {fontSize: 30}]}>{this.props.centerText}</Text>
                        <Text style={[globalStyling.regularText, {fontSize: 10}]}>{this.props.centerSubText}</Text>
                    </View>
                    {this.renderData()}
                </View>
            </View>
        );
    }
}