import React,{ useState, useEffect, useMemo } from 'react'
import Taro from '@tarojs/taro'
import { useDispatch, useSelector } from 'react-redux'

import { View, Text, Image } from '@tarojs/components'
import './index.less'
import FormBox from '../../components/form'
import TableBox from '../../components/table'
import BorderTitle from '../../components/borderTitle'

const Index = () => {
  const dispatch: { education: any } = useDispatch()
  const state = useSelector((state: { education: any }) => state.education)
  const { originDataSource, totalCount, newTotalCount } = state

  useEffect(() => {
    dispatch.education.getAllDataSource()
  }, [])

  return (
    <View className='index'>
      {/* 报名人数情况 */}
      <Text style="margin: 10px 0;display:block">
        <Text style="color: red;margin-right: 20px">当前报名人数：
          <Text style="color: blue;">{totalCount}</Text>
        </Text>
        <Text style="color: red;margin-right: 20px">老生：
          <Text style="color: blue;">{totalCount - newTotalCount}</Text>
        </Text>
        <Text style="color: red;">新生：
          <Text style="color: blue;">{newTotalCount}</Text>
        </Text>
      </Text>
      {/* pic1 */}
      <Image
        style="width: 100%;"
        src="cloud://education-7g0kmbob4972f357.6564-education-7g0kmbob4972f357-1309572070/pics/p1.jpg"
        // src={pic1}
      />
      {/* pic2 */}
      <Image
        style="width: 100%;"
        src="cloud://education-7g0kmbob4972f357.6564-education-7g0kmbob4972f357-1309572070/pics/pic2.jpg"
      />
      {/* pic3 */}
      <Image
        style="width: 100%; height: 60px"
        src="cloud://education-7g0kmbob4972f357.6564-education-7g0kmbob4972f357-1309572070/pics/pic3.jpg"
      />
      {/* pic4 */}
      <Image
        style="width: 100%; height: 300px"
        src="cloud://education-7g0kmbob4972f357.6564-education-7g0kmbob4972f357-1309572070/pics/pic4.jpg"
      />
      {/* pic5 */}
      <Image
        style="width: 100%; height: 360px"
        src="cloud://education-7g0kmbob4972f357.6564-education-7g0kmbob4972f357-1309572070/pics/pic5.jpg"
      />
      {/* pic6 */}
      <Image
        style="width: 100%; height: 360px"
        src="cloud://education-7g0kmbob4972f357.6564-education-7g0kmbob4972f357-1309572070/pics/pic6.jpg"
      />
      {/* pic7 */}
      <Image
        style="width: 100%; height: 26px"
        src="cloud://education-7g0kmbob4972f357.6564-education-7g0kmbob4972f357-1309572070/pics/pic7.jpg"
      />
      {/* pic9 */}
      <Image
        style="width: 100%; height: 430px"
        src="cloud://education-7g0kmbob4972f357.6564-education-7g0kmbob4972f357-1309572070/pics/pic9.jpg"
      />
      {/* pic10 */}
      <Image
        style="width: 100%; height: 430px"
        src="cloud://education-7g0kmbob4972f357.6564-education-7g0kmbob4972f357-1309572070/pics/pic10.jpg"
      />
      {/* pic11 */}
      <Image
        style="width: 100%; height: 430px"
        src="cloud://education-7g0kmbob4972f357.6564-education-7g0kmbob4972f357-1309572070/pics/pic11.jpg"
      />
      {/* 活动介绍 */}
      <BorderTitle value="活动介绍" />
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
        src="cloud://education-7g0kmbob4972f357.6564-education-7g0kmbob4972f357-1309572070/pics/pic12.jpg"
      />
      <View style="width: 100%; background:blue; height: 1px; margin: 20px 0"></View>
      {/* 开团按钮 */}
      <FormBox />
      {/* 报名展示 */}
      <BorderTitle value="报名展示" />
      {/* 报名表格 */}
      <TableBox />
        {/* 备注、校区及联系方式 */}
      <Image
        style="width: 100%; height: 360px"
        src="cloud://education-7g0kmbob4972f357.6564-education-7g0kmbob4972f357-1309572070/pics/pic13.jpg"
      />
    </View>
  )
}

export default Index