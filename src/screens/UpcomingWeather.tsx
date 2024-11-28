import React from 'react'
import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text
} from 'react-native'
import ListItem from '../components/ListItem'

const DATA = [
  {
    dt_txt: '2022-08-30 15:00:00',
    main: {
      temp_min: 296.76,
      temp_max: 297.87
    },
    weather: [
      {
        id: 500,
        main: 'Rain',
        description: 'light rain',
        icon: '10d'
      }
    ]
  },
  {
    dt_txt: '2022-08-30 18:00:00',
    main: {
      temp_min: 292.84,
      temp_max: 295.45
    },
    weather: [
      {
        main: 'Rain'
      }
    ]
  },
  {
    dt_txt: '2022-08-30 21:00:00',
    main: {
      temp_min: 290.31,
      temp_max: 292.46
    },
    weather: [
      {
        main: 'Rain'
      }
    ]
  }
]
type UpcomingWeatherProps = {
  weatherData: {
    dt_txt: string
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
    }
  }[]
}
const UpcomingWeather: React.FC<UpcomingWeatherProps> = ({ weatherData }) => {
  console.log('weather', weatherData)
  const { container, image } = styles
  const renderItem = ({ item }) => (
    <ListItem
      condition={item.weather[0].main}
      dt_txt={item.dt_txt}
      min={item.main.temp_min}
      max={item.main.temp_max}
    />
  )
  return (
    <SafeAreaView style={container}>
      <ImageBackground
        source={require('../../assets/images/upcoming_bg.jpg')}
        style={image}
        resizeMode="cover"
      >
        <Text>UpcomingWeather</Text>
        <FlatList
          data={weatherData}
          renderItem={renderItem}
          keyExtractor={(item) => item.dt_txt}
        />
      </ImageBackground>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
    backgroundColor: 'royalblue'
  },
  image: {
    flex: 1
  }
})
export default UpcomingWeather
