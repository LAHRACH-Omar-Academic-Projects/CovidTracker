//Librairies
import React, { Component } from 'react';
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import normalize from 'react-native-normalize';
import NetInfo from "@react-native-community/netinfo";
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import { TouchableOpacity, Alert, FlatList, ActivityIndicator } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Title, View, Card, CardItem, Text } from 'native-base';
import call from 'react-native-phone-call';
//Database
import firebase from "../../database/firebaseDb";
import { getDistance } from 'geolib';
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
//Components
import CustomLoader from '../../Components/CustomLoader/CustomLoader';
//Icons
import MenuIcon from 'react-native-vector-icons/Ionicons';
import AddIcon from 'react-native-vector-icons/MaterialIcons';
import MarkerIcon from 'react-native-vector-icons/Entypo';
import PhoneIcon from 'react-native-vector-icons/Entypo';
import UserIcon from 'react-native-vector-icons/Entypo';
import IdCardIcon from 'react-native-vector-icons/FontAwesome5';
import DistanceIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AuthorityIcon from 'react-native-vector-icons/FontAwesome';
import StateIcon from 'react-native-vector-icons/FontAwesome5';
//Styles
import styles from "./styles";

console.disableYellowBox = true;

const Item = ({ item }) => (
  <View style={styles.item}>
    {item.status == "authority"
      ? <View style={styles.authority}>
        <AuthorityIcon name='user-secret' color='white' size={normalize(45)} />
      </View>
      : <View style={styles.citizen}>
        <UserIcon name='user' color='white' size={normalize(45)} />
      </View>
    }
    <Text style={styles.fullName}>{item.fullName}</Text>
    <Text style={styles.address}>{"ADDRESS: " + item.address}</Text>
    <Text style={styles.cin}>{"CIN: " + item.cin}</Text>
    <Text style={styles.status}>{item.status}</Text>
    <View style={styles.isSick}>
      <StateIcon name="dot-circle" style={{ marginVertical: normalize(5, 'height') }} color={item.isSick ? "tomato" : "rgba(0,200,50,0.8)"} size={normalize(15)} />
      <Text style={{ marginHorizontal: normalize(5, 'width'), color: item.isSick ? "tomato" : "rgba(0,200,50,0.8)" }}>{item.isSick ? "sick" : "not Sick"}</Text>
    </View>
    {item.status == "authority"
      ? <TouchableOpacity style={styles.code} onPress={() => call({ number: item.code, prompt: false })}>
        <IdCardIcon name='id-card' color='rgba(255,190,0,0.6)' size={normalize(25)} />
      </TouchableOpacity>
      : <TouchableOpacity style={styles.phoneNumber} onPress={() => call({ number: item.phoneNumber, prompt: false })}>
        <PhoneIcon name='phone' color='rgba(0,200,50,0.8)' size={normalize(28)} />
      </TouchableOpacity>
    }
  </View>
);

CustomHeader = (props) => {
  const navigation = props.navigation
  return (
    <Header style={styles.header}>
      <Left>
        <Button transparent onPress={() => navigation.openDrawer()}>
          <MenuIcon name='md-menu' color='rgba(98,80,255,0.8)' size={25} />
        </Button>
      </Left>
      <Body>
        <Title style={styles.headerText}>Tracking</Title>
      </Body>
      <Right>
      </Right>
    </Header>
  )
}

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.db = firebase.firestore();
    this.uid = firebase.auth().currentUser.uid
    this.state = {
      loading: true,
      isConnected: false,
      isGpsEnabled: false,
      currentPosition: {
        latitude: 40,
        longitude: 20,
        latitudeDelta: 10,
        longitudeDelta: 10
      },
      error: null,
      dateTime: "",
      dateOnly: "",
      isAuthority: false,
      isSick: false,
      markers: [],
      marker: {},
      mixtures: [],
      searchingForMixtures: false,
      isCalloutClicked: false
    };
  }
  async getPosition() {
    navigator.geolocation = require('@react-native-community/geolocation');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const currentPosition = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 10,
          longitudeDelta: 10
        };
        this.setState({
          currentPosition: currentPosition,
          error: null,
        });
      },
      (error) => {
        this.setState({
          error: error,
          loading: false
        })
      },
      { enableHighAccuracy: false },
    );
  }
  async isAuthority() {
    const userRef = this.db.collection('utilisateurs').doc(this.uid);
    const doc = await userRef.get();
    if (!doc.exists) {
      console.log('No matching documents.');
      return;
    }
    else {
      const status = doc.data().status;
      if (status == "authority") {
        this.setState({
          isAuthority: true
        })
      }
    }
  }
  async isSick() {
    const userRef = this.db.collection('utilisateurs').doc(this.uid);
    const doc = await userRef.get();
    if (!doc.exists) {
      console.log('No matching documents.');
      return;
    }
    else {
      const isSick = doc.data().isSick;
      this.setState({
        isSick: isSick
      })
    }
  }
  async getDate() {
    var date = new Date();
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();
    var hh = String(date.getHours()).padStart(2, '0');
    var MM = String(date.getMinutes()).padStart(2, '0');
    dateTime = dd + '-' + mm + '-' + yyyy + '_' + hh + ':' + MM;
    dateOnly = dd + '-' + mm + '-' + yyyy;
    this.setState({
      dateTime: dateTime,
      dateOnly: dateOnly
    })
  }
  async getSickUsers() {
    const db = this.db;
    const userRef = db.collection('utilisateurs');
    const snapshot = await userRef.where("isSick", "==", true).get();
    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }
    else {
      snapshot.forEach(async function (doc) {
        const sickUserUid = doc.id;
        if (sickUserUid !== this.uid) {
          const fullName = doc.data().firstName + " " + doc.data().lastName;
          const cin = doc.data().cin;
          const address = doc.data().address;
          const status = doc.data().status;
          var phoneNumber = "";
          var code = "";
          if (status == "authority") {
            const authorityRef = db.collection('authority').doc(sickUserUid);
            const authorityDoc = await authorityRef.get();
            if (!authorityDoc.exists) {
              return;
            } else {
              code = authorityDoc.data().code;
            }
          }
          else {
            const citizensRef = db.collection('citizens').doc(sickUserUid);
            const citizenDoc = await citizensRef.get();
            if (!citizenDoc.exists) {
              return;
            } else {
              phoneNumber = citizenDoc.data().phoneNumber;
            }
          }
          let location = {};
          const positionsRef = db.collection('positions').doc(sickUserUid);
          const positionsDoc = await positionsRef.get();
          if (!positionsDoc.exists) {
            return;
          } else {
            location = {
              "latitude": positionsDoc.data().location.latitude,
              "longitude": positionsDoc.data().location.longitude
            }
          }
          this.setState({
            markers: [...this.state.markers, {
              "uid": sickUserUid,
              "fullName": fullName,
              "cin": cin,
              "address": address,
              "status": status,
              "location": location,
              "phoneNumber": phoneNumber,
              "code": code
            }]
          })
        }
      }.bind(this));
    }
  };
  reportSickness() {
    const userRef = this.db.collection('utilisateurs').doc(this.uid);
    userRef.update({
      isSick: true,
    });
    this.setState({ isSick: true })
  };
  distance(marker) {
    const distance = getDistance(
      { latitude: this.state.currentPosition.latitude, longitude: this.state.currentPosition.longitude },
      { latitude: marker.location.latitude, longitude: marker.location.longitude }
    )
    if (distance >= 1000) {
      return distance / 1000 + " km";
    }
    else {
      return distance + " m";
    }
  };
  async getMixtures(uid) {
    this.setState({
      mixtures: []
    })
    const db = this.db;
    const dateOnly = this.state.dateOnly;
    const mixturesRef = db.collection("mixtures").doc(uid).collection("date").doc(dateOnly);
    const mixturesDoc = await mixturesRef.get();
    if (!mixturesDoc.exists) {
      console.log("No such mixtures")
    }
    else {
      const mixturesUid = mixturesDoc.data().mixtures;
      mixturesUid.forEach(async function (mixtureUid) {
        var mixture = {};
        const userRef = db.collection('utilisateurs').doc(mixtureUid);
        const userDoc = await userRef.get();
        if (!userDoc.exists) {
          console.log('No user in database!');
        }
        else {
          const fullName = userDoc.data().firstName + " " + userDoc.data().lastName;
          const cin = userDoc.data().cin;
          const address = userDoc.data().address;
          const isSick = userDoc.data().isSick;
          const status = userDoc.data().status;
          var phoneNumber = "";
          var code = "";
          if (status == 'citizen') {
            const citizensRef = db.collection('citizens').doc(mixtureUid);
            const citizenDoc = await citizensRef.get();
            if (!citizenDoc.exists) {
              console.log("No sush citizen");
            }
            else {
              phoneNumber = citizenDoc.data().phoneNumber;
            }
            mixture = {
              "fullName": fullName,
              "cin": cin,
              "address": address,
              "isSick": isSick,
              "status": status,
              "phoneNumber": phoneNumber
            }
          }
          else {
            const authorityRef = db.collection('authority').doc(mixtureUid);
            const authorityDoc = await authorityRef.get();
            if (!authorityDoc.exists) {
              console.log("No sush authority");
            }
            else {
              code = authorityDoc.data().code;
            }
            mixture = {
              "fullName": fullName,
              "cin": cin,
              "address": address,
              "isSick": isSick,
              "status": status,
              "code": code
            }
          }
          this.setState({
            mixtures: [...this.state.mixtures, mixture]
          })
        }
      }.bind(this))
    }
  }
  async searchForMixtures(marker) {
    this.setState({
      marker: marker,
      searchingForMixtures: true
    });
    await this.getMixtures(marker.uid);
    setTimeout(() => {
      this.setState({
        searchingForMixtures: false
      })
    }, 2000)
  }
  showMixtures() {
    this.setState({
      isCalloutClicked: true
    });
  }
  displayListOfMixtures() {
    if (this.state.searchingForMixtures) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' color='rgba(98,80,255,0.8)' />
          <Text style={styles.loadingText}>Serching for mixtures</Text>
        </View>
      )
    }
    else {
      return (
        <View style={styles.mixturesList}>
          <View style={styles.titleView}>
            <Text style={styles.title}>mixtures</Text>
          </View>
          <FlatList
            data={this.state.mixtures}
            renderItem={({ item }) => <Item item={item} />}
            keyExtractor={(item) => `${item.cin}`}
          />
        </View>
      )
    }
  }
  displayNotFoundMixtures() {
    if (this.state.searchingForMixtures) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' color='rgba(98,80,255,0.8)' />
          <Text style={styles.loadingText}>Serching for mixtures</Text>
        </View>
      )
    }
    else {
      return (
        <View style={styles.loading_container}>
          <View style={styles.titleView}>
            <Text style={styles.title}>no mixtures</Text>
          </View>
        </View>
      )
    }
  }
  async componentDidMount() {
    await this.getDate();
    await this.getPosition();
    await this.getSickUsers();
    await this.isAuthority();
    await this.isSick();

    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({ interval: 10000, fastInterval: 5000 })
    .then(() => {
      this.setState({
        isGpsEnabled: true
      })
    })
    BackgroundGeolocation.configure({
      desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
      stationaryRadius: 50,
      distanceFilter: 50,
      notificationTitle: 'Tracking ready',
      notificationText: "The application is Tracking your position now",
      startOnBoot: false,
      stopOnTerminate: false,
      interval: 20000,
      fastestInterval: 20000,
      activitiesInterval: 20000,
      locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
      stopOnStillActivity: false,
    });
    BackgroundGeolocation.on('location', async (location) => {
      this.state.markers = [];
      await this.getSickUsers();
      const db = this.db;
      await this.getPosition();
      const latitude = this.state.currentPosition.latitude;
      const longitude = this.state.currentPosition.longitude;
      const positionsRef = db.collection('positions');
      await positionsRef.doc(this.uid).set({
        date: this.state.dateTime,
        location: {
          latitude: latitude,
          longitude: longitude
        }
      });
      const userRef = db.collection('utilisateurs');
      const dateOnly = this.state.dateOnly;
      const currentUserUid = this.uid;
      const snapshot = await userRef.get();
      if (snapshot.empty) {
        console.log('No user in database!');
      }
      else {
        snapshot.forEach(async function (res) {
          const uid = res.id;
          if (uid !== currentUserUid) {
            let coordinates = {};
            const positionsRef = db.collection('positions').doc(uid);
            const positionDoc = await positionsRef.get();
            if (!positionDoc.exists) {
              console.log("No sush position");
            }
            else {
              coordinates = {
                "latitude": positionDoc.data().location.latitude,
                "longitude": positionDoc.data().location.longitude
              }
              const distance = getDistance(
                { latitude: latitude, longitude: longitude },
                { latitude: coordinates.latitude, longitude: coordinates.longitude }
              );
              if (distance < 1) {
                const mixturesRef = db.collection('mixtures').doc(currentUserUid).collection("date").doc(dateOnly);
                const mixturesDoc = await mixturesRef.get();
                if (!mixturesDoc.exists) {
                  mixturesRef.set({
                    mixtures: [uid]
                  });
                }
                else {
                  mixturesRef.update({
                    mixtures: firebase.firestore.FieldValue.arrayUnion(uid)
                  });
                }
              }
            }
          }
        }.bind(this))
      }
    });
    BackgroundGeolocation.on('authorization', (status) => {
      if (status !== BackgroundGeolocation.AUTHORIZED) {
        setTimeout(() =>
          Alert.alert('App requires location tracking permission', 'Would you like to open app settings?', [
            { text: 'Yes', onPress: () => BackgroundGeolocation.showAppSettings() },
            { text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel' }
          ]), 500);
      }
    });
    BackgroundGeolocation.checkStatus(status => {
      if (!status.isRunning) {
        BackgroundGeolocation.start();
      }
    });
    this.setState({
      loading: false
    })
  };
  componentWillUnmount() {
    BackgroundGeolocation.removeAllListeners();
  }

  render() {
    return (
      <Container>
        <CustomHeader navigation={this.props.navigation} />
        <CustomLoader data={{ loading: this.state.loading, object: "loading map" }} />
        {!this.state.loading && this.state.isGpsEnabled &&(
          <View style={styles.container}>
            <MapView
              onPress={() => this.setState({
                isCalloutClicked: false
              })}
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              showsUserLocation={true}
              followsUserLocation={true}
              initialRegion={this.state.currentPosition}
              mapType="standard"
            >
              {this.state.markers.length !== 0 && this.state.markers.map(marker => (
                <MapView.Marker coordinate={marker.location} onPress={() => this.searchForMixtures(marker)}>
                  {this.state.isAuthority ?
                    <MapView.Callout onPress={() => this.showMixtures()}>
                      <Card style={styles.card}>
                        <CardItem>
                          <Left>
                            <MarkerIcon name='user' color='rgba(0,110,255,0.8)' size={25} />
                          </Left>
                          <Text style={styles.text1}>{marker.fullName}</Text>
                          <Right></Right>
                        </CardItem>
                        <CardItem>
                          <Left>
                            <DistanceIcon name='map-marker-distance' color='rgba(98,80,255,0.8)' size={25} />
                          </Left>
                          <Text style={styles.text2}>{this.distance(marker)}</Text>
                          <Right></Right>
                        </CardItem>
                        <CardItem>
                          <Right>
                            <Text style={styles.text3}>{marker.status}</Text>
                          </Right>
                        </CardItem>
                      </Card>
                    </MapView.Callout>
                    :
                    <MapView.Callout>
                      <Card style={styles.card}>
                        <CardItem>
                          <Left>
                            <DistanceIcon name='map-marker-distance' color='blue' size={25} />
                          </Left>
                          <Text style={styles.distance}>{this.distance(marker)}</Text>
                          <Right>
                          </Right>
                        </CardItem>
                      </Card>
                    </MapView.Callout>
                  }
                </MapView.Marker>
              ))}
            </MapView>
            <TouchableOpacity
              style={this.state.isSick ? styles.disabledButton : styles.enabledButton}
              disabled={this.state.isSick}
              onPress={() => {
                Alert.alert(
                  "Report sickness",
                  "Do you want to report that you are sick?",
                  [
                    {
                      text: "No",
                      style: "cancel"
                    },
                    { text: "Yes", onPress: () => this.reportSickness() }
                  ],
                  { cancelable: true }
                );
              }}>
              <AddIcon name='report-problem' color='white' size={25} />
            </TouchableOpacity>
            {this.state.isAuthority && this.state.isCalloutClicked && (
              <View style={styles.mixtures}>
                <View style={styles.item}>
                  {this.state.marker.status == "authority"
                    ? <View style={styles.authority}>
                      <AuthorityIcon name='user-secret' color='white' size={normalize(45)} />
                    </View>
                    : <View style={styles.citizen}>
                      <UserIcon name='user' color='white' size={normalize(45)} />
                    </View>
                  }
                  <Text style={styles.fullName}>{this.state.marker.fullName}</Text>
                  <Text style={styles.address}>{"ADDRESS: " + this.state.marker.address}</Text>
                  <Text style={styles.cin}>{"CIN: " + this.state.marker.cin}</Text>
                  <Text style={styles.status}>{this.state.marker.status}</Text>
                  <View style={styles.isSick}>
                    <StateIcon name="dot-circle" style={{ marginVertical: normalize(5, 'height') }} color={"tomato"} size={normalize(15)} />
                    <Text style={{ marginHorizontal: normalize(5, 'width'), color: "tomato" }}>sick</Text>
                  </View>
                  {this.state.marker.status == "authority"
                    ? <TouchableOpacity style={styles.code} onPress={() => call({ number: this.state.marker.code, prompt: false })}>
                      <IdCardIcon name='id-card' color='rgba(255,190,0,0.6)' size={normalize(25)} />
                    </TouchableOpacity>
                    : <TouchableOpacity style={styles.phoneNumber} onPress={() => call({ number: this.state.marker.phoneNumber, prompt: false })}>
                      <PhoneIcon name='phone' color='rgba(0,200,50,0.8)' size={normalize(28)} />
                    </TouchableOpacity>
                  }
                </View>
                {this.state.mixtures.length !== 0
                  ? this.displayListOfMixtures()
                  : this.displayNotFoundMixtures()
                }
              </View>
            )}
          </View>
        )}
      </Container>
    );
  }
}
