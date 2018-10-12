/** @format */

import {AppRegistry} from 'react-native';
import React from 'react';
import {NavigationComponent} from 'react-native-material-bottom-navigation-performance';
import {StackNavigator, TabNavigator} from 'react-navigation';
import Info from "./components/content/info";
import Coupons from "./components/content/coupons";
import Account from "./components/content/account";
import Icon from 'react-native-vector-icons/MaterialIcons';
import ScanQr from "./components/content/scan-qr";

const MyApp =
    StackNavigator({
            menu:
                TabNavigator(
                    {
                        Info: {screen: Info},
                        Coupons: {screen: Coupons},
                        Account: {screen: Account}
                    },
                    {
                        tabBarComponent: NavigationComponent,
                        tabBarPosition: 'bottom',
                        animationEnabled: true,
                        swipeEnabled: true,
                        tabBarOptions: {
                            bottomNavigationOptions: {
                                labelColor: 'rgba(255,255,255, 0.5)',
                                rippleColor: 'white',
                                style: "height: 56, elevation: 8, position: 'absolute', left: 0, bottom: 0, right: 0",
                                tabs: {
                                    Info: {
                                        barBackgroundColor: '#fcb147',
                                        activeLabelColor: 'white',
                                        activeIcon: <Icon size={26} color="white" name="info"/>
                                    },
                                    Coupons: {
                                        barBackgroundColor: '#fcb147',
                                        activeLabelColor: 'white',
                                        activeIcon: <Icon size={26} color="white" name="receipt"/>
                                    },
                                    Account: {
                                        barBackgroundColor: '#fcb147',
                                        activeLabelColor: 'white',
                                        activeIcon: <Icon size={26} color="white" name="person"/>
                                    }
                                }
                            }
                        }
                    }),
            others: {
                screen: StackNavigator({
                    ScanQr: ScanQr
                }, {headerMode: 'hide'})
            }
        },
        {headerMode: 'hide'}
    );

console.disableYellowBox = true;

AppRegistry.registerComponent('coupons_customer', () => MyApp);