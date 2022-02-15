import Taro from '@tarojs/taro'

Taro.cloud.init()
const db = Taro.cloud.database()
const educationCollection = db.collection('education')
const _ = db.command

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
    async getAllDataSource(payload) {
      // educationCollection.where({
      //   userName: _.eq(userInfo[0]),
      //   phone: new RegExp("^\\d+" + userInfo[1] + "$","gim")
      // }).get().then((res) => {
      //   console.log(res)
      // })
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
      const newTotalCount = allData?.filter(item => item.isNew)?.length
      this.setBaseState({
        originDataSource: allData,
        totalCount: allData?.length || 0,
        newTotalCount: newTotalCount || 0,
      })
    },
    // async openGroup(payload) {
    //   // this.setBaseState({
    //   //   addStatus: false
    //   // })
    //   // if (payload.isOpenGroup === true) {
    //   //   educationCollection.add(
    //   //     {
    //   //       data: {
    //   //         ...payload,
    //   //         timestamp: new Date().getTime(),
    //   //       },
    //   //       success: function(res) {
    //   //         this.setBaseState({
    //   //           addStatus: true
    //   //         })
    //   //       }
    //   //     }
    //   //   )
    //   // } else {
    //   //   // const userInfo = payload.grouperUserName.split('+')
    //   //   // educationCollection.where({
    //   //   //   userName: _.eq(userInfo[0]),
    //   //   //   phone: new RegExp("^\\d+" + userInfo[1] + "$","gim")
    //   //   // }).get().then((res) => {
    //   //   //   console.log(res)
    //   //   // })
    //   // }
    // },
  }),
};