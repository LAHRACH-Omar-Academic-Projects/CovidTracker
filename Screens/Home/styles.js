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
  map: {
    flex: 1,
  },

  spinnerView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },


  enabledButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 20,
    right: 15,
    width: normalize(50, 'width'),
    height: normalize(50, 'width'),
    borderRadius: 35,
    backgroundColor: 'red',
  },
  disabledButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 20,
    right: 15,
    width: normalize(50, 'width'),
    height: normalize(50, 'width'),
    borderRadius: 35,
    backgroundColor: '#CCC',
  },
  card: {
    padding: normalize(0, 'width'),
  },
  text1: {
    marginHorizontal: normalize(20, 'width'),
    color: '#777'
  },
  text2: {
    marginHorizontal: normalize(20, 'width'),
    color: '#777'
  },
  text3: {
    color: 'rgb(255,180,0)'
  },
  mixtures: {
    backgroundColor: 'white',
    height: normalize(320, 'height'),
    opacity: 5
  },
  titleView: {
    width: normalize(200, 'width'),
    backgroundColor: 'white',
    marginTop: normalize(15, 'height'),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(98,80,255,0.8)'
  },
  title: {
    color: 'rgba(98,80,255,0.8)',
    fontSize: 22
  },
  mixturesList: {
    flex: 1,
    margin: normalize(20, 'width'),
  },
  item: {
    borderRadius: 100,
    marginVertical: normalize(10, 'height'),
    justifyContent: 'center',
    alignItems: 'center',
    height: normalize(90, 'height'),
    elevation: 1,
    zIndex: 1
  },
  citizen: {
    backgroundColor: 'rgba(0,110,255,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: normalize(5, 'width'),
    padding: normalize(20, 'width'),
    borderRadius: 100
  },
  authority: {
    borderRadius: 100,
    backgroundColor: 'rgba(200,80,10,0.6)',
    padding: normalize(22, 'width'),
    justifyContent: 'center',
    alignItems: 'center',
    left: normalize(5, 'width'),
    position: 'absolute',
  },
  code: {
    backgroundColor: 'rgba(255,244,0,0.4)',
    borderWidth: 1,
    borderColor: 'rgba(255,244,0,0.5)',
    elevation: 1,
    zIndex: 1,
    padding: normalize(15, 'width'),
    position: 'absolute',
    right: normalize(15, 'width'),
    borderRadius: 100
  },
  phoneNumber: {
    backgroundColor: 'rgba(0,200,60,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0,200,50,0.5)',
    elevation: 1,
    zIndex: 1,
    padding: normalize(15, 'width'),
    position: 'absolute',
    right: normalize(15, 'width'),
    borderRadius: 100
  },
  fullName: {
    color: 'rgba(0,110,255,0.6)',
    fontSize: 18,
    position: 'absolute',
    left: normalize(95, 'width'),
    top: normalize(8, 'height'),
  },
  address: {
    color: '#777',
    fontSize: 15,
    position: 'absolute',
    left: normalize(105, 'width'),
    top: normalize(26, 'height'),
  },
  cin: {
    color: '#777',
    fontSize: 15,
    position: 'absolute',
    left: normalize(110, 'width'),
    top: normalize(42, 'height'),
  },
  status: {
    color: 'rgba(98,80,255,0.8)',
    fontSize: 15,
    position: 'absolute',
    left: normalize(105, 'width'),
    top: normalize(65, 'height'),
  },
  isSick: {
    fontSize: 15,
    position: 'absolute',
    flexDirection: 'row',
    right: normalize(80, 'width'),
    top: normalize(65, 'height'),
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: normalize(160, 'height'),
    bottom: 0,
    alignItems: 'center'
  },
  loadingText: {
    color: 'rgba(98,80,255,0.8)',
    fontSize: 16
  }
});