//Import used fonctions from librairies
import React, { useEffect, useState } from 'react';
import { Text, View, Animated, TextInput, ActivityIndicator, ScrollView, BackHandler, Alert } from 'react-native';
import AnimatedForm from 'react-native-animated-form';
import NetInfo from "@react-native-community/netinfo";
import { Actions } from 'react-native-router-flux';
//Import firebase database
import firebase from '../../../database/firebaseDb';
//Import styles
import { styles } from './styles';
//Import icones
import UserIcon from 'react-native-vector-icons/Entypo';
import SignInIcon from 'react-native-vector-icons/AntDesign';
import SignUpIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import EmailIcon from 'react-native-vector-icons/Ionicons';
import PasswordIcon from 'react-native-vector-icons/FontAwesome';
import normalize from 'react-native-normalize';


//SingIn: the main component
export default SignIn = () => {
    //State of user inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [logInclicked, setLogInClicked] = useState(false);
    const [createAccountClicked, setCreateAccountClicked] = useState(false);
    //Redirection functions
    function goToHome() {
        Actions.drawerNav()
    }
    function goToSignUp() {
        setCreateAccountClicked(true);
        setTimeout(() => {
            setCreateAccountClicked(false);
            Actions.signUp()
        }, 500);
    }
    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", () => { return true; });
    }, [])
    //signIn function
    function signIn(email, password) {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                firebase.auth()
                    .signInWithEmailAndPassword(email, password)
                    .then(() => {
                        setLogInClicked(true);
                        setTimeout(() => {
                            setLogInClicked(false);
                            goToHome();
                        }, 3000);
                    })
                    .catch(error => {
                        if (email !== '' && error.code === 'auth/invalid-email') {
                            alert('Cette adresse e-mail n\'est pas valide!');
                            setLogInClicked(false);
                        }
                        if (error.code === 'auth/user-not-found') {
                            alert('Aucun utilisateur ne correspond à l\'e-mail donné');
                            setLogInClicked(false);
                        }
                        if (error.code === 'auth/user-disabled') {
                            alert('L\'utilisateur correspondant à l\'e-mail donné a été désactivé');
                            setLogInClicked(false);
                        }
                        if (password !== '' & error.code === 'auth/wrong-password') {
                            alert('Le mot de passe n\'est pas valide pour l\'e-mail donné ou le compte correspondant à l\'e-mail n\'a pas de mot de passe défini');
                            setLogInClicked(false);
                        }
                        if (email === '' || password === '') {
                            alert('Veuillez remplir tous les champs svp!');
                            setLogInClicked(false);
                        }
                    });
            }
            else {
                Alert.alert("Please check your connection");
                setTimeout(() => {
                    setLogInClicked(false);
                },1000)
            }
        });
    }

    //NetInfo.addEventListener(async (state) => {
    //SignIn view (interface)
    return (
        <View style={styles.container}>
            <View style={styles.icon}>
                <View style={styles.userIcon}>
                    <UserIcon name='user' color='#66F' size={normalize(100, "width")} />
                </View>
            </View>
            <View style={styles.form}>
                <ScrollView>
                    <AnimatedForm delay={200} distance={5}>
                        <Animated.View style={styles.inputView}>
                            <TextInput placeholder='Email' underlineColorAndroid='transparent' style={styles.text} onChangeText={(value) => setEmail(value)} />
                            <View style={styles.iconContainer}>
                                <EmailIcon name='md-mail' color='#66F' size={normalize(25, "width")} />
                            </View>
                        </Animated.View>
                        <Animated.View style={styles.inputView}>
                            <TextInput secureTextEntry={true} placeholder='Password' underlineColorAndroid='transparent' style={styles.text} onChangeText={(value) => setPassword(value)} />
                            <View style={styles.iconContainer}>
                                <PasswordIcon name='lock' color='#66F' size={normalize(25, "width")} />
                            </View>
                        </Animated.View>
                        <Animated.View style={{ ...styles.signInButtonView, ...{ backgroundColor: logInclicked ? "white" : "#0A8", borderColor: logInclicked ? "#0A8" : "white", borderWidth: logInclicked ? 1 : 1 } }} onTouchStart={() => { setLogInClicked(true); signIn(email, password) }}>
                            {logInclicked
                                ? <View style={styles.loading_container}>
                                    <ActivityIndicator size='large' color='#0A8' />
                                </View>
                                : <View style={styles.button}>
                                    <SignInIcon name='login' color='white' size={normalize(18, "width")} />
                                    <Text style={styles.buttonText}>Log In</Text>
                                </View>
                            }
                        </Animated.View>
                        <Animated.View style={{ ...styles.signUpButtonView, ...{ backgroundColor: createAccountClicked ? "white" : "#EA0", borderColor: createAccountClicked ? "#EA0" : "white", borderWidth: createAccountClicked ? 1 : 1 } }} onTouchStart={() => { setCreateAccountClicked(true); goToSignUp() }}>
                            {createAccountClicked
                                ? <View style={styles.loading_container}>
                                    <ActivityIndicator size='large' color='#EA0' />
                                </View>
                                : <View style={styles.button}>
                                    <SignUpIcon name='account-plus-outline' color='white' size={normalize(20, "width")} />
                                    <Text style={styles.buttonText}>Create New Account</Text>
                                </View>
                            }
                        </Animated.View>
                    </AnimatedForm>
                </ScrollView>
            </View>
        </View>
    );
}
