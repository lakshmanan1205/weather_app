import React, { useEffect, useState } from 'react'
import Geolocation from '@react-native-community/geolocation'
import { Alert, Linking } from 'react-native'
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions'
import Config from 'react-native-config'
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import useGetWeather from './src/hooks/useGettWeather'
import { NavigationContainer } from '@react-navigation/native'
import Tabs from './src/navigation/Tabs'
type Position = {
  latitude: number
  longitude: number
}
type WeatherType = { city: object; list: [] }
const App = () => {
  // api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
  // const { loading, position, weather } = useGetWeather()
  const [loading, setLoading] = useState<boolean>(false)
  const [position, setPosition] = useState<Position | null>(null)
  const [weather, setWeather] = useState<WeatherType>()
  const [count, setCount] = useState(0)
  const openLocationSettings = () => {
    Linking.openSettings()
  }

  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      (pos) => {
        console.log('lkj', pos)

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
            getCurrentPosition()
            console.log('The permission is granted.')
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
  const fetchWeatherData = () => {
    setLoading(true)
    fetch(
      `http://api.openweathermap.org/data/2.5/forecast?lat=${position?.latitude}&lon=${position?.longitude}&appid=${Config.WEATHER_API_KEY}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        setWeather(data)
      })
      .catch((err) => console.log('err', err))
      .finally(() => setLoading(false))
  }
  useEffect(() => {
    checkLocationPermission()
  }, [count])
  useEffect(() => {
    fetchWeatherData()
  }, [position])
  if (weather && weather.list) {
    return (
      <NavigationContainer>
        <Tabs weather={weather} />
      </NavigationContainer>
    )
  }
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={'large'} color={'blue'} />
      </View>
    )
  }
  return (
    <View style={styles.homeContainer}>
      <Text>Welcome</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setCount((c) => c + 1)}
      >
        <Text style={styles.text}>Go</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  homeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center'
  },
  text: {
    color: '#fff',
    fontSize: 16
  }
})
export default App
