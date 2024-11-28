import React, { useEffect, useState } from 'react'
import Geolocation from '@react-native-community/geolocation'
import { Alert, Linking } from 'react-native'
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions'
import Config from 'react-native-config'
type Position = {
  latitude: number
  longitude: number
}
type WeatherType = { city: object; list: [] }
const useGetWeather = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [position, setPosition] = useState<Position | null>(null)
  const [weather, setWeather] = useState<WeatherType>()
  // const openLocationSettings = () => {
  //   Linking.openURL('app-settings:') // Will open the app settings (Android & iOS)
  // }
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
  }, [])
  useEffect(() => {
    fetchWeatherData()
  }, [position])
  return { loading, position, weather }
}

export default useGetWeather
