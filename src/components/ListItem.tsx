import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { weatherType } from '../utils/weatherType'
import moment from 'moment'

type itemProps = {
  dt_txt: string
  min: number
  max: number
  condition: string
}
const ListItem = (props: itemProps) => {
  const { dt_txt, min, max, condition } = props
  const { item, date, temp, dateTexWrapper } = styles
  const icon = weatherType[condition].icon || ''
  return (
    <View style={item}>
      <Icon name={icon} size={50} color={'white'} />
      <View style={dateTexWrapper}>
        <Text style={date}>{moment(dt_txt).format('dddd')}</Text>
        <Text style={date}>{moment(dt_txt).format('hh:mm:ss a')}</Text>
      </View>

      <Text style={temp}>{`${Math.round(min)}\u2103 / ${Math.round(
        max
      )}\u2103`}</Text>
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
  dateTexWrapper: { flexDirection: 'column' },
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
