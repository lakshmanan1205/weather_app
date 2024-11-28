import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

type itemProps = {
  dt_txt: string
  min: number
  max: number
  condition: string
}
const ListItem = (props: itemProps) => {
  const { dt_txt, min, max, condition } = props
  const { item, date, temp } = styles
  return (
    <View style={item}>
      <Icon name="home" size={50} color={'white'} />
      <Text style={date}>{dt_txt}</Text>
      <Text style={temp}>{min}</Text>
      <Text style={temp}>{max}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 5,
    backgroundColor: 'pink'
  },
  date: {
    color: 'white',
    fontSize: 15
  },
  temp: {
    color: 'white',
    fontSize: 20
  }
})

export default ListItem
