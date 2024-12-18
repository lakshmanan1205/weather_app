import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'

type IconTextProps = {
  iconName: string
  iconColor: string
  bodyText: string
  bodyTextStyles: object
}

const IconText = (props: IconTextProps) => {
  const { iconName, iconColor, bodyText, bodyTextStyles } = props
  const { container, textTheme } = styles
  return (
    <View style={container}>
      <Feather name={iconName} size={50} color={iconColor} />
      <Text style={[textTheme, bodyTextStyles]}>{bodyText}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  textTheme: {
    fontWeight: 'bold'
  }
})
export default IconText
