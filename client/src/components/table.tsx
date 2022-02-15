import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Taro from '@tarojs/taro'
import { View, Text, Input } from '@tarojs/components'
import './table.less'
import Table from 'taro3-table';
import { Pagination, Dialog } from "@taroify/core"

const TableBox = function (props) {
  const dispatch: { education: any } = useDispatch()
  const state = useSelector((state: { education: any }) => state.education)

  const {
    originDataSource,
    totalCount,
  } = state

  const [searchValue, setSearchValue] = useState('')
  const [curDataSourceList, setCurDataSource]:any = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  // useEffect(() => {
  //   if (!originDataSource?.length) return
  //   const newList = []
  //   const copyList = [...originDataSource]

  //   if (searchValue) {
  //     setCurrentPage(1)
  //     originDataSource?.map(item => {
  //       if (item.userName.includes(searchValue)) {
  //         newList.push(item)
  //       }
  //     })
  //     setCurDataSource(newList.splice(0, 10))
  //   } else {
  //     setCurDataSource(copyList.splice(0, 10))
  //   }
  // }, [searchValue])

  useEffect(() => {
    if (!originDataSource?.length) return
    const copyList = [...originDataSource]
    setCurDataSource(copyList.splice((currentPage -1) * 10, currentPage * 10))
  }, [currentPage, originDataSource])

  const columns = [
    {
      title: '编号',
      dataIndex: 'index',
      width: '20%',
      render: (text, record, index) => {
        return (index + 1) + 10 * (currentPage - 1)
      }
    },
    {
      title: '团长姓名',
      dataIndex: 'userName',
      width: '20%',
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
      width: "20%",
      render: text => text || 1
    },
    {
      title: '参团',
      dataIndex: 'inGroup',
      width: '20%',
      render: () => {
        return (<Text
          style="
            cursor: pointer;
            color: white;
            font-size: 12px;
            min-width: 40px;
            margin-left: 10px;
            background: rgb(0, 178,35);
            border-radius: 2px;
            display: block;

          "
          onClick={() => {
          if (!props.curUserInfo) {
            Dialog.alert("请先点击《我要参团》填写报名所需信息！")
          }
        }}>参团</Text>)
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
          if (item.userName.includes(searchValue)) {
            newList.push(item)
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
          ? <Pagination siblingCount={0} current={currentPage} count={Math.ceil(totalCount / 10)} onChange={handlePageChange} />
          : null
      }
    </View>
  )
}

export default TableBox