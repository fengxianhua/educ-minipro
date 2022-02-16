import React,{ useState, useEffect, useMemo } from 'react'
import Taro from '@tarojs/taro'
import { useDispatch, useSelector } from 'react-redux'
import p1 from '../../assets/p1.jpg'
import pic9 from '../../assets/pic9.jpg'
import pic10 from '../../assets/pic10.jpg'
import pic11 from '../../assets/pic11.jpg'
import pic13 from '../../assets/pic13.jpg'

import { View, Text, Image } from '@tarojs/components'
import './index.less'
import FormBox from '../../components/form'
import TableBox from '../../components/table'
import { Divider } from "@taroify/core"

const Index = () => {
  const dispatch: { education: any } = useDispatch()
  const state = useSelector((state: { education: any }) => state.education)
  const { totalCount, newTotalCount } = state

  useEffect(() => {
    dispatch.education.getAllDataSource()
    
    // Taro.cloud
    //   .callFunction({
    //     name: "login",
    //     data: {}
    //   })
    //   .then(res => {
    //     console.log(res)
    //   })
  }, [])

  return (
    <View className='index'>
      {/* <Button onClick={() => {
        Taro.login({
          success: function (res) {
            if (res.code) {
              //发起网络请求
              Taro.request({
                url: `https://api.weixin.qq.com/sns/jscode2session?
                grant_type=authorization_code
                &appid= wx7808ad1c9efcdfff
                &secret= db8be0bf5d49429845b892a9aa904503
                &js_code=${res.code}`,
                data: {
                  code: res.code
                }
              }).then((res2) => {
                console.log(res2)
              })
              console.log(res)
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        })
      }}>登录</Button> */}
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
        src={p1}
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
        style="width: 100%; height: 420px"
        src="cloud://education-7g0kmbob4972f357.6564-education-7g0kmbob4972f357-1309572070/pics/pic4.jpg"
      />
      {/* pic5 */}
      <Image
        style="width: 100%; height: 420px"
        src="cloud://education-7g0kmbob4972f357.6564-education-7g0kmbob4972f357-1309572070/pics/pic5.jpg"
      />
      {/* pic6 */}
      <Image
        style="width: 100%; height: 420px"
        src="cloud://education-7g0kmbob4972f357.6564-education-7g0kmbob4972f357-1309572070/pics/pic6.jpg"
      />
      {/* 学员作品展示 */}
      <Divider style={{ fontSize: "16px", color: "blue", borderColor: "blue", padding: "0 16px" }}>
        学员作品展示
      </Divider>
      {/* pic9 */}
      <Image
        style="width: 100%; height: 500px"
        src={pic9}
      />
      {/* pic10 */}
      <Image
        style="width: 100%; height: 500px"
        src={pic10}
      />
      {/* pic11 */}
      <Image
        style="width: 100%; height: 500px"
        src={pic11}
      />
      {/* 活动介绍 */}
      <Divider style={{ fontSize: "16px", color: "blue", borderColor: "blue", padding: "0 16px" }}>
        活动介绍
      </Divider>
      <Text style="margin: 10px 0;display:block; padding-left: 8px;font-size: 14px ">
        <Text style="color: red;display:block;">活动主办方：<Text  style="color: blue;">韩老师</Text></Text>
        <Text style="color: red;display:block;">主办方电话：<Text  style="color: blue;">13116755661</Text></Text>
        <Text style="color: red;display:block;">最大召集数：<Text  style="color: blue;">300</Text></Text>
        <Text style="color: red;display:block;">每团人数：<Text  style="color: blue;">10</Text></Text>
        <Text style="color: red;display:block;">活动时间：<Text  style="color: blue;">2022-02-22 ～ 2022-03-15</Text></Text>
      </Text>
        {/* 报名流程 */}
      <Divider style={{ fontSize: "16px", color: "blue", borderColor: "blue", padding: "0 16px" }}>
        报名流程
      </Divider>
      <Text style="color: red;margin: 10px 0;display:block; padding-left: 8px;font-size: 14px ">
        <Text style="display:block;">开团：点击“我要开团”，录入本人开团信息后点击“信息确认”。</Text>
        <Text style="display:block;">参团：点击“我要参团”，录入本人开团信息，选择参团团长后点击“信息确认”。</Text>
        <Text style="display:block;">
          查询：在搜索框中输入“团长姓名”查询开团信息，
          如：张三；在输入框输入“姓名+手机号”查询该生报名情况。如：张三+13688888888。
        </Text>
      </Text>
      {/* <View style="width: 100%; background:blue; height: 1px; margin: 20px 0"></View> */}
      {/* 开团按钮 */}
      <FormBox />
      {/* 报名展示 */}
      <Divider style={{ fontSize: "16px", color: "blue", borderColor: "blue", padding: "0 16px" }}>
        报名展示
      </Divider>
      {/* 报名表格 */}
      <TableBox />
        {/* 备注、校区及联系方式 */}
      <Image
        style="width: 100%; height: 420px"
        src={pic13}
      />
    </View>
  )
}

export default Index