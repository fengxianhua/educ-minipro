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

  render() {
    return <Provider store={init({ models })}>
      {this.props.children}
    </Provider>
  }
}

export default App
