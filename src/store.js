import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    catchList:[],
    roles: [],
    currentRole:-1,
    openID: '',
    name: '',
    avatarUrl:'',
    sourceIDs:[],
    taskType:'',
    //当前用户直属领导
    leaderOpenID:'',
    leaderName:'',
    leaderAvatarUrl:'',
    //当前用户所在单位
    unitID:'',
    unitName:'',
    currentBtnIndex:0,
    currentTabIndex:0,
    currentTabIndex1:0,
    currentTabIndex2:0,
    allowBack:true,
    currentBtnIndexDetail:0,
    taskDetailObj:{},
    proccessDetailObj:{},
    lifeArr:[],
    fromName:'',
    isFromRanking:0,
    othersOpenID:'',
    leaderArr:[],
    showBtn:false,//是否显示重点工作详情按钮栏
    listPersonName:''
  },
  getters:{
    currentRole(state){
      if(state.currentRole===-1){
        state.currentRole = Number(sessionStorage.getItem('currentRole'))
      }
      return state.currentRole
    },
    taskDetailObj(state){
      console.log('JSON.stringify(state.taskDetailObj)',JSON.stringify(state.taskDetailObj))
      if(JSON.stringify(state.taskDetailObj)==='{}'){
        state.taskDetailObj = JSON.parse(sessionStorage.getItem('taskDetailObj'))
      }
      return state.taskDetailObj
    },
    processDetailObj(state){
      if(JSON.stringify(state.proccessDetailObj)==='{}'){
        state.proccessDetailObj = JSON.parse(sessionStorage.getItem('proccessDetailObj'))
      }
      return state.proccessDetailObj
    },
    taskType(state){
      if(!state.taskType){
        state.taskType = sessionStorage.getItem('taskType')
      }
      return state.taskType
    },
    openID(state){
      if(!state.openID){
        state.openID = sessionStorage.getItem('openID')
      }
      return state.openID
    },
    isFromRanking(state){
      if(!state.isFromRanking){
        state.isFromRanking = Number(sessionStorage.getItem('isFromRanking'))
      }
      return state.isFromRanking
    },
    othersOpenID(state){
      if(!state.othersOpenID){
        state.othersOpenID = sessionStorage.getItem('othersOpenID')
      }
      return state.othersOpenID
    },
    sourceIDs(state){
      // if(state.sourceIDs.length<=0){
      //   sessionStorage.getItem('sourceIDs').split(',').forEach((sourceID)=>{
      //     state.sourceIDs.push(Number(sourceID))
      //   })
      // }
      // console.log(state.sourceIDs)
      // return state.sourceIDs

      if(!state.sourceIDs){
        state.sourceIDs = sessionStorage.getItem('sourceIDs')
      }
      return state.sourceIDs
    },
    leaderArr(state){
      if(!state.leaderArr){
        state.leaderArr = JSON.parse(sessionStorage.getItem('leaderArr'))
      }
      return state.leaderArr
    },
    leaderOpenID(state){
      if(!state.leaderOpenID){
        state.leaderOpenID = sessionStorage.getItem('leaderOpenID')
      }
      return state.leaderOpenID
    },
    leaderName(state){
      if(!state.leaderName){
        state.leaderName = sessionStorage.getItem('leaderName')
      }
      return state.leaderName
    },
    leaderAvatarUrl(state){
      if(!state.leaderAvatarUrl){
        state.leaderAvatarUrl = sessionStorage.getItem('leaderAvatarUrl')
      }
      return state.leaderAvatarUrl
    },
    unitID(state){
      if(!state.unitID){
        state.unitID = sessionStorage.getItem('unitID')
      }
      return state.unitID
    },
    unitName(state){
      if(!state.unitName){
        state.unitName = sessionStorage.getItem('unitName')
      }
      return state.unitName
    },
    currentBtnIndex(state){
      if(!state.currentBtnIndex){
        state.currentBtnIndex = Number(sessionStorage.getItem('currentBtnIndex'))
      }
      return state.currentBtnIndex
    },
    currentTabIndex(state){
      if(!state.currentTabIndex){
        state.currentTabIndex = Number(sessionStorage.getItem('currentTabIndex'))
      }
      return state.currentTabIndex
    },
    currentTabIndex1(state){
      if(!state.currentTabIndex1){
        state.currentTabIndex1 = Number(sessionStorage.getItem('currentTabIndex1'))
      }
      return state.currentTabIndex1
    },
    currentTabIndex2(state){
      if(!state.currentTabIndex2){
        state.currentTabIndex2 = Number(sessionStorage.getItem('currentTabIndex2'))
      }
      return state.currentTabIndex2
    }
  },
  mutations: {
    setRoles(state, param) {
      state.roles = param
    },
    setCurrentRole(state, param) {
      state.currentRole = param
      sessionStorage.setItem('currentRole',param);
    },
    setOpenID(state, param) {
      state.openID = param
      sessionStorage.setItem('openID',param);
    },
    setName(state, param) {
      state.name = param
    },
    setAvatarUrl(state, param) {
      state.avatarUrl = param
    },
    setSourceIDs(state, param){
      state.sourceIDs = param
      sessionStorage.setItem('sourceIDs',param);
    },
    setTaskType(state, param) {
      state.taskType = param
      sessionStorage.setItem('taskType',param);
    },
    setLeaderOpenID(state, param) {
      state.leaderOpenID = param
    },
    setLeaderName(state, param) {
      state.leaderName = param
    },
    setLeaderAvatarUrl(state, param) {
      state.leaderAvatarUrl = param
    },
    setUnitID(state, param) {
      state.unitID = param
      sessionStorage.setItem('unitID',param);
    },
    setUnitName(state, param) {
      state.unitName = param
      sessionStorage.setItem('unitName',param);
    },
    setCurrentBtnIndex(state, param){
      state.currentBtnIndex = param
      sessionStorage.setItem('currentBtnIndex',param);
    },
    setCurrentTabIndex(state, param){
      state.currentTabIndex = param
      sessionStorage.setItem('currentTabIndex',param);
    },
    setCurrentTabIndex1(state, param){
      state.currentTabIndex1 = param
      sessionStorage.setItem('currentTabIndex1',param);
    },
    setCurrentTabIndex2(state, param){
      state.currentTabIndex2 = param
      sessionStorage.setItem('currentTabIndex2',param);
    },
    setAllowBack(state, param){
      state.allowBack = param
    },
    setCurrentBtnIndexDetail(state, param){
      state.currentBtnIndexDetail = param
    },
    keepAlive(state, component) {
      !state.catchList.includes(component) &&
      state.catchList.push(component)
    },
    noKeepAlive(state) {
      state.catchList = []
    },
    setTaskDetailObj(state, param){
      state.taskDetailObj = param
      sessionStorage.setItem('taskDetailObj',JSON.stringify(param));
    },
    setProcessDetailObj(state,param){
      state.processDetailObj = param
      sessionStorage.setItem('processDetailObj',JSON.stringify(param));
    },
    setLifeArr(state, param){
      state.lifeArr = param
    },
    setFromName(state, param){
      state.fromName = param
    },
    setIsFromRanking(state, param){
      state.isFromRanking = param
      sessionStorage.setItem('isFromRanking',param);
    },
    setOthersOpenID(state, param){
      state.othersOpenID = param
    },
    setLeaderArr(state, param){
      state.leaderArr = param
      sessionStorage.setItem('leaderArr',JSON.stringify(param));
    },
    setShowBtn(state, param){
      state.showBtn = param
    },
    setListPersonName(state, param){
      state.listPersonName = param
    }
  }
})

export default store