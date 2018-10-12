import React, {Component} from 'react';
import Swiper from 'react-native-swiper';
import {StyleSheet, Text, View} from 'react-native';
import globalStyles from '../utils/global-styling';
import Icon from "react-native-vector-icons/MaterialIcons";

export default class SimpleTextSlider extends Component {
    render() {
        let slides = [];
        this.props.data.forEach(s => {
            slides.push(
                <View>
                    <Icon name={this.props.titleIcon} color='#fcb147' style={styles.icon} />
                    <Text style={[globalStyles.titleText, {fontSize: 15, textAlign: 'center', marginTop: 5}]}>{this.props.titleText}</Text>
                    <View style={styles.slide}>
                        <Text style={[globalStyles.regularText, styles.text]}>{s.text}</Text>
                    </View>
                </View>
            );
        });
        return (
            <View style={styles.container}>
                <Swiper style={styles.wrapper} showsButtons={false}
                        activeDotStyle={{backgroundColor: 'transparent', borderWidth: 1, borderColor: '#fcb147'}}
                        paginationStyle={{bottom: 0}}>
                    {slides}
                </Swiper>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    wrapper: {},
    slide: {
        marginTop: 5,
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    text: {
        textAlign: 'center',
        color: 'black',
        fontSize: 13
    },
    icon: {
        fontSize: 30,
        textAlign: 'center'
    }
});