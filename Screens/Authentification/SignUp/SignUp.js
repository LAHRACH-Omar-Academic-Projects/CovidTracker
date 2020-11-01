//Import used fonctions from librairies
import React, { useState } from 'react';
import { Text, View, Animated, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import AnimatedForm from 'react-native-animated-form';
import { Actions } from 'react-native-router-flux';
import { RadioButton } from 'react-native-paper';

//Import firebase database
import firebase from '../../../database/firebaseDb';
//Import styles
import { styles } from './styles';
//Import icones
import UserIcon from 'react-native-vector-icons/Entypo';
import SaveIcon from 'react-native-vector-icons/Entypo';
import AddressIcon from 'react-native-vector-icons/Entypo';
import PhoneIcon from 'react-native-vector-icons/Entypo';
import CinIcon from 'react-native-vector-icons/FontAwesome5';
import CodeIcon from 'react-native-vector-icons/AntDesign';
import EmailIcon from 'react-native-vector-icons/Ionicons';
import PasswordIcon from 'react-native-vector-icons/FontAwesome';
import normalize from 'react-native-normalize';

//SingUp: the main component
export default SignUp = () => {
    //State of user inputs
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [cin, setCin] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [code, setCode] = useState('');
    const [status, setStatus] = useState('citizen');
    const [isSick, setIsSick] = useState(false);
    const [clicked, setClicked] = useState(false);
    //Redirection functions
    function goToHome() {
        Actions.drawerNav();
    }
    //signUp function
    function signUp(firstName, lastName, email, password, cin, address, phoneNumber, code, status) {
        firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                setClicked(true);
                setTimeout(() => {
                    setClicked(false);
                    goToHome();
                }, 3000);
                firebase.firestore().collection('utilisateurs').doc(firebase.auth().currentUser.uid).set({
                    firstName: firstName,
                    lastName: lastName,
                    cin: cin,
                    address: address,
                    isSick: isSick,
                    status: status
                });
                if (status == "citizen") {
                    firebase.firestore().collection('citizens').doc(firebase.auth().currentUser.uid).set({
                        phoneNumber: phoneNumber
                    });
                }
                else {
                    firebase.firestore().collection('authority').doc(firebase.auth().currentUser.uid).set({
                        code: code
                    });
                }
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    alert('Il existe déjà un compte avec l\'adresse e-mail indiquée');
                    setClicked(false);
                }
                if (email !== '' && error.code === 'auth/invalid-email') {
                    alert('L\'adresse e-mail n\'est pas valide');
                    setClicked(false);
                }
                if (error.code === 'auth/operation-not-allowed') {
                    alert('Si les comptes de email / mot de passe ne sont pas activés. Activez les comptes de email / mot de passe dans la console Firebase, sous l\'onglet Auth');
                    setClicked(false);
                }
                if (password !== '' && error.code === 'auth/weak-password') {
                    alert('Le mot de passe n\'est pas assez fort');
                    setClicked(false);
                }
                if (email === '' || password === '') {
                    alert('Veuillez remplir tous les champs svp!');
                    setClicked(false);
                }
                if (password !== confirmedPassword) {
                    alert('Ce mote de passe que vous avez saisie ne correspond pas au mot de passe précédent')
                    setClicked(false);
                }
            });

    }
    //SignUp view (interface)
    return (
        <View style={styles.container}>
            <View style={styles.icon}>
                <View style={styles.userIcon}>
                    <UserIcon name='add-user' color='#0A8' size={normalize(55, "width")} />
                </View>
            </View>
            <View style={styles.form}>
                <ScrollView>
                    <AnimatedForm delay={200} distance={5}>
                        <Animated.View style={styles.inputView}>
                            <TextInput placeholder='First Name' underlineColorAndroid='transparent' style={styles.text} onChangeText={(value) => setFirstName(value)} />
                            <View style={styles.iconContainer}>
                                <UserIcon name='user' color='#66F' size={normalize(25, "width")} />
                            </View>
                        </Animated.View>
                        <Animated.View style={styles.inputView}>
                            <TextInput placeholder='Last Name' underlineColorAndroid='transparent' style={styles.text} onChangeText={(value) => setLastName(value)} />
                            <View style={styles.iconContainer}>
                                <UserIcon name='user' color='#66F' size={normalize(25, "width")} />
                            </View>
                        </Animated.View>

                        <Animated.View style={styles.inputView}>
                            <TextInput placeholder='Email' underlineColorAndroid='transparent' style={styles.text} onChangeText={(value) => setEmail(value)} />
                            <View style={styles.iconContainer}>
                                <EmailIcon name='md-mail' color='#66F' size={normalize(25, "width")} />
                            </View>
                        </Animated.View>
                        <Animated.View style={styles.inputView}>
                            <TextInput secureTextEntry={true} placeholder='Password' underlineColorAndroid='transparent' style={styles.text} onChangeText={(value) => setPassword(value)} />
                            <View style={styles.iconContainer}>
                                <PasswordIcon name='unlock' color='#66F' size={normalize(25, "width")} />
                            </View>
                        </Animated.View>
                        <Animated.View style={styles.inputView}>
                            <TextInput secureTextEntry={true} placeholder='Confirm password' underlineColorAndroid='transparent' style={styles.text} onChangeText={(value) => setConfirmedPassword(value)} />
                            <View style={styles.iconContainer}>
                                <PasswordIcon name='lock' color='#66F' size={normalize(25, "width")} />
                            </View>
                        </Animated.View>
                        <Animated.View style={styles.inputView}>
                            <TextInput placeholder='Cin' underlineColorAndroid='transparent' style={styles.text} onChangeText={(value) => setCin(value)} />
                            <View style={styles.iconContainer}>
                                <CinIcon name='id-card' color='#66F' size={normalize(25, "width")} />
                            </View>
                        </Animated.View>
                        <Animated.View style={styles.inputView}>
                            <TextInput placeholder='Address' underlineColorAndroid='transparent' style={styles.text} onChangeText={(value) => setAddress(value)} />
                            <View style={styles.iconContainer}>
                                <AddressIcon name='address' color='#66F' size={normalize(25, "width")} />
                            </View>
                        </Animated.View>

                        <Animated.View>
                            <RadioButton.Group onValueChange={status => setStatus(status)} value={status}>
                                <View style={styles.radio}>
                                    <RadioButton value="citizen" />
                                    <Text style={styles.radioText}>Citizen</Text>
                                    <RadioButton value="authority" />
                                    <Text style={styles.radioText}>Authority</Text>
                                </View>
                            </RadioButton.Group>
                        </Animated.View>

                        {status == "citizen" ?
                            <Animated.View style={styles.inputView}>
                                <TextInput placeholder='Phone Number' underlineColorAndroid='transparent' style={styles.text} onChangeText={(value) => setPhoneNumber(value)} />
                                <View style={styles.iconContainer}>
                                    <PhoneIcon name='phone' color='#66F' size={normalize(25, "width")} />
                                </View>
                            </Animated.View>
                            :
                            <Animated.View style={styles.inputView}>
                                <TextInput placeholder='Code' underlineColorAndroid='transparent' style={styles.text} onChangeText={(value) => setCode(value)} />
                                <View style={styles.iconContainer}>
                                    <CodeIcon name='idcard' color='#66F' size={normalize(25, "width")} />
                                </View>
                            </Animated.View>
                        }

                        <Animated.View style={{ ...styles.buttonView, ...{ backgroundColor: clicked ? "white" : "#2AE", borderColor: clicked ? "#2AE" : "white", borderWidth: clicked ? 1 : 1 } }} onTouchStart={() => { setClicked(true); signUp(firstName, lastName, email, password, cin, address, phoneNumber, code, status) }}>
                            {clicked
                                ? <View style={styles.loading_container}>
                                    <ActivityIndicator size='large' color='#2AE' />
                                </View>
                                : <View style={styles.button}>
                                    <SaveIcon name='save' color='white' size={normalize(18, "width")} />
                                    <Text style={styles.buttonText}>Valider</Text>
                                </View>
                            }
                        </Animated.View>
                        <Animated.View style={styles.signIn} onTouchStart={() => Actions.signIn()}>
                            <Text style={styles.alreadyText}>Already have an account?</Text>
                        </Animated.View>
                    </AnimatedForm>
                </ScrollView>
            </View>
        </View>
    );
}
