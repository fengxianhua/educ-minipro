import React,{ useState, useEffect,useCallback }  from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Input } from '@tarojs/components'
import './table.less'
import Table from 'taro3-table';

const TableBox = function (props) {
  const [searchValue, setSearchValue] = useState('')
  const [dataSourceList, setDataSource] = useState([])
  const [originDataSource, setOriginDataSource] = useState([])
  useEffect(() => {
    props.educationCollection.get().then(({data}) => {
      if (data?.length) {
        setDataSource(data)
        setOriginDataSource(data)
        props.setCurDataSource(data)
      }
    })
  }, [])

  const columns = [
    {
      title: '编号',
      dataIndex: 'index',
      width: '20%',
      render: (text, record) => {
        return 1
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
      dataIndex: 'userCount',
      width: "20%",
    },
    {
      title: '参团',
      dataIndex: 'inGroup',
      width: '20%',

    },
]
  const handleSearch = useCallback(
    () => {
      setSearchValue(searchValue)
      if (searchValue !== '') {
      const newDateSource = []
        dataSourceList.map(item => {
          if (item?.userName.includes(searchValue)) {
            newDateSource.push(item)
          }
        })
        setDataSource(newDateSource)
      } else {
        setDataSource(originDataSource)
      }
    },
    [searchValue],
  )
  
  return (
    <View className='table-search-box'>
      <Input className='search-input' type='text' placeholder='请输入要搜索的团长姓名' onConfirm={handleSearch} />
      <Text className='search-btn' onClick={handleSearch}>搜索</Text>
      <Table
        className='table-box'
        columns={columns}
        dataSource={dataSourceList}
      />
      
    </View>
  )
}

export default TableBox