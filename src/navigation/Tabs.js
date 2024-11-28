import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Feather from 'react-native-vector-icons/Feather'

import CurrentWeather from '../screens/CurrentWeather'
import UpcomingWeather from '../screens/UpcomingWeather'
import City from '../screens/City'

const Tabs = () => {
  const Tab = createBottomTabNavigator()

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'grey',
        tabBarStyle: {
          backgroundColor: 'lightblue',
          padding: 2
        },
        headerStyle: {
          backgroundColor: 'lightblue'
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 25,
          color: 'tomato',
          justifyContent: 'center'
        }
      }}
    >
      <Tab.Screen
        name={'Current'}
        component={CurrentWeather}
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather
              name={'droplet'}
              size={25}
              color={focused ? 'tomato' : 'black'}
            />
          )
        }}
      />
      <Tab.Screen
        name={'Upcoming'}
        component={UpcomingWeather}
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather
              name={'clock'}
              size={25}
              color={focused ? 'tomato' : 'black'}
            />
          )
        }}
      />
      <Tab.Screen
        name={'City'}
        component={City}
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather
              name={'home'}
              size={25}
              color={focused ? 'tomato' : 'black'}
            />
          )
        }}
      />
    </Tab.Navigator>
  )
}

export default Tabs
