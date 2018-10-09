import React, {Component} from 'react';
import Swiper from 'react-native-swiper';
import {StyleSheet, View, Text} from 'react-native';
import globalStyles from '../utils/global-styling';

export default class SimpleTextSlider extends Component {
    render() {
        let slides = [];
        this.props.data.forEach(s => {
            slides.push(
                <View style={styles.slide}>
                    <Text style={[globalStyles.regularText, styles.text]}>{s.text}</Text>
                </View>
            );
        });
        return (
            <View style={styles.container}>
                <Swiper style={styles.wrapper} showsButtons={false} activeDotStyle={{ backgroundColor: 'transparent', borderWidth: 1, borderColor: '#fcb147' }}  paginationStyle={{bottom: 0}}>
                    {slides}
                </Swiper>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: -20
    },
    wrapper: {},
    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    text: {
        textAlign: 'center',
        color: 'black',
        fontSize: 10
    }
});