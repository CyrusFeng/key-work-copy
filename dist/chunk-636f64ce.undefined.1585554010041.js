(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-636f64ce"],{7960:function(t,a,e){},"927f":function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"wrapper"},[e("div",{ref:"container",staticClass:"bg"},[e("div",{staticClass:"wrap"},t._l(t.options,function(a){return e("div",{staticClass:"block"},[e("div",{staticClass:"row"},[e("div",{staticClass:"label"},[t._v("代审批人")]),e("div",{staticClass:"right yunzhijia"},[e("span",[t._v(t._s(a.terName||"请选择"))]),e("i",{staticClass:"icon",on:{click:function(e){return t.onClickToChooseReplace(a)}}})])]),e("div",{staticClass:"row"},[t._m(0,!0),e("div",{staticClass:"right"},[e("c-select",{attrs:{orgRange:t.sourceArr,defaultValue:"zzz"},on:{"update:itemObj":function(e){return t.chooseSource(e,a)}}})],1)]),e("div",{staticClass:"row"},[t._m(1,!0),e("div",{staticClass:"right yunzhijia"},[e("span",[t._v(t._s(a.startDate)+"~"+t._s(a.endDate))]),e("i",{staticClass:"icon",on:{click:function(e){return t.selectDate("during",a)}}})]),e("calendar",{attrs:{show:a.showDatePicker,mode:a.model},on:{"update:show":function(e){return t.$set(a,"showDatePicker",e)},change:function(e){return t.onChange(e,a)}}})],1)])}),0)]),e("div",{staticClass:"button-wrap"},[e("div",{staticClass:"btn2",on:{click:t.saveData}},[e("span",[t._v("发送")])])]),e("div",{staticClass:"btn",on:{click:t.addOption}},[e("span",{staticClass:"icon"},[t._v("添加")])]),e("FullPageLoading",{attrs:{loading:t.loading}}),e("FullPageLoading",{attrs:{loading:t.loading1}}),e("FullPageLoading",{attrs:{loading:t.loading2}}),e("StatePage",{attrs:{success:t.success,tipVisible:t.tipVisible,tipFailedDesc:t.tipFailedDesc,"jump-to":t.pathname},on:{"update:tipVisible":function(a){t.tipVisible=a}}})],1)},i=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"label"},[t._v("工作来源 "),e("span",{staticClass:"star"},[t._v("*")])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"label"},[t._v("日期范围 "),e("span",{staticClass:"star"},[t._v("*")])])}],n=(e("ac6a"),e("7f7f"),e("bc3a")),o=e.n(n),c=(e("1fba"),e("4328")),r=e.n(c),l={name:"settings",data:function(){return{show:!1,mode:"during",date:"",sourceArr:[],options:[],scorll:null,loading:!1,loading1:!1,loading2:!1,chairmanId:"",chairmanName:"",success:!1,tipVisible:!1,pathname:"rulesList",tipFailedDesc:""}},beforeRouteEnter:function(t,a,e){e(function(t){qing.call("setWebViewTitle",{title:"主席委托设置"})})},mounted:function(){var t=this;this.loading=!0,this.$getChairMan().then(function(a){t.chairmanId=a.data.result,console.log(t.chairmanId),t.$getPersonInfoByOpenID(t.chairmanId).then(function(a){var e=a.data.result.data[0];t.chairmanName=e.name,t.loading=!1,t.options.push({berID:t.chairmanId,berName:t.chairmanName,terID:"",terName:"",startDate:"",endDate:"",sourceID:"",showDatePicker:!1,model:"during",isQualified:!0})}).catch(function(){alert("获取主席姓名失败，请重试")})}).catch(function(){alert("获取主席ID失败，请重试")}),this.loading1=!0;var a=this.$url+"/taskSystem/source/list";o.a.get(a,{params:{}}).then(function(a){t.sourceArr=a.data.result,t.sourceArr.unshift({name:"请选择",id:0}),t.loading1=!1}).catch(function(){alert("获取工作来源失败，请重试")})},methods:{selectDate:function(t,a){a.model=t,a.showDatePicker=!0},onChange:function(t,a){"single"===a.model||(a.startDate=t.map(function(t){return t.format("YYYY-MM-DD")})[0],a.endDate=t.map(function(t){return t.format("YYYY-MM-DD")})[1])},onClickToChooseReplace:function(t){qing.call("selectPersons",{isMulti:!1,success:function(a){t.terID=a.data.persons[0].openId,t.terName=a.data.persons[0].name,console.log(JSON.stringify(a.data.persons[0])),console.log(a.data.persons[0].openId),console.log(a.data.persons[0].name)}})},chooseSource:function(t,a){0===t.id?a.sourceID="":a.sourceID=t.id},addOption:function(){this.options.push({berID:this.chairmanId,berName:this.chairmanName,terID:"",terName:"",startDate:"",endDate:"",sourceID:"",showDatePicker:!1,model:"during",isQualified:!0})},saveData:function(){var t=this;this.options.forEach(function(t){t.terID&&t.sourceID&&t.startDate&&t.endDate||(t.isQualified=!1)});var a=[];if(this.options.forEach(function(t){var e=JSON.parse(JSON.stringify(t));e.isQualified&&(delete e.showDatePicker,delete e.model,delete e.isQualified,a.push(e))}),a.length<=0)alert("有未填项，请检查");else{var e=this.$url+"/taskSystem/rule/saveRelpace";this.loading2=!0,o()({method:"post",url:e,headers:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"},data:r.a.stringify({jsonStr:JSON.stringify(a)})}).then(function(a){t.loading2=!1,t.tipVisible=!0,!0===a.data.success?t.success=!0:(t.tipFailedDesc=a.data.outerMessage,t.success=!1)})}}}},u=l,d=(e("a275"),e("2877")),h=Object(d["a"])(u,s,i,!1,null,"7ffa488b",null);a["default"]=h.exports},a275:function(t,a,e){"use strict";var s=e("7960"),i=e.n(s);i.a}}]);