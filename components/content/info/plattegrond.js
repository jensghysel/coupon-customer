import React, {Component} from 'react';
import {Header} from "react-native-elements";
import MapView from "react-native-maps";
import globalStyling from "../../utils/global-styling";
import Icon from "react-native-vector-icons/MaterialIcons";
import {View, Dimensions, Animated, Text, Image, StyleSheet, TouchableHighlight} from "react-native";

const Images = [
    require('../../../images/speelplein.jpg'),
    require('../../../images/trampoline.jpeg'),
    require('../../../images/paardrijden.jpg'),
];

const {width, height} = Dimensions.get("window");
const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

export default class Plattegrond extends Component {
    state = {
        markers: [
            {
                coordinate: {
                    latitude: 0.001156,
                    longitude: -0.0033891,
                },
                title: "Speelplein",
                description: "Kinderparadijs",
                image: Images[0],
            },
            {
                coordinate: {
                    latitude: 0.0010233,
                    longitude: 0.0023323,
                },
                title: "Trampoline",
                description: "7 Trampolines",
                image: Images[1],
            },
            {
                coordinate: {
                    latitude: -0.0015397,
                    longitude: -0.0022417,
                },
                title: "Manege",
                description: "Paardrijden",
                image: Images[2],
            },
        ],
        region: {
            latitude: 50.827169,
            longitude: 3.300247,
            latitudeDelta: 0.01864195044303443,
            longitudeDelta: 0.010142817690068,
        },
        activeIndex: 0
    };

    constructor(props){
        super(props);
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({region: {longitude: position.coords.longitude, latitude: position.coords.latitude, latitudeDelta: 0.01864195044303443, longitudeDelta: 0.010142817690068,}});
            this.state.markers.forEach(m => {
                let newLongitude = m.coordinate.longitude + position.coords.longitude;
                let newLatitude = m.coordinate.latitude + position.coords.latitude;
               m.coordinate = {
                   latitude: newLatitude,
                   longitude: newLongitude
               }
            });
            this.setState({markers: this.state.markers});
            this._goToMarker(1);
        }, (error) => {
            // alert(JSON.stringify(error))
        }, {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 1000
        });
    }

    componentWillMount() {
        this.animation = new Animated.Value(0);
    }

    render() {
        const interpolations = this.state.markers.map((marker, index) => {
            const inputRange = [
                (index - 1) * CARD_WIDTH,
                index * CARD_WIDTH,
                ((index + 1) * CARD_WIDTH),
            ];
            const scale = this.animation.interpolate({
                inputRange,
                outputRange: [1, 2.5, 1],
                extrapolate: "clamp",
            });
            const opacity = this.animation.interpolate({
                inputRange,
                outputRange: [0.35, 1, 0.35],
                extrapolate: "clamp",
            });
            return {scale, opacity};
        });

        return (
            <View style={{flex: 1}}>
                <Header
                    backgroundColor={'#fcb147'}
                    centerComponent={{
                        text: "PLATTEGROND",
                        style: [globalStyling.titleText, {color: 'white', fontSize: 20}]
                    }}
                    leftComponent={<Icon name='keyboard-arrow-left' color='white' size={25} onPress={() => {
                        this._goBack();
                    }}/>}>
                </Header>
                <View style={styles.container}>
                    <MapView
                        ref={map => this.map = map}
                        initialRegion={this.state.region}
                        showsUserLocation={true}
                        style={styles.container}>
                        {this.state.markers.map((marker, index) => {
                            return (
                                <MapView.Marker key={index} coordinate={marker.coordinate}>
                                    <Animated.View style={[styles.markerWrap]}>
                                        <Animated.View
                                            style={this.state.activeIndex === index ? styles.activeRing : styles.ring}/>
                                        <View
                                            style={this.state.activeIndex === index ? styles.activeMarker : styles.marker}/>
                                    </Animated.View>
                                </MapView.Marker>
                            );
                        })}
                    </MapView>
                    <Animated.ScrollView
                        horizontal
                        scrollEventThrottle={1}
                        showsHorizontalScrollIndicator={false}
                        snapToInterval={CARD_WIDTH}
                        onScroll={Animated.event(
                            [
                                {
                                    nativeEvent: {
                                        contentOffset: {
                                            x: this.animation,
                                        },
                                    },
                                },
                            ],
                            {useNativeDriver: true}
                        )}
                        style={styles.scrollView}
                        contentContainerStyle={styles.endPadding}>
                        {this.state.markers.map((marker, index) => (
                            <TouchableHighlight onPress={() => {
                                this._goToMarker(index);
                            }}>
                                <View style={styles.card} key={index}>
                                    <Image
                                        source={marker.image}
                                        style={styles.cardImage}
                                        resizeMode="cover"/>
                                    <View style={styles.textContent}>
                                        <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
                                        <Text numberOfLines={1} style={styles.cardDescription}>
                                            {marker.description}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableHighlight>
                        ))}
                    </Animated.ScrollView>
                </View>
            </View>
        );
    }

    _goBack() {
        this.props.navigation.navigate('Info');
    }

    _goToMarker(index) {
        if (this.state.activeIndex !== index) {
            const {coordinate} = this.state.markers[index];
            this.setState({activeIndex: index});
            this.map.animateToRegion(
                {
                    ...coordinate,
                    latitudeDelta: this.state.region.latitudeDelta,
                    longitudeDelta: this.state.region.longitudeDelta,
                },
                350
            );
        }

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        position: "absolute",
        bottom: 30,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
    endPadding: {
        paddingRight: width - CARD_WIDTH,
    },
    card: {
        padding: 10,
        elevation: 2,
        backgroundColor: "#FFF",
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: {x: 2, y: -2},
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        overflow: "hidden",
    },
    cardImage: {
        flex: 3,
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },
    textContent: {
        flex: 1,
    },
    cardtitle: {
        fontSize: 12,
        marginTop: 5,
        fontWeight: "bold",
    },
    cardDescription: {
        fontSize: 12,
        color: "#444",
    },
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
    },
    marker: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "rgba(252,177,71, 0.9)",
    },
    ring: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: "rgba(252,177,71, 0.3)",
        position: "absolute",
        borderWidth: 1,
        borderColor: "rgba(252,177,71, 1.2)",
    },
    activeRing: {
        width: 34,
        height: 34,
        borderRadius: 22,
        backgroundColor: "rgba(252,177,71, 0.3)",
        position: "absolute",
        borderWidth: 1,
        borderColor: "rgba(252,177,71, 1.2)",
    },
    activeMarker: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "rgba(252,177,71, 0.9)",
    }
});