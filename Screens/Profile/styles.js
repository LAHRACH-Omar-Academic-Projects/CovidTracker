import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';

export default styles = StyleSheet.create({
    header: {
        backgroundColor: '#EEE',
    },
    headerText: {
        color: 'rgba(98,80,255,0.8)',
    },
    container: {
        flex: 1,
        backgroundColor: '#EEE'
    },
    signoutView: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 5,
        padding: 15,
        marginHorizontal: normalize(30, 'width'),
        marginVertical: normalize(30, 'height')
    },
    userSignout: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    textSignout: {
        marginHorizontal: normalize(10, 'width'),
        fontSize: 16,
        color: "red"
    }
});