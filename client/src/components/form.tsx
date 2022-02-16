import React, { useState, useCallback, useRef, useMemo, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { Toast, Form, Input, Cell, Divider, Radio, Button, Picker, Popup } from "@taroify/core"
import './form.less'

const FormBox = function () {
  const [formShow, setFormShow] = useState(false)
  const [isOpenGroup, setIsOpenGroup] = useState(false)
  const dispatch: { education: any } = useDispatch()
  const state = useSelector((state: { education: any }) => state.education)
  const selectRef = useRef(null)
  const [selectOpen, setSelectOpen] = useState(false)
  const handleOpenGroup = useCallback(
    () => {
      setIsOpenGroup(true)
      setFormShow(true)
    },
    [],
  )
  const handleJoinGroup = useCallback(
    () => {
      setIsOpenGroup(false)
      setFormShow(true)
    },
    [],
  )

  useEffect(() => {
    if (state.pickedGrouper) {
      setFormShow(true)
      setIsOpenGroup(false)
    }
  }, [state.pickedGrouper])

  useEffect(() => {
    if (state.addStatus) {
      dispatch.education.setBaseState({
        addStatus: null,
        pickedGrouper: null,
      })
      setFormShow(false)
      Toast.success(`${isOpenGroup ? '开团' : '参团'}成功！`)
    }
  }, [state.addStatus])

  const onSubmit = useCallback(({detail: {value}}) => {
    if (!value) return
    let isInGroup = false
    let groupFull = false

    state.originDataSource?.map(item => {
      if (item.userName === value.userName) {
        isInGroup  = true
      }
      if (
        item.isGroupLeader
        && value.userName === item.userName
        && (item.members?.length > 8 || item.count > 8)
        ) {
        groupFull = true
      }
      item?.members.map((member) => {
        if (member.userName === value.userName) {
          isInGroup  = true
        }
      })
    })
    if (isInGroup) {
      return Toast.open('该会员已存在！')
    }
    if (groupFull) {
      return Toast.open('该团人数已满，请重新选择参团团长！')
    }
    if (!value.grouperUserName) {
      value.grouperUserName = [state.pickedGrouper]
    }
    dispatch.education.openGroup({...value, isOpenGroup})
  }, [state.originDataSource, state.pickedGrouper, isOpenGroup])

  const onReset = useCallback(() => {
    dispatch.education.setBaseState({
      pickedGrouper: null,
    })
    setFormShow(false)
  }, [])

  const selectOptions = useMemo(() => {
    return state.originDataSource?.map(item => {
      return <Picker.Option value={`${item.userName}-${(item.phone + '').substring(7)}`} >
        {`${item.userName}-${(item.phone + '').substring(7)}`}
      </Picker.Option>
    })
  }, [state.originDataSource])

  return (
    <View className='form-box' id="openGroupPos">
      <Toast id="toast" />
      {
        formShow
          ?
          <View>
            <Divider style={{ fontSize: "16px", color: "#1989fa", borderColor: "#1989fa", padding: "0 16px" }}>
              请输入个人报名信息*{isOpenGroup ? '开团' : '参团' }*
            </Divider>
            <Form onSubmit={onSubmit} onReset={onReset}>
              <Cell.Group inset style={{ fontSize: 16 }}>
              <Form.Item name="userName" rules={[{ required: true, message: "请填写姓名" }]}>
                <Form.Label>姓名</Form.Label>
                <Form.Control>
                  <Input placeholder="姓名" />
                </Form.Control>
              </Form.Item>
              <Form.Item name="age" rules={[{ required: true, message: "请填写年龄" }]}>
                <Form.Label>年龄</Form.Label>
                <Form.Control>
                  <Input placeholder="年龄" />
                </Form.Control>
              </Form.Item>
              <Form.Item name="phone" rules={[{ required: true, message: "请填写手机号" }]}>
                <Form.Label>手机号</Form.Label>
                <Form.Control>
                  <Input placeholder="手机号" />
                </Form.Control>
                </Form.Item>
                <Form.Item name="isNew" rules={[{ required: true, message: "请选择新生老生" }]}>
                  <Form.Label>老生新生</Form.Label>
                  <Form.Control>
                    <Radio.Group direction="horizontal" defaultValue={'true'}>
                      <Radio name="true">新生</Radio>
                      <Radio name="false">老生</Radio>
                    </Radio.Group>
                  </Form.Control>
                </Form.Item>
                <Form.Item name="school" rules={[{ required: true, message: "请选择校区" }]}>
                  <Form.Label>报名小区</Form.Label>
                  <Form.Control>
                    <Radio.Group direction="horizontal" defaultValue="通泰校区">
                      <Radio name="通泰校区">通泰校区</Radio>
                      <Radio name="锦东校区">锦东校区</Radio>
                    </Radio.Group>
                  </Form.Control>
                </Form.Item>
                {
                  !isOpenGroup
                    ?
                    <View>
                      <Form.Item
                        ref={selectRef}
                        name="grouperUserName"
                        rules={[{ required: true, message: "请选择参团团长" }]}
                        clickable
                        defaultValue={[state.pickedGrouper]}
                      >
                        <Form.Label>请参团团长</Form.Label>
                        <Form.Control>
                          <Input readonly placeholder="点击选择参团团长" onClick={() => setSelectOpen(true)} />
                        </Form.Control>
                      </Form.Item>
                      <Popup mountOnEnter={false} open={selectOpen} rounded placement="bottom" onClose={setSelectOpen}>
                          <Picker
                            onCancel={() => setSelectOpen(false)}
                            onConfirm={(newValue) => {
                              selectRef?.current?.setValue(newValue)
                              setSelectOpen(false)
                            }}
                          >
                            <Picker.Toolbar>
                              <Picker.Button>取消</Picker.Button>
                              <Picker.Button>确认</Picker.Button>
                            </Picker.Toolbar>
                            <Picker.Column>
                              {
                                selectOptions
                              }
                            </Picker.Column>
                          </Picker>
                        </Popup>
                    </View>
                  : null
                }
              </Cell.Group>
              <View style={{ margin: "16px" }}>
                <Button className="form-btn" shape="round" block color="primary" formType="submit">
                  {isOpenGroup ? '开团' : '参团' }信息确认
                </Button>
                <Button className="form-btn" shape="round" block color="primary" formType="reset">
                  放弃
                </Button>
                </View>
            </Form>
          </View>
          : <View>
            <Button onClick={handleOpenGroup} className='btn-open btn'>我要开团</Button>
            <Button onClick={handleJoinGroup} className='btn-join btn'>我要参团</Button>
          </View>
      }
    </View>
  )
}

export default FormBox
