import React, { useState } from 'react';
//import MapView from "react-native-maps";
import normalize from 'react-native-normalize';
import {ActivityIndicator} from 'react-native';
import styles from "./styles";
/*import { TouchableOpacity, Alert } from 'react-native';
import { SwipeableFlatList } from 'react-native-swipeable-flat-list';*/
import { Container, Header, Left, Body, Right, Button, Title, View, Card, CardItem, Text } from 'native-base';
/*import BgTracking from "../../Components/BackgroundLocation/BgTracking";
import call from 'react-native-phone-call';*/
import firebase from "../../database/firebaseDb";
/*import { getSickUser, ReportSick } from "../../database/fonctions";
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import { getDistance } from 'geolib';*/
import MenuIcon from 'react-native-vector-icons/Ionicons';
/*import SignOut from '../Authentification/SignOut/SignOut';
import AddIcon from 'react-native-vector-icons/MaterialIcons';
import MarkerIcon from 'react-native-vector-icons/Entypo';*/
/*import PhoneIcon from 'react-native-vector-icons/Entypo';
import UserIcon from 'react-native-vector-icons/FontAwesome5';
import DistanceIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AuthorityIcon from 'react-native-vector-icons/MaterialCommunityIcons';*/
import ExitIcon from 'react-native-vector-icons/Entypo';
import { Actions } from 'react-native-router-flux';

export default Profile = ({ navigation }) => {
    const [loading, setLoading] = useState(false);

    function signOut(){
        firebase.auth().signOut().then(() => {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                Actions.signOut();
            }, 1500);
        }).catch(function (error) {
            console.log(error);
            alert('loggin out error !');
        });
    }
    return (
        <Container>
            <Header style={styles.header}>
                <Left>
                    <Button transparent onPress={() => navigation.openDrawer()}>
                        <MenuIcon name='md-menu' color='rgba(98,80,255,0.8)' size={25} />
                    </Button>
                </Left>
                <Body>
                    <Title style={styles.headerText}>Profile</Title>
                </Body>
                <Right>
                </Right>
            </Header>
            <View style={styles.container}>
                <View style={styles.signoutView} onTouchStart={() => signOut()}>
                    {loading
                        ? <View style={styles.userSignout}>
                            <ActivityIndicator size='large' color='rgb(252, 53, 53)' />
                        </View>
                        : <View style={styles.userSignout}>
                            <ExitIcon name='log-out' color='rgb(252, 53, 53)' size={normalize(20, "width")} />
                            <Text style={styles.textSignout}>Log Out </Text>
                        </View>
                    }
                </View>
            </View>
        </Container>
    );
}
