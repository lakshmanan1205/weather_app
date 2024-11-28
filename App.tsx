import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Tabs from './src/navigation/Tabs'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { PERMISSIONS } from 'react-native-permissions'

const App = () => {
  const [loading, setLoading] = useState<boolean>(false)
  console.log('laksh', PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={'large'} color={'blue'} />
      </View>
    )
  }
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
})
export default App
