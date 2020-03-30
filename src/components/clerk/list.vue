<template>
    <div class="container" style="height: 100%;">
        <div class="list-container" :class="{'riseup':showSearchResult}">
            <header>
                <change-btn :titleData="btnTitle"
                            @update:currentIndex="getCurrentIndex1($event)"
                            :currentIndex="btnCurrentIndex"></change-btn>
                <i class="icon" v-if="true" @click="openSearch = true"></i>
            </header>
            <!--<taskSearch @update:selected=""-->
            <!--url="http://www.doclever.cn:8090/mock/5c62e01a3dce46264b25bf54/getSupplierMock?keyword="></taskSearch>-->
            <div class="swiper-container first-container swiper-no-swiping">
                <div class="swiper-wrapper">
                    <div class="swiper-slide">
                        <div class="parent-tabwrap">
                            <c-tab :titlebar="titlebar1"
                                   @update:currentIndex="getCurrentIndex2($event)"
                                   :currentIndex="tabCurrentIndex1"></c-tab>
                        </div>

                        <div class="swiper-container second-container swiper-no-swiping">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide">
                                    <div class="list-wrap" ref="wrapper1">
                                        <div class="task">
                                            <div v-for="leaderObj in list1" class="charger-wrap">
                                                <div style="font-size: 12px" class="charger-name">
                                                    <span class="left">{{leaderObj.name}} 共{{leaderObj.taskList.length}}项</span>
                                                    <div class="toggle-bottom" @click="onClickToggle($event,leaderObj)">
                                                        <div>
                                                            <p v-if="!leaderObj.folded">
                                                                <span>收起</span>
                                                                <i class="icon"></i>
                                                            </p>
                                                            <p v-else class="unfolded">
                                                                <span>展开</span>
                                                                <i class="icon"></i>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <router-link
                                                        tag="div"
                                                        class="router-link"
                                                        :class="{folded:leaderObj.folded}"
                                                        v-for="item in leaderObj.taskList"
                                                        :key="item.id"
                                                        :to="{name:'taskdetail',params:{detailObj:JSON.stringify(item),isCurrentMonth:true}}">
                                                    <div class="head">
                                                        <div class="title"><span class="projectName ellipsis">{{item.projectName}}</span><span
                                                                class="reward" v-if="$showReward(item.reward)">(+{{item.reward}}分)</span>
                                                        </div>
                                                        <div class="date">{{item.endtime && item.endtime.split(' ')[0]}}
                                                        </div>
                                                    </div>
                                                    <div class="middle">
                                                        <span>责任人：{{item.chargerName}}</span>
                                                        <div class="right">完成日期</div>
                                                    </div>
                                                    <div class="bottom">
                                                        <div class="tags">
                                                            <p v-if="item.state === 0">
                                                                <span>暂存</span>
                                                            </p>
                                                            <p v-if="item.state === 1">
                                                                <span>新增</span>
                                                            </p>
                                                            <p v-if="item.state === 2">
                                                                <!--<span>{{item.endtime}}</span>-->
                                                                <!--<span>{{today}}</span>-->
                                                                <!--<span>{{util.compareDate(item.endtime.split(' ')[0],today)}}</span>-->
                                                                <span v-if="util.compareDate(item.endtime,today)">推进中</span>
                                                                <span v-else>未完成</span>
                                                                <!--<span>{{new Date(item.endtime.split(' ')[0]).getTime()}}</span>-->
                                                                <!--<span>{{new Date(today).getTime()}}</span>-->
                                                            </p>
                                                            <p v-if="item.state === 3">
                                                                <!--<span>已完结</span>-->
                                                                <!--<span v-if="item.taskLifeList && item.taskLifeList.length>0 && item.taskLifeList[item.taskLifeList.length-1].done_type===0">未完成</span>-->
                                                                <!--<span v-if="item.taskLifeList && item.taskLifeList.length>0 && item.taskLifeList[item.taskLifeList.length-1].done_type===1">已完成</span>-->
                                                                <span v-if="isFinish(item) === 0">未完成</span>
                                                                <span v-if="isFinish(item) === 1">已完成</span>
                                                            </p>
                                                            <p v-if="item.state === 4">
                                                                <span>已废止</span>
                                                            </p>
                                                            <p @click="onClickToExpand" v-show="item.nextList.length>0">
                                                                <span>含子项目</span>
                                                                <i class="icon"></i>
                                                            </p>
                                                            <p v-show="false">
                                                                <span>主席批示</span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </router-link>
                                            </div>
                                        </div>

                                        <Loading :showloadingwrap="showLoadingWrap1"
                                                 :showloadingimg="showLoadingImg1"></Loading>
                                    </div>
                                </div>
                                <div class="swiper-slide">
                                    <div class="list-wrap" ref="wrapper2">
                                        <div class="task">
                                            <div v-for="leaderObj in list2" class="charger-wrap">
                                                <div style="font-size: 12px" class="charger-name">
                                                    <span class="left">{{leaderObj.name}} 共{{leaderObj.taskList.length}}项</span>
                                                    <div class="toggle-bottom" @click="onClickToggle($event,leaderObj)">
                                                        <div>
                                                            <p v-if="!leaderObj.folded">
                                                                <span>收起</span>
                                                                <i class="icon"></i>
                                                            </p>
                                                            <p v-else class="unfolded">
                                                                <span>展开</span>
                                                                <i class="icon"></i>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <router-link
                                                        tag="div"
                                                        class="router-link"
                                                        :class="{folded:leaderObj.folded}"
                                                        v-for="item in leaderObj.taskList"
                                                        :key="item.id"
                                                        :to="{name:'taskdetail',params:{detailObj:JSON.stringify(item),isCurrentMonth:true}}">
                                                    <div class="head">
                                                        <div class="title"><span class="projectName ellipsis">{{item.projectName}}</span><span
                                                                class="reward" v-if="$showReward(item.reward)">(+{{item.reward}}分)</span>
                                                        </div>
                                                        <div class="date">{{item.endtime && item.endtime.split(' ')[0]}}
                                                        </div>
                                                    </div>
                                                    <div class="middle">
                                                        <span>责任人：{{item.chargerName}}</span>
                                                        <div class="right">完成日期</div>
                                                    </div>
                                                    <div class="bottom">
                                                        <div class="tags">
                                                            <p v-if="item.state === 0">
                                                                <span>暂存</span>
                                                            </p>
                                                            <p v-if="item.state === 1">
                                                                <span>新增</span>
                                                            </p>
                                                            <p v-if="item.state === 2">
                                                                <!--<span>{{item.endtime}}</span>-->
                                                                <!--<span>{{today}}</span>-->
                                                                <!--<span>{{util.compareDate(item.endtime.split(' ')[0],today)}}</span>-->
                                                                <span v-if="util.compareDate(item.endtime,today)">推进中</span>
                                                                <span v-else>未完成</span>
                                                                <!--<span>{{new Date(item.endtime.split(' ')[0]).getTime()}}</span>-->
                                                                <!--<span>{{new Date(today).getTime()}}</span>-->
                                                            </p>
                                                            <p v-if="item.state === 3">
                                                                <!--<span>已完结</span>-->
                                                                <!--<span v-if="item.taskLifeList && item.taskLifeList.length>0 && item.taskLifeList[item.taskLifeList.length-1].done_type===0">未完成</span>-->
                                                                <!--<span v-if="item.taskLifeList && item.taskLifeList.length>0 && item.taskLifeList[item.taskLifeList.length-1].done_type===1">已完成</span>-->
                                                                <span v-if="isFinish(item) === 0">未完成</span>
                                                                <span v-if="isFinish(item) === 1">已完成</span>
                                                            </p>
                                                            <p v-if="item.state === 4">
                                                                <span>已废止</span>
                                                            </p>
                                                            <p @click="onClickToExpand" v-show="item.nextList.length>0">
                                                                <span>含子项目</span>
                                                                <i class="icon"></i>
                                                            </p>
                                                            <p v-show="false">
                                                                <span>主席批示</span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </router-link>
                                            </div>
                                        </div>
                                        <Loading :showloadingwrap="showLoadingWrap2"
                                                 :showloadingimg="showLoadingImg2"></Loading>
                                    </div>
                                </div>
                                <div class="swiper-slide">
                                    <div class="list-wrap" ref="wrapper3">
                                        <div class="task">
                                            <div v-for="leaderObj in list3" class="charger-wrap">
                                                <div style="font-size: 12px" class="charger-name">
                                                    <span class="left">{{leaderObj.name}} 共{{leaderObj.taskList.length}}项</span>
                                                    <div class="toggle-bottom" @click="onClickToggle($event,leaderObj)">
                                                        <div>
                                                            <p v-if="!leaderObj.folded">
                                                                <span>收起</span>
                                                                <i class="icon"></i>
                                                            </p>
                                                            <p v-else class="unfolded">
                                                                <span>展开</span>
                                                                <i class="icon"></i>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <router-link
                                                        tag="div"
                                                        class="router-link"
                                                        :class="{folded:leaderObj.folded}"
                                                        v-for="item in leaderObj.taskList"
                                                        :key="item.id"
                                                        :to="{name:'taskdetail',params:{detailObj:JSON.stringify(item),isCurrentMonth:true}}">
                                                    <div class="head">
                                                        <div class="title"><span class="projectName ellipsis">{{item.projectName}}</span><span
                                                                class="reward" v-if="$showReward(item.reward)">(+{{item.reward}}分)</span>
                                                        </div>
                                                        <div class="date">{{item.endtime && item.endtime.split(' ')[0]}}
                                                        </div>
                                                    </div>
                                                    <div class="middle">
                                                        <span>责任人：{{item.chargerName}}</span>
                                                        <div class="right">完成日期</div>
                                                    </div>
                                                    <div class="bottom">
                                                        <div class="tags">
                                                            <p v-if="item.state === 0">
                                                                <span>暂存</span>
                                                            </p>
                                                            <p v-if="item.state === 1">
                                                                <span>新增</span>
                                                            </p>
                                                            <p v-if="item.state === 2">
                                                                <!--<span>{{item.endtime}}</span>-->
                                                                <!--<span>{{today}}</span>-->
                                                                <!--<span>{{util.compareDate(item.endtime.split(' ')[0],today)}}</span>-->
                                                                <span v-if="util.compareDate(item.endtime,today)">推进中</span>
                                                                <span v-else>未完成</span>
                                                                <!--<span>{{new Date(item.endtime.split(' ')[0]).getTime()}}</span>-->
                                                                <!--<span>{{new Date(today).getTime()}}</span>-->
                                                            </p>
                                                            <p v-if="item.state === 3">
                                                                <!--<span>已完结</span>-->
                                                                <!--<span v-if="item.taskLifeList && item.taskLifeList.length>0 && item.taskLifeList[item.taskLifeList.length-1].done_type===0">未完成</span>-->
                                                                <!--<span v-if="item.taskLifeList && item.taskLifeList.length>0 && item.taskLifeList[item.taskLifeList.length-1].done_type===1">已完成</span>-->
                                                                <span v-if="isFinish(item) === 0">未完成</span>
                                                                <span v-if="isFinish(item) === 1">已完成</span>
                                                            </p>
                                                            <p v-if="item.state === 4">
                                                                <span>已废止</span>
                                                            </p>
                                                            <p @click="onClickToExpand" v-show="item.nextList.length>0">
                                                                <span>含子项目</span>
                                                                <i class="icon"></i>
                                                            </p>
                                                            <p v-show="false">
                                                                <span>主席批示</span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </router-link>
                                            </div>
                                        </div>
                                        <Loading :showloadingwrap="showLoadingWrap3"
                                                 :showloadingimg="showLoadingImg3"></Loading>
                                    </div>
                                </div>
                                <div class="swiper-slide">
                                    <div class="list-wrap" ref="wrapper4">
                                        <div class="task">
                                            <div v-for="leaderObj in list4" class="charger-wrap">
                                                <div style="font-size: 12px" class="charger-name">
                                                    <span class="left">{{leaderObj.name}} 共{{leaderObj.taskList.length}}项</span>
                                                    <div class="toggle-bottom" @click="onClickToggle($event,leaderObj)">
                                                        <div>
                                                            <p v-if="!leaderObj.folded">
                                                                <span>收起</span>
                                                                <i class="icon"></i>
                                                            </p>
                                                            <p v-else class="unfolded">
                                                                <span>展开</span>
                                                                <i class="icon"></i>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <router-link
                                                        tag="div"
                                                        class="router-link"
                                                        :class="{folded:leaderObj.folded}"
                                                        v-for="item in leaderObj.taskList"
                                                        :key="item.id"
                                                        :to="{name:'taskdetail',params:{detailObj:JSON.stringify(item),isCurrentMonth:true}}">
                                                    <div class="head">
                                                        <div class="title"><span class="projectName ellipsis">{{item.projectName}}</span><span
                                                                class="reward" v-if="$showReward(item.reward)">(+{{item.reward}}分)</span>
                                                        </div>
                                                        <div class="date">{{item.endtime && item.endtime.split(' ')[0]}}
                                                        </div>
                                                    </div>
                                                    <div class="middle">
                                                        <span>责任人：{{item.chargerName}}</span>
                                                        <div class="right">完成日期</div>
                                                    </div>
                                                    <div class="bottom">
                                                        <div class="tags">
                                                            <p v-if="item.state === 0">
                                                                <span>暂存</span>
                                                            </p>
                                                            <p v-if="item.state === 1">
                                                                <span>新增</span>
                                                            </p>
                                                            <p v-if="item.state === 2">
                                                                <!--<span>{{item.endtime}}</span>-->
                                                                <!--<span>{{today}}</span>-->
                                                                <!--<span>{{util.compareDate(item.endtime.split(' ')[0],today)}}</span>-->
                                                                <span v-if="util.compareDate(item.endtime,today)">推进中</span>
                                                                <span v-else>未完成</span>
                                                                <!--<span>{{new Date(item.endtime.split(' ')[0]).getTime()}}</span>-->
                                                                <!--<span>{{new Date(today).getTime()}}</span>-->
                                                            </p>
                                                            <p v-if="item.state === 3">
                                                                <!--<span>已完结</span>-->
                                                                <!--<span v-if="item.taskLifeList && item.taskLifeList.length>0 && item.taskLifeList[item.taskLifeList.length-1].done_type===0">未完成</span>-->
                                                                <!--<span v-if="item.taskLifeList && item.taskLifeList.length>0 && item.taskLifeList[item.taskLifeList.length-1].done_type===1">已完成</span>-->
                                                                <span v-if="isFinish(item) === 0">未完成</span>
                                                                <span v-if="isFinish(item) === 1">已完成</span>
                                                            </p>
                                                            <p v-if="item.state === 4">
                                                                <span>已废止</span>
                                                            </p>
                                                            <p @click="onClickToExpand" v-show="item.nextList.length>0">
                                                                <span>含子项目</span>
                                                                <i class="icon"></i>
                                                            </p>
                                                            <p v-show="false">
                                                                <span>主席批示</span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </router-link>
                                            </div>
                                        </div>
                                        <Loading :showloadingwrap="showLoadingWrap4"
                                                 :showloadingimg="showLoadingImg4"></Loading>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="swiper-slide">
                        <div class="parent-tabwrap">
                            <c-tab :titlebar="titlebar2"
                                   @update:currentIndex="getCurrentIndex3($event)"
                                   :currentIndex="tabCurrentIndex2"></c-tab>
                        </div>

                        <div class="swiper-container third-container swiper-no-swiping">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide">
                                    <div class="list-wrap" ref="wrapper5">
                                        <div class="task">
                                            <div v-for="leaderObj in list5" class="charger-wrap">
                                                <div style="font-size: 12px" class="charger-name">
                                                    <span class="left">{{leaderObj.name}} 共{{leaderObj.taskList.length}}项</span>
                                                    <div class="toggle-bottom" @click="onClickToggle($event,leaderObj)">
                                                        <div>
                                                            <p v-if="!leaderObj.folded">
                                                                <span>收起</span>
                                                                <i class="icon"></i>
                                                            </p>
                                                            <p v-else class="unfolded">
                                                                <span>展开</span>
                                                                <i class="icon"></i>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <router-link
                                                        tag="div"
                                                        class="router-link"
                                                        :class="{folded:leaderObj.folded}"
                                                        v-for="item in leaderObj.taskList"
                                                        :key="item.id"
                                                        :to="{name:'taskdetail',params:{detailObj:JSON.stringify(item),isCurrentMonth:true}}">
                                                    <div class="head">
                                                        <div class="title"><span class="projectName ellipsis">{{item.projectName}}</span><span
                                                                class="reward" v-if="$showReward(item.reward)">(+{{item.reward}}分)</span>
                                                        </div>
                                                        <div class="date">{{item.endtime && item.endtime.split(' ')[0]}}
                                                        </div>
                                                    </div>
                                                    <div class="middle">
                                                        <span>责任人：{{item.chargerName}}</span>
                                                        <div class="right">完成日期</div>
                                                    </div>
                                                    <div class="bottom">
                                                        <div class="tags">
                                                            <p v-if="item.state === 0">
                                                                <span>暂存</span>
                                                            </p>
                                                            <p v-if="item.state === 1">
                                                                <span>新增</span>
                                                            </p>
                                                            <p v-if="item.state === 2">
                                                                <!--<span>{{item.endtime}}</span>-->
                                                                <!--<span>{{today}}</span>-->
                                                                <!--<span>{{util.compareDate(item.endtime.split(' ')[0],today)}}</span>-->
                                                                <span v-if="util.compareDate(item.endtime,today)">推进中</span>
                                                                <span v-else>未完成</span>
                                                                <!--<span>{{new Date(item.endtime.split(' ')[0]).getTime()}}</span>-->
                                                                <!--<span>{{new Date(today).getTime()}}</span>-->
                                                            </p>
                                                            <p v-if="item.state === 3">
                                                                <!--<span>已完结</span>-->
                                                                <!--<span v-if="item.taskLifeList && item.taskLifeList.length>0 && item.taskLifeList[item.taskLifeList.length-1].done_type===0">未完成</span>-->
                                                                <!--<span v-if="item.taskLifeList && item.taskLifeList.length>0 && item.taskLifeList[item.taskLifeList.length-1].done_type===1">已完成</span>-->
                                                                <span v-if="isFinish(item) === 0">未完成</span>
                                                                <span v-if="isFinish(item) === 1">已完成</span>
                                                            </p>
                                                            <p v-if="item.state === 4">
                                                                <span>已废止</span>
                                                            </p>
                                                            <p @click="onClickToExpand" v-show="item.nextList.length>0">
                                                                <span>含子项目</span>
                                                                <i class="icon"></i>
                                                            </p>
                                                            <p v-show="false">
                                                                <span>主席批示</span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </router-link>
                                            </div>
                                        </div>
                                        <Loading :showloadingwrap="showLoadingWrap5"
                                                 :showloadingimg="showLoadingImg5"></Loading>
                                    </div>
                                </div>
                                <div class="swiper-slide">
                                    <div class="list-wrap" ref="wrapper6">
                                        <div class="task">
                                            <div v-for="leaderObj in list6" class="charger-wrap">
                                                <div style="font-size: 12px" class="charger-name">
                                                    <span class="left">{{leaderObj.name}} 共{{leaderObj.taskList.length}}项</span>
                                                    <div class="toggle-bottom" @click="onClickToggle($event,leaderObj)">
                                                        <div>
                                                            <p v-if="!leaderObj.folded">
                                                                <span>收起</span>
                                                                <i class="icon"></i>
                                                            </p>
                                                            <p v-else class="unfolded">
                                                                <span>展开</span>
                                                                <i class="icon"></i>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <router-link
                                                        tag="div"
                                                        class="router-link"
                                                        :class="{folded:leaderObj.folded}"
                                                        v-for="item in leaderObj.taskList"
                                                        :key="item.id"
                                                        :to="{name:'taskdetail',params:{detailObj:JSON.stringify(item),isCurrentMonth:true}}">
                                                    <div class="head">
                                                        <div class="title"><span class="projectName ellipsis">{{item.projectName}}</span><span
                                                                class="reward" v-if="$showReward(item.reward)">(+{{item.reward}}分)</span>
                                                        </div>
                                                        <div class="date">{{item.endtime && item.endtime.split(' ')[0]}}
                                                        </div>
                                                    </div>
                                                    <div class="middle">
                                                        <span>责任人：{{item.chargerName}}</span>
                                                        <div class="right">完成日期</div>
                                                    </div>
                                                    <div class="bottom">
                                                        <div class="tags">
                                                            <p v-if="item.state === 0">
                                                                <span>暂存</span>
                                                            </p>
                                                            <p v-if="item.state === 1">
                                                                <span>新增</span>
                                                            </p>
                                                            <p v-if="item.state === 2">
                                                                <!--<span>{{item.endtime}}</span>-->
                                                                <!--<span>{{today}}</span>-->
                                                                <!--<span>{{util.compareDate(item.endtime.split(' ')[0],today)}}</span>-->
                                                                <span v-if="util.compareDate(item.endtime,today)">推进中</span>
                                                                <span v-else>未完成</span>
                                                                <!--<span>{{new Date(item.endtime.split(' ')[0]).getTime()}}</span>-->
                                                                <!--<span>{{new Date(today).getTime()}}</span>-->
                                                            </p>
                                                            <p v-if="item.state === 3">
                                                                <!--<span>已完结</span>-->
                                                                <!--<span v-if="item.taskLifeList && item.taskLifeList.length>0 && item.taskLifeList[item.taskLifeList.length-1].done_type===0">未完成</span>-->
                                                                <!--<span v-if="item.taskLifeList && item.taskLifeList.length>0 && item.taskLifeList[item.taskLifeList.length-1].done_type===1">已完成</span>-->
                                                                <span v-if="isFinish(item) === 0">未完成</span>
                                                                <span v-if="isFinish(item) === 1">已完成</span>
                                                            </p>
                                                            <p v-if="item.state === 4">
                                                                <span>已废止</span>
                                                            </p>
                                                            <p @click="onClickToExpand" v-show="item.nextList.length>0">
                                                                <span>含子项目</span>
                                                                <i class="icon"></i>
                                                            </p>
                                                            <p v-show="false">
                                                                <span>主席批示</span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </router-link>
                                            </div>
                                        </div>
                                        <Loading :showloadingwrap="showLoadingWrap6"
                                                 :showloadingimg="showLoadingImg6"></Loading>
                                    </div>
                                </div>
                                <div class="swiper-slide">
                                    <div class="list-wrap" ref="wrapper7">
                                        <div class="task">
                                            <div v-for="leaderObj in list7" class="charger-wrap">
                                                <div style="font-size: 12px" class="charger-name">
                                                    <span class="left">{{leaderObj.name}} 共{{leaderObj.taskList.length}}项</span>
                                                    <div class="toggle-bottom" @click="onClickToggle($event,leaderObj)">
                                                        <div>
                                                            <p v-if="!leaderObj.folded">
                                                                <span>收起</span>
                                                                <i class="icon"></i>
                                                            </p>
                                                            <p v-else class="unfolded">
                                                                <span>展开</span>
                                                                <i class="icon"></i>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <router-link
                                                        tag="div"
                                                        class="router-link"
                                                        :class="{folded:leaderObj.folded}"
                                                        v-for="item in leaderObj.taskList"
                                                        :key="item.id"
                                                        :to="{name:'taskdetail',params:{detailObj:JSON.stringify(item),isCurrentMonth:true}}">
                                                    <div class="head">
                                                        <div class="title"><span class="projectName ellipsis">{{item.projectName}}</span><span
                                                                class="reward" v-if="$showReward(item.reward)">(+{{item.reward}}分)</span>
                                                        </div>
                                                        <div class="date">{{item.endtime && item.endtime.split(' ')[0]}}
                                                        </div>
                                                    </div>
                                                    <div class="middle">
                                                        <span>责任人：{{item.chargerName}}</span>
                                                        <div class="right">完成日期</div>
                                                    </div>
                                                    <div class="bottom">
                                                        <div class="tags">
                                                            <p v-if="item.state === 0">
                                                                <span>暂存</span>
                                                            </p>
                                                            <p v-if="item.state === 1">
                                                                <span>新增</span>
                                                            </p>
                                                            <p v-if="item.state === 2">
                                                                <!--<span>{{item.endtime}}</span>-->
                                                                <!--<span>{{today}}</span>-->
                                                                <!--<span>{{util.compareDate(item.endtime.split(' ')[0],today)}}</span>-->
                                                                <span v-if="util.compareDate(item.endtime,today)">推进中</span>
                                                                <span v-else>未完成</span>
                                                                <!--<span>{{new Date(item.endtime.split(' ')[0]).getTime()}}</span>-->
                                                                <!--<span>{{new Date(today).getTime()}}</span>-->
                                                            </p>
                                                            <p v-if="item.state === 3">
                                                                <!--<span>已完结</span>-->
                                                                <!--<span v-if="item.taskLifeList && item.taskLifeList.length>0 && item.taskLifeList[item.taskLifeList.length-1].done_type===0">未完成</span>-->
                                                                <!--<span v-if="item.taskLifeList && item.taskLifeList.length>0 && item.taskLifeList[item.taskLifeList.length-1].done_type===1">已完成</span>-->
                                                                <span v-if="isFinish(item) === 0">未完成</span>
                                                                <span v-if="isFinish(item) === 1">已完成</span>
                                                            </p>
                                                            <p v-if="item.state === 4">
                                                                <span>已废止</span>
                                                            </p>
                                                            <p @click="onClickToExpand" v-show="item.nextList.length>0">
                                                                <span>含子项目</span>
                                                                <i class="icon"></i>
                                                            </p>
                                                            <p v-show="false">
                                                                <span>主席批示</span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </router-link>
                                            </div>
                                        </div>
                                        <Loading :showloadingwrap="showLoadingWrap7"
                                                 :showloadingimg="showLoadingImg7"></Loading>
                                    </div>
                                </div>
                                <div class="swiper-slide">
                                    <div class="list-wrap" ref="wrapper8">
                                        <div class="task">
                                            <div v-for="leaderObj in list8" class="charger-wrap">
                                                <div style="font-size: 12px" class="charger-name">
                                                    <span class="left">{{leaderObj.name}} 共{{leaderObj.taskList.length}}项</span>
                                                    <div class="toggle-bottom" @click="onClickToggle($event,leaderObj)">
                                                        <div>
                                                            <p v-if="!leaderObj.folded">
                                                                <span>收起</span>
                                                                <i class="icon"></i>
                                                            </p>
                                                            <p v-else class="unfolded">
                                                                <span>展开</span>
                                                                <i class="icon"></i>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <router-link
                                                        tag="div"
                                                        class="router-link"
                                                        :class="{folded:leaderObj.folded}"
                                                        v-for="item in leaderObj.taskList"
                                                        :key="item.id"
                                                        :to="{name:'taskdetail',params:{detailObj:JSON.stringify(item),isCurrentMonth:true}}">
                                                    <div class="head">
                                                        <div class="title"><span class="projectName ellipsis">{{item.projectName}}</span><span
                                                                class="reward" v-if="$showReward(item.reward)">(+{{item.reward}}分)</span>
                                                        </div>
                                                        <div class="date">{{item.endtime && item.endtime.split(' ')[0]}}
                                                        </div>
                                                    </div>
                                                    <div class="middle">
                                                        <span>责任人：{{item.chargerName}}</span>
                                                        <div class="right">完成日期</div>
                                                    </div>
                                                    <div class="bottom">
                                                        <div class="tags">
                                                            <p v-if="item.state === 0">
                                                                <span>暂存</span>
                                                            </p>
                                                            <p v-if="item.state === 1">
                                                                <span>新增</span>
                                                            </p>
                                                            <p v-if="item.state === 2">
                                                                <!--<span>{{item.endtime}}</span>-->
                                                                <!--<span>{{today}}</span>-->
                                                                <!--<span>{{util.compareDate(item.endtime.split(' ')[0],today)}}</span>-->
                                                                <span v-if="util.compareDate(item.endtime,today)">推进中</span>
                                                                <span v-else>未完成</span>
                                                                <!--<span>{{new Date(item.endtime.split(' ')[0]).getTime()}}</span>-->
                                                                <!--<span>{{new Date(today).getTime()}}</span>-->
                                                            </p>
                                                            <p v-if="item.state === 3">
                                                                <!--<span>已完结</span>-->
                                                                <!--<span v-if="item.taskLifeList && item.taskLifeList.length>0 && item.taskLifeList[item.taskLifeList.length-1].done_type===0">未完成</span>-->
                                                                <!--<span v-if="item.taskLifeList && item.taskLifeList.length>0 && item.taskLifeList[item.taskLifeList.length-1].done_type===1">已完成</span>-->
                                                                <span v-if="isFinish(item) === 0">未完成</span>
                                                                <span v-if="isFinish(item) === 1">已完成</span>
                                                            </p>
                                                            <p v-if="item.state === 4">
                                                                <span>已废止</span>
                                                            </p>
                                                            <p @click="onClickToExpand" v-show="item.nextList.length>0">
                                                                <span>含子项目</span>
                                                                <i class="icon"></i>
                                                            </p>
                                                            <p v-show="false">
                                                                <span>主席批示</span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </router-link>
                                            </div>
                                        </div>
                                        <Loading :showloadingwrap="showLoadingWrap8"
                                                 :showloadingimg="showLoadingImg8"></Loading>
                                    </div>
                                </div>
                                <div class="swiper-slide">
                                    <div class="list-wrap" ref="wrapper9">
                                        <div class="task">
                                            <div v-for="leaderObj in list9" class="charger-wrap">
                                                <div style="font-size: 12px" class="charger-name">
                                                    <span class="left">{{leaderObj.name}} 共{{leaderObj.taskList.length}}项</span>
                                                    <div class="toggle-bottom" @click="onClickToggle($event,leaderObj)">
                                                        <div>
                                                            <p v-if="!leaderObj.folded">
                                                                <span>收起</span>
                                                                <i class="icon"></i>
                                                            </p>
                                                            <p v-else class="unfolded">
                                                                <span>展开</span>
                                                                <i class="icon"></i>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <router-link
                                                        tag="div"
                                                        class="router-link"
                                                        :class="{folded:leaderObj.folded}"
                                                        v-for="item in leaderObj.taskList"
                                                        :key="item.id"
                                                        :to="{name:'taskdetail',params:{detailObj:JSON.stringify(item),isCurrentMonth:true}}">
                                                    <div class="head">
                                                        <div class="title"><span class="projectName ellipsis">{{item.projectName}}</span><span
                                                                class="reward" v-if="$showReward(item.reward)">(+{{item.reward}}分)</span>
                                                        </div>
                                                        <div class="date">{{item.endtime && item.endtime.split(' ')[0]}}
                                                        </div>
                                                    </div>
                                                    <div class="middle">
                                                        <span>责任人：{{item.chargerName}}</span>
                                                        <div class="right">完成日期</div>
                                                    </div>
                                                    <div class="bottom">
                                                        <div class="tags">
                                                            <p v-if="item.state === 0">
                                                                <span>暂存</span>
                                                            </p>
                                                            <p v-if="item.state === 1">
                                                                <span>新增</span>
                                                            </p>
                                                            <p v-if="item.state === 2">
                                                                <!--<span>{{item.endtime}}</span>-->
                                                                <!--<span>{{today}}</span>-->
                                                                <!--<span>{{util.compareDate(item.endtime.split(' ')[0],today)}}</span>-->
                                                                <span v-if="util.compareDate(item.endtime,today)">推进中</span>
                                                                <span v-else>未完成</span>
                                                                <!--<span>{{new Date(item.endtime.split(' ')[0]).getTime()}}</span>-->
                                                                <!--<span>{{new Date(today).getTime()}}</span>-->
                                                            </p>
                                                            <p v-if="item.state === 3">
                                                                <!--<span>已完结</span>-->
                                                                <!--<span v-if="item.taskLifeList && item.taskLifeList.length>0 && item.taskLifeList[item.taskLifeList.length-1].done_type===0">未完成</span>-->
                                                                <!--<span v-if="item.taskLifeList && item.taskLifeList.length>0 && item.taskLifeList[item.taskLifeList.length-1].done_type===1">已完成</span>-->
                                                                <span v-if="isFinish(item) === 0">未完成</span>
                                                                <span v-if="isFinish(item) === 1">已完成</span>
                                                            </p>
                                                            <p v-if="item.state === 4">
                                                                <span>已废止</span>
                                                            </p>
                                                            <p @click="onClickToExpand" v-show="item.nextList.length>0">
                                                                <span>含子项目</span>
                                                                <i class="icon"></i>
                                                            </p>
                                                            <p v-show="false">
                                                                <span>主席批示</span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </router-link>
                                            </div>
                                        </div>
                                        <Loading :showloadingwrap="showLoadingWrap9"
                                                 :showloadingimg="showLoadingImg9"></Loading>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <router-link v-if="$store.getters.taskType==='charge' && $store.getters.isFromRanking !== 1"
                         :to="{name:'taskadd'}"
                         tag="div" class="btn">
                <!--<i class="icon"></i>-->
                <span class="icon">工作新增</span>
            </router-link>
            <router-link v-if="$store.getters.taskType==='sign' && $store.getters.isFromRanking !== 1"
                         :to="{name:'tempAdd'}"
                         tag="div" class="btn">
                <!--<i class="icon"></i>-->
                <span class="icon">临时下发</span>
            </router-link>
        </div>
        <div class="search-container" v-show="showSearchResult">
            <header>
                <div @click="clearSearchResult">收起</div>
                <div>共{{list.reduce((prev,next)=>{
                    return prev + next.taskList.length
                    },0)}}条
                </div>
                <i class="icon" v-if="true" @click="openSearch = true"></i>
            </header>
            <div class="list-wrap" ref="wrapper">
                <div class="task">
                    <div v-for="leaderObj in list" class="charger-wrap">
                        <div style="font-size: 12px" class="charger-name">
                            <span class="left">{{leaderObj.name}} 共{{leaderObj.taskList.length}}项</span>
                            <div class="toggle-bottom" @click="onClickToggle($event,leaderObj)">
                                <div>
                                    <p v-if="!leaderObj.folded">
                                        <span>收起</span>
                                        <i class="icon"></i>
                                    </p>
                                    <p v-else class="unfolded">
                                        <span>展开</span>
                                        <i class="icon"></i>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <router-link
                                tag="div"
                                class="router-link"
                                :class="{folded:leaderObj.folded}"
                                v-for="item in leaderObj.taskList"
                                :key="item.id"
                                :to="{name:'taskdetail',params:{detailObj:JSON.stringify(item),isCurrentMonth:true}}">
                            <div class="head">
                                <div class="title"><span class="projectName ellipsis">{{item.projectName}}</span><span
                                        class="reward" v-if="$showReward(item.reward)">(+{{item.reward}}分)</span>
                                </div>
                                <div class="date">{{item.endtime && item.endtime.split(' ')[0]}}
                                </div>
                            </div>
                            <div class="middle">
                                <span>责任人：{{item.chargerName}}</span>
                                <div class="right">完成日期</div>
                            </div>
                            <div class="bottom">
                                <div class="tags">
                                    <p v-if="item.state === 0">
                                        <span>暂存</span>
                                    </p>
                                    <p v-if="item.state === 1">
                                        <span>新增</span>
                                    </p>
                                    <p v-if="item.state === 2">
                                        <!--<span>{{item.endtime}}</span>-->
                                        <!--<span>{{today}}</span>-->
                                        <!--<span>{{util.compareDate(item.endtime.split(' ')[0],today)}}</span>-->
                                        <span v-if="util.compareDate(item.endtime,today)">推进中</span>
                                        <span v-else>未完成</span>
                                        <!--<span>{{new Date(item.endtime.split(' ')[0]).getTime()}}</span>-->
                                        <!--<span>{{new Date(today).getTime()}}</span>-->
                                    </p>
                                    <p v-if="item.state === 3">
                                        <!--<span>已完结</span>-->
                                        <!--<span v-if="item.taskLifeList && item.taskLifeList.length>0 && item.taskLifeList[item.taskLifeList.length-1].done_type===0">未完成</span>-->
                                        <!--<span v-if="item.taskLifeList && item.taskLifeList.length>0 && item.taskLifeList[item.taskLifeList.length-1].done_type===1">已完成</span>-->
                                        <span v-if="isFinish(item) === 0">未完成</span>
                                        <span v-if="isFinish(item) === 1">已完成</span>
                                    </p>
                                    <p v-if="item.state === 4">
                                        <span>已废止</span>
                                    </p>
                                    <p @click="onClickToExpand" v-show="item.nextList.length>0">
                                        <span>含子项目</span>
                                        <i class="icon"></i>
                                    </p>
                                    <p v-show="false">
                                        <span>主席批示</span>
                                    </p>
                                </div>
                            </div>
                        </router-link>
                    </div>
                    <Loading :showloadingwrap="showLoadingWrap10"
                             :showloadingimg="showLoadingImg10"></Loading>
                </div>
            </div>
        </div>
        <taskSearch :open="openSearch" @update:open="openSearch = $event"
                    @update:queryTaskList="getQueryTaskListToSearch"></taskSearch>
    </div>

</template>

<script>
  import Swiper from 'swiper'
  import axios from 'axios'
  import Qs from 'qs'
  import BScroll from 'better-scroll'
  import util from '../../util'
  import taskSearch from '../taskSearch'

  const btnTitle = [
    {
      name: '本月',
    },
    {
      name: '全部'
    }
  ]
  const titlebar1 = [
    {
      name: '本月工作',
      num: 0
    },
    {
      name: '本月已完成',
      num: 0
    },
    {
      name: '本月推进中',
      num: 0
    },
    {
      name: '未完成',
      num: 0
    },
  ]
  const titlebar2 = [
    {
      name: '全部工作',
      num: 0
    },
    {
      name: '已完成',
      num: 0
    },
    {
      name: '推进中',
      num: 0
    },
    {
      name: '未完成',
      num: 0
    },
    {
      name: '已废止',
      num: 0
    },
  ]
  export default {
    name: "list-clerk",
    components: {
      'taskSearch': taskSearch,
    },
    data() {
      return {
        btnTitle,
        titlebar1,
        titlebar2,
        detailSwiper1: null,
        detailSwiper2: null,
        detailSwiper3: null,
        btnCurrentIndex: 0,
        tabCurrentIndex1: 0,
        tabCurrentIndex2: 0,
        showLoadingWrap1: false,
        showLoadingWrap2: false,
        showLoadingWrap3: false,
        showLoadingWrap4: false,
        showLoadingWrap5: false,
        showLoadingWrap6: false,
        showLoadingWrap7: false,
        showLoadingWrap8: false,
        showLoadingWrap9: false,
        showLoadingImg1: false,
        showLoadingImg2: false,
        showLoadingImg3: false,
        showLoadingImg4: false,
        showLoadingImg5: false,
        showLoadingImg6: false,
        showLoadingImg7: false,
        showLoadingImg8: false,
        showLoadingImg9: false,
        element: null,
        scroll1: null,
        scroll2: null,
        scroll3: null,
        scroll4: null,
        scroll5: null,
        scroll6: null,
        scroll7: null,
        scroll8: null,
        scroll9: null,
        list1: [],
        list2: [],
        list3: [],
        list4: [],
        list5: [],
        list6: [],
        list7: [],
        list8: [],
        list9: [],
        openId: '',
        taskStatus: 0,
        taskType: 0,
        timeRange: [],
        folded: false,
        charge: null,
        sign: null,
        today: new Date(),
        util,
        openSearch: false,
        showSearchResult: false,
        scroll: null,
        list: [],
        showLoadingWrap10: false,
        showLoadingImg10: false,
      }
    },
    watch: {
      btnCurrentIndex() {
        this.$store.commit('setCurrentBtnIndex', this.btnCurrentIndex)

        if (this.btnCurrentIndex === 0) {
          if (this.isFromRanking) {
            this.loadData(this.$store.getters.othersOpenID, this.$store.state.taskType, 0, this.tabCurrentIndex1, 1, 10000)
          }
          else {
            this.loadData(this.$store.state.openID, this.$store.state.taskType, 0, this.tabCurrentIndex1, 1, 10000)
          }
        }
        if (this.btnCurrentIndex === 1) {
          if (this.isFromRanking) {
            this.loadData(this.$store.getters.othersOpenID, this.$store.state.taskType, 1, this.tabCurrentIndex2, 1, 10000)
          } else {
            this.loadData(this.$store.state.openID, this.$store.state.taskType, 1, this.tabCurrentIndex2, 1, 10000)
          }
        }
      },
      tabCurrentIndex1() {
        this.$store.commit('setCurrentTabIndex', this.tabCurrentIndex1)

        if (this.isFromRanking) {
          this.loadData(this.$store.getters.othersOpenID, this.$store.state.taskType, 0, this.tabCurrentIndex1, 1, 10000)
        } else {
          this.loadData(this.$store.state.openID, this.$store.state.taskType, 0, this.tabCurrentIndex1, 1, 10000)
        }
      },
      tabCurrentIndex2() {
        this.$store.commit('setCurrentTabIndex', this.tabCurrentIndex2)

        if (this.isFromRanking) {
          this.loadData(this.$store.getters.othersOpenID, this.$store.state.taskType, 1, this.tabCurrentIndex2, 1, 10000)
        } else {
          this.loadData(this.$store.state.openID, this.$store.state.taskType, 1, this.tabCurrentIndex2, 1, 10000)
        }
      },
    },
    beforeRouteEnter(to, from, next) {
      qing.call('setWebViewTitle', { 'title': '重点工作列表' })

      next(vm => {
        vm.leaderArr = vm.$store.getters.leaderArr

        if (from.name === 'clerkIndex') {
          let { timeRange, taskStatus, taskType } = vm.$route.params
          vm.timeRange = timeRange
          vm.taskStatus = taskStatus
          vm.taskType = taskType
          console.log('vm.timeRange', vm.timeRange)
          console.log('vm.taskType', vm.taskType)

          // if (vm.timeRange) {
          //   localStorage.setItem('timeRange', vm.timeRange)
          // }
          // if (vm.taskStatus) {
          //   localStorage.setItem('taskStatus', vm.taskStatus)
          // }

          vm.$store.commit('setCurrentBtnIndex', vm.timeRange)
          vm.$store.commit('setCurrentTabIndex', vm.taskStatus)
          vm.$store.commit('setTaskType', vm.taskType)
          vm.$store.commit('setIsFromRanking', false)
          vm.$store.commit('setOthersOpenID', '')

        }
        else if (from.name === 'ranking') {
          let { timeRange, taskStatus, taskType, othersOpenID } = vm.$route.params
          vm.timeRange = timeRange
          vm.taskStatus = taskStatus
          vm.taskType = taskType
          vm.othersOpenID = othersOpenID

          // if (vm.timeRange) {
          //   localStorage.setItem('timeRange', vm.timeRange)
          // }
          // if (vm.taskStatus) {
          //   localStorage.setItem('taskStatus', vm.taskStatus)
          // }
          vm.$store.commit('setCurrentBtnIndex', vm.timeRange)
          vm.$store.commit('setCurrentTabIndex', vm.taskStatus)
          vm.$store.commit('setTaskType', vm.taskType)
          vm.$store.commit('setOthersOpenID', vm.othersOpenID)
          vm.$store.commit('setIsFromRanking', true)
        }
        else if (from.name === null) {
          vm.timeRange = vm.$store.state.currentBtnIndex
          vm.taskStatus = vm.$store.state.currentTabIndex
          vm.taskType = vm.$store.state.taskType

          if (vm.$store.getters.isFromRanking) {
            vm.isFromRanking = vm.$store.getters.isFromRanking
          }
          if (vm.$store.getters.othersOpenID) {
            vm.othersOpenID = vm.$store.getters.othersOpenID
          }
        }
        else if (from.name === 'taskadd') {
          vm.timeRange = 0
          vm.taskStatus = 0
          vm.taskType = 'charge'
          vm.$store.commit('setCurrentBtnIndex', vm.timeRange)
          vm.$store.commit('setCurrentTabIndex', vm.taskStatus)
          vm.$store.commit('setTaskType', vm.taskType)
          vm.$store.commit('setIsFromRanking', false)
          vm.$store.commit('setOthersOpenID', '')
        }
        else {
          vm.timeRange = vm.$store.state.currentBtnIndex
          vm.taskStatus = vm.$store.state.currentTabIndex
          vm.taskType = vm.$store.state.taskType
          vm.isFromRanking = vm.$store.getters.isFromRanking
          vm.othersOpenID = vm.$store.getters.othersOpenID


        }
        if (localStorage.getItem('keepShowResultOpen') === '1') {
          vm.showSearchResult = true
          let selectSource = localStorage.getItem('searchParams')
          vm.getQueryTaskListToSearch(JSON.parse(selectSource))
        }
        vm.$nextTick(() => {
          vm.detailSwiper1 = new Swiper('.first-container', {
            on: {
              slideChangeTransitionStart: () => {
                console.log(vm.detailSwiper1.activeIndex)
                vm.btnCurrentIndex = vm.detailSwiper1.activeIndex
              }
            },
          })
          vm.detailSwiper2 = new Swiper('.second-container', {
            on: {
              slideChangeTransitionStart: () => {
                vm.tabCurrentIndex1 = vm.detailSwiper2.activeIndex
              }
            },
          })
          vm.detailSwiper3 = new Swiper('.third-container', {
            on: {
              slideChangeTransitionStart: () => {
                vm.tabCurrentIndex2 = vm.detailSwiper3.activeIndex
              }
            },
          })

          vm.btnCurrentIndex = vm.timeRange
          vm.$store.commit('setCurrentBtnIndex', vm.btnCurrentIndex)

          vm.detailSwiper1.slideTo(vm.btnCurrentIndex);

          if (vm.btnCurrentIndex === 0) {
            vm.tabCurrentIndex1 = vm.taskStatus
            vm.detailSwiper2.slideTo(vm.tabCurrentIndex1);
          } else if (vm.btnCurrentIndex === 1) {
            vm.tabCurrentIndex2 = vm.taskStatus
            vm.detailSwiper3.slideTo(vm.tabCurrentIndex2);
          }
          vm.$store.commit('setCurrentTabIndex', vm.taskStatus)


          console.log(vm.btnCurrentIndex)
          console.log(vm.tabCurrentIndex1)
          console.log(vm.tabCurrentIndex2)


          let today = new Date()
          let rangeCurrentMonth = [util.getFirstDateOfMonthHMS(today), util.getLastDateOfMonthHMS(today)]
          let rangeCurrentYear = [util.getFirstDateOfYearHMS(today), util.getLastDateOfYearHMS(today)]

          // let getNumURL = vm.$url + "/taskSystem/task/getAmount"
          let getNumURL = "http://rest.apizza.net/mock/21c5cf3ed4022de252a80d8e8366c6f7/getAmount"


          if (vm.isFromRanking) {

            axios.get(getNumURL, {
              params: {
                openIDStr: vm.$store.getters.othersOpenID,
                rangeStr: rangeCurrentMonth.join(',')
              }
            })
              .then((response) => {
                console.log(response.data)
                if (response.data.result.length > 0) {
                  let data = response.data.result[0]
                  vm.charge = data.charge
                  vm.sign = data.dispatch

                  if (vm.$store.state.taskType === 'charge') {
                    // vm.titlebar1[0].num = vm.charge.all
                    vm.titlebar1[0].num = vm.charge.finished + vm.charge.doing + vm.charge.unfinish + vm.charge.abolish
                    vm.titlebar1[1].num = vm.charge.finished
                    vm.titlebar1[2].num = vm.charge.doing
                    vm.titlebar1[3].num = vm.charge.unfinish
                  } else if (vm.$store.state.taskType === 'sign') {
                    // vm.titlebar1[0].num = vm.sign.all
                    vm.titlebar1[0].num = vm.sign.finished + vm.sign.doing + vm.sign.unfinish + vm.sign.abolish
                    vm.titlebar1[1].num = vm.sign.finished
                    vm.titlebar1[2].num = vm.sign.doing
                    vm.titlebar1[3].num = vm.sign.unfinish
                  }
                }
              })
            axios.get(getNumURL, {
              params: {
                openIDStr: vm.$store.getters.othersOpenID,
                rangeStr: rangeCurrentYear.join(',')
              }
            })
              .then((response) => {
                console.log(response.data)
                if (response.data.result.length > 0) {
                  let data = response.data.result[0]
                  vm.charge = data.charge
                  vm.sign = data.dispatch

                  if (vm.$store.state.taskType === 'charge') {
                    // vm.titlebar2[0].num = vm.charge.all
                    vm.titlebar2[0].num = vm.charge.finished + vm.charge.doing + vm.charge.unfinish + vm.charge.abolish
                    vm.titlebar2[1].num = vm.charge.finished
                    vm.titlebar2[2].num = vm.charge.doing
                    vm.titlebar2[3].num = vm.charge.unfinish
                    vm.titlebar2[4].num = vm.charge.abolish
                  } else if (vm.$store.state.taskType === 'sign') {
                    vm.titlebar2[0].num = vm.sign.finished + vm.sign.doing + vm.sign.unfinish + vm.sign.abolish
                    vm.titlebar2[1].num = vm.sign.finished
                    vm.titlebar2[2].num = vm.sign.doing
                    vm.titlebar2[3].num = vm.sign.unfinish
                    vm.titlebar2[4].num = vm.sign.abolish
                  }
                }
              })
            vm.loadData(vm.$store.getters.othersOpenID, vm.$store.state.taskType, vm.timeRange, vm.taskStatus, 1, 10000)

          }
          else {

            vm.loadData(vm.$store.getters.openID, vm.$store.state.taskType, vm.timeRange, vm.taskStatus, 1, 10000)

            let queryList = vm.createQueryList('', 'charge', 0)


            let p1 = vm.leaderArr.map(leader => {

              queryList.forEach((query) => {
                query.param.forEach((item) => {
                  if (item.chargerID !== undefined) {
                    item.chargerID = leader.fleaderID
                  }
                  if (item.helperID !== undefined) {
                    item.helperID = leader.fleaderID
                  }
                })
              })

              return axios({
                method: 'post',
                url: getNumURL,
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                data: Qs.stringify({
                  jsonStr: JSON.stringify(queryList),
                })
              })
            })


            Promise.all(p1)
              .then((values) => {
                if (values.length > 0) {
                  values.forEach((response, index) => {
                    if (response.data.success) {
                      let data = response.data.result

                      vm.titlebar1[0].num += data.all
                      // vm.titlebar1[0].num += (data.finished + data.doing + data.unfinished + data.abolish)
                      vm.titlebar1[1].num += data.finished
                      vm.titlebar1[2].num += data.doing
                      vm.titlebar1[3].num += data.unfinish
                    }
                  })

                  // vm.$nextTick(() => {
                  //   vm.detailSwiper = new Swiper('.swiper-container', {
                  //     pagination: {
                  //       el: '.swiper-pagination'
                  //     },
                  //     on: {
                  //       slideChangeTransitionStart: function () {
                  //         console.log(vm.detailSwiper.activeIndex)
                  //         vm.currentIndex = vm.detailSwiper.activeIndex
                  //       }
                  //     },
                  //   })
                  // })

                }
              })

            let queryList2 = vm.createQueryList('', 'charge', 1)

            let p2 = vm.leaderArr.map(leader => {

              queryList2.forEach((query) => {
                query.param.forEach((item) => {
                  if (item.chargerID !== undefined) {
                    item.chargerID = leader.fleaderID
                  }
                  if (item.helperID !== undefined) {
                    item.helperID = leader.fleaderID
                  }
                })
              })

              return axios({
                method: 'post',
                url: getNumURL,
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                data: Qs.stringify({
                  jsonStr: JSON.stringify(queryList2),
                })
              })
            })

            Promise.all(p2)
              .then((values) => {
                if (values.length > 0) {
                  values.forEach((response, index) => {
                    if (response.data.success) {
                      let data = response.data.result

                      vm.titlebar2[0].num += data.all
                      // vm.titlebar2[0].num += (data.finished + data.doing + data.unfinished + data.abolish)
                      vm.titlebar2[1].num += data.finished
                      vm.titlebar2[2].num += data.doing
                      vm.titlebar2[3].num += data.unfinish
                      vm.titlebar2[4].num += data.abolish
                    }
                  })

                  // vm.$nextTick(() => {
                  //   vm.detailSwiper = new Swiper('.swiper-container', {
                  //     pagination: {
                  //       el: '.swiper-pagination'
                  //     },
                  //     on: {
                  //       slideChangeTransitionStart: function () {
                  //         console.log(vm.detailSwiper.activeIndex)
                  //         vm.currentIndex = vm.detailSwiper.activeIndex
                  //       }
                  //     },
                  //   })
                  // })

                }
              })
          }
        })

      })
    },
    mounted() {
      this.titlebar1 = [
        {
          name: '本月工作',
          num: 0
        },
        {
          name: '本月已完成',
          num: 0
        },
        {
          name: '本月推进中',
          num: 0
        },
        {
          name: '未完成',
          num: 0
        },
      ]
      this.titlebar2 = [
        {
          name: '全部工作',
          num: 0
        },
        {
          name: '已完成',
          num: 0
        },
        {
          name: '推进中',
          num: 0
        },
        {
          name: '未完成',
          num: 0
        },
        {
          name: '已废止',
          num: 0
        },
      ]
    },
    beforeRouteLeave(to, from, next) {
      if (to.name !== 'taskdetail') {
        this.$store.commit('noKeepAlive')
      }
      if (to.name === 'ranking') {
        this.$store.commit('setOthersOpenID', '')
        this.$store.commit('setIsFromRanking', false)
      }
      // vm.$store.commit('setOthersOpenID', '')
      // vm.$store.commit('setIsFromRanking', false)
      next();
    },
    methods: {
      getCurrentIndex1(e) {
        this.btnCurrentIndex = e;
        this.detailSwiper1.slideTo(e);
      },
      getCurrentIndex2(e) {
        this.tabCurrentIndex1 = e;
        this.detailSwiper2.slideTo(e);
      },
      getCurrentIndex3(e) {
        this.tabCurrentIndex2 = e;
        this.detailSwiper3.slideTo(e);
      },
      onClickToExpand() {

      },
      onClickToggle($event, item) {
        $event.stopPropagation()
        item.folded = !item.folded
      },
      objAssignment(obj) {

      },
      ajax(url, params, list, scroll, wrapElement, orderNum) {
        console.log('orderNum', orderNum)
        switch (orderNum) {
          case 1: {
            this.showLoadingWrap1 = true
            this.showLoadingImg1 = true
            break
          }
          case 2: {
            this.showLoadingWrap2 = true
            this.showLoadingImg2 = true
            break
          }
          case 3: {
            this.showLoadingWrap3 = true
            this.showLoadingImg3 = true
            break
          }
          case 4: {
            this.showLoadingWrap4 = true
            this.showLoadingImg4 = true
            break
          }
          case 5: {
            this.showLoadingWrap5 = true
            this.showLoadingImg5 = true
            break
          }
          case 6: {
            this.showLoadingWrap6 = true
            this.showLoadingImg6 = true
            break
          }
          case 7: {
            this.showLoadingWrap7 = true
            this.showLoadingImg7 = true
            break
          }
          case 8: {
            this.showLoadingWrap8 = true
            this.showLoadingImg8 = true
            break
          }
          case 9: {
            this.showLoadingWrap9 = true
            this.showLoadingImg9 = true
            break
          }
          case 10: {
            this.showLoadingWrap10 = true
            this.showLoadingImg10 = true
            break
          }
          default: {
            break
          }
        }

        let ListPromise = this.leaderArr.map(user => {

          let queryTaskList = JSON.parse(params.queryTaskList)
          queryTaskList.forEach((item) => {
            if (item.chargerID) {
              item.chargerID = user.fleaderID
            }
            if (item.helperID) {
              item.helperID = user.fleaderID
            }
          })

          params.queryTaskList = JSON.stringify(queryTaskList)
          console.log('params.queryTaskList', params.queryTaskList)
          return axios({
            method: 'post',
            url: url,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: Qs.stringify(params)
          })
        });
        Promise.all(ListPromise)
          .then((values) => {
            if (values.length > 0) {

              values.forEach((response, index) => {
                let amount = response.data.result.amount
                if (amount > 0) {
                  let obj = {}

                  let taskList = response.data.result.data
                  obj.id = this.leaderArr[index].fleaderID
                  obj.name = this.leaderArr[index].fleaderName
                  obj.taskList = taskList
                  list.push(obj)
                }
              })


              if (list.length > 0) {
                switch (orderNum) {
                  case 1: {
                    this.showLoadingWrap1 = false
                    break
                  }
                  case 2: {
                    this.showLoadingWrap2 = false
                    break
                  }
                  case 3: {
                    this.showLoadingWrap3 = false
                    break
                  }
                  case 4: {
                    this.showLoadingWrap4 = false
                    break
                  }
                  case 5: {
                    this.showLoadingWrap5 = false
                    break
                  }
                  case 6: {
                    this.showLoadingWrap6 = false
                    break
                  }
                  case 7: {
                    this.showLoadingWrap7 = false
                    break
                  }
                  case 8: {
                    this.showLoadingWrap8 = false
                    break
                  }
                  case 9: {
                    this.showLoadingWrap9 = false
                    break
                  }
                  case 10: {
                    this.showLoadingWrap10 = false
                    break
                  }
                  default: {
                    break
                  }
                }
              }
              else {
                switch (orderNum) {
                  case 1: {
                    this.showLoadingWrap1 = true
                    this.showLoadingImg1 = false
                    break
                  }
                  case 2: {
                    this.showLoadingWrap2 = true
                    this.showLoadingImg2 = false
                    break
                  }
                  case 3: {
                    this.showLoadingWrap3 = true
                    this.showLoadingImg3 = false
                    break
                  }
                  case 4: {
                    this.showLoadingWrap4 = true
                    this.showLoadingImg4 = false
                    break
                  }
                  case 5: {
                    this.showLoadingWrap5 = true
                    this.showLoadingImg5 = false
                    break
                  }
                  case 6: {
                    this.showLoadingWrap6 = true
                    this.showLoadingImg6 = false
                    break
                  }
                  case 7: {
                    this.showLoadingWrap7 = true
                    this.showLoadingImg7 = false
                    break
                  }
                  case 8: {
                    this.showLoadingWrap8 = true
                    this.showLoadingImg8 = false
                    break
                  }
                  case 9: {
                    this.showLoadingWrap9 = true
                    this.showLoadingImg9 = false
                    break
                  }
                  case 10: {
                    this.showLoadingWrap10 = true
                    this.showLoadingImg10 = false
                    break
                  }
                  default: {
                    break
                  }
                }
              }
              list.forEach((item) => {
                // item.$set('folded',true)
                this.$set(item, 'folded', false)
              })

              if (scroll) {
                scroll.finishPullUp()
                scroll.refresh()
              }
              this.$initScroll(scroll, wrapElement)
            }
            else {
              switch (orderNum) {
                case 1: {
                  this.showLoadingWrap1 = true
                  this.showLoadingImg1 = false
                  break
                }
                case 2: {
                  this.showLoadingWrap2 = true
                  this.showLoadingImg2 = false
                  break
                }
                case 3: {
                  this.showLoadingWrap3 = true
                  this.showLoadingImg3 = false
                  break
                }
                case 4: {
                  this.showLoadingWrap4 = true
                  this.showLoadingImg4 = false
                  break
                }
                case 5: {
                  this.showLoadingWrap5 = true
                  this.showLoadingImg5 = false
                  break
                }
                case 6: {
                  this.showLoadingWrap6 = true
                  this.showLoadingImg6 = false
                  break
                }
                case 7: {
                  this.showLoadingWrap7 = true
                  this.showLoadingImg7 = false
                  break
                }
                case 8: {
                  this.showLoadingWrap8 = true
                  this.showLoadingImg8 = false
                  break
                }
                case 9: {
                  this.showLoadingWrap9 = true
                  this.showLoadingImg9 = false
                  break
                }
                case 10: {
                  this.showLoadingWrap10 = true
                  this.showLoadingImg10 = false
                  break
                }
                default: {
                  break
                }
              }
            }

          })
          .catch((error) => {
            switch (orderNum) {
              case 1: {
                this.showLoadingWrap1 = true
                this.showLoadingImg1 = false
                break
              }
              case 2: {
                this.showLoadingWrap2 = true
                this.showLoadingImg2 = false
                break
              }
              case 3: {
                this.showLoadingWrap3 = true
                this.showLoadingImg3 = false
                break
              }
              case 4: {
                this.showLoadingWrap4 = true
                this.showLoadingImg4 = false
                break
              }
              case 5: {
                this.showLoadingWrap5 = true
                this.showLoadingImg5 = false
                break
              }
              case 6: {
                this.showLoadingWrap6 = true
                this.showLoadingImg6 = false
                break
              }
              case 7: {
                this.showLoadingWrap7 = true
                this.showLoadingImg7 = false
                break
              }
              case 8: {
                this.showLoadingWrap8 = true
                this.showLoadingImg8 = false
                break
              }
              case 9: {
                this.showLoadingWrap9 = true
                this.showLoadingImg9 = false
                break
              }
              case 10: {
                this.showLoadingWrap10 = true
                this.showLoadingImg10 = false
                break
              }
              default: {
                break
              }
            }
          })
      },
      loadData(openId, taskType, timeRange, taskStatus, page, pageAmount) {
        this.$store.commit('setCurrentBtnIndex', timeRange)
        this.$store.commit('setCurrentTabIndex', taskStatus)
        console.log(openId, taskType, timeRange, taskStatus, page, pageAmount)

        let queryTask = {
          endtime: undefined,
          starttime: undefined,
          state: undefined,
          chargerID: undefined,
          signerID: undefined,
          life_done_type: undefined,
          helperID: undefined,
          level: 1
        }

        let queryTaskHelper = {
          endtime: undefined,
          starttime: undefined,
          state: undefined,
          chargerID: undefined,
          signerID: undefined,
          life_done_type: undefined,
          helperID: undefined,
          level: 1
        }

        // let url = this.$url + '/taskSystem/task/list'
        let url = 'http://rest.apizza.net/mock/21c5cf3ed4022de252a80d8e8366c6f7/getList'

        if (taskType === 'charge') {
          queryTask.chargerID = openId
          queryTaskHelper.helperID = openId
        } else if (taskType === "sign") {
          queryTask.signerID = openId
        }
        if (timeRange === 0) {
          let today = new Date()
          queryTask.starttime = ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)]
          queryTask.endtime = [util.getFirstDateOfMonthHMS(today), '9999-12-31 23:59:59']

          queryTaskHelper.starttime = ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)]
          queryTaskHelper.endtime = [util.getFirstDateOfMonthHMS(today), '9999-12-31 23:59:59']

          if (taskStatus === 0) {
            console.log('taskStatus', taskStatus)

            queryTask.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]
            queryTask.life_done_type = undefined
            queryTask.state = [2, 3, 4]

            queryTaskHelper.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]
            queryTaskHelper.life_done_type = undefined
            queryTaskHelper.state = [2, 3, 4]

            let queryTaskList = []
            queryTaskList.push(queryTask)
            if (taskType === 'charge') {
              queryTaskList.push(queryTaskHelper)
            }
            let params = {
              page,
              pageAmount,
              queryTaskList: JSON.stringify(queryTaskList),
            }


            if (!this.showLoadingWrap1 && this.list1.length === 0) {
              this.showLoadingWrap1 = true
              this.showLoadingImg1 = true
              console.log('params!!!!!!!', params)
              this.ajax(url, params, this.list1, this.scroll1, this.$refs.wrapper1, 1)
            }

          }
          else if (taskStatus === 1) {

            queryTask.starttime = ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)]
            queryTask.life_done_type = 1
            queryTask.state = [3]
            queryTask.life_state = 3

            queryTaskHelper.starttime = ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)]
            queryTaskHelper.life_done_type = 1
            queryTaskHelper.state = [3]
            queryTaskHelper.life_state = 3

            let queryTaskList = []
            queryTaskList.push(queryTask)
            if (taskType === 'charge') {
              queryTaskList.push(queryTaskHelper)
            }
            // axios.get('http://www.doclever.cn:8090/mock/5ca56bd7c273b90cd8215ed9/getBillListV1', {
            let params = {
              page,
              pageAmount,
              queryTaskList: JSON.stringify(queryTaskList),
            }
            if (!this.showLoadingWrap2 && this.list2.length === 0) {
              this.showLoadingWrap2 = true
              this.showLoadingImg2 = true
              this.ajax(url, params, this.list2, this.scroll2, this.$refs.wrapper2, 2)
            }

          }
          else if (taskStatus === 2) {

            queryTask.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]
            queryTask.endtime = [util.getYearMonthDayHMSString(today), '9999-12-31 23:59:59']
            queryTask.life_done_type = undefined
            queryTask.state = [2]

            queryTaskHelper.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]
            queryTaskHelper.endtime = [util.getYearMonthDayHMSString(today), '9999-12-31 23:59:59']
            queryTaskHelper.life_done_type = undefined
            queryTaskHelper.state = [2]

            let queryTaskList = []
            queryTaskList.push(queryTask)
            if (taskType === 'charge') {
              queryTaskList.push(queryTaskHelper)
            }
            let params = {
              page,
              pageAmount,
              queryTaskList: JSON.stringify(queryTaskList),
            }
            if (!this.showLoadingWrap3 && this.list3.length === 0) {
              this.showLoadingWrap3 = true
              this.showLoadingImg3 = true
              this.ajax(url, params, this.list3, this.scroll3, this.$refs.wrapper3, 3)
            }
          }
          else if (taskStatus === 3) {

            queryTask.starttime = ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)]
            queryTask.life_done_type = 0
            queryTask.state = [3]
            queryTask.life_state = 3

            queryTaskHelper.starttime = ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)]
            queryTaskHelper.life_done_type = 0
            queryTaskHelper.state = [3]
            queryTaskHelper.life_state = 3
            // console.log(util.getLastDateOfMonthHMS(today))
            // console.log(util.getFirstDateOfMonthHMS(today))
            // console.log(today.getDate()+1)
            // console.log(today.setDate(today.getDate()+1))
            let newDay = today.getDate() + 1
            let todayCopy = new Date(today)
            todayCopy.setDate(newDay)
            console.log(util.getYearMonthDayHMSString(todayCopy))
            console.log(util.getFirstDateOfMonthHMS(today))

            let queryTask2 = {
              state: [2],
              starttime: ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)],
              endtime: [util.getFirstDateOfMonthHMS(today), util.getYearMonthDayHMSString(today)],
              chargerID: undefined,
              signerID: undefined,
              level: 1
            }

            let queryTaskHelper2 = {
              state: [2],
              starttime: ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)],
              endtime: [util.getFirstDateOfMonthHMS(today), util.getYearMonthDayHMSString(today)],
              helperID: openId,
              level: 1
            }
            if (taskType === 'charge') {
              queryTask2.chargerID = openId
              queryTask2.signerID = undefined
            } else if (taskType === "sign") {
              queryTask2.chargerID = undefined
              queryTask2.signerID = openId
            }
            let queryTaskList = []
            queryTaskList.push(queryTask)
            queryTaskList.push(queryTask2)
            if (taskType === 'charge') {
              queryTaskList.push(queryTaskHelper)
              queryTaskList.push(queryTaskHelper2)
            }
            let params = {
              page,
              pageAmount,
              queryTaskList: JSON.stringify(queryTaskList),
            }
            if (!this.showLoadingWrap4 && this.list4.length === 0) {
              this.showLoadingWrap4 = true
              this.showLoadingImg4 = true
              this.ajax(url, params, this.list4, this.scroll4, this.$refs.wrapper4, 4)
            }
          }
        }
        else if (timeRange === 1) {
          this.$store.commit('setCurrentBtnIndex', 1)

          let today = new Date()
          queryTask.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]
          // queryTask.endtime = [util.getFirstDateOfYearHMS(today), '9999-12-31 23:59:59']
          queryTask.endtime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']
          queryTaskHelper.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]
          // queryTaskHelper.endtime = [util.getFirstDateOfYearHMS(today), '9999-12-31 23:59:59']
          queryTaskHelper.endtime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']

          if (taskStatus === 0) {
            queryTask.state = [2, 3, 4]

            queryTaskHelper.state = [2, 3, 4]

            let queryTaskList = []
            queryTaskList.push(queryTask)
            if (taskType === 'charge') {
              queryTaskList.push(queryTaskHelper)
            }
            // axios.get('http://www.doclever.cn:8090/mock/5ca56bd7c273b90cd8215ed9/getBillListV1', {
            // ajax(url,queryTask,showLoadingWrap1,list1,scroll1,showLoadingImg1)
            let params = {
              page,
              pageAmount,
              queryTaskList: JSON.stringify(queryTaskList),
            }
            if (!this.showLoadingWrap5 && this.list5.length === 0) {
              this.showLoadingWrap5 = true
              this.showLoadingImg5 = true
              this.ajax(url, params, this.list5, this.scroll5, this.$refs.wrapper5, 5)
            }
          }
          else if (taskStatus === 1) {

            // queryTask.starttime = ['1970-01-01 00:00:00', util.getLastDateOfYearHMS(today)]
            queryTask.starttime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']
            queryTask.life_done_type = 1
            queryTask.state = [3]
            queryTask.life_state = 3

            // queryTaskHelper.starttime = ['1970-01-01 00:00:00', util.getLastDateOfYearHMS(today)]
            queryTaskHelper.starttime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']
            queryTaskHelper.life_done_type = 1
            queryTaskHelper.state = [3]
            queryTaskHelper.life_state = 3

            let queryTaskList = []
            queryTaskList.push(queryTask)
            if (taskType === 'charge') {
              queryTaskList.push(queryTaskHelper)
            }
            let params = {
              page,
              pageAmount,
              queryTaskList: JSON.stringify(queryTaskList),
            }
            if (!this.showLoadingWrap6 && this.list6.length === 0) {
              this.showLoadingWrap6 = true
              this.showLoadingImg6 = true
              this.ajax(url, params, this.list6, this.scroll6, this.$refs.wrapper6, 6)
            }
          }
          else if (taskStatus === 2) {

            queryTask.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]
            queryTask.endtime = [util.getYearMonthDayHMSString(today), '9999-12-31 23:59:59']
            queryTask.life_done_type = undefined
            queryTask.state = [2]

            queryTaskHelper.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]
            queryTaskHelper.endtime = [util.getYearMonthDayHMSString(today), '9999-12-31 23:59:59']
            queryTaskHelper.life_done_type = undefined
            queryTaskHelper.state = [2]

            let queryTaskList = []
            queryTaskList.push(queryTask)
            if (taskType === 'charge') {
              queryTaskList.push(queryTaskHelper)
            }
            let params = {
              page,
              pageAmount,
              queryTaskList: JSON.stringify(queryTaskList),
            }
            if (!this.showLoadingWrap7 && this.list7.length === 0) {
              this.showLoadingWrap7 = true
              this.showLoadingImg7 = true
              this.ajax(url, params, this.list7, this.scroll7, this.$refs.wrapper7, 7)
            }
          }
          else if (taskStatus === 3) {

            // queryTask.starttime = ['1970-01-01 00:00:00', util.getLastDateOfYearHMS(today)]
            queryTask.starttime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']
            queryTask.life_done_type = 0
            queryTask.state = [3]
            queryTask.life_state = 3
            // queryTaskHelper.starttime = ['1970-01-01 00:00:00', util.getLastDateOfYearHMS(today)]
            queryTaskHelper.starttime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']
            queryTaskHelper.life_done_type = 0
            queryTaskHelper.state = [3]
            queryTaskHelper.life_state = 3

            let newDay = today.getDate() + 1
            let todayCopy = new Date(today)
            todayCopy.setDate(newDay)

            let queryTask2 = {
              state: [2],
              // starttime: ['1970-01-01 00:00:00', util.getLastDateOfYearHMS(today)],
              starttime: ['1970-01-01 00:00:00', '9999-12-31 23:59:59'],
              // endtime: [util.getFirstDateOfYearHMS(today), util.getYearMonthDayHMSString(today)],
              endtime: ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)],
              chargerID: undefined,
              signerID: undefined,
              level: 1
            }
            let queryTaskHelper2 = {
              state: [2],
              // starttime: ['1970-01-01 00:00:00', util.getLastDateOfYearHMS(today)],
              starttime: ['1970-01-01 00:00:00', '9999-12-31 23:59:59'],
              // endtime: [util.getFirstDateOfYearHMS(today), util.getYearMonthDayHMSString(today)],
              endtime: ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)],
              helperID: openId,
              level: 1
            }
            if (taskType === 'charge') {
              queryTask2.chargerID = openId
              queryTask2.signerID = undefined
            } else if (taskType === "sign") {
              queryTask2.chargerID = undefined
              queryTask2.signerID = openId
            }
            let queryTaskList = []
            queryTaskList.push(queryTask)
            queryTaskList.push(queryTask2)

            if (taskType === 'charge') {
              queryTaskList.push(queryTaskHelper)
              queryTaskList.push(queryTaskHelper2)
            }

            let params = {
              page,
              pageAmount,
              queryTaskList: JSON.stringify(queryTaskList),
            }
            if (!this.showLoadingWrap8 && this.list8.length === 0) {
              this.showLoadingWrap8 = true
              this.showLoadingImg8 = true
              this.ajax(url, params, this.list8, this.scroll8, this.$refs.wrapper8, 8)
            }
          }
          else if (taskStatus === 4) {

            // queryTask.starttime = ['1970-01-01 00:00:00', util.getLastDateOfYearHMS(today)]
            queryTask.starttime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']
            queryTask.state = [4]
            // queryTaskHelper.starttime = ['1970-01-01 00:00:00', util.getLastDateOfYearHMS(today)]
            queryTaskHelper.starttime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']
            queryTaskHelper.state = [4]

            let queryTaskList = []
            queryTaskList.push(queryTask)
            if (taskType === 'charge') {
              queryTaskList.push(queryTaskHelper)
            }
            let params = {
              page,
              pageAmount,
              queryTaskList: JSON.stringify(queryTaskList),
            }
            if (!this.showLoadingWrap9 && this.list9.length === 0) {
              this.showLoadingWrap9 = true
              this.showLoadingImg9 = true
              this.ajax(url, params, this.list9, this.scroll9, this.$refs.wrapper9, 9)
            }
          }
        }
      },
      isFinish(item) {
        if (item.taskLifeList && item.taskLifeList.length > 0) {
          for (let i = 0; i < item.taskLifeList.length; i++) {
            if (item.taskLifeList[i].type === 3) {
              return item.taskLifeList[i].done_type
            }
          }
        }
      },
      createQueryList(openID, taskType, timeRange) {
        // let getNumURL = this.$url + "/taskSystem/task/getAmount"

        let today = new Date()

        let queryTask1 = {
          state: [2, 3, 4],
          level: 1
        }

        let queryTaskHelper1 = {
          state: [2, 3, 4],
          level: 1
        }

        let queryTask2 = {
          state: [3],
          life_done_type: 1,
          level: 1,
          life_state: 3
        }

        let queryTaskHelper2 = {
          state: [3],
          life_done_type: 1,
          level: 1,
          life_state: 3
        }

        let queryTask3 = {
          state: [2],
          level: 1
        }

        let queryTaskHelper3 = {
          state: [2],
          level: 1
        }

        let queryTask4 = {
          state: [3],
          life_done_type: 0,
          level: 1,
          life_state: 3
        }

        let queryTaskHelper4 = {
          state: [3],
          life_done_type: 0,
          level: 1,
          life_state: 3
        }

        let queryTask4_2 = {
          state: [2],
          level: 1
        }

        let queryTaskHelper4_2 = {
          state: [2],
          level: 1
        }

        let queryTask5 = {
          state: [4],
          level: 1
        }

        let queryTaskHelper5 = {
          state: [4],
          level: 1
        }

        if (taskType === 'charge') {
          queryTask1.chargerID = openID
          queryTask2.chargerID = openID
          queryTask3.chargerID = openID
          queryTask4.chargerID = openID
          queryTask4_2.chargerID = openID
          queryTask5.chargerID = openID

          queryTaskHelper1.helperID = openID
          queryTaskHelper2.helperID = openID
          queryTaskHelper3.helperID = openID
          queryTaskHelper4.helperID = openID
          queryTaskHelper4_2.helperID = openID
          queryTaskHelper5.helperID = openID

          queryTask1.signerID = undefined
          queryTask2.signerID = undefined
          queryTask3.signerID = undefined
          queryTask4.signerID = undefined
          queryTask4_2.signerID = undefined
          queryTask5.signerID = undefined
        }
        else if (taskType === 'sign') {
          queryTask1.chargerID = undefined
          queryTask2.chargerID = undefined
          queryTask3.chargerID = undefined
          queryTask4.chargerID = undefined
          queryTask4_2.chargerID = undefined
          queryTask5.chargerID = undefined

          queryTaskHelper1.helperID = undefined
          queryTaskHelper2.helperID = undefined
          queryTaskHelper3.helperID = undefined
          queryTaskHelper4.helperID = undefined
          queryTaskHelper4_2.helperID = undefined
          queryTaskHelper5.helperID = undefined

          queryTask1.signerID = openID
          queryTask2.signerID = openID
          queryTask3.signerID = openID
          queryTask4.signerID = openID
          queryTask4_2.signerID = openID
          queryTask5.signerID = openID
        }

        if (timeRange === 0) {

          queryTask1.endtime = [util.getFirstDateOfMonthHMS(today), '9999-12-31 23:59:59']
          queryTask1.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]

          queryTask2.endtime = [util.getFirstDateOfMonthHMS(today), '9999-12-31 23:59:59']
          queryTask2.starttime = ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)]

          queryTask3.endtime = [util.getYearMonthDayHMSString(today), '9999-12-31 23:59:59']
          queryTask3.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]

          queryTask4.endtime = [util.getFirstDateOfMonthHMS(today), '9999-12-31 23:59:59']
          queryTask4.starttime = ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)]

          queryTask4_2.endtime = [util.getFirstDateOfMonthHMS(today), util.getYearMonthDayHMSString(today)]
          queryTask4_2.starttime = ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)]

          queryTaskHelper1.endtime = [util.getFirstDateOfMonthHMS(today), '9999-12-31 23:59:59']
          queryTaskHelper1.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]

          queryTaskHelper2.endtime = [util.getFirstDateOfMonthHMS(today), '9999-12-31 23:59:59']
          queryTaskHelper2.starttime = ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)]

          queryTaskHelper3.endtime = [util.getYearMonthDayHMSString(today), '9999-12-31 23:59:59']
          queryTaskHelper3.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]

          queryTaskHelper4.endtime = [util.getFirstDateOfMonthHMS(today), '9999-12-31 23:59:59']
          queryTaskHelper4.starttime = ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)]

          queryTaskHelper4_2.endtime = [util.getFirstDateOfMonthHMS(today), util.getYearMonthDayHMSString(today)]
          queryTaskHelper4_2.starttime = ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)]

          queryTask5.starttime = ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)]
          queryTask5.endtime = [util.getFirstDateOfMonthHMS(today), '9999-12-31 23:59:59']

          queryTaskHelper5.starttime = ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)]
          queryTaskHelper5.endtime = [util.getFirstDateOfMonthHMS(today), '9999-12-31 23:59:59']
        }
        else if (timeRange === 1) {

          // queryTask1.endtime = [util.getFirstDateOfYearHMS(today), '9999-12-31 23:59:59']
          // queryTask1.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]
          //
          // queryTask2.endtime = [util.getFirstDateOfYearHMS(today), '9999-12-31 23:59:59']
          // queryTask2.starttime = ['1970-01-01 00:00:00', util.getLastDateOfYearHMS(today)]
          //
          // queryTask3.endtime = [util.getYearMonthDayHMSString(today), '9999-12-31 23:59:59']
          // queryTask3.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]
          //
          // queryTask4.endtime = [util.getFirstDateOfYearHMS(today), '9999-12-31 23:59:59']
          // queryTask4.starttime = ['1970-01-01 00:00:00', util.getLastDateOfYearHMS(today)]
          //
          // queryTask4_2.endtime = [util.getFirstDateOfYearHMS(today), util.getYearMonthDayHMSString(today)]
          // queryTask4_2.starttime = ['1970-01-01 00:00:00', util.getLastDateOfYearHMS(today)]
          //
          // queryTask5.starttime = ['1970-01-01 00:00:00', util.getLastDateOfYearHMS(today)]
          // queryTask5.endtime = [util.getFirstDateOfYearHMS(today), '9999-12-31 23:59:59']
          //
          //
          // queryTaskHelper1.endtime = [util.getFirstDateOfYearHMS(today), '9999-12-31 23:59:59']
          // queryTaskHelper1.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]
          //
          // queryTaskHelper2.endtime = [util.getFirstDateOfYearHMS(today), '9999-12-31 23:59:59']
          // queryTaskHelper2.starttime = ['1970-01-01 00:00:00', util.getLastDateOfYearHMS(today)]
          //
          // queryTaskHelper3.endtime = [util.getYearMonthDayHMSString(today), '9999-12-31 23:59:59']
          // queryTaskHelper3.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]
          //
          // queryTaskHelper4.endtime = [util.getFirstDateOfYearHMS(today), '9999-12-31 23:59:59']
          // queryTaskHelper4.starttime = ['1970-01-01 00:00:00', util.getLastDateOfYearHMS(today)]
          //
          // queryTaskHelper4_2.endtime = [util.getFirstDateOfYearHMS(today), util.getYearMonthDayHMSString(today)]
          // queryTaskHelper4_2.starttime = ['1970-01-01 00:00:00', util.getLastDateOfYearHMS(today)]
          //
          // queryTaskHelper5.starttime = ['1970-01-01 00:00:00', util.getLastDateOfYearHMS(today)]
          // queryTaskHelper5.endtime = [util.getFirstDateOfYearHMS(today), '9999-12-31 23:59:59']

          queryTask1.endtime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']
          queryTask1.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]

          queryTask2.endtime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']
          queryTask2.starttime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']

          queryTask3.endtime = [util.getYearMonthDayHMSString(today), '9999-12-31 23:59:59']
          queryTask3.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]

          queryTask4.endtime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']
          queryTask4.starttime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']

          queryTask4_2.endtime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]
          queryTask4_2.starttime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']

          queryTask5.starttime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']
          queryTask5.endtime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']


          queryTaskHelper1.endtime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']
          queryTaskHelper1.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]

          queryTaskHelper2.endtime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']
          queryTaskHelper2.starttime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']

          queryTaskHelper3.endtime = [util.getYearMonthDayHMSString(today), '9999-12-31 23:59:59']
          queryTaskHelper3.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]

          queryTaskHelper4.endtime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']
          queryTaskHelper4.starttime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']

          queryTaskHelper4_2.endtime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]
          queryTaskHelper4_2.starttime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']

          queryTaskHelper5.starttime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']
          queryTaskHelper5.endtime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']
        }
        let all = {}
        let finished = {}
        let doing = {}
        let unfinish = {}
        let abolish = {}
        if (taskType === 'charge') {
          all = {
            name: 'all',
            param: [queryTask1, queryTaskHelper1],
          }
          finished = {
            name: 'finished',
            param: [queryTask2, queryTaskHelper2],
          }
          doing = {
            name: 'doing',
            param: [queryTask3, queryTaskHelper3],
          }
          unfinish = {
            name: 'unfinish',
            param: [queryTask4, queryTaskHelper4, queryTask4_2, queryTaskHelper4_2],
          }
          abolish = {
            name: 'abolish',
            param: [queryTask5, queryTaskHelper5],
          }
        }
        else if (taskType === 'sign') {
          all = {
            name: 'all',
            param: [queryTask1],
          }
          finished = {
            name: 'finished',
            param: [queryTask2],
          }
          doing = {
            name: 'doing',
            param: [queryTask3],
          }
          unfinish = {
            name: 'unfinish',
            param: [queryTask4, queryTask4_2],
          }
          abolish = {
            name: 'abolish',
            param: [queryTask5],
          }
        }

        let queryList = []
        if (timeRange === 0) {
          queryList = [all, finished, doing, unfinish, abolish]
        }
        else if (timeRange === 1) {
          queryList = [all, finished, doing, unfinish, abolish]
        }

        return queryList
      },
      getQueryTaskListToSearch($event) {
        console.log('----------------')
        console.log($event)
        // let url = this.$url + '/taskSystem/task/list'
        let url = 'http://rest.apizza.net/mock/21c5cf3ed4022de252a80d8e8366c6f7/getList'
        let params = {
          page: 1,
          pageAmount: 10000,
          queryTaskList: JSON.stringify($event),
        }
        this.list = []
        this.ajax(url, params, this.list, this.scroll, this.$refs.wrapper, 10)
        this.showSearchResult = true
        localStorage.setItem('keepShowResultOpen', '1')
        localStorage.setItem('searchParams', JSON.stringify($event))
      },
      clearSearchResult() {
        this.scroll = null
        this.list = []
        this.showSearchResult = false
        localStorage.setItem('keepShowResultOpen', '0')


        this.$nextTick(() => {
          this.detailSwiper1 = new Swiper('.first-container', {
            on: {
              slideChangeTransitionStart: () => {
                console.log(this.detailSwiper1.activeIndex)
                this.btnCurrentIndex = this.detailSwiper1.activeIndex
              }
            },
          })
          this.detailSwiper2 = new Swiper('.second-container', {
            on: {
              slideChangeTransitionStart: () => {
                this.tabCurrentIndex1 = this.detailSwiper2.activeIndex
              }
            },
          })
          this.detailSwiper3 = new Swiper('.third-container', {
            on: {
              slideChangeTransitionStart: () => {
                this.tabCurrentIndex2 = this.detailSwiper3.activeIndex
              }
            },
          })
        })
      }
    },
  }
</script>

<style scoped lang="scss">
    .list-container {
        height: 100%;
        &.riseup {
            height: 0;
        }
    }

    header {
        height: 0.46rem;
        background-color: #397de8;
        text-align: center;
        position: relative;
        .icon {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: 0.12rem;
            display: inline-block;
            width: 0.2rem;
            height: 0.2rem;
            background: url("../../assets/搜索.png") no-repeat !important;
            background-size: contain !important;
        }
    }

    .first-container {
        height: calc(100% - 0.46rem);
        .second-container, .third-container {
            height: calc(100% - 0.41rem);
            .swiper-wrapper {
                height: 100%;
                .swiper-slide {
                    height: 100%;
                    .list-wrap {
                        height: 100%;
                        overflow: hidden;
                        /*ul {*/
                        /*min-height: 100.1%;*/
                        /*}*/

                    }

                }
            }
        }
    }

    .search-container {
        height: 100%;
        header {
            height: 0.46rem;
            background-color: #397de8;
            /*text-align: center;*/
            position: relative;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            div {
                /*margin-left: 0.16rem;*/
                padding: 0.12rem;
                font-size: 0.13rem;
                color: #fff;
                background-color: #367be7;
            }
            .icon {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                right: 0.12rem;
                display: inline-block;
                width: 0.2rem;
                height: 0.2rem;
                background: url("../../assets/搜索.png") no-repeat !important;
                background-size: contain !important;
            }
        }
        .list-wrap {
            height: calc(100% - 0.46rem);
            overflow: hidden;
        }
    }

    .swiper-slide {
        font-size: 12px;
    }

    .parent-tabwrap {
        border-bottom: 1px solid #f6f6f6;
    }

    .task {
        /*overflow: hidden;*/
        > .charger-wrap {
            padding: 0 0.12rem;
            margin-bottom: 0.1rem;
            background-color: #fff;
            padding-bottom: 0.1rem;
            &:last-child {
                margin-bottom: 0;
            }
            .charger-name {
                padding: 0.07rem 0 0 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .left {
                    font-size: 0.14rem;
                    color: #000000;
                }
                .toggle-bottom {
                    padding: 0.1rem 0.1rem;
                    text-align: right;
                    div {
                        > p {
                            margin-left: auto;
                            /*padding: 0.07rem 0 0 0.1rem;*/
                            display: inline-flex;
                            justify-content: flex-end;
                            align-items: center;
                            span {
                                font-size: 0.10rem;
                                color: #a3a3a3;
                            }
                            .icon {
                                margin-left: 0.04rem;
                                display: inline-block;
                                width: 0.14rem;
                                height: 0.1rem;
                                background: url("../../assets/收起.png") no-repeat;
                                background-size: contain;
                                transform: rotate(0deg);
                            }

                            &.unfolded {
                                .icon {
                                    display: inline-block;
                                    width: 0.14rem;
                                    height: 0.1rem;
                                    background: url("../../assets/收起.png") no-repeat;
                                    background-size: contain;
                                    transform: rotate(180deg);
                                }
                            }
                        }
                    }

                }
            }
            .router-link {
                border-bottom: 0.01rem solid #e5e5e5;
                .head {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .title {
                        padding: 0.04rem 0 0.06rem 0;
                        font-size: 0;
                        span {
                            display: inline-block;
                            vertical-align: middle;
                            &.projectName {
                                max-width: 2.4rem;
                                font-size: 0.14rem;
                                color: #3e3e3e;
                            }
                            &.reward {
                                font-size: 0.14rem;
                                color: #3e3e3e;
                                vertical-align: middle;
                            }
                        }
                        /*.projectName{*/
                        /*!*display: inline-flex;*!*/
                        /*max-width: 2.4rem;*/
                        /*font-size: 0.14rem;*/
                        /*color: #3e3e3e;*/
                        /*vertical-align: middle;*/
                        /*}*/
                        /*.reward{*/
                        /*font-size: 0.14rem;*/
                        /*color: #3e3e3e;*/
                        /*vertical-align: middle;*/
                        /*}*/
                    }
                    .date {
                        font-size: 0.12rem;
                        color: #6f6f6f;
                    }
                }
                .middle {
                    padding-bottom: 0.06rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    span {
                        font-size: 0.13rem;
                        color: #666666;
                    }
                }
                .bottom {
                    padding-bottom: 0.12rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .tags {
                        p {
                            margin-right: 0.1rem;
                            display: inline-flex;
                            justify-content: center;
                            align-items: center;
                            border-radius: 0.04rem;
                            &:first-child {
                                background: rgba(23, 178, 130, 0.5);
                                span {
                                    color: #119b70;
                                }
                            }
                            &:nth-of-type(2) {
                                background: #c4dbff;
                                span {
                                    color: #2967c8;
                                }
                            }
                            &:nth-of-type(3) {
                                background: #D6C2AD;
                                span {
                                    color: #EA8742;
                                }
                            }
                            span {
                                padding: 0.03rem 0.12rem;
                                display: inline-flex;
                                justify-content: center;
                                align-items: center;
                                font-size: 0.09rem;
                            }
                            .icon {
                                display: inline-block;
                                width: 0.14rem;
                                height: 0.14rem;
                                background: url("../../assets/right.png") no-repeat !important;
                                background-size: contain !important;
                            }
                        }

                    }
                    .right {

                    }
                }
                &.folded {
                    border-bottom: 0;
                    height: 0;
                    overflow: hidden;
                }
                &:last-child {
                    border-bottom: 0.01rem solid #e5e5e5;
                }
            }
        }

        .child-list {
            overflow: hidden;
            .task {
                li {
                    padding: 0 0 0 0.12rem;
                    border-bottom: 0.01rem solid #f1f1f1;
                }
            }
            &.folded {
                height: 0;
            }
        }

    }

    /*.change-btn {*/
    /*display: inline-block;*/
    /*border-radius: 0.2rem;*/
    /*font-size: 0;*/
    /*background-color: #367be7;*/
    /*border: 1px solid #ffffff;*/
    /*!*height: 0.3rem;*!*/
    /*a {*/
    /*!*display: inline-block;*!*/
    /*!*max-width: 4em;*!*/
    /*!*padding: 0.06rem 0.12rem;*!*/
    /*border-radius: 0.15rem;*/
    /*font-size: 0.13rem;*/
    /*color: #fff;*/
    /*background-color: #367be7;*/

    /*display: inline-flex;*/
    /*justify-content: center;*/
    /*align-items: center;*/
    /*line-height: 1;*/
    /*height: 0.3rem;*/
    /*padding: 0 0.12rem;*/
    /*&.nav_active {*/
    /*background: #fff;*/
    /*color: #367be7;*/
    /*}*/
    /*}*/
    /*}*/

    .btn {
        position: fixed;
        left: 0.12rem;
        bottom: 0.8rem;
        width: 0.4rem;
        height: 0.4rem;
        border-radius: 50%;
        z-index: 9;
        /*background-color: rgba(255, 255, 255, 0.5);*/
        background-color: #599bff;
        /*transform: translateY(20%);*/
        display: flex;
        justify-content: center;
        align-items: center;
        span {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            display: inline-flex;
            justify-content: center;
            align-items: center;
            width: 2.4em;
            height: 2em;
            font-size: 0.1rem;
            color: #ffffff;
            line-height: 1;
        }
    }
</style>
