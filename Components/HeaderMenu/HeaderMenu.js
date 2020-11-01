//Import used functions from librairies
import React from 'react';
import { View, Text } from 'react-native';
import normalize from 'react-native-normalize';
//Import styles
import { styles } from './styles';
//Import icones
import UserIcon from 'react-native-vector-icons/Entypo';
import firebase from '../../database/firebaseDb';


//HeaderMenu: the main component
export default class HeaderMenu extends React.Component {
    constructor(props) {
        super(props);
        this.db = firebase.firestore();
        this.uid = firebase.auth().currentUser.uid;
        this.state = {
            userName: "",
        }
    }
    //Redirection functions
    async getUserName() {
        var firstName = "";
        var lastName = "";
        const userRef = this.db.collection('utilisateurs').doc(this.uid);
        const userDoc = await userRef.get();
        if(!userDoc.exists) {
            console.log('No sush documents');
        }
        else {
            firstName = userDoc.data().firstName;
            lastName = userDoc.data().lastName;
            this.setState({
                userName: firstName + " " + lastName,
            });
        }
    }

    componentDidMount() {
        this.getUserName();
    }
    render() {
        return (
            <View style={styles.header}>
                <View style={styles.userImage}>
                    <UserIcon name='user' color='white' size={normalize(50, "width")} />
                </View>
                <Text style={styles.userName}>{this.state.userName}</Text>
            </View>
        )
    }
}
