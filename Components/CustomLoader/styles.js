//Import used functions from librairies
import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';

//Create styles object
const styles = StyleSheet.create({
    loader: {
        flex: 1,
        backgroundColor: '#EEE',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: 'rgba(98,80,255,0.8)',
        fontSize: 18
    }
})

//Export styles object
export { styles };