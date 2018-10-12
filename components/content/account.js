import React, {Component} from 'react';
import {View, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Header} from "react-native-elements";
import globalStyling from "../utils/global-styling";
import CouponBar from "../utils/coupon-bar";
import colors from "../utils/colorsForLists";
import {isCardValid} from "../../services/coupon-service";

export default class Account extends Component {
    static navigationOptions = {
        tabBarLabel: 'Account',
        tabBarIcon: () => (<Icon size={24} color="rgba(255,255,255, 0.5)" name="person"/>)
    };

    state = {
        cards: {
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
                            id: '1234',
                            lastUsed: '27/04/2018'
                        },
                        {
                            type: 'kids-bandje',
                            id: '1235',
                            lastUsed: '27/04/2018'
                        }
                    ],
                    icon: 'control-point-duplicate'
                }
        }
    };

    render() {
        const qrCodeData = this.props.navigation.getParam('qrCodeData');
        if (qrCodeData && qrCodeData !== this.lastAddedId) {
            this._addCard(qrCodeData);
        }
        return (
            <View style={{flex: 1}}>
                <Header
                    backgroundColor={'#fcb147'}
                    centerComponent={{
                        text: "ID'S",
                        style: [globalStyling.titleText, {color: 'white', fontSize: 20}]
                    }}
                    rightComponent={<Icon name='add-box' color='white' size={25} onPress={() => {
                        this.props.navigation.navigate('ScanQr');
                    }}/>}>
                </Header>
                <View>
                    {this.renderCouponBars()}
                </View>
            </View>
        );
    }

    renderCouponBars() {
        let couponList = [];
        let keys = Object.keys(this.state.cards);
        keys.forEach((k, index) => {
            let cards = this.state.cards[k];
            if (cards.data && cards.data.length > 0) {
                couponList.push(
                    <CouponBar icon={cards.icon} color={colors[index]}
                               centerText={cards.data.length + 'x ' + cards.data[0].type}
                               data={this.state.cards[k].data}
                               centerSubText={'Laatst gebruikt: ' + cards.data[0].lastUsed}
                               removeCard={this.removeCard}/>
                );
            }
        });
        return couponList;
    }

    removeCard = (id) => {
        let foundCard = this._findTypeAndIndexOfId(id);
        Alert.alert('Kaart verwijderen',
            'Wil je zeker card met id ' + id + ' verwijderen?',
            [
                {
                    text: 'Ja', onPress: () => {
                        this.state.cards[foundCard.type].data.splice(foundCard.index, 1);
                        this.setState(
                            {
                                cards: this.state.cards
                            }
                        );
                    }
                },
                {
                    text: 'Nee', onPress: () => {
                    }
                }
            ]);
    };

    _addCard = (id) => {
        let newState = this.state.cards;
        if (newState['unknown'] === undefined) {
            newState['unknown'] = {data: [], icon: 'bestaat-niet'};
        }
        if (this._findTypeAndIndexOfId(id).type !== undefined) {
            Alert.alert("Dit ID werd al aan je portefeuille toegevoegd");
        } else {
            isCardValid(id).then((res) => {
                if(res === null){
                    Alert.alert("Dit is een ongeldig ID!");
                } else {
                    this.lastAddedId = id;
                    newState['unknown'].data.push({
                        type: 'unknown',
                        id: id,
                        lastUsed: new Date().getDay() + '/' + new Date().getMonth() + '/' + new Date().getFullYear()
                    });
                    this.setState({
                        cards: newState
                    });
                    Alert.alert("ID successvol toegevoegd!")
                }
            }).catch(ex => {
                console.log(ex);
            });
        }
    };

    _findTypeAndIndexOfId(id) {
        let keys = Object.keys(this.state.cards);
        let i;
        let type;
        keys.forEach(k => {
            this.state.cards[k].data.forEach((c, index) => {
                if (c.id === id) {
                    i = index;
                    type = k;
                }
            });
        });
        return {type: type, index: i};
    }
}