(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5c9f15f4"],{4098:function(t,a,s){"use strict";var e=s("ea9e"),i=s.n(e);i.a},"77b2":function(t,a,s){"use strict";s.r(a);var e=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticStyle:{height:"100%","background-color":"#fff"}},[s("div",{ref:"wrapper",staticClass:"scroll-wrap"},[s("div",{staticClass:"list-wrap"},[s("div",{staticClass:"block field"},[s("div",{staticClass:"title-wrap"},[s("field-title",{attrs:{"blueline-visible":!1,"redstar-visible":!1}},[t._v(t._s(t.detailObj.projectName))]),s("span",{staticClass:"status"},[t._v(t._s(t.getLifeType(t.detailObj.type)))])],1),s("div",{staticClass:"content content1",class:{folded:!t.folded}},[s("div",{staticClass:"row"},[s("div",{staticClass:"label"},[t._v("责任人")]),s("div",{staticClass:"right"},[t._v(t._s(t.detailObj.chargerName))])]),s("div",{staticClass:"row"},[s("div",{staticClass:"label"},[t._v("工作来源")]),t.detailObj.sourceList&&t.detailObj.sourceList[0]?s("div",{staticClass:"right"},[t._v("\n                            "+t._s(t.detailObj.sourceList[0].name)+"\n                        ")]):t._e()]),s("div",{staticClass:"row"},[s("div",{staticClass:"label"},[t._v("启动时间")]),s("div",{staticClass:"right"},[t._v(t._s(t.detailObj.starttime&&t.detailObj.starttime.split(" ")[0]))])]),s("div",{staticClass:"row"},[s("div",{staticClass:"label"},[t._v("完成时间")]),s("div",{staticClass:"right"},[t._v(t._s(t.detailObj.endtime&&t.detailObj.endtime.split(" ")[0]))])]),s("div",{staticClass:"row"},[s("div",{staticClass:"label"},[t._v("单位")]),s("div",{staticClass:"right"},[t._v(t._s(t.detailObj.unitName))])]),s("div",{staticClass:"row"},[s("div",{staticClass:"label"},[t._v("签发人")]),s("div",{staticClass:"right"},[t._v(t._s(t.detailObj.signerName))])]),s("div",{staticClass:"row"},[s("div",{staticClass:"label"},[t._v("协助人")]),s("div",{staticClass:"right"},[t._v(t._s(t.detailObj.helperName))])]),s("div",{staticClass:"row"},[s("div",{staticClass:"label"},[t._v("变更次数")]),s("div",{staticClass:"right"},[t._v(t._s(t.detailObj.changeTimes))])])]),s("div",{staticClass:"bottom"},[s("div",{on:{click:function(a){t.folded=!t.folded}}},[t.folded?s("p",[s("span",[t._v("展开")]),s("i",{staticClass:"icon"})]):s("p",{staticClass:"unfolded"},[s("span",[t._v("收起")]),s("i",{staticClass:"icon"})])])])]),2===t.detailObj.type?[s("div",{staticClass:"block field"},[s("div",{staticClass:"title-wrap"},[s("field-title",{attrs:{"blueline-visible":!1,"redstar-visible":!1}},[t._v("变更内容\n                        ")])],1),s("div",{staticClass:"content content2"},[s("div",{staticClass:"row"},[s("div",{staticClass:"top"},[s("div",{staticClass:"label"},[t._v("完成日期")]),s("div",{staticClass:"right"},[t._v(t._s(t.detailObj.endtime&&t.detailObj.endtime.split(" ")[0]))])]),s("div",{staticClass:"bottom"},[s("div",{staticClass:"label"},[t._v("变更为")]),s("div",{staticClass:"right",on:{click:function(a){t.isVisible1=!t.isVisible1}}},[s("span",[t._v(t._s(t.endtime||"请选择"))])])])]),s("div",{staticClass:"row"},[s("div",{staticClass:"top"},[s("div",{staticClass:"label"},[t._v("单位")]),s("div",{staticClass:"right"},[t._v(t._s(t.detailObj.unitName))])]),s("div",{staticClass:"bottom"},[s("div",{staticClass:"label"},[t._v("变更为")]),s("div",{staticClass:"right yunzhijia"},[s("span",[t._v(t._s(t.unitName||"请选择"))]),s("i",{staticClass:"icon",on:{click:t.onClickToChooseCompany}})])])]),s("div",{staticClass:"row"},[s("div",{staticClass:"top"},[s("div",{staticClass:"label"},[t._v("责任人")]),s("div",{staticClass:"right"},[t._v(t._s(t.detailObj.chargerName))])]),s("div",{staticClass:"bottom"},[s("div",{staticClass:"label"},[t._v("变更为")]),s("div",{staticClass:"right yunzhijia"},[s("span",[t._v(t._s(t.chargerName||"请选择"))]),s("i",{staticClass:"icon",on:{click:t.onClickToChooseCharger}})])])]),s("div",{staticClass:"row"},[s("div",{staticClass:"top"},[s("div",{staticClass:"label"},[t._v("协助人")]),s("div",{staticClass:"right"},[t._v(t._s(t.detailObj.helperName))])]),s("div",{staticClass:"bottom"},[s("div",{staticClass:"label"},[t._v("变更为")]),s("div",{staticClass:"right yunzhijia"},[s("span",[t._v(t._s(t.helperName||"请选择"))]),s("i",{staticClass:"icon",on:{click:t.onClickToChooseHelper}})])])])])]),s("div",{staticClass:"block"},[s("div",{staticClass:"title-wrap"},[s("field-title",{attrs:{"blueline-visible":!1,"redstar-visible":!1}},[t._v("预期目标")])],1),s("div",{staticClass:"text"},[s("div",{staticClass:"word"},[t._v(t._s(t.detailObj.aim))]),s("c-textarea",{attrs:{"default-value":t.aim,remark:"",tips:"请输入变更内容"},on:{"update:inputValue":function(a){t.aim=a}}})],1)]),s("div",{staticClass:"block"},[s("div",{staticClass:"title-wrap"},[s("field-title",{attrs:{"blueline-visible":!1,"redstar-visible":!1}},[t._v("变更原因")])],1),s("div",{staticClass:"text"},[s("c-textarea",{attrs:{"default-value":"",remark:"",tips:"请输入变更原因"},on:{"update:inputValue":function(a){t.change_reason=a}}})],1)])]:t._e(),s("div",{staticClass:"block picture"},[s("div",{staticClass:"title-wrap"},[s("div",[s("field-title",{attrs:{"blueline-visible":!0,"redstar-visible":!1}},[t._v("附件")]),s("span",{staticClass:"sub-des"},[t._v("共"+t._s(t.urlObj.length)+"张")])],1),s("i",{staticClass:"icon",on:{click:t.onClickToChooseImage}})]),s("div",{staticClass:"des-wrap images"},t._l(t.urlObj,function(a){return s("div",{staticClass:"i1 pic-wrapper",on:{click:function(s){return t.onClickImage(a.url)}}},[s("div",{staticClass:"img-wrap"},[s("img",{staticClass:"picture",attrs:{src:a.url,alt:""}})])])}),0)]),s("div",{staticClass:"block"},[s("div",{staticClass:"title-wrap"},[s("field-title",{attrs:{"blueline-visible":!1,"redstar-visible":!1}},[t._v("审批信息")])],1),s("div",{staticClass:"des-wrap"},[s("div",{staticClass:"timeline"},[s("div",{staticClass:"item-wrap"},t._l(t.detailObj.lifePointList,function(a){return s("div",{staticClass:"item"},[s("div",{staticClass:"top"},[s("span",{staticClass:"status"},[t._v(t._s(a.approverName))]),s("span",{staticClass:"date"},[t._v(t._s(t.getPointStatus(a.state)))])]),s("div",{staticClass:"content-wrap"}),s("div",{staticClass:"bottom"},[s("div",{staticClass:"charger"},[s("span",[t._v(t._s(a.approveTime))])])])])}),0)])])])],2)]),s("div",{staticClass:"button-wrap"},[s("div",{staticClass:"btn1",on:{click:t.onClickToSave}},[s("span",[t._v("发送")])]),t._m(0)]),s("nut-datepicker",{attrs:{"is-visible":t.isVisible1,type:"date",title:"请选择日期","is-show-chinese":!1,defaultValue:t.today,endDate:"2199-10-05"},on:{close:function(a){return t.switchPicker("isVisible1")},choose:t.setChooseValue1}}),s("image-panel",{attrs:{url:t.imageUrl,showImagePanel:t.showImagePanel},on:{"update:showImagePanel":function(a){t.showImagePanel=a},"update:show-image-panel":function(a){t.showImagePanel=a}}}),s("StatePage",{attrs:{success:t.success,tipVisible:t.tipVisible},on:{"update:tipVisible":function(a){t.tipVisible=a}}}),s("FullPageLoading",{attrs:{loading:t.loading}})],1)},i=[function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"btn2"},[s("span",[t._v("删除")])])}],l=(s("28a5"),s("ac6a"),s("7f7f"),s("e0eb")),r=s("bc3a"),c=s.n(r),n=s("4328"),o=s.n(n),d={name:"reject-retry",data:function(){return{detailObj:{},folded:!0,urlObj:[],scroll:null,loading:!1,isVisible1:!1,tipVisible:!1,success:!1,imageUrl:void 0,showImagePanel:!1,today:l["a"].getYearMonthDayString(new Date),endtime:"",unitName:"",unitID:"",chargerID:"",chargerName:"",helperID:"",helperName:"",aim:"",change_reason:"",newChangeInfoObj:{},approverID:"",approverAvatarUrl:"",approverName:""}},beforeRouteEnter:function(t,a,s){s(function(t){if("processcenter"===a.name){var s=t.$route.params.detailObj;console.log(s),t.detailObj=JSON.parse(s),null!=t.detailObj&&"{}"!==JSON.stringify(t.detailObj)&&localStorage.setItem("rejectRetry_detailObj",JSON.stringify(t.detailObj))}else t.detailObj=JSON.parse(localStorage.getItem("rejectRetry_detailObj"));t.detailObj.imgs&&t.detailObj.imgs.length>0&&(t.urlObj=[],t.detailObj.imgs.split(",").forEach(function(a){t.urlObj.push({url:a})})),console.log("vm.detailObj.change_info",t.detailObj.change_info);var e={};e="string"===typeof t.detailObj.change_info?JSON.parse(t.detailObj.change_info):t.detailObj.change_info,console.log(e),t.endtime=e.after.endtime,t.unitID=e.after.unitID,t.unitName=e.after.unitName,t.chargerID=e.after.chargerID,t.chargerName=e.after.chargerName,t.helperID=e.after.helperID,t.helperName=e.after.helperName,t.aim=e.after.aim,t.newChangeInfoObj={before:{endtime:e.after.endtime,unitID:e.after.unitID,unitName:e.after.unitName,chargerID:e.after.chargerID,chargerName:e.after.chargerName,helperID:e.after.helperID,helperName:e.after.helperName,aim:e.after.aim}};var i=t.detailObj.lifePointList;t.approverID=i[0].approverID,t.approverAvatarUrl=i[0].approverAvatarUrl,t.approverName=i[0].approverName})},mounted:function(){this.$initScroll(this.scroll,this.$refs.wrapper)},beforeDestroy:function(){this.urlObj=[]},methods:{onClickToSave:function(){var t=this;this.newChangeInfoObj.after={endtime:this.endtime||void 0,unitID:this.unitID||void 0,unitName:this.unitName||void 0,chargerID:this.chargerID||void 0,chargerName:this.chargerName||void 0,helperID:this.helperID||void 0,helperName:this.helperName||void 0,aim:this.aim||void 0};var a=[{}];a[0].parentID=this.detailObj.taskID,a[0].type=2,a[0].lifePointList=[{}],a[0].lifePointList[0].index=1,a[0].lifePointList[0].approverID=this.approverID,a[0].lifePointList[0].approverAvatarUrl=this.approverAvatarUrl,a[0].lifePointList[0].approverName=this.approverName,a[0].change_info=JSON.stringify(this.newChangeInfoObj),a[0].change_reason=this.change_reason;var s=this.$url+"/taskSystem/task/life";this.loading=!0,c()({method:"post",url:s,headers:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"},data:o.a.stringify({jsonStr:JSON.stringify(a)})}).then(function(a){t.loading=!1,t.tipVisible=!0,!0===a.data.success?t.success=!0:t.success=!1})},getPointStatus:function(t){var a="";switch(t){case 0:a="待审批";break;case 1:a="审批中";break;case 2:a="通过";break;case 3:a="未通过";break;case 4:a="驳回";break;default:a="";break}return a},getTaskStatus:function(t){switch(t){case 0:this.state="暂存";break;case 1:this.state="新增";break;case 2:this.state="进行中";break;case 3:this.state="已完成";break;case 4:this.state="已废止";break;default:this.state="";break}return this.state},getLifeType:function(t){var a="";switch(t){case 1:a="新增";break;case 2:a="变更";break;case 3:a="完结";break;case 4:a="废止";break;case 5:a="反馈";break;case 6:a="传阅";break;default:a="";break}return a},switchPicker:function(t){console.log(222),this["".concat(t)]=!this["".concat(t)],console.log(this["".concat(t)])},setChooseValue1:function(t){this.endtime=t[3]},onClickToChooseCompany:function(){var t=this;qing.call("selectOrgs",{isMulti:!1,success:function(a){t.unitID=a.data.orgs[0].orgId,t.unitName=a.data.orgs[0].orgName}})},onClickToChooseCharger:function(){var t=this;qing.call("selectPersons",{isMulti:!1,success:function(a){t.chargerID=a.data.persons[0].openId,t.chargerName=a.data.persons[0].name}})},onClickToChooseHelper:function(){var t=this,a=[],s=[];qing.call("selectPersons",{isMulti:!0,success:function(e){e.data.persons.forEach(function(t){a.push(t.openId),s.push(t.name)}),t.helperID=a.join(","),t.helperName=s.join(",")}})},onClickToChooseImage:function(){var t=this;qing.call("chooseImage",{type:"camera",needCut:!1,isMulti:!0,maxSelectCount:9,showOrigin:!1,success:function(a){a.data.localIds.forEach(function(a){qing.call("uploadImage",{localId:a,isShowProgressTips:1,success:function(a){if("true"===a.success||!0===a.success){var s=a.data.serverId;t.urlObj.push({url:"https://yunzhijia.com//openfile/download/media/".concat(s),showLoading:!0})}else alert("图片上传失败，请重试")}})})}})}}},v=d,u=(s("4098"),s("2877")),h=Object(u["a"])(v,e,i,!1,null,"14c05db9",null);a["default"]=h.exports},ea9e:function(t,a,s){}}]);