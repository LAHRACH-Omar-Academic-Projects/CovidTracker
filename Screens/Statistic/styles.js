import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEE'
  },
  header: {
    backgroundColor: '#EEE',
  },
  headerText: {
    color: 'rgba(98,80,255,0.8)',
  },
  title: {
    padding: normalize(30, 'width'),
    alignSelf: 'center'
  },
  text1: {
    color: "rgba(98,60,255,0.8)",
    fontSize: 22,
    alignSelf: 'center',
  },
  text2: {
    color: "rgba(20,100,255,0.8)",
    fontSize: 20,
    alignSelf: 'center'
  },
  lastData: {
    padding: normalize(10, 'width'),
  },
  lastCases: {
    padding: normalize(20, 'width'),
    marginHorizontal: normalize(20, 'width'),
    marginVertical: normalize(10, 'height'),
    width: normalize(300, 'width'),
    backgroundColor: "white",
    alignSelf: "center",
    alignItems: 'center',
    borderRadius: normalize(100),
    elevation: 1,
    zIndex: 1
  },
  lastDeaths: {
    padding: normalize(20, 'width'),
    marginHorizontal: normalize(20, 'width'),
    marginVertical: normalize(10, 'height'),
    width: normalize(300, 'width'),
    backgroundColor: "white",
    alignSelf: "center",
    alignItems: 'center',
    borderRadius: normalize(100),
    elevation: 1,
    zIndex: 1
  },
  lastRecoveries: {
    padding: normalize(20, 'width'),
    marginHorizontal: normalize(20, 'width'),
    marginVertical: normalize(10, 'height'),
    width: normalize(300, 'width'),
    backgroundColor: "white",
    alignSelf: "center",
    alignItems: 'center',
    borderRadius: normalize(100),
    elevation: 1,
    zIndex: 1
  },
  text3: {
    color: "rgba(255,100,50,0.8)",
    fontSize: 16,
    alignSelf: 'center'
  },
  text4: {
    color: "rgba(200,100,255,0.8)",
    fontSize: 16,
  },
  text5: {
    color: "rgba(20,195,120,0.8)",
    fontSize: 16,
  },
  text6: {
    color: "rgba(98,60,255,0.8)",
    fontSize: 22,
    alignSelf: 'center'
  },
  totalData: {
    padding: normalize(10, 'width'),
  },
  totalCases: {
    padding: normalize(20, 'width'),
    marginHorizontal: normalize(20, 'width'),
    marginVertical: normalize(10, 'height'),
    width: normalize(280, 'width'),
    backgroundColor: "white",
    alignSelf: "flex-start",
    alignItems: 'center',
    borderRadius: normalize(5),
    elevation: 1,
    zIndex: 1
  },
  totalDeaths: {
    padding: normalize(20, 'width'),
    marginHorizontal: normalize(20, 'width'),
    marginVertical: normalize(10, 'height'),
    width: normalize(280, 'width'),
    backgroundColor: "white",
    alignSelf: "flex-end",
    alignItems: 'center',
    borderRadius: normalize(5),
    elevation: 1,
    zIndex: 1
  },
  totalRecoveries: {
    padding: normalize(20, 'width'),
    marginHorizontal: normalize(20, 'width'),
    marginVertical: normalize(10, 'height'),
    width: normalize(280, 'width'),
    backgroundColor: "white",
    alignSelf: "flex-start",
    alignItems: 'center',
    borderRadius: normalize(5),
    elevation: 1,
    zIndex: 1
  },
  totalActiveCases: {
    padding: normalize(20, 'width'),
    marginHorizontal: normalize(20, 'width'),
    marginVertical: normalize(10, 'height'),
    width: normalize(280, 'width'),
    backgroundColor: "white",
    alignSelf: "flex-end",
    alignItems: 'center',
    borderRadius: normalize(5),
    elevation: 1,
    zIndex: 1
  },
  text7: {
    color: "rgba(255,100,50,0.8)",
    fontSize: 16,
  },
  text8: {
    color: "rgba(200,100,255,0.8)",
    fontSize: 16,
  },
  text9: {
    color: "rgba(20,195,120,0.8)",
    fontSize: 16,
  },
  text10: {
    color: "rgba(20,180,220,0.8)",
    fontSize: 16,
  },
  text11: {
    color: "rgba(98,60,255,0.8)",
    fontSize: 22,
    marginVertical: normalize(0, 'height'),
  },
  statsByRegion: {
    marginVertical: normalize(0, 'height'),
    padding: normalize(10, 'width'),
  },
  item: {
    padding: normalize(20, 'width'),
    marginBottom: normalize(8, 'height'),
    marginHorizontal: normalize(16, 'width'),
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white"
  },
  region: {
    fontSize: 18,
    color: "teal"
  },
  cases: {
    fontSize: 18,
    color: "tomato"
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center'
  },
  loadingText: {
    color: 'rgba(98,80,255,0.8)',
    fontSize: 16
  }
})
