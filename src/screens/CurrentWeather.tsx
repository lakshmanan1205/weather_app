import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'

import RowText from '../components/RowText'
import { weatherType } from '../utils/weatherType'
type CurrentWeatherProps = {
  weatherData: {
    main: {
      temp: number
      feels_like: number
      temp_min: number
      temp_max: number
    }
    weather: {
      description: string
      icon: string
      id: number
      main: string
    }[]
  }
}
type WeatherCondition = keyof typeof weatherType
const CurrentWeather: React.FC<CurrentWeatherProps> = ({ weatherData }) => {
  const {
    main: { temp, feels_like, temp_min, temp_max },
    weather
  } = weatherData
  const weatherCondition: string = weather[0].main
  const {
    wrapper,
    container,
    tempStyles,
    feels,
    highLowWrapper,
    highLow,
    bodyWrapper,
    description,
    message
  } = styles
  const backgroundColor =
    weatherType[weatherCondition as WeatherCondition]?.backgroundColor ||
    weatherType['Clear'].backgroundColor
  const icon =
    weatherType[weatherCondition as WeatherCondition]?.icon ||
    weatherType['Clear'].icon
  const messageTwo =
    weatherType[weatherCondition as WeatherCondition].message || ''
  return (
    <SafeAreaView style={[wrapper, { backgroundColor }]}>
      <View style={container}>
        <Feather name={icon} size={50} color="white" />
        <Text style={tempStyles}>{temp}</Text>
        <Text style={feels}>{`Feels like ${feels_like}`}</Text>
        <RowText
          containerStyles={highLowWrapper}
          messageOneStyles={[highLow, { marginRight: 10 }]}
          messageTwoStyles={highLow}
          messageOne={`High : ${temp_max}`}
          messageTwo={`Low : ${temp_min}`}
        />
      </View>
      <RowText
        containerStyles={bodyWrapper}
        messageOneStyles={description}
        messageTwoStyles={message}
        messageOne={weather[0].description}
        messageTwo={messageTwo}
      />
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'pink',
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tempStyles: {
    color: 'black',
    fontSize: 48
  },
  feels: {
    color: 'black',
    fontSize: 30
  },
  highLow: {
    color: 'black',
    fontSize: 20
  },
  highLowWrapper: {
    flexDirection: 'row'
  },
  bodyWrapper: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    marginBottom: 40,
    paddingLeft: 25
  },
  description: {
    fontSize: 48
  },
  message: {
    fontSize: 30
  }
})
export default CurrentWeather
