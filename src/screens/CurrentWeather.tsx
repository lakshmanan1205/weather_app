import React, { useCallback, useState } from 'react'
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Linking
} from 'react-native'
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions'
import { useFocusEffect } from '@react-navigation/native'
import Geolocation from '@react-native-community/geolocation'
import Feather from 'react-native-vector-icons/Feather'

import RowText from '../components/RowText'
import { weatherType } from '../utils/weatherType'
type position = {
  latitude: number
  longitude: number
}
const CurrentWeather = () => {
  const {
    wrapper,
    container,
    temp,
    feels,
    highLowWrapper,
    highLow,
    bodyWrapper,
    description,
    message
  } = styles
  const [position, setPosition] = useState<position | null>(null)
  const openLocationSettings = () => {
    Linking.openSettings()
  }
  // const openLocationSettings = () => {
  //   Linking.openURL('app-settings:') // Will open the app settings (Android & iOS)
  // }
  const checkLocationPermission = () => {
    check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
      .then((status) => {
        switch (status) {
          case RESULTS.UNAVAILABLE:
            console.log('This feature is not available on this device.')
            break
          case RESULTS.DENIED:
            console.log('The permission has not been requested or was denied.')
            request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, {
              title: 'Location Permission Required',
              message:
                'We need access to your location to provide better services.',
              buttonPositive: 'OK',
              buttonNegative: 'Cancel'
            })
              .then((res) => {
                console.log('Location permission granted!')
              })
              .catch((err) => {
                Alert.alert(
                  'Permission denied',
                  'You need to enable location permissions in settings.'
                )
              })
            break
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are allowed.')
            break
          case RESULTS.GRANTED:
            console.log('The permission is granted.')
            getCurrentPosition()
            break
          case RESULTS.BLOCKED:
            console.log('The permission is blocked.')
            break
          default:
            console.log('Unknown permission status:', status)
            break
        }
      })
      .catch((error) => {
        console.error('Error checking permission:', error)
      })
  }
  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        })
      },
      (error) => {
        if (error.code === 2) {
          Alert.alert(
            'Location Service Disabled',
            'Please enable location services to use this feature.',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Enable', onPress: openLocationSettings }
            ]
          )
        }
        console.log('JSON', JSON.stringify(error))
      },
      { enableHighAccuracy: true }
    )
  }

  useFocusEffect(
    useCallback(() => {
      checkLocationPermission()
    }, [])
  )
  return (
    <SafeAreaView style={wrapper}>
      <View style={container}>
        <Feather name="sun" size={50} color="black" />
        <Text style={temp}>61</Text>
        <Text style={feels}>Feels like 5</Text>
        <RowText
          containerStyles={highLowWrapper}
          messageOneStyles={highLow}
          messageTwoStyles={highLow}
          messageOne="High :8"
          messageTwo="Low :6"
        />
      </View>
      <RowText
        containerStyles={bodyWrapper}
        messageOneStyles={description}
        messageTwoStyles={message}
        messageOne="It's sunny"
        messageTwo={weatherType['Thunderstorm'].message}
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
  temp: {
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
