const cloud = require('wx-server-sdk')
cloud.init(
  // {
  //   env: 'education-7g0kmbob4972f357'
  // }
)

const xlsx = require('node-xlsx')    //导入Excel类库
const db = cloud.database()   //声明数据库对象
const _ = db.command

exports.main = async () => {
  try {
    let StuInfo = await db.collection('education').get()
    //将获取到的数据对象赋值给变量，接下来需要用该对象向Excel表中添加数据
    let dataCVS = `studentInfo-${Math.floor(Math.random()*1000000000)}.xlsx`
    //声明一个Excel表，表的名字用随机数产生
    let alldata = [];
    let row = ['姓名', '年龄', '校区', '联系电话', '报名时间', '新生老生', '是否团长', '参团人数'];
    //表格的属性，也就是表头说明对象
    alldata.push(row);  //将此行数据添加到一个向表格中存数据的数组中
    //接下来是通过循环将数据存到向表格中存数据的数组中
    for (let key = 0; key<StuInfo.data.length; key++) {
      let arr = [];
      arr.push(StuInfo.data[key].userName);
      arr.push(StuInfo.data[key].age);
      arr.push(StuInfo.data[key].school);
      arr.push(StuInfo.data[key].phone);
      arr.push(StuInfo.data[key].time);
      arr.push(StuInfo.data[key].isNew ? '新生' : '老生');
      arr.push(StuInfo.data[key].isGroupLeader ? '是' : '否');
      arr.push(StuInfo.data[key].count);
      alldata.push(arr)
    }
    var buffer = await xlsx.build([{   
      name: "聆思教育参团报名表",
      data: alldata
    }]); 
    //将表格存入到存储库中并返回文件ID
    return await cloud.uploadFile({
      cloudPath: dataCVS,
      fileContent: buffer, //excel二进制文件
    })
  } catch (error) {
      console.error(error)
  }
}

