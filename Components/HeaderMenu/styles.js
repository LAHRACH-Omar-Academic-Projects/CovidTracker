//Import used functions from librairies
import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';

//Create styles object
const styles = StyleSheet.create({
  header: {
    backgroundColor: 'rgba(98,50,255,0.8)',
    position: 'relative',
    height: normalize(160, 'width'),
    top: normalize(0,'height'),
  },
  userImage: {
    backgroundColor: 'rgba(200,185,200,0.5)',
    width: normalize(80, 'width'),
    height: normalize(80, 'width'),
    borderRadius: normalize(100),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: normalize(35),
    marginLeft: normalize(18),
  },
  userName: {
    color: 'white',
    fontSize: 22,
    marginLeft: normalize(20, "width"),
    marginVertical: normalize(10, 'height')
  },
  userSignout: {
    marginLeft: normalize(18, "width"),
    marginTop: normalize(5, "width"),
    padding:5,
    paddingLeft:10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: "row",
    backgroundColor: 'rgba(200,255,200,0.7)',
    borderRadius: normalize(50,"width"),
  },
  textSignout:{
    color: 'rgb(252, 53, 53)',
    fontSize: 15,
  }

})

//Export styles object
export { styles };