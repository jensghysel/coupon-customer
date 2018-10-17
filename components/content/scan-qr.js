import React, {Component} from 'react';
import {Header} from "react-native-elements";
import globalStyling from "../utils/global-styling";
import {View, StyleSheet} from "react-native";
import QRCodeScanner from 'react-native-qrcode-scanner';
import Icon from "react-native-vector-icons/MaterialIcons";

export default class ScanQr extends Component {
    _onSuccess(e) {
        this.props.navigation.navigate('Account', {
            qrCodeData: e.data.substring(e.data.lastIndexOf('/')+1)
        });
    }

    _returnToHome(){
        // this.props.navigation.navigate('Info');
        this.props.navigation.navigate('Account', {
            qrCodeData: '1111966154242130'
        });
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Header
                    backgroundColor={'#fcb147'}
                    centerComponent={{
                        text: "SCAN YOUR CARD",
                        style: [globalStyling.titleText, {color: 'white', fontSize: 20}]
                    }}
                    leftComponent={<Icon name='keyboard-arrow-left' color='white' size={25} onPress={() => {
                        this._returnToHome();
                    }} />}>
                </Header>
                <QRCodeScanner style={{flex: 1}}
                    onRead={this._onSuccess.bind(this)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777',
    },
    textBold: {
        fontWeight: '500',
        color: '#000',
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)',
    },
    buttonTouchable: {
        padding: 16,
    },
});