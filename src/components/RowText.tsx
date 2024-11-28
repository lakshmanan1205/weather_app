import React from 'react'
import { Text, View } from 'react-native'
type RowTextProps = {
  containerStyles: object
  messageOneStyles: object
  messageTwoStyles: object
  messageOne: string
  messageTwo: string
}

const RowText = (props: RowTextProps) => {
  const {
    containerStyles,
    messageOneStyles,
    messageTwoStyles,
    messageOne,
    messageTwo
  } = props
  return (
    <View style={containerStyles}>
      <Text style={messageOneStyles}>{messageOne}</Text>
      <Text style={messageTwoStyles}>{messageTwo}</Text>
    </View>
  )
}
export default RowText
