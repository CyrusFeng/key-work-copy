function getYearMonthDay(date) {
  let year = date.getFullYear()
  let month = date.getMonth()
  let day = date.getDate()
  return [year, month, day]
}

function getYearMonthDayAddOneDay(date) {
  // date.setDate(date.getDate+1)
  let newdate = new Date(new Date(date).setDate(date.getDate() + 1))
  // console.log(new Date(newdate))

  let year = newdate.getFullYear()
  let month = newdate.getMonth()
  let day = newdate.getDate()
  return [year, month, day]
}

function getYearMonthDayString(date) {
  let year = date.getFullYear()
  let month = date.getMonth()
  let day = date.getDate()
  let actualMonth = month + 1
  let newMonth = ''
  let newDay = ''
  if (actualMonth < 10) {
    newMonth = '0' + actualMonth
  } else {
    newMonth = '' + actualMonth
  }
  if (day < 10) {
    newDay = '0' + day
  } else {
    newDay = '' + day
  }
  return `${year}-${newMonth}-${newDay}`
}
function getYearMonthDayHMSString(date,which) {
  let year = date.getFullYear()
  let month = date.getMonth()
  let day = date.getDate()
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();

  let actualMonth = month + 1
  let newMonth = ''
  let newDay = ''
  let newHour = ''
  let newMinute = ''
  let newSecond = ''

  if (actualMonth < 10) {
    newMonth = '0' + actualMonth
  } else {
    newMonth = '' + actualMonth
  }
  if (day < 10) {
    newDay = '0' + day
  } else {
    newDay = '' + day
  }
  if (hour < 10) {
    newHour = '0' + hour
  } else {
    newHour = '' + hour
  }
  if (minute < 10) {
    newMinute = '0' + minute
  } else {
    newMinute = '' + minute
  }
  if (second < 10) {
    newSecond = '0' + second
  } else {
    newSecond = '' + second
  }

  if(which==='start'){
    return `${year}-${newMonth}-${newDay} 00:00:00`
  }else if(which==='end'){
    return `${year}-${newMonth}-${newDay} 23:59:59`
  }else{
    return `${year}-${newMonth}-${newDay} ${newHour}:${newMinute}:${newSecond}`
  }
}

function getYearMonthDayStringAddOneDay(date) {
  let [year, month, day] = getYearMonthDayAddOneDay(date)
  // let year = date.getFullYear()
  // let month = date.getMonth()
  // let day = date.getDate()
  let actualMonth = month + 1
  let newMonth = ''
  let newDay = ''
  if (actualMonth < 10) {
    newMonth = '0' + actualMonth
  } else {
    newMonth = '' + actualMonth
  }
  if (day < 10) {
    newDay = '0' + day
  } else {
    newDay = '' + day
  }
  return `${year}-${newMonth}-${newDay}`
}

function compareDate(date1,date2){
  if(!date1){
    return false
  }
  if(!date2){
    return false
  }
  if(typeof date1 === 'string'){
    date1 = date1.replace(/-/g,'/')
  }
  if(typeof date2 === 'string'){
    date2 = date2.replace(/-/g,'/')
  }
  let oDate1 = new Date(date1);
  let oDate2 = new Date(date2);

  if(oDate1.getTime() >= oDate2.getTime()){
    return true
  } else {
    return false
  }
}

export default {
  getYearMonthDay,
  getYearMonthDayString,
  getYearMonthDayHMSString,
  getFirstDateOfMonth(date) {
    let [year, month, day] = getYearMonthDay(date)
    return this.getYearMonthDayString(new Date(year, month, 1))
  },
  getFirstDateOfMonthHMS(date) {
    let [year, month, day] = getYearMonthDay(date)
    return this.getYearMonthDayHMSString(new Date(year, month, 1),'start')
  },
  getLastDateOfMonth(date) {
    let [year, month, day] = getYearMonthDay(date)
    return this.getYearMonthDayString(new Date(year, month + 1, 1))
  },
  getLastDateOfMonthHMS(date) {
    let [year, month, day] = getYearMonthDay(date)
    return this.getYearMonthDayHMSString(new Date(year, month + 1, 0),'end')
  },


  getFirstDateOfYear(date) {
    let [year, month, day] = getYearMonthDay(date)
    return this.getYearMonthDayString(new Date(year, 0, 1))
  },
  getFirstDateOfYearHMS(date) {
    let [year, month, day] = getYearMonthDay(date)
    return this.getYearMonthDayHMSString(new Date(year, 0, 1),'start')
  },

  getLastDateOfYear(date) {
    let [year, month, day] = getYearMonthDay(date)
    return this.getYearMonthDayString(new Date(year + 1, 0, 1))
  },
  getLastDateOfYearHMS(date) {
    let [year, month, day] = getYearMonthDay(date)
    return this.getYearMonthDayHMSString(new Date(year + 1, 0, 0),'end')
  },

  compareDate,
  getLastDateOfMonthReal(date) {
    let [year, month, day] = getYearMonthDay(date)
    return this.getYearMonthDayString(new Date(year, month + 1, 0))
  },
  getLastDateOfYearReal(date) {
    let [year, month, day] = getYearMonthDay(date)
    return this.getYearMonthDayString(new Date(year + 1, 0, 0))
  },
}


// 变更和废止按钮的展示逻辑
// app.filter('getCharger', function() { //可以注入依赖
//   return function(text) {
//     // 传入的是循环life时候的life对象
//     var msg = '';
//     if(text == '' || text == undefined || text == null){
//     }
//     else{
//       var thisObj = text;
//       if(thisObj.createtime != undefined){
//         msg = detailDataSour.chargerName;
//         for(var i =0 ;i < detailDataSour.taskLifeList.length;i ++){
//           if(detailDataSour.taskLifeList[i].type == 2 && detailDataSour.taskLifeList[i].state == 3){
//
//             var innerObj = JSON.parse(detailDataSour.taskLifeList[i].change_info);
//             if(innerObj.after.chargerID != undefined && innerObj.after.chargerID != null){
//
//               if(thisObj.createtime <= detailDataSour.taskLifeList[i].createtime){
//                 msg = innerObj.before.chargerName;
//               }
//             }
//           }
//         }
//       }
//     }
//     return msg;
//   }
// });