import React, { useCallback, useEffect, useState } from 'react'
import { NavigationContainer, useFocusEffect } from '@react-navigation/native'
import Tabs from './src/navigation/Tabs'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import useGetWeather from './src/hooks/useGettWeather'

const App = () => {
  // api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
  const { loading, position, weather } = useGetWeather()
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
    <View>
      <Text>Welcome</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
})
export default App
