//Import used functions from librairies
import React from 'react';
import { View } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import firebase from '../database/firebaseDb';

import Home from '../Screens/Home/Home';
import Statistic from '../Screens/Statistic/Statistic';
import Profile from '../Screens/Profile/Profile';
import SignIn from '../Screens/Authentification/SignIn/SignIn';
import SignUp from '../Screens/Authentification/SignUp/SignUp';
import SignOut from '../Screens/Authentification/SignOut/SignOut';

import HeaderMenu from '../Components/HeaderMenu/HeaderMenu';

import ReportIcon from 'react-native-vector-icons/FontAwesome';
import StatisticIcon from 'react-native-vector-icons/FontAwesome';
import ProfileIcon from 'react-native-vector-icons/FontAwesome';

export default function RouterNavigation({ navigation }) {
    if (firebase.auth().currentUser !== null) {
        return (
            <NavigationContainer>
                <Router>
                    <Scene key='root'>
                        <Scene key='drawerNav' initial={true} component={(props) => <DrawerNavigation {...props} navigation={navigation} />} hideNavBar={true}></Scene>
                        <Scene key='signIn' type="replace" component={SignIn} hideNavBar={true}></Scene>
                        <Scene key='signUp' component={SignUp} hideNavBar={true}></Scene>
                        <Scene key='signOut' component={SignOut} hideNavBar={true}></Scene>
                    </Scene>
                </Router>
            </NavigationContainer>
        )
    }
    else {
        return (
            <NavigationContainer>
                <Router>
                    <Scene key='root'>
                        <Scene key='drawerNav' component={(props) => <DrawerNavigation {...props} navigation={navigation} />} hideNavBar={true}></Scene>
                        <Scene key='signIn' initial={true} type="replace" component={SignIn} hideNavBar={true}></Scene>
                        <Scene key='signUp' component={SignUp} hideNavBar={true}></Scene>
                        <Scene key='signOut' component={SignOut} hideNavBar={true}></Scene>
                    </Scene>
                </Router>
            </NavigationContainer>
        )
    }

}

//Menu header component
function CustomDrawerContent(props) {
    return (
        <View style={{ flex: 1 }}>
            <HeaderMenu />
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
        </View>
    );
}
//Drawer navigation 
const Drawer = createDrawerNavigator();
function DrawerNavigation() {
    return (
        <NavigationContainer independent={true}>
            <Drawer.Navigator
                drawerStyle={{ width: '80%', paddingBottom: 0 }}
                drawerContent={(props) => <CustomDrawerContent {...props} />}
                drawerContentOptions={{
                    activeTintColor: 'rgba(98,100,255,0.8)',
                    inactiveTintColor: '#777',
                }}
            >
                <Drawer.Screen
                    name="home"
                    component={Home}
                    options={{
                        unmountOnBlur: true,
                        drawerLabel: 'Tracking',
                        drawerIcon: ({ color, size }) => <ReportIcon color={color} name='home' size={size}></ReportIcon>
                    }}
                />
                <Drawer.Screen
                    name="statistic"
                    component={Statistic}
                    options={{
                        unmountOnBlur: true,
                        drawerLabel: 'Statistic',
                        drawerIcon: ({ color, size }) => <StatisticIcon color={color} name='line-chart' size={size}></StatisticIcon>
                    }}
                />
                <Drawer.Screen
                    name="profile"
                    component={Profile}
                    options={{
                        unmountOnBlur: true,
                        drawerLabel: 'Profile',
                        drawerIcon: ({ color, size }) => <ProfileIcon color={color} name='user-circle' size={size}></ProfileIcon>
                    }}
                />

            </Drawer.Navigator>
        </NavigationContainer>
    )
}