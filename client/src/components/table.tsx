import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Taro from '@tarojs/taro'
import { View, Text, Input, Button } from '@tarojs/components'
import './table.less'
import Table from 'taro3-table';
import { Pagination, Dialog, Toast } from "@taroify/core"
import { timeLimit } from '../config'

const TableBox = function () {
  const dispatch: { education: any } = useDispatch()
  const state = useSelector((state: { education: any }) => state.education)
  // const params = Taro.getCurrentInstance().router?.params

  const {
    originDataSource,
  } = state

  const [searchValue, setSearchValue] = useState('')
  const [curDataSourceList, setCurDataSource]:any = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    if (!originDataSource?.length) return
    const copyList = [...originDataSource]
    setCurDataSource(copyList.splice((currentPage -1) * 10, currentPage * 10))
  }, [currentPage, originDataSource])

  const columns = [
    {
      title: '编号',
      dataIndex: 'index',
      width: '10%',
      render: (text, record, index) => {
        return (index + 1) + 10 * (currentPage - 1)
      }
    },
    {
      title: '团长姓名',
      dataIndex: 'userName',
      width: '20%',
      render: (text, record) => {
        return <Text style={{ color: 'blue'}} onClick={() => {
          Taro.navigateTo({
            url: `/pages/leaderInfo/index?isLeader=${true}`
          })
          Taro.setStorageSync("currentMember", [record].concat(record.members))
        }}>{text}</Text>
      }
    },
    {
      title: '手机尾号',
      dataIndex: 'phone',
      width: '20%',
      render: (text) => {
        const isPhoneNo = text && (/^[1][3,4,5,7,8][0-9]{9}$/.test(text))
        return isPhoneNo ? (text + '').substring(7) : '号码有误'
      }
    },
    {
      title: '报名人数',
      dataIndex: 'count',
      width: "15%",
      render: text => text || 1
    },
    {
      title: '操作',
      dataIndex: 'inGroup',
      width: '35%',
      render: (text, record) => {
        return (<>
          <Button
            style="
              cursor: pointer;
              color: white;
              font-size: 12px;
              min-width: 50px;
              height: 20px;
              line-height: 20px;
              background: rgb(0, 178,35);
              border-radius: 2px;
            "
            type="primary"
            openType='share'
            onClick={() => {
              dispatch.education.setBaseState({
                shareGrouper: `${record.userName}-${`${record.phone}`.substring(7)}`
              })
            }}
          >转发</Button>
          <Text
            style="
              cursor: pointer;
              color: white;
              font-size: 12px;
              min-width: 50px;
              height: 20px;
              line-height: 20px;
              background: rgb(0, 178,35);
              border-radius: 2px;
              display: block;
            "
            onClick={() => {
              if (new Date() < new Date(timeLimit.startTime) || new Date() > new Date(timeLimit.endTime)) {
                return Toast.open('当前不在报名时段，请关注招生日期！')
              }
              if (record.count > 9) return Toast.open('该团人数已满，请重新选择参团团长！')
              Taro.pageScrollTo({
                selector: "#openGroupPos",
                duration: 100,
              })
              dispatch.education.setBaseState({
                pickedGrouper: `${record.userName}-${`${record.phone}`.substring(7)}`
              })
              }}>参团</Text>
        </>)
      }
    },

]
  const handleSearch = useCallback(
    () => {
      if (!originDataSource?.length) return
      const newList = []
      const copyList = [...originDataSource]

      if (searchValue) {
        setCurrentPage(1)
        originDataSource?.map(item => {
          // 查询团长姓名，如：张三
          if (item.userName.includes(searchValue)) {
            newList.push(item)
          }
          // 查询团员在团情况，如：张三+15888888888
          const searchArr = searchValue.split('+')
          if (searchValue.split('+').length > 1 && item.members?.length) {
            item.members.map(member => {
              if (member.userName === searchArr[0] && `${member.phone}` === searchArr[1]) {
                newList.push(item)
              }
            })
          }
        })
        setCurDataSource(newList.splice(0, 10))
      } else {
        setCurDataSource(copyList.splice(0, 10))
      }
    },
    [searchValue],
  )
  const handlePageChange = useCallback(
    (page) => {
      page !== currentPage && setCurrentPage(page)
    },
    [currentPage],
  )

  return (
    <View className='table-search-box'>
      <Dialog id="dialog" />
      <Input
        className='search-input'
        type='text'
        placeholder='请输入要搜索的团长姓名'
        confirm-type="search"
        onInput={(o) => setSearchValue(o.detail.value)}
        onConfirm={handleSearch}
      ></Input>
      <Text className='search-btn' onClick={handleSearch}>搜索</Text>
      <Table
        className='table-box'
        columns={columns}
        dataSource={curDataSourceList}
      />
      {
        originDataSource?.length
          ? <Pagination siblingCount={0} current={currentPage} count={Math.ceil(originDataSource?.length / 10)} onChange={handlePageChange} />
          : null
      }
    </View>
  )
}

export default TableBox
