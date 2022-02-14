import React from 'react'
import { View, Text, Button, RichText } from '@tarojs/components'
import './borderTitle.less'

const BorderTitle = (props) => {
  return (
    <View className='border-title-box'>
      <Text>{props.value || ''}</Text>
    </View>
  )
}
export default BorderTitle