import React,{ useState, useEffect,useCallback } from 'react'
import Taro, { Config } from '@tarojs/taro'
import { View, Text, Image, RichText } from '@tarojs/components'
import './index.less'
import FormBox from '../../components/form'
import TableBox from '../../components/table'

const db = Taro.cloud.database()
const educationCollection = db.collection('education')

const Index = () => {
  const [curDataSource, setCurDataSource] = useState([]) 
  return (
    <View className='index'>
      {/* 报名人数情况 */}
      <Text style="margin: 10px 0;display:block">
        <Text style="color: red;margin-right: 20px">当前报名人数：<Text  style="color: blue;">0</Text></Text>
        <Text style="color: red;margin-right: 20px">老生：<Text  style="color: blue;">0</Text></Text>
        <Text style="color: red;">新生：<Text  style="color: blue;">0</Text></Text>
      </Text>
      {/* pic1 */}
      <Image
        style="width: 100%;"
        src="/assets/p1.jpg"
        // src={pic1}
      />
      {/* pic2 */}
      <Image
        style="width: 100%;"
        src="/assets/pic2.jpg"
      />
      {/* pic3 */}
      <Image
        style="width: 100%; height: 60px"
        src="/assets/pic3.jpg"
      />
      {/* pic4 */}
      <Image
        style="width: 100%; height: 300px"
        src="/assets/pic4.jpg"
      />
      {/* pic5 */}
      <Image
        style="width: 100%; height: 360px"
        src="/assets/pic5.jpg"
      />
      {/* pic6 */}
      <Image
        style="width: 100%; height: 360px"
        src="/assets/pic6.jpg"
      />
      {/* pic7 */}
      <Image
        style="width: 100%; height: 26px"
        src="/assets/pic7.jpg"
      />
      {/* pic9 */}
      <Image
        style="width: 100%; height: 430px"
        src="/assets/pic9.jpg"
      />
      {/* pic10 */}
      <Image
        style="width: 100%; height: 430px"
        src="/assets/pic10.jpg"
      />
      {/* pic11 */}
      <Image
        style="width: 100%; height: 430px"
        src="/assets/pic11.jpg"
      />
      {/* 活动介绍 */}
      <Image
        style="height: 20px"
        src="/assets/pic8.jpg"
      />
      <Text style="margin: 10px 0;display:block; padding-left: 8px;font-size: 14px ">
        <Text style="color: red;display:block;">活动主办方：<Text  style="color: blue;">韩老师</Text></Text>
        <Text style="color: red;display:block;">主办方电话：<Text  style="color: blue;">13116755661</Text></Text>
        <Text style="color: red;display:block;">最大召集数：<Text  style="color: blue;">300</Text></Text>
        <Text style="color: red;display:block;">每团人数：<Text  style="color: blue;">10</Text></Text>
        <Text style="color: red;display:block;">活动时间：<Text  style="color: blue;">2022-02-22 ～ 2022-03-15</Text></Text>
      </Text>
        {/* 报名流程 */}
        <Image
        style="width: 100%; height: 170px"
        src="/assets/pic12.jpg"
      />

      {/* 开团按钮 */}
      <FormBox curDataSource={curDataSource} educationCollection={educationCollection} />
      {/* 报名展示 */}
      <Image
        style="width: 100%; height: 26px"
        src="/assets/pic15.jpg"
      />
      {/* 报名表格 */}
      <TableBox setCurDataSource={setCurDataSource} educationCollection={educationCollection} />
      <View style="width: 100%; background:blue; height: 1px; margin: 20px 0"></View>
        {/* 备注、校区及联系方式 */}
        <Image
        style="width: 100%; height: 360px"
        src="/assets/pic13.jpg"
      />
    </View>
  )
}

export default Index