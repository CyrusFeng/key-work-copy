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
                            <c-tab v-if="titlebar1.length>0"
                                   :titlebar="titlebar1"
                                   @update:currentIndex="getCurrentIndex2($event)"
                                   :currentIndex="tabCurrentIndex1"></c-tab>
                        </div>

                        <div class="swiper-container second-container swiper-no-swiping">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide">
                                    <div class="list-wrap" ref="wrapper1">
                                        <ul class="task">
                                            <router-link tag="li"
                                                         :to="{name:'taskdetail',params:{detailObj:JSON.stringify(item),isCurrentMonth:true}}"
                                                         v-for="item in list1" :key="item.id">
                                                <div class="head">
                                                    <div class="title"><span class="projectName ellipsis">{{item.projectName}}</span><span
                                                            class="reward" v-if="$showReward(item.reward)">(+{{item.reward}}分)</span>
                                                    </div>
                                                    <div class="date">{{item.endtime && item.endtime.split(' ')[0]}}</div>
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
                                                            <!--<span>{{util.compareDate(item.endtime,today)}}</span>-->
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
                                            <Loading :showloadingwrap="showLoadingWrap1"
                                                     :showloadingimg="showLoadingImg1"></Loading>
                                        </ul>
                                    </div>
                                </div>
                                <div class="swiper-slide">
                                    <div class="list-wrap" ref="wrapper2">
                                        <ul class="task">
                                            <router-link tag="li"
                                                         :to="{name:'taskdetail',params:{detailObj:JSON.stringify(item),isCurrentMonth:true}}"
                                                         v-for="item in list2" :key="item.id">
                                                <div class="head">
                                                    <div class="title"><span class="projectName ellipsis">{{item.projectName}}</span><span
                                                            class="reward" v-if="$showReward(item.reward)">(+{{item.reward}}分)</span>
                                                    </div>
                                                    <div class="date">{{item.endtime && item.endtime.split(' ')[0]}}</div>
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
                                                            <span v-if="util.compareDate(item.endtime,today)">推进中</span>
                                                            <span v-else>未完成</span>
                                                        </p>
                                                        <p v-if="item.state === 3">
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
                                            <Loading :showloadingwrap="showLoadingWrap2"
                                                     :showloadingimg="showLoadingImg2"></Loading>
                                        </ul>
                                    </div>
                                </div>
                                <div class="swiper-slide">
                                    <div class="list-wrap" ref="wrapper3">
                                        <ul class="task">
                                            <router-link tag="li"
                                                         :to="{name:'taskdetail',params:{detailObj:JSON.stringify(item),isCurrentMonth:true}}"
                                                         v-for="item in list3" :key="item.id">
                                                <div class="head">
                                                    <div class="title"><span class="projectName ellipsis">{{item.projectName}}</span></div>
                                                    <div class="date">{{item.endtime && item.endtime.split(' ')[0]}}</div>
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
                                                            <span v-if="util.compareDate(item.endtime,today)">推进中</span>
                                                            <span v-else>未完成</span>
                                                        </p>
                                                        <p v-if="item.state === 3">
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
                                            <Loading :showloadingwrap="showLoadingWrap3"
                                                     :showloadingimg="showLoadingImg3"></Loading>
                                        </ul>
                                    </div>
                                </div>
                                <div class="swiper-slide">
                                    <div class="list-wrap" ref="wrapper4">
                                        <ul class="task">
                                            <router-link tag="li"
                                                         :to="{name:'taskdetail',params:{detailObj:JSON.stringify(item),isCurrentMonth:true,showBtn:false}}"
                                                         v-for="item in list4" :key="item.id">
                                                <div class="head">
                                                    <div class="title"><span class="projectName ellipsis">{{item.projectName}}</span><span
                                                            class="reward" v-if="$showReward(item.reward)">(+{{item.reward}}分)</span>
                                                    </div>
                                                    <div class="date">{{item.endtime && item.endtime.split(' ')[0]}}</div>
                                                </div>
                                                <div class="middle">
                                                    <span>责任人：{{item.chargerName}}</span>
                                                    <div class="right">完成日期</div>
                                                </div>
                                                <div class="bottom">
                                                    <div class="tags">
                                                        <p>
                                                            <span>未完成</span>
                                                        </p>
                                                        <!--<p v-if="item.state === 0">-->
                                                        <!--<span>暂存</span>-->
                                                        <!--</p>-->
                                                        <!--<p v-if="item.state === 1">-->
                                                        <!--<span>新增</span>-->
                                                        <!--</p>-->
                                                        <!--<p v-if="item.state === 2">-->
                                                        <!--<span>推进中</span>-->
                                                        <!--</p>-->
                                                        <!--<p v-if="item.state === 3">-->
                                                        <!--<span>已完成</span>-->
                                                        <!--</p>-->
                                                        <!--<p v-if="item.state === 4">-->
                                                        <!--<span>已废止</span>-->
                                                        <!--</p>-->
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
                                            <Loading :showloadingwrap="showLoadingWrap4"
                                                     :showloadingimg="showLoadingImg4"></Loading>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="swiper-slide">
                        <div class="parent-tabwrap">
                            <c-tab v-if="titlebar2.length>0"
                                   :titlebar="titlebar2"
                                   @update:currentIndex="getCurrentIndex3($event)"
                                   :currentIndex="tabCurrentIndex2"></c-tab>
                        </div>

                        <div class="swiper-container third-container swiper-no-swiping">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide">
                                    <div class="list-wrap" ref="wrapper5">
                                        <ul class="task">
                                            <router-link tag="li"
                                                         :to="{name:'taskdetail',params:{detailObj:JSON.stringify(item)},isCurrentMonth:false}"
                                                         v-for="item in list5" :key="item.id">
                                                <div class="head">
                                                    <div class="title"><span class="projectName ellipsis">{{item.projectName}}</span><span
                                                            class="reward" v-if="$showReward(item.reward)">(+{{item.reward}}分)</span>
                                                    </div>
                                                    <div class="date">{{item.endtime && item.endtime.split(' ')[0]}}</div>
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
                                                            <span v-if="util.compareDate(item.endtime,today)">推进中</span>
                                                            <span v-else>未完成</span>
                                                        </p>
                                                        <p v-if="item.state === 3">
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
                                            <Loading :showloadingwrap="showLoadingWrap5"
                                                     :showloadingimg="showLoadingImg5"></Loading>
                                        </ul>
                                    </div>
                                </div>
                                <div class="swiper-slide">
                                    <div class="list-wrap" ref="wrapper6">
                                        <ul class="task">
                                            <router-link tag="li"
                                                         :to="{name:'taskdetail',params:{detailObj:JSON.stringify(item),isCurrentMonth:false}}"
                                                         v-for="item in list6" :key="item.id">
                                                <div class="head">
                                                    <div class="title"><span class="projectName ellipsis">{{item.projectName}}</span><span
                                                            class="reward" v-if="$showReward(item.reward)">(+{{item.reward}}分)</span>
                                                    </div>
                                                    <div class="date">{{item.endtime && item.endtime.split(' ')[0]}}</div>
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
                                                            <span v-if="util.compareDate(item.endtime,today)">推进中</span>
                                                            <span v-else>未完成</span>
                                                        </p>
                                                        <p v-if="item.state === 3">
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
                                            <Loading :showloadingwrap="showLoadingWrap6"
                                                     :showloadingimg="showLoadingImg6"></Loading>
                                        </ul>
                                    </div>
                                </div>
                                <div class="swiper-slide">
                                    <div class="list-wrap" ref="wrapper7">
                                        <ul class="task">
                                            <router-link tag="li"
                                                         :to="{name:'taskdetail',params:{detailObj:JSON.stringify(item),isCurrentMonth:false}}"
                                                         v-for="item in list7" :key="item.id">
                                                <div class="head">
                                                    <div class="title"><span class="projectName ellipsis">{{item.projectName}}</span></div>
                                                    <div class="date">{{item.endtime && item.endtime.split(' ')[0]}}</div>
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
                                                            <span v-if="util.compareDate(item.endtime,today)">推进中</span>
                                                            <span v-else>未完成</span>
                                                        </p>
                                                        <p v-if="item.state === 3">
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
                                            <Loading :showloadingwrap="showLoadingWrap7"
                                                     :showloadingimg="showLoadingImg7"></Loading>
                                        </ul>
                                    </div>
                                </div>
                                <div class="swiper-slide">
                                    <div class="list-wrap" ref="wrapper8">
                                        <ul class="task">
                                            <router-link tag="li"
                                                         :to="{name:'taskdetail',params:{detailObj:JSON.stringify(item),isCurrentMonth:false,showBtn:false}}"
                                                         v-for="item in list8" :key="item.id">
                                                <div class="head">
                                                    <div class="title"><span class="projectName ellipsis">{{item.projectName}}</span><span
                                                            class="reward" v-if="$showReward(item.reward)">(+{{item.reward}}分)</span>
                                                    </div>
                                                    <div class="date">{{item.endtime && item.endtime.split(' ')[0]}}</div>
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
                                                            <span v-if="util.compareDate(item.endtime,today)">推进中</span>
                                                            <span v-else>未完成</span>
                                                        </p>
                                                        <p v-if="item.state === 3">
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
                                            <Loading :showloadingwrap="showLoadingWrap8"
                                                     :showloadingimg="showLoadingImg8"></Loading>
                                        </ul>
                                    </div>
                                </div>
                                <div class="swiper-slide">
                                    <div class="list-wrap" ref="wrapper9">
                                        <ul class="task">
                                            <router-link tag="li"
                                                         :to="{name:'taskdetail',params:{detailObj:JSON.stringify(item),isCurrentMonth:false,showBtn:false}}"
                                                         v-for="item in list9" :key="item.id">
                                                <div class="head">
                                                    <div class="title"><span class="projectName ellipsis">{{item.projectName}}</span><span
                                                            class="reward" v-if="$showReward(item.reward)">(+{{item.reward}}分)</span>
                                                    </div>
                                                    <div class="date">{{item.endtime && item.endtime.split(' ')[0]}}</div>
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
                                                            <span v-if="util.compareDate(item.endtime,today)">推进中</span>
                                                            <span v-else>未完成</span>
                                                        </p>
                                                        <p v-if="item.state === 3">
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
                                            <Loading :showloadingwrap="showLoadingWrap9"
                                                     :showloadingimg="showLoadingImg9"></Loading>
                                        </ul>
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
                <div>共{{searchResultLength}}条</div>
                <i class="icon" v-if="true" @click="openSearch = true"></i>
            </header>
            <div class="list-wrap" ref="wrapper">
                <ul class="task">
                    <router-link tag="li"
                                 :to="{name:'taskdetail',params:{detailObj:JSON.stringify(item),isCurrentMonth:true}}"
                                 v-for="item in list" :key="item.id">
                        <div class="head">
                            <div class="title"><span class="projectName ellipsis">{{item.projectName}}</span><span
                                    class="reward" v-if="$showReward(item.reward)">(+{{item.reward}}分)</span>
                            </div>
                            <div class="date">{{item.endtime && item.endtime.split(' ')[0]}}</div>
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
                                    <!--<span>{{util.compareDate(item.endtime,today)}}</span>-->
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
                    <Loading :showloadingwrap="showLoadingWrap10"
                             :showloadingimg="showLoadingImg10"></Loading>
                </ul>
            </div>
        </div>
        <taskSearch :open="openSearch" @update:open="openSearch = $event" @update:queryTaskList="getQueryTaskListToSearch"></taskSearch>
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
    name: "listSourceAdmin",
    components: {
      'taskSearch': taskSearch,
    },
    data() {
      return {
        btnTitle,
        titlebar1: [],
        titlebar2: [],
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
        showLoadingWrap10: false,
        showLoadingImg1: false,
        showLoadingImg2: false,
        showLoadingImg3: false,
        showLoadingImg4: false,
        showLoadingImg5: false,
        showLoadingImg6: false,
        showLoadingImg7: false,
        showLoadingImg8: false,
        showLoadingImg9: false,
        showLoadingImg10: false,
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
        scroll:null,
        list1: [],
        list2: [],
        list3: [],
        list4: [],
        list5: [],
        list6: [],
        list7: [],
        list8: [],
        list9: [],
        list:[],
        openId: '',
        taskStatus: 0,
        taskType: 0,
        timeRange: [],
        folded: false,
        charge: null,
        sign: null,
        today: new Date(),
        sourceStr: '',
        sourceArr: [],
        util,
        // showSearchResult:false,
        openSearch:false,
        showSearchResult:false,
        searchResultLength:0
      }
    },
    watch: {
      btnCurrentIndex() {
        this.$store.commit('setCurrentBtnIndex', this.btnCurrentIndex)

        if (this.btnCurrentIndex === 0) {
          if (this.isFromRanking) {
            this.loadData(this.$store.getters.othersOpenID, this.$store.state.taskType, 0, this.tabCurrentIndex1, 1, 10)
          }
          else {
            this.loadData(this.$store.state.openID, this.$store.state.taskType, 0, this.tabCurrentIndex1, 1, 10)
          }
        }
        if (this.btnCurrentIndex === 1) {
          if (this.isFromRanking) {
            this.loadData(this.$store.getters.othersOpenID, this.$store.state.taskType, 1, this.tabCurrentIndex2, 1, 10)
          } else {
            this.loadData(this.$store.state.openID, this.$store.state.taskType, 1, this.tabCurrentIndex2, 1, 10)
          }
        }
      },
      tabCurrentIndex1() {
        this.$store.commit('setCurrentTabIndex', this.tabCurrentIndex1)

        if (this.isFromRanking) {
          this.loadData(this.$store.getters.othersOpenID, this.$store.state.taskType, 0, this.tabCurrentIndex1, 1, 10)
        } else {
          this.loadData(this.$store.state.openID, this.$store.state.taskType, 0, this.tabCurrentIndex1, 1, 10)
        }
      },
      tabCurrentIndex2() {
        this.$store.commit('setCurrentTabIndex', this.tabCurrentIndex2)

        if (this.isFromRanking) {
          this.loadData(this.$store.getters.othersOpenID, this.$store.state.taskType, 1, this.tabCurrentIndex2, 1, 10)
        } else {
          this.loadData(this.$store.state.openID, this.$store.state.taskType, 1, this.tabCurrentIndex2, 1, 10)
        }
      },
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
    beforeRouteEnter(to, from, next) {

      next(vm => {
        qing.call('setWebViewTitle', { 'title': '重点工作列表' })

        vm.sourceArr = JSON.parse(vm.$store.getters.sourceIDs)
        // vm.sourceStr = vm.$store.getters.sourceIDs.join(',')

        // vm.leaderArr = vm.$store.getters.leaderArr

        if (from.name === 'source-admin-index') {
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
        if (from.name === null) {
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
        else {
          vm.timeRange = vm.$store.state.currentBtnIndex
          vm.taskStatus = vm.$store.state.currentTabIndex
          vm.taskType = vm.$store.state.taskType
          vm.isFromRanking = vm.$store.getters.isFromRanking
          vm.othersOpenID = vm.$store.getters.othersOpenID


        }
        if(localStorage.getItem('keepShowResultOpen') === '1'){
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


          // let today = new Date()
          // let rangeCurrentMonth = [util.getFirstDateOfMonthHMS(today), util.getLastDateOfMonthHMS(today)]
          // let rangeCurrentYear = [util.getFirstDateOfYearHMS(today), util.getLastDateOfYearHMS(today)]

          // let getNumURL = vm.$url + "/taskSystem/task/getAmount"
          let getNumURL = "http://rest.apizza.net/mock/21c5cf3ed4022de252a80d8e8366c6f7/getAmount"



          vm.loadData(vm.$store.getters.openID, vm.$store.state.taskType, vm.timeRange, vm.taskStatus, 1, 10)


          // let queryTask1 = {
          //   endtime: undefined,
          //   starttime: undefined,
          //   state: undefined,
          //   life_done_type: undefined,
          //   level: 1
          // }
          // // queryTask.starttime = ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)]
          // queryTask1.endtime = [util.getFirstDateOfMonthHMS(today), '9999-12-31 23:59:59']
          // queryTask1.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]
          // queryTask1.life_done_type = undefined
          // queryTask1.state = [2, 3, 4]
          // queryTask1.level = 1
          //
          //
          // let allMonth = {
          //   name: 'all',
          //   param: [],
          // }
          //
          // let queryTask2 = {}
          // queryTask2.endtime = [util.getFirstDateOfMonthHMS(today), '9999-12-31 23:59:59']
          // queryTask2.starttime = ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)]
          // queryTask2.life_done_type = 1
          // queryTask2.state = [3]
          // queryTask2.life_state = 3
          // queryTask2.level = 1
          //
          // let finishedMonth = {
          //   name: 'finished',
          //   param: [],
          // }
          //
          // let queryTask3 = {}
          // queryTask3.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]
          // queryTask3.endtime = [util.getYearMonthDayHMSString(today), '9999-12-31 23:59:59']
          // queryTask3.life_done_type = undefined
          // queryTask3.state = [2]
          // queryTask3.level = 1
          //
          // let doingMonth = {
          //   name: 'doing',
          //   param: [],
          // }
          //
          // let queryTask4 = {}
          // queryTask4.starttime = ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)]
          // queryTask4.life_done_type = 0
          // queryTask4.state = [3]
          // queryTask4.life_state = 3
          // queryTask4.level = 1
          //
          // let queryTask4_2 = {
          //   state: [2],
          //   starttime: ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)],
          //   endtime: [util.getFirstDateOfMonthHMS(today), util.getYearMonthDayHMSString(today)],
          //   level: 1
          // }
          //
          // let unfinishedMonth = {
          //   name: 'unfinish',
          //   param: [],
          // }
          // vm.sourceArr.forEach((source) => {
          //   let obj1 = { ...queryTask1 }
          //   obj1.sourceID = source
          //   allMonth.param.push(obj1)
          //
          //   let obj2 = { ...queryTask2 }
          //   obj2.sourceID = source
          //   finishedMonth.param.push(obj2)
          //
          //   let obj3 = { ...queryTask3 }
          //   obj3.sourceID = source
          //   doingMonth.param.push(obj3)
          //
          //   let obj4 = { ...queryTask4 }
          //   let obj4_2 = { ...queryTask4_2 }
          //   obj4.sourceID = source
          //   obj4_2.sourceID = source
          //   unfinishedMonth.param.push(obj4)
          //   unfinishedMonth.param.push(obj4_2)
          // })

          // let queryListMonth = [allMonth, finishedMonth, doingMonth, unfinishedMonth]

          let queryListMonth = vm.$createQueryList(undefined, 'charge', 0)
          queryListMonth.forEach((query) => {
            let originLength = query.param.length
            let paramList = vm.$duplicate(query.param, vm.sourceArr.length)
            vm.sourceArr.forEach((source, index) => {
              paramList.forEach((queryTask,index2) => {
                if(index2<(index+1)*originLength && index2>=index*originLength){
                  queryTask.sourceID = source
                  queryTask = JSON.parse(JSON.stringify(queryTask))
                  // console.log(queryTask)
                  paramList[index2] = queryTask
                }
              })
            })
          })

          axios({
            method: 'post',
            url: getNumURL,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: Qs.stringify({
              jsonStr: JSON.stringify(queryListMonth),
            })
          }).then((response) => {
            if (response.data.success) {
              let data = response.data.result

              // vm.titlebar[0].charge.all = data.all
              // vm.titlebar[0].charge.finished = data.finished
              // vm.titlebar[0].charge.doing = data.doing
              // vm.titlebar[0].charge.unfinished = data.unfinished

              vm.titlebar1[0].num = data.all
              vm.titlebar1[1].num = data.finished
              vm.titlebar1[2].num = data.doing
              vm.titlebar1[3].num = data.unfinish
            }
          })


          // let queryTask11 = {}
          // queryTask11.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]
          // queryTask11.endtime = [util.getFirstDateOfYearHMS(today), '9999-12-31 23:59:59']
          // queryTask11.life_done_type = undefined
          // queryTask11.state = [2, 3, 4]
          // queryTask11.level = 1
          //
          // let allYear = {
          //   name: 'all',
          //   param: [],
          // }
          //
          // let queryTask22 = {}
          // queryTask22.endtime = [util.getFirstDateOfMonthHMS(today), '9999-12-31 23:59:59']
          // queryTask22.starttime = ['1970-01-01 00:00:00', util.getLastDateOfYearHMS(today)]
          // queryTask22.life_done_type = 1
          // queryTask22.state = [3]
          // queryTask22.life_state = 3
          // queryTask22.level = 1
          //
          // let finishedYear = {
          //   name: 'finished',
          //   param: [],
          // }
          //
          // let queryTask33 = {}
          // queryTask33.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]
          // queryTask33.endtime = [util.getYearMonthDayHMSString(today), '9999-12-31 23:59:59']
          // queryTask33.life_done_type = undefined
          // queryTask33.state = [2]
          // queryTask33.level = 1
          //
          // let doingYear = {
          //   name: 'doing',
          //   param: [],
          // }
          //
          // let queryTask44 = {}
          // queryTask44.starttime = ['1970-01-01 00:00:00', util.getLastDateOfYearHMS(today)]
          // queryTask44.life_done_type = 0
          // queryTask44.state = [3]
          // queryTask44.life_state = 3
          // queryTask44.level = 1
          //
          // let queryTask44_2 = {
          //   state: [2],
          //   starttime: ['1970-01-01 00:00:00', util.getLastDateOfYearHMS(today)],
          //   endtime: [util.getFirstDateOfYearHMS(today), util.getYearMonthDayHMSString(today)],
          //   level: 1
          // }
          //
          // let unfinishedYear = {
          //   name: 'unfinish',
          //   param: [],
          // }
          //
          //
          // let queryTask55 = {}
          // queryTask55.starttime = ['1970-01-01 00:00:00', util.getLastDateOfYearHMS(today)]
          // queryTask55.endtime = [util.getFirstDateOfYearHMS(today), '9999-12-31 23:59:59']
          // queryTask55.state = [4]
          // queryTask55.level = 1
          //
          // let abolishYear = {
          //   name: 'abolish',
          //   param: [],
          // }
          //
          // vm.sourceArr.forEach((source) => {
          //   let obj1 = { ...queryTask11 }
          //   obj1.sourceID = source
          //   allYear.param.push(obj1)
          //
          //   let obj2 = { ...queryTask22 }
          //   obj2.sourceID = source
          //   finishedYear.param.push(obj2)
          //
          //   let obj3 = { ...queryTask33 }
          //   obj3.sourceID = source
          //   doingYear.param.push(obj3)
          //
          //   let obj4 = { ...queryTask44 }
          //   let obj4_2 = { ...queryTask44_2 }
          //   obj4.sourceID = source
          //   obj4_2.sourceID = source
          //   unfinishedYear.param.push(obj4)
          //   unfinishedYear.param.push(obj4_2)
          //
          //   let obj5 = { ...queryTask55 }
          //   obj5.sourceID = source
          //   abolishYear.param.push(obj5)
          //
          // })

          // let queryListYear = [allYear, finishedYear, doingYear, unfinishedYear, abolishYear]

          let queryListYear = vm.$createQueryList(undefined, 'charge', 1)
          queryListYear.forEach((query) => {
            let originLength = query.param.length
            let paramList = vm.$duplicate(query.param, vm.sourceArr.length)
            vm.sourceArr.forEach((source, index) => {
              paramList.forEach((queryTask,index2) => {
                if(index2<(index+1)*originLength && index2>=index*originLength){
                  queryTask.sourceID = source
                  queryTask = JSON.parse(JSON.stringify(queryTask))
                  console.log(queryTask)
                  paramList[index2] = queryTask
                }
              })
            })


            // let paramList = vm.$duplicate(query.param, vm.sourceArr.length)
            // paramList.forEach((queryTask) => {
            //   vm.sourceArr.forEach((source, index) => {
            //     if (index % 2 === 0) {
            //       queryTask.sourceID = source
            //     }
            //   })
            // })
            // paramList.forEach((queryTask) => {
            //   vm.sourceArr.forEach((source, index) => {
            //     if (index % 2 !== 0) {
            //       queryTask.sourceID = source
            //     }
            //   })
            // })
          })


          axios({
            method: 'post',
            url: getNumURL,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: Qs.stringify({
              jsonStr: JSON.stringify(queryListYear),
            })
          })
            .then((response) => {
              if (response.data.success) {
                let data = response.data.result

                vm.titlebar2[0].num = data.all
                vm.titlebar2[1].num = data.finished
                vm.titlebar2[2].num = data.doing
                vm.titlebar2[3].num = data.unfinish
                vm.titlebar2[4].num = data.abolish
              }
            })
          // let sourceStr = vm.$store.state.sourceIDs.join(',')
          // axios.get(getNumURL, {
          //   params: {
          //     sourceStr: vm.sourceStr,
          //     rangeStr: rangeCurrentMonth.join(',')
          //   }
          // })
          //   .then((response) => {
          //     if (response.data.result.length > 0) {
          //       // let obj = {
          //       //   name:'本月'
          //       // }
          //       // obj.charge = {}
          //       response.data.result.forEach((item) => {
          //
          //         // obj.charge.all += Number(item.all.all)
          //         // obj.charge.finished += Number(item.all.finished)
          //         // obj.charge.doing += Number(item.all.doing)
          //         // obj.charge.unfinished += Number(item.all.unfinished)
          //         vm.titlebar1[0].num+= Number(item.all.all)
          //         vm.titlebar1[1].num+= Number(item.all.finished)
          //         vm.titlebar1[2].num+= Number(item.all.doing)
          //         vm.titlebar1[3].num+= Number(item.all.unfinished)
          //       })
          //
          //     }
          //   })
          // axios.get(getNumURL, {
          //   params: {
          //     sourceStr: vm.sourceStr,
          //     rangeStr: rangeCurrentYear.join(',')
          //   }
          // })
          //   .then((response) => {
          //     if (response.data.result.length > 0) {
          //       response.data.result.forEach((item) => {
          //         vm.titlebar2[0].num+= Number(item.all.all)
          //         vm.titlebar2[1].num+= Number(item.all.finished)
          //         vm.titlebar2[2].num+= Number(item.all.doing)
          //         vm.titlebar2[3].num+= Number(item.all.unfinished)
          //         vm.titlebar2[4].num+= Number(item.all.abolish)
          //       })
          //     }
          //   })

        })

      })
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

        axios({
          method: 'post',
          url: url,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          },
          data: Qs.stringify(params)
        })
          .then((response) => {
            switch (orderNum) {
              case 1: {
                this.showLoadingWrap1 = false
                this.showLoadingImg1 = false
                break
              }
              case 2: {
                this.showLoadingWrap2 = false
                this.showLoadingImg2 = false
                break
              }
              case 3: {
                this.showLoadingWrap3 = false
                this.showLoadingImg3 = false
                break
              }
              case 4: {
                this.showLoadingWrap4 = false
                this.showLoadingImg4 = false
                break
              }
              case 5: {
                this.showLoadingWrap5 = false
                this.showLoadingImg5 = false
                break
              }
              case 6: {
                this.showLoadingWrap6 = false
                this.showLoadingImg6 = false
                break
              }
              case 7: {
                this.showLoadingWrap7 = false
                this.showLoadingImg7 = false
                break
              }
              case 8: {
                this.showLoadingWrap8 = false
                this.showLoadingImg8 = false
                break
              }
              case 9: {
                this.showLoadingWrap9 = false
                this.showLoadingImg9 = false
                break
              }
              case 10: {
                this.showLoadingWrap10 = false
                this.showLoadingImg10 = false
                break
              }
              default: {
                break
              }
            }
            let amount = response.data.result.amount
            if (amount > 0) {
              let newlist = response.data.result.data;
              newlist.forEach((item) => {
                list.push(item)
              })
              if (scroll) {
                scroll.finishPullUp()
                scroll.refresh()
              }
              this.$initScroll(scroll, wrapElement, (scroll) => {
                params.page += 1
                this.ajax(url, params, list, scroll, wrapElement, orderNum)
              })
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
            switch (orderNum) {
              case 10: {
                this.searchResultLength = response.data.result.amount
                break
              }
              default: {
                break
              }
            }
          })
          .catch(() => {
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
          // chargerID: undefined,
          // signerID: undefined,
          life_done_type: undefined,
          // helperID: undefined,
          level: 1
        }

        // let queryTaskHelper = {
        //   endtime: undefined,
        //   starttime: undefined,
        //   state: undefined,
        //   chargerID: undefined,
        //   signerID: undefined,
        //   life_done_type: undefined,
        //   helperID: undefined,
        //   level: 1
        // }

        // let url = this.$url + '/taskSystem/task/list'
        let url = 'http://rest.apizza.net/mock/21c5cf3ed4022de252a80d8e8366c6f7/getList'

        // if (taskType === 'charge') {
        //   queryTask.chargerID = openId
        //   queryTaskHelper.helperID = openId
        // } else if (taskType === "sign") {
        //   queryTask.signerID = openId
        // }
        if (timeRange === 0) {
          let today = new Date()
          queryTask.starttime = ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)]
          queryTask.endtime = [util.getFirstDateOfMonthHMS(today), '9999-12-31 23:59:59']

          // queryTaskHelper.starttime = ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)]
          // queryTaskHelper.endtime = [util.getFirstDateOfMonthHMS(today), '9999-12-31 23:59:59']

          if (taskStatus === 0) {
            console.log('taskStatus', taskStatus)

            queryTask.starttime = ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)]
            queryTask.life_done_type = undefined
            queryTask.state = [2, 3, 4]

            // queryTaskHelper.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]
            // queryTaskHelper.life_done_type = undefined
            // queryTaskHelper.state = [2, 3, 4]


            let queryTaskList = []
            if(this.sourceArr.length>0){
              this.sourceArr.forEach((source) => {
                let obj = { ...queryTask }
                obj.sourceID = source

                queryTaskList.push(obj)
              })
            }else{
              queryTaskList.push(queryTask)
            }

            // if (taskType === 'charge') {
            //   queryTaskList.push(queryTaskHelper)
            // }
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

            // queryTaskHelper.starttime = ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)]
            // queryTaskHelper.life_done_type = 1
            // queryTaskHelper.state = [3]
            // queryTaskHelper.life_state = 3

            let queryTaskList = []
            if(this.sourceArr.length>0){
              this.sourceArr.forEach((source) => {
                let obj = { ...queryTask }
                obj.sourceID = source

                queryTaskList.push(obj)
              })
            }else{
              queryTaskList.push(queryTask)
            }
            // if (taskType === 'charge') {
            //   queryTaskList.push(queryTaskHelper)
            // }
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

            // queryTaskHelper.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]
            // queryTaskHelper.endtime = [util.getYearMonthDayHMSString(today), '9999-12-31 23:59:59']
            // queryTaskHelper.life_done_type = undefined
            // queryTaskHelper.state = [2]

            let queryTaskList = []
            if(this.sourceArr.length>0){
              this.sourceArr.forEach((source) => {
                let obj = { ...queryTask }
                obj.sourceID = source

                queryTaskList.push(obj)
              })
            }else{
              queryTaskList.push(queryTask)
            }
            // if (taskType === 'charge') {
            //   queryTaskList.push(queryTaskHelper)
            // }
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

            // queryTaskHelper.starttime = ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)]
            // queryTaskHelper.life_done_type = 0
            // queryTaskHelper.state = [3]
            // queryTaskHelper.life_state = 3
            let newDay = today.getDate() + 1
            let todayCopy = new Date(today)
            todayCopy.setDate(newDay)
            console.log(util.getYearMonthDayHMSString(todayCopy))
            console.log(util.getFirstDateOfMonthHMS(today))

            let queryTask2 = {
              state: [2],
              starttime: ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)],
              endtime: [util.getFirstDateOfMonthHMS(today), util.getYearMonthDayHMSString(today)],
              // chargerID: undefined,
              // signerID: undefined,
              level: 1
            }

            // let queryTaskHelper2 = {
            //   state: [2],
            //   starttime: ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)],
            //   endtime: [util.getFirstDateOfMonthHMS(today), util.getYearMonthDayHMSString(today)],
            //   helperID: openId,
            //   level: 1
            // }
            // if (taskType === 'charge') {
            //   queryTask2.chargerID = openId
            //   queryTask2.signerID = undefined
            // } else if (taskType === "sign") {
            //   queryTask2.chargerID = undefined
            //   queryTask2.signerID = openId
            // }
            let queryTaskList = []

            if(this.sourceArr.length>0){
              this.sourceArr.forEach((source) => {
                let obj = { ...queryTask }
                let obj2 = { ...queryTask2 }
                obj.sourceID = source
                obj2.sourceID = source

                queryTaskList.push(obj)
                queryTaskList.push(obj2)
              })
            }else{
              queryTaskList.push(queryTask)
              queryTaskList.push(queryTask2)
            }
            // if (taskType === 'charge') {
            //   queryTaskList.push(queryTaskHelper)
            //   queryTaskList.push(queryTaskHelper2)
            // }
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
          // queryTask.starttime = ['1970-01-01 00:00:00', util.getLastDateOfYearHMS(today)]
          queryTask.starttime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']
          // queryTask.endtime = [util.getFirstDateOfYearHMS(today), '9999-12-31 23:59:59']
          queryTask.endtime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']
          // queryTaskHelper.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]
          // queryTaskHelper.endtime = [util.getFirstDateOfYearHMS(today), '9999-12-31 23:59:59']

          if (taskStatus === 0) {
            queryTask.state = [2, 3, 4]

            // queryTaskHelper.state = [2, 3, 4]

            let queryTaskList = []
            if(this.sourceArr.length>0){
              this.sourceArr.forEach((source) => {
                let obj = { ...queryTask }
                obj.sourceID = source

                queryTaskList.push(obj)
              })
            }else{
              queryTaskList.push(queryTask)
            }
            // if (taskType === 'charge') {
            //   queryTaskList.push(queryTaskHelper)
            // }
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
            // queryTaskHelper.life_done_type = 1
            // queryTaskHelper.state = [3]
            // queryTaskHelper.life_state = 3

            let queryTaskList = []
            if(this.sourceArr.length>0){
              this.sourceArr.forEach((source) => {
                let obj = { ...queryTask }
                obj.sourceID = source

                queryTaskList.push(obj)
              })
            }else{
              queryTaskList.push(queryTask)
            }
            // if (taskType === 'charge') {
            //   queryTaskList.push(queryTaskHelper)
            // }
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

            // queryTaskHelper.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]
            // queryTaskHelper.endtime = [util.getYearMonthDayHMSString(today), '9999-12-31 23:59:59']
            // queryTaskHelper.life_done_type = undefined
            // queryTaskHelper.state = [2]

            let queryTaskList = []
            if(this.sourceArr.length>0){
              this.sourceArr.forEach((source) => {
                let obj = { ...queryTask }
                obj.sourceID = source

                queryTaskList.push(obj)
              })
            }else{
              queryTaskList.push(queryTask)
            }
            // if (taskType === 'charge') {
            //   queryTaskList.push(queryTaskHelper)
            // }
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
            // queryTaskHelper.life_done_type = 0
            // queryTaskHelper.state = [3]
            // queryTaskHelper.life_state = 3

            let newDay = today.getDate() + 1
            let todayCopy = new Date(today)
            todayCopy.setDate(newDay)

            let queryTask2 = {
              state: [2],
              // starttime: ['1970-01-01 00:00:00', util.getLastDateOfYearHMS(today)],
              starttime: ['1970-01-01 00:00:00', '9999-12-31 23:59:59'],
              // endtime: [util.getFirstDateOfYearHMS(today), util.getYearMonthDayHMSString(today)],
              endtime: ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)],
              // chargerID: undefined,
              // signerID: undefined,
              level: 1
            }
            // let queryTaskHelper2 = {
            //   state: [2],
            //   starttime: ['1970-01-01 00:00:00', util.getLastDateOfYearHMS(today)],
            //   endtime: [util.getFirstDateOfYearHMS(today), util.getYearMonthDayHMSString(today)],
            //   helperID: openId,
            //   level: 1
            // }
            // if (taskType === 'charge') {
            //   queryTask2.chargerID = openId
            //   queryTask2.signerID = undefined
            // } else if (taskType === "sign") {
            //   queryTask2.chargerID = undefined
            //   queryTask2.signerID = openId
            // }
            let queryTaskList = []

            if(this.sourceArr.length>0){
              this.sourceArr.forEach((source) => {
                let obj = { ...queryTask }
                let obj2 = { ...queryTask2 }
                obj.sourceID = source
                obj2.sourceID = source

                queryTaskList.push(obj)
                queryTaskList.push(obj2)
              })
            }else{
              queryTaskList.push(queryTask)
              queryTaskList.push(queryTask2)
            }
            // queryTaskList.push(queryTask)
            // queryTaskList.push(queryTask2)

            // if (taskType === 'charge') {
            //   queryTaskList.push(queryTaskHelper)
            //   queryTaskList.push(queryTaskHelper2)
            // }

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
            // queryTaskHelper.state = [4]

            let queryTaskList = []
            if(this.sourceArr.length>0){
              this.sourceArr.forEach((source) => {
                let obj = { ...queryTask }
                obj.sourceID = source

                queryTaskList.push(obj)
              })
            }else{
              queryTaskList.push(queryTask)
            }
            // if (taskType === 'charge') {
            //   queryTaskList.push(queryTaskHelper)
            // }
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
      getQueryTaskListToSearch($event){
        console.log('----------------')
        console.log($event)
        // let url = this.$url + '/taskSystem/task/list'
        let url = 'http://rest.apizza.net/mock/21c5cf3ed4022de252a80d8e8366c6f7/getList'
        let params = {
          page:1,
          pageAmount:10,
          queryTaskList: JSON.stringify($event),
        }
        this.list = []
        this.ajax(url, params, this.list, this.scroll, this.$refs.wrapper, 10)
        this.showSearchResult = true
        localStorage.setItem('keepShowResultOpen','1')
        localStorage.setItem('searchParams',JSON.stringify($event))
      },
      clearSearchResult(){
        this.scroll = null
        this.list = []
        this.showSearchResult = false
        localStorage.setItem('keepShowResultOpen','0')


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
        &.riseup{
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
    .search-container{
        height: 100%;
        header {
            height: 0.46rem;
            background-color: #397de8;
            /*text-align: center;*/
            position: relative;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            div{
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
        .list-wrap{
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
        li {
            padding: 0 0.12rem;
            margin-bottom: 0.1rem;
            background-color: #fff;
            padding-bottom: 0.1rem;
            &:last-child {
                margin-bottom: 0;
            }
        }
        .head {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .title {
                padding: 0.1rem 0 0.06rem 0;
                font-size: 0;
                .projectName {
                    /*display: inline-flex;*/
                    max-width: 2.4rem;
                    font-size: 0.14rem;
                    color: #3e3e3e;
                    vertical-align: middle;
                }
                .reward {
                    font-size: 0.14rem;
                    color: #3e3e3e;
                    vertical-align: middle;
                }
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
            padding-bottom: 0.06rem;
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
