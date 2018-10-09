import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    roundedShadedView: {
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 0,
        padding: 10
    },
    titleText: {
        fontFamily: 'Quicksand-Bold'
    },
    regularText: {
        fontFamily: 'Quicksand-Regular'
    }
});