import React,{ useState, useEffect,useCallback }  from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Input } from '@tarojs/components'
import './table.less'
import Table from 'taro3-table';
import { Pagination, Dialog } from "@taroify/core"
import "@taroify/core/pagination/style"
import "@taroify/core/dialog/style"

const db = Taro.cloud.database()
const educationCollection = db.collection('education')
const _ = db.command

const TableBox = function (props) {
  const [searchValue, setSearchValue] = useState('')
  const [dataSourceList, setDataSource] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    if (searchValue) {
      educationCollection.where({
        userName: _.eq(searchValue)
        }).skip((currentPage - 1) * 10).limit(10).get().then(({data}) => {
          if (data?.length) {
            setDataSource(data)
          }
        })
    }
    educationCollection.skip((currentPage - 1) * 10).limit(10).get().then(({data}) => {
      if (data?.length) {
        setDataSource(data)
      }
    })
  }, [currentPage, searchValue])

  
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
    },
    {
      title: '参团',
      dataIndex: 'inGroup',
      width: '20%',
      render: (text, record) => {
        return (<Text style="color: red;cursor: pointer;" onClick={() => {
          if (!props.curUserInfo) {
            Dialog.alert("请先点击《我要参团》填写报名所需信息！")
          }
        }}>参团</Text>)
      }
    },
]
  const handleSearch = useCallback(
    () => {
      if (searchValue !== '') {
        educationCollection.where({
          userName: _.eq(searchValue)
        }).get().then(({data}) => {
          if (data?.length) {
            setDataSource(data)
          }
        })
      } else {
        educationCollection.get().then(({data}) => {
          if (data?.length) {
            setDataSource(data)
          }
        })
      }
    },
    [searchValue],
  )
  const handlePageChange = useCallback(
    (page) => {
      if (page === currentPage) return
      setCurrentPage(page)
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
        dataSource={dataSourceList}
      />
      {
        dataSourceList?.length
          ? <Pagination siblingCount={0} current={currentPage} count={dataSourceList?.length} onChange={handlePageChange} />
          : null
      }
    </View>
  )
}

export default TableBox