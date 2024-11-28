import React from 'react'
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import IconText from '../components/IconText'

const City = () => {
  const {
    container,
    imageLayout,
    cityText,
    cityName,
    countryName,
    populationWrapper,
    populationText,
    riseSetWrapper,
    riseSetText,
    rowLayout
  } = styles
  return (
    <SafeAreaView style={container}>
      <ImageBackground
        source={require('../../assets/images/city_bg.jpg')}
        style={imageLayout}
        resizeMode="cover"
      >
        <Text style={[cityText, cityName]}>UK</Text>
        <Text style={[cityText, countryName]}>London</Text>
        <View style={[rowLayout, populationWrapper]}>
          <IconText
            iconName="user"
            iconColor="white"
            bodyText="8000"
            bodyTextStyles={populationText}
          />
        </View>
        <View style={[rowLayout, riseSetWrapper]}>
          <IconText
            iconName="sunrise"
            iconColor="white"
            bodyText="06:35:35am"
            bodyTextStyles={riseSetText}
          />
          <IconText
            iconName="sunrise"
            iconColor="white"
            bodyText="05:48:48pm"
            bodyTextStyles={riseSetText}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  imageLayout: {
    flex: 1
  },
  cityText: {
    justifyContent: 'center',
    alignSelf: 'center',
    fontWeight: 'bold',
    color: 'white'
  },
  cityName: {
    fontSize: 40
  },
  countryName: {
    fontSize: 30
  },
  populationWrapper: {
    justifyContent: 'center',
    marginTop: 30
  },
  populationText: {
    fontSize: 25,
    marginTop: 7.5,
    color: 'red',
    fontWeight: 'bold'
  },
  riseSetWrapper: {
    justifyContent: 'space-around',
    marginTop: 30
  },
  riseSetText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  },
  rowLayout: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})
export default City
