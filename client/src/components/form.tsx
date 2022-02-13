import React,{ useState, useEffect,useCallback } from 'react'
import Taro, { Config } from '@tarojs/taro'
import { View, Text, Button, RichText } from '@tarojs/components'
import './form.less'

const FormBox = function (props) {
  const {
    educationCollection,
    curDataSource
  } = props
  const handleOpen = useCallback(
    () => {
      // curDataSource.map(item => {
      //   if (item.userName?.includes('21')) {
      //     alert('该学员已报名！')
      //   }
      // })
      educationCollection.add(
        {
          data: {
            userName: '大姐姐',
            phone: 15867237132,
            age: 4,
            isNew: true,
            school: 1,
            timestamp: new Date().getTime(),
          },
          success: function(res) {
            // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
            console.log(res)
            educationCollection.get()
          }
        }
      )
    },
    [props.curDataSource],
  )
  return (
    <View className='form-box'>
      <Button onClick={handleOpen} className='btn-open btn' plain type='primary'>我要开团</Button>
      <Button className='btn-join btn' plain type='primary'>我要参团</Button>
    </View>
  )
}

export default FormBox