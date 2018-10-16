import React, {Component} from 'react';
import {View, Text, StyleSheet, ImageBackground, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import globalStyles from '../utils/global-styling';
import SimpleTextSlider from "../utils/simple-text-slider";

export default class Info extends Component {
    static navigationOptions = {
        tabBarLabel: 'Info',
        tabBarIcon: () => (<Icon size={24} color="rgba(255,255,255, 0.5)" name="info"/>)
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <ImageBackground source={require('../../images/family_bg.jpg')} style={styles.welcomeContainer}>
                    <View style={styles.overlay}>
                    </View>
                    <Text style={styles.welcomeText}>Welkom</Text>
                    <Text
                        style={styles.welcomeTextSmall}>{'Fijn dat je bij ons je vakantie spendeert \n \n Koppel hier je kaart en weet \n welke coupons u bezit'}</Text>
                </ImageBackground>
                <TouchableHighlight style={styles.cardButton} onPress={() => {
                    this.props.navigation.navigate('ScanQr')
                }}>
                    <Text style={styles.cardButtonText}>Kaart Koppelen</Text>
                </TouchableHighlight>
                <View style={{flex: 1, flexDirection: 'row', marginTop: 15}}>
                    <TouchableHighlight onPress={() => {this.props.navigation.navigate('Plattegrond');}}>
                        <View style={[globalStyles.roundedShadedView, {marginLeft: 30, marginRight: 5, flex: 1}]}>
                            <Icon name='map' color='#fcb147' style={styles.icon}/>
                            <Text style={[globalStyles.titleText, {fontSize: 15, textAlign: 'center', marginTop: 5}]}>PLATTEGROND</Text>
                            <Text style={[globalStyles.regularText, {
                                fontSize: 10,
                                textAlign: 'center'
                            }]}>{'Weet altijd waar \n u zich bevindt'}</Text>
                        </View>
                    </TouchableHighlight>
                    <View style={[globalStyles.roundedShadedView, {marginLeft: 5, marginRight: 30, flex: 1}]}>
                        <Icon name='receipt' color='#fcb147' style={styles.icon}/>
                        <Text style={[globalStyles.titleText, {
                            fontSize: 15,
                            textAlign: 'center',
                            marginTop: 5
                        }]}>COUPONS</Text>
                        <Text style={[globalStyles.regularText, {
                            fontSize: 10,
                            textAlign: 'center'
                        }]}>{'Hoeveel coupons \n heb ik nog?'}</Text>
                    </View>
                </View>
                <View style={{flex: 1.5, marginTop: 30, marginBottom: 20}}>
                    <View style={[globalStyles.roundedShadedView, {marginLeft: 30, marginRight: 30, flex: 1}]}>
                        <SimpleTextSlider titleIcon='add-alert' titleText='Nieuws'
                                          data={[{text: 'Vanavond om 18u30 vindt voor de \n 50ste maal de grote bingo avond plaats'}, {text: 'Morgen is de trampoline terug \n van weggeweest, wees er vroeg bij!'}, {text: 'Dit weekend zijn alle dranken aan verminderde \n prijs in de cafetaria tussen 15u & 16u'}]}></SimpleTextSlider>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    welcomeContainer: {
        flex: 3,
        resizeMode: 'cover'
    },
    welcomeText: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 60,
        color: 'white',
        fontFamily: 'Quicksand-Bold',
    },
    welcomeTextSmall: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 20,
        color: 'white',
        fontFamily: 'Quicksand-Regular',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'black',
        opacity: 0.5
    },
    cardButton: {
        backgroundColor: '#fcb147',
        height: 40,
        borderRadius: 10,
        marginLeft: 20,
        marginRight: 20,
        marginTop: -20
    },
    cardButtonText: {
        textAlign: 'center',
        fontSize: 30,
        fontFamily: 'Quicksand-Light',
        color: 'white'
    },
    icon: {
        fontSize: 30,
        textAlign: 'center'
    }
});