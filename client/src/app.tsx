import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { Provider } from 'react-redux'
import { init } from '@rematch/core'
import * as models from './models'
import './app.less'

class App extends Component {
  props: any

  componentDidMount () {
    if (process.env.TARO_ENV === 'weapp') {
      Taro.cloud.init()
    }
  }

  onShareAppMessage (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '聆思教育开团啦！',
      path: 'pages/index/index'
    }
  }


  render() {
    return <Provider store={init({ models })}>
      {this.props.children}
    </Provider>
  }
}

export default App
