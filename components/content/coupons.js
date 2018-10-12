import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, TouchableOpacity, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Header} from "react-native-elements";
import globalStyling from '../utils/global-styling';
import { TabView, SceneMap } from 'react-native-tab-view';
import MyCoupons from "./coupon/my-coupons";

const FirstRoute = () => (
    <MyCoupons />
);
const SecondRoute = () => (
    <View style={[{ backgroundColor: '#f4416b', flex: 1 }]} />
);
const thirdRoute = () => (
    <View style={[{ backgroundColor: '#673ab7', flex: 1 }]} />
);

export default class Coupons extends Component{
    static navigationOptions = {
        tabBarLabel: 'Coupons',
        tabBarIcon: () => (<Icon size={24} color="rgba(255,255,255, 0.5)" name="receipt" />)
    };

    state = {
        index: 0,
        routes: [
            { key: 'first', title: 'MIJN COUPONS' },
            { key: 'second', title: 'ACTIES' },
            { key: 'third', title: 'HISTORIEK' },
        ],
    };

    _renderTabBar = props => {
        const inputRange = props.navigationState.routes.map((x, i) => i);

        return (
            <View style={styles.tabBar}>
                {props.navigationState.routes.map((route, i) => {
                    const color = props.position.interpolate({
                        inputRange,
                        outputRange: inputRange.map(
                            inputIndex => (inputIndex === i ? '#fff' : '#fcb147')
                        ),
                    });
                    return (
                        <TouchableOpacity
                            style={[styles.tabItem, this.state.index === i ? styles.selectedItem : '']}
                            onPress={() => this.setState({ index: i })}>
                            <Animated.Text style={[{ color, fontSize: 13, paddingTop: 7, paddingBottom: 7 }, globalStyling.regularText]}>{route.title}</Animated.Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <Header
                    backgroundColor={'#fcb147'}
                    centerComponent={{text: 'COUPONS', style: [globalStyling.titleText, {color: 'white', fontSize: 20}]}}
                    rightComponent={{icon: 'search', color: 'white'}}>
                </Header>
                <TabView
                    navigationState={this.state}
                    renderScene={SceneMap({
                        first: FirstRoute,
                        second: SecondRoute,
                        third: thirdRoute,
                    })}
                    renderTabBar={this._renderTabBar}
                    onIndexChange={index => this.setState({ index })}
                    initialLayout={{ width: Dimensions.get('window').width }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabBar: {
        flexDirection: 'row',
        marginLeft: 20,
        marginRight: 20,
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 20,
        borderColor: '#fcb147',
        marginBottom: 20
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        color: '#fcb147'
    },
    selectedItem: {
        backgroundColor: '#fcb147'
    }
});