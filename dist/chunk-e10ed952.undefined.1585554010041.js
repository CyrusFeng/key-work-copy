(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e10ed952"],{"3dfb":function(e,t,s){"use strict";var n=s("82d3"),r=s.n(n);r.a},"82d3":function(e,t,s){},e410:function(e,t,s){"use strict";s.r(t);var n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"bg"},[s("div",{staticClass:"wrap"},[e.roles.length>0?s("div",{staticClass:"item-wrap",on:{click:function(t){return e.choose(0)}}},[s("i",{staticClass:"icon"}),s("span",[e._v("个人")])]):e._e(),e._l(e.roles,function(t){return s("div",{staticClass:"item-wrap",on:{click:function(s){return e.choose(t)}}},[s("i",{staticClass:"icon"}),0===t?s("span",[e._v("个人")]):e._e(),1===t?s("span",[e._v("主席")]):e._e(),2===t?s("span",[e._v("系统管理员")]):e._e(),3===t?s("span",[e._v("办事员")]):e._e(),4===t?s("span",[e._v("业务管理员")]):e._e()])})],2)])},r=[],o={name:"entry",data:function(){return{currentRole:-1}},beforeRouteEnter:function(e,t,s){qing.call("setWebViewTitle",{title:"角色选择"}),s()},created:function(){this.currentRole=this.$store.getters.currentRole,this.roles=this.$store.state.roles,localStorage.setItem("keepShowResultOpen","0")},methods:{chooseBSY:function(){this.$store.commit("setCurrentRole",3),this.$router.push({name:"clerkIndex"})},chooseGLY:function(){this.$store.commit("setCurrentRole",2)},chooseGR:function(){this.$store.commit("setCurrentRole",0),this.$router.push({name:"index"})},choose:function(e){switch(this.$store.commit("setCurrentRole",e),e){case 0:this.$router.push({name:"index"});break;case 1:this.$router.push({name:"chairmanIndex"});break;case 2:this.$router.push({name:"source-admin-index"});break;case 3:this.$router.push({name:"clerkIndex"});break;case 4:this.$router.push({name:"source-admin-index"});break;default:break}},jumpTo:function(){this.$store.commit("setCurrentRole",0),this.$router.push({name:"index"})}}},i=o,a=(s("3dfb"),s("2877")),c=Object(a["a"])(i,n,r,!1,null,"de8aac90",null);t["default"]=c.exports}}]);