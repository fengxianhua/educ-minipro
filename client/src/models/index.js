import Taro from '@tarojs/taro'

Taro.cloud.init()
const db = Taro.cloud.database()
const educationCollection = db.collection('education')
const _ = db.command

const getNewStudents = (data, count = 0) => {
  data.map(item => {
    if (item.isNew) {
      count += 1
    }
    if (item.members?.length) {
      getNewStudents(data, count)
    }
    return count
  })
}

const fillZero = (value) => {
  return value < 10 ? (`0${value}`) : value
}
const dateFormat = (timestamp, formatStr) => {
  if (!timestamp) return undefined
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = fillZero(date.getMonth() + 1)
  const day = fillZero(date.getDate())
  const hour = fillZero(date.getHours())
  const minute = fillZero(date.getMinutes())
  const second = fillZero(date.getSeconds())

  return formatStr
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hour)
    .replace('mm', minute)
    .replace('ss', second)
}

export const education = {
  state: {
    originDataSource: null,
    totalCount: 0,
    newTotalCount: 0, // 新生
    addStatus: null, //新增状态
  },
  reducers: {
    setBaseState (state, res) {
      return { ...state, ...res }
    },
  },
  effects: (dispatch) => ({
    async getAllDataSource() {
      // 先取出集合记录总数
      const countResult = await educationCollection.count()
      const total = countResult.total
      // 计算需分几次取
      const batchTimes = Math.ceil(total / 100)
      // 承载所有读操作的 promise 的数组
      const tasks = []
      for (let i = 0; i < batchTimes; i++) {
        const promise = educationCollection.skip(i * 20).limit(20).get()
        tasks.push(promise)
      }
      // 等待所有
      const allData = (await Promise.all(tasks)).reduce((acc, cur) => {
        return acc.data.concat(cur.data)
      }).data
      const totalCount = allData.map(item => item.count).reduce((acc, cur) => acc + cur)
      const newTotalCount = allData.map(item => item.newCount).reduce((acc, cur) => acc + cur)
      this.setBaseState({
        originDataSource: allData,
        totalCount: totalCount || 0,
        newTotalCount: newTotalCount || 0,
      })
    },
    async openGroup(payload) {
      this.setBaseState({
        addStatus: null
      })
      if (payload.isOpenGroup === true) {
        educationCollection.add(
          {
            data: {
              ...payload,
              count: 1,
              newCount: payload.isNew ? 1 : 0,
              members: [],
              time: dateFormat(new Date().getTime(), 'YYYY-MM-DD HH:mm:ss'),
            }
          }
        ).then((res) => {
          console.log(res)
          this.setBaseState({
            addStatus: true
          })
          this.getAllDataSource()
        }).catch(console.error)
      } else {
        const userInfo = payload.grouperUserName[0].split('-')
        educationCollection.where({
          userName: _.eq(userInfo[0]),
          // phone: new RegExp("^\\d+" + userInfo[1] + "$","gim")
        })
          .update({
            data: {
              members: _.push({
                ...payload,
                time: dateFormat(new Date().getTime(), 'YYYY-MM-DD HH:mm:ss'),
              }),
              count: _.inc(1),
              newCount: _.inc(payload.isNew ? 1 : 0),
            }
          })
          .then((res) => {
            console.log(res)
            this.setBaseState({
              addStatus: true
            })
            this.getAllDataSource()
          }).catch(console.error)
      }
    },
  }),
};