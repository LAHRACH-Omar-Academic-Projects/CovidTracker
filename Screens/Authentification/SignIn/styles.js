//Import used fonctions from librairies
import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';

//Create styles object
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    icon: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    form: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    userIcon: {
        backgroundColor: 'white',
        width: normalize(155, 'width'),
        height: normalize(155, 'width'),
        borderRadius: normalize(100, 'width'),
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: normalize(20),
        borderWidth: 3,
        borderColor: '#66F',
    },
    inputView: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 5,
        marginVertical: 5,
        borderWidth: 0.5,
        borderColor: '#AAA',
        elevation: 1,
        zIndex: 1
    },
    iconContainer: {
        width: normalize(35, 'width'),
        height: normalize(35, 'height'),
        marginTop: normalize(10, 'height'),
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        width: normalize(250, 'width'),
        height: normalize(45, 'height'),
        paddingHorizontal: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#FFF",
        color: "#333",
        backgroundColor: "#FFF",
    },
    signInButtonView: {
        height: normalize(40, 'height'),
        marginTop: normalize(10, 'height'),
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderRadius: 5,
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: normalize(5, 'height')
    },
    signUpButtonView: {
        height: normalize(40, 'height'),
        marginTop: normalize(10, 'height'),
        backgroundColor: "#EA0",
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderRadius: 5,
    },
    guestView: {
        height: 40,
        marginTop: 10,
        backgroundColor: "#C0A",
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderRadius: 5,
    },
    button: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        marginHorizontal: normalize(15, "width"),
        fontSize: 16,
        fontWeight: 'bold'
    }
});

//Export styles object
export { styles };