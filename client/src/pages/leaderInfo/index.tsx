import React from 'react'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.less'
import Table from 'taro3-table';

const Index = () => {
  const currentMembers = Taro.getStorageSync('currentMember')
  const columns = [
    {
      title: '编号',
      dataIndex: 'index',
      width: '10%',
      render: (text, record, index) => {
        return index + 1
      }
    },
    {
      title: '姓名',
      dataIndex: 'userName',
      width: '15%',
    },
    {
      title: '手机尾号',
      dataIndex: 'phone',
      width: '15%',
      render: (text) => {
        const isPhoneNo = text && (/^[1][3,4,5,7,8][0-9]{9}$/.test(text))
        return isPhoneNo ? (text + '').substring(7) : '号码有误'
      }
    },
    {
      title: '年龄',
      dataIndex: 'age',
      width: "10%"
    },
    {
      title: '报名课程',
      dataIndex: 'className',
      width: "20%"
    },
    {
      title: '登记时间',
      dataIndex: 'time',
      width: "30%",
      render: (t) => {
        return <Text style={{ whiteSpace: 'normal' }}>{t}</Text>
      }
    }
  ]

  return (
    <View className='index'>
      <Table
        className='table-box'
        columns={columns}
        dataSource={currentMembers}
      />
    </View>
  )
}

export default Index
