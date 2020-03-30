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
                                        <ul class="task">
                                            <router-link tag="li"
                                                         :to="{name:'taskdetail',params:{detailObj:JSON.stringify(item),isCurrentMonth:true}}"
                                                         v-for="item in list1" :key="item.id">
                                                <div class="head">
                                                    <div class="title">
                                                        <span class="projectName ellipsis">{{item.projectName}}</span>
                                                        <span class="reward" v-if="$showReward(item.reward)">(+{{item.reward}}分)</span>
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
                                                <div class="child-list" :class="{folded:item.folded}">
                                                    <ul class="task">
                                                        <router-link tag="li"
                                                                     :to="{name:'taskdetail',params:{detailObj:JSON.stringify(subitem),isCurrentMonth:true,isSub:true,mainID:item.id}}"
                                                                     v-for="subitem in item.nextList" :key="subitem.id">
                                                            <div class="head">
                                                                <div class="title">{{subitem.projectName}}</div>
                                                                <div class="date">{{subitem.endtime &&
                                                                    subitem.endtime.split(' ')[0]}}
                                                                </div>
                                                            </div>
                                                            <div class="bottom">
                                                                <div class="tags">
                                                                    <p v-if="subitem.state === 0">
                                                                        <span>暂存</span>
                                                                    </p>
                                                                    <p v-if="subitem.state === 1">
                                                                        <span>新增</span>
                                                                    </p>
                                                                    <p v-if="subitem.state === 2">
                                                                        <span v-if="util.compareDate(subitem.endtime,today)">推进中</span>
                                                                        <span v-else>未完成</span>
                                                                    </p>
                                                                    <p v-if="subitem.state === 3">
                                                                        <span v-if="isFinish(subitem) === 0">未完成</span>
                                                                        <span v-if="isFinish(subitem) === 1">已完成</span>
                                                                    </p>
                                                                    <p v-if="subitem.state === 4">
                                                                        <span>已废止</span>
                                                                    </p>
                                                                    <p v-show="false">
                                                                        <span>主席批示</span>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </router-link>
                                                    </ul>
                                                </div>
                                                <div class="toggle-bottom" v-if="item.nextList.length>0">
                                                    <div @click="onClickToggle($event,item)">
                                                        <p v-if="!item.folded">
                                                            <span>收起</span>
                                                            <i class="icon"></i>
                                                        </p>
                                                        <p v-else class="unfolded">
                                                            <span>展开</span>
                                                            <i class="icon"></i>
                                                        </p>
                                                    </div>
                                                </div>
                                            </router-link>
                                            <div v-if="showLoadingWrap1">
                                                <Loading :showloadingwrap="showLoadingWrap1"
                                                         :showloadingimg="showLoadingImg1"></Loading>
                                            </div>
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
                                                    <div class="title">
                                                        <span class="projectName ellipsis">{{item.projectName}}</span>
                                                        <span class="reward" v-if="$showReward(item.reward)">(+{{item.reward}}分)</span>
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
                                                <div class="child-list" :class="{folded:item.folded}">
                                                    <ul class="task">
                                                        <router-link tag="li"
                                                                     :to="{name:'taskdetail',params:{detailObj:JSON.stringify(subitem),isCurrentMonth:true,isSub:true,mainID:item.id}}"
                                                                     v-for="subitem in item.nextList" :key="subitem.id">
                                                            <div class="head">
                                                                <div class="title">{{subitem.projectName}}</div>
                                                                <div class="date">{{subitem.endtime &&
                                                                    subitem.endtime.split(' ')[0]}}
                                                                </div>
                                                            </div>
                                                            <div class="bottom">
                                                                <div class="tags">
                                                                    <p v-if="subitem.state === 0">
                                                                        <span>暂存</span>
                                                                    </p>
                                                                    <p v-if="subitem.state === 1">
                                                                        <span>新增</span>
                                                                    </p>
                                                                    <p v-if="subitem.state === 2">
                                                                        <span v-if="util.compareDate(subitem.endtime,today)">推进中</span>
                                                                        <span v-else>未完成</span>
                                                                    </p>
                                                                    <p v-if="subitem.state === 3">
                                                                        <span v-if="isFinish(subitem) === 0">未完成</span>
                                                                        <span v-if="isFinish(subitem) === 1">已完成</span>
                                                                    </p>
                                                                    <p v-if="subitem.state === 4">
                                                                        <span>已废止</span>
                                                                    </p>
                                                                    <p v-show="false">
                                                                        <span>主席批示</span>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </router-link>
                                                    </ul>
                                                </div>
                                                <div class="toggle-bottom" v-if="item.nextList.length>0">
                                                    <div @click="onClickToggle($event,item)">
                                                        <p v-if="folded">
                                                            <span>展开</span>
                                                            <i class="icon"></i>
                                                        </p>
                                                        <p v-else class="unfolded">
                                                            <span>收起</span>
                                                            <i class="icon"></i>
                                                        </p>
                                                    </div>
                                                </div>
                                            </router-link>
                                            <div v-if="showLoadingWrap2">
                                                <Loading :showloadingwrap="showLoadingWrap2"
                                                         :showloadingimg="showLoadingImg2"></Loading>
                                            </div>
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
                                                    <div class="title"><span class="projectName ellipsis">{{item.projectName}}</span><span class="reward" v-if="$showReward(item.reward)">(+{{item.reward}}分)</span>
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
                                                <div class="child-list" :class="{folded:item.folded}">
                                                    <ul class="task">
                                                        <router-link tag="li"
                                                                     :to="{name:'taskdetail',params:{detailObj:JSON.stringify(subitem),isCurrentMonth:true,isSub:true,mainID:item.id}}"
                                                                     v-for="subitem in item.nextList" :key="subitem.id">
                                                            <div class="head">
                                                                <div class="title">{{subitem.projectName}}</div>
                                                                <div class="date">{{subitem.endtime &&
                                                                    subitem.endtime.split(' ')[0]}}
                                                                </div>
                                                            </div>
                                                            <div class="bottom">
                                                                <div class="tags">
                                                                    <p v-if="subitem.state === 0">
                                                                        <span>暂存</span>
                                                                    </p>
                                                                    <p v-if="subitem.state === 1">
                                                                        <span>新增</span>
                                                                    </p>
                                                                    <p v-if="subitem.state === 2">
                                                                        <span v-if="util.compareDate(subitem.endtime,today)">推进中</span>
                                                                        <span v-else>未完成</span>
                                                                    </p>
                                                                    <p v-if="subitem.state === 3">
                                                                        <span v-if="isFinish(subitem) === 0">未完成</span>
                                                                        <span v-if="isFinish(subitem) === 1">已完成</span>
                                                                    </p>
                                                                    <p v-if="subitem.state === 4">
                                                                        <span>已废止</span>
                                                                    </p>
                                                                    <p v-show="false">
                                                                        <span>主席批示</span>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </router-link>
                                                    </ul>
                                                </div>
                                                <div class="toggle-bottom" v-if="item.nextList.length>0">
                                                    <div @click="onClickToggle($event,item)">
                                                        <p v-if="folded">
                                                            <span>展开</span>
                                                            <i class="icon"></i>
                                                        </p>
                                                        <p v-else class="unfolded">
                                                            <span>收起</span>
                                                            <i class="icon"></i>
                                                        </p>
                                                    </div>
                                                </div>
                                            </router-link>
                                            <div v-if="showLoadingWrap3">
                                                <Loading :showloadingwrap="showLoadingWrap3"
                                                         :showloadingimg="showLoadingImg3"></Loading>
                                            </div>
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
                                                    <div class="title"><span class="projectName ellipsis">{{item.projectName}}</span><span class="reward" v-if="$showReward(item.reward)">(+{{item.reward}}分)</span>
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
                                                <div class="child-list" :class="{folded:item.folded}">
                                                    <ul class="task">
                                                        <router-link tag="li"
                                                                     :to="{name:'taskdetail',params:{detailObj:JSON.stringify(subitem),isCurrentMonth:true,isSub:true,mainID:item.id}}"
                                                                     v-for="subitem in item.nextList" :key="subitem.id">
                                                            <div class="head">
                                                                <div class="title">{{subitem.projectName}}</div>
                                                                <div class="date">{{subitem.endtime &&
                                                                    subitem.endtime.split(' ')[0]}}
                                                                </div>
                                                            </div>
                                                            <div class="bottom">
                                                                <div class="tags">
                                                                    <p v-if="subitem.state === 0">
                                                                        <span>暂存</span>
                                                                    </p>
                                                                    <p v-if="subitem.state === 1">
                                                                        <span>新增</span>
                                                                    </p>
                                                                    <!--<p v-if="subitem.state === 2">-->
                                                                    <!--<span v-if="new Date(subitem.endtime).getTime()>new Date().getTime()">推进中</span>-->
                                                                    <!--<span v-else>未完成</span>-->
                                                                    <!--</p>-->
                                                                    <p v-if="subitem.state === 2">
                                                                        <span v-if="util.compareDate(subitem.endtime,today)">推进中</span>
                                                                        <span v-else>未完成</span>
                                                                    </p>
                                                                    <p v-if="subitem.state === 3">
                                                                        <span v-if="isFinish(subitem) === 0">未完成</span>
                                                                        <span v-if="isFinish(subitem) === 1">已完成</span>
                                                                    </p>
                                                                    <p v-if="subitem.state === 4">
                                                                        <span>已废止</span>
                                                                    </p>
                                                                    <p v-show="false">
                                                                        <span>主席批示</span>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </router-link>
                                                    </ul>
                                                </div>
                                                <div class="toggle-bottom" v-if="item.nextList.length>0">
                                                    <div @click="onClickToggle($event,item)">
                                                        <p v-if="folded">
                                                            <span>展开</span>
                                                            <i class="icon"></i>
                                                        </p>
                                                        <p v-else class="unfolded">
                                                            <span>收起</span>
                                                            <i class="icon"></i>
                                                        </p>
                                                    </div>
                                                </div>
                                            </router-link>
                                            <div v-if="showLoadingWrap4">
                                                <Loading :showloadingwrap="showLoadingWrap4"
                                                         :showloadingimg="showLoadingImg4"></Loading>
                                            </div>
                                        </ul>
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
                                        <ul class="task">
                                            <router-link tag="li"
                                                         :to="{name:'taskdetail',params:{detailObj:JSON.stringify(item)},isCurrentMonth:false}"
                                                         v-for="item in list5" :key="item.id">
                                                <div class="head">
                                                    <div class="title"><span class="projectName ellipsis">{{item.projectName}}</span><span class="reward" v-if="$showReward(item.reward)">(+{{item.reward}}分)</span>
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
                                                <div class="child-list" :class="{folded:item.folded}">
                                                    <ul class="task">
                                                        <router-link tag="li"
                                                                     :to="{name:'taskdetail',params:{detailObj:JSON.stringify(subitem),isCurrentMonth:false,isSub:true,mainID:item.id}}"
                                                                     v-for="subitem in item.nextList" :key="subitem.id">
                                                            <div class="head">
                                                                <div class="title">{{subitem.projectName}}</div>
                                                                <div class="date">{{subitem.endtime &&
                                                                    subitem.endtime.split(' ')[0]}}
                                                                </div>
                                                            </div>
                                                            <div class="bottom">
                                                                <div class="tags">
                                                                    <p v-if="subitem.state === 0">
                                                                        <span>暂存</span>
                                                                    </p>
                                                                    <p v-if="subitem.state === 1">
                                                                        <span>新增</span>
                                                                    </p>
                                                                    <p v-if="subitem.state === 2">
                                                                        <span v-if="util.compareDate(subitem.endtime,today)">推进中</span>
                                                                        <span v-else>未完成</span>
                                                                    </p>
                                                                    <p v-if="subitem.state === 3">
                                                                        <span v-if="isFinish(subitem) === 0">未完成</span>
                                                                        <span v-if="isFinish(subitem) === 1">已完成</span>
                                                                    </p>
                                                                    <p v-if="subitem.state === 4">
                                                                        <span>已废止</span>
                                                                    </p>
                                                                    <p v-show="false">
                                                                        <span>主席批示</span>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </router-link>
                                                    </ul>
                                                </div>
                                                <div class="toggle-bottom" v-if="item.nextList.length>0">
                                                    <div @click="onClickToggle($event,item)">
                                                        <p v-if="folded">
                                                            <span>展开</span>
                                                            <i class="icon"></i>
                                                        </p>
                                                        <p v-else class="unfolded">
                                                            <span>收起</span>
                                                            <i class="icon"></i>
                                                        </p>
                                                    </div>
                                                </div>
                                            </router-link>
                                            <div v-if="showLoadingWrap5">
                                                <Loading :showloadingwrap="showLoadingWrap5"
                                                         :showloadingimg="showLoadingImg5"></Loading>
                                            </div>
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
                                                    <div class="title"><span class="projectName ellipsis">{{item.projectName}}</span><span class="reward" v-if="$showReward(item.reward)">(+{{item.reward}}分)</span>
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
                                                <div class="child-list" :class="{folded:item.folded}">
                                                    <ul class="task">
                                                        <router-link tag="li"
                                                                     :to="{name:'taskdetail',params:{detailObj:JSON.stringify(subitem),isCurrentMonth:false,isSub:true,mainID:item.id}}"
                                                                     v-for="subitem in item.nextList" :key="subitem.id">
                                                            <div class="head">
                                                                <div class="title">{{subitem.projectName}}</div>
                                                                <div class="date">{{subitem.endtime &&
                                                                    subitem.endtime.split(' ')[0]}}
                                                                </div>
                                                            </div>
                                                            <div class="bottom">
                                                                <div class="tags">
                                                                    <p v-if="subitem.state === 0">
                                                                        <span>暂存</span>
                                                                    </p>
                                                                    <p v-if="subitem.state === 1">
                                                                        <span>新增</span>
                                                                    </p>
                                                                    <p v-if="subitem.state === 2">
                                                                        <span v-if="util.compareDate(subitem.endtime,today)">推进中</span>
                                                                        <span v-else>未完成</span>
                                                                    </p>
                                                                    <p v-if="subitem.state === 3">
                                                                        <span v-if="isFinish(subitem) === 0">未完成</span>
                                                                        <span v-if="isFinish(subitem) === 1">已完成</span>
                                                                    </p>
                                                                    <p v-if="subitem.state === 4">
                                                                        <span>已废止</span>
                                                                    </p>
                                                                    <p v-show="false">
                                                                        <span>主席批示</span>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </router-link>
                                                    </ul>
                                                </div>
                                                <div class="toggle-bottom" v-if="item.nextList.length>0">
                                                    <div @click="onClickToggle($event,item)">
                                                        <p v-if="folded">
                                                            <span>展开</span>
                                                            <i class="icon"></i>
                                                        </p>
                                                        <p v-else class="unfolded">
                                                            <span>收起</span>
                                                            <i class="icon"></i>
                                                        </p>
                                                    </div>
                                                </div>
                                            </router-link>
                                            <div v-if="showLoadingWrap6">
                                                <Loading :showloadingwrap="showLoadingWrap6"
                                                         :showloadingimg="showLoadingImg6"></Loading>
                                            </div>
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
                                                    <div class="title"><span class="projectName ellipsis">{{item.projectName}}</span><span class="reward" v-if="$showReward(item.reward)">(+{{item.reward}}分)</span>
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
                                                <div class="child-list" :class="{folded:item.folded}">
                                                    <ul class="task">
                                                        <router-link tag="li"
                                                                     :to="{name:'taskdetail',params:{detailObj:JSON.stringify(subitem),isCurrentMonth:false,isSub:true,mainID:item.id}}"
                                                                     v-for="subitem in item.nextList" :key="subitem.id">
                                                            <div class="head">
                                                                <div class="title">{{subitem.projectName}}</div>
                                                                <div class="date">{{subitem.endtime &&
                                                                    subitem.endtime.split(' ')[0]}}
                                                                </div>
                                                            </div>
                                                            <div class="bottom">
                                                                <div class="tags">
                                                                    <p v-if="subitem.state === 0">
                                                                        <span>暂存</span>
                                                                    </p>
                                                                    <p v-if="subitem.state === 1">
                                                                        <span>新增</span>
                                                                    </p>
                                                                    <p v-if="subitem.state === 2">
                                                                        <span v-if="util.compareDate(subitem.endtime,today)">推进中</span>
                                                                        <span v-else>未完成</span>
                                                                    </p>
                                                                    <p v-if="subitem.state === 3">
                                                                        <span v-if="isFinish(subitem) === 0">未完成</span>
                                                                        <span v-if="isFinish(subitem) === 1">已完成</span>
                                                                    </p>
                                                                    <p v-if="subitem.state === 4">
                                                                        <span>已废止</span>
                                                                    </p>
                                                                    <p v-show="false">
                                                                        <span>主席批示</span>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </router-link>
                                                    </ul>
                                                </div>
                                                <div class="toggle-bottom" v-if="item.nextList.length>0">
                                                    <div @click="onClickToggle($event,item)">
                                                        <p v-if="folded">
                                                            <span>展开</span>
                                                            <i class="icon"></i>
                                                        </p>
                                                        <p v-else class="unfolded">
                                                            <span>收起</span>
                                                            <i class="icon"></i>
                                                        </p>
                                                    </div>
                                                </div>
                                            </router-link>
                                            <div v-if="showLoadingWrap7">
                                                <Loading :showloadingwrap="showLoadingWrap7"
                                                         :showloadingimg="showLoadingImg7"></Loading>
                                            </div>
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
                                                    <div class="title"><span class="projectName ellipsis">{{item.projectName}}</span><span class="reward" v-if="$showReward(item.reward)">(+{{item.reward}}分)</span>
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
                                                <div class="child-list" :class="{folded:item.folded}">
                                                    <ul class="task">
                                                        <router-link tag="li"
                                                                     :to="{name:'taskdetail',params:{detailObj:JSON.stringify(subitem),isCurrentMonth:false,isSub:true,mainID:item.id}}"
                                                                     v-for="subitem in item.nextList" :key="subitem.id">
                                                            <div class="head">
                                                                <div class="title">{{subitem.projectName}}</div>
                                                                <div class="date">{{subitem.endtime &&
                                                                    subitem.endtime.split(' ')[0]}}
                                                                </div>
                                                            </div>
                                                            <div class="bottom">
                                                                <div class="tags">
                                                                    <p v-if="subitem.state === 0">
                                                                        <span>暂存</span>
                                                                    </p>
                                                                    <p v-if="subitem.state === 1">
                                                                        <span>新增</span>
                                                                    </p>
                                                                    <p v-if="subitem.state === 2">
                                                                        <span v-if="new Date(subitem.endtime).getTime()>new Date().getTime()">推进中</span>
                                                                        <span v-else>未完成</span>
                                                                    </p>
                                                                    <p v-if="subitem.state === 3">
                                                                        <span v-if="isFinish(subitem) === 0">未完成</span>
                                                                        <span v-if="isFinish(subitem) === 1">已完成</span>
                                                                    </p>
                                                                    <p v-if="subitem.state === 4">
                                                                        <span>已废止</span>
                                                                    </p>
                                                                    <p v-show="false">
                                                                        <span>主席批示</span>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </router-link>
                                                    </ul>
                                                </div>
                                                <div class="toggle-bottom" v-if="item.nextList.length>0">
                                                    <div @click="onClickToggle($event,item)">
                                                        <p v-if="folded">
                                                            <span>展开</span>
                                                            <i class="icon"></i>
                                                        </p>
                                                        <p v-else class="unfolded">
                                                            <span>收起</span>
                                                            <i class="icon"></i>
                                                        </p>
                                                    </div>
                                                </div>
                                            </router-link>
                                            <div v-if="showLoadingWrap8">
                                                <Loading :showloadingwrap="showLoadingWrap8"
                                                         :showloadingimg="showLoadingImg8"></Loading>
                                            </div>
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
                                                    <div class="title"><span class="projectName ellipsis">{{item.projectName}}</span><span class="reward" v-if="$showReward(item.reward)">(+{{item.reward}}分)</span>
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
                                                <div class="child-list" :class="{folded:item.folded}">
                                                    <ul class="task">
                                                        <router-link tag="li"
                                                                     :to="{name:'taskdetail',params:{detailObj:JSON.stringify(subitem),isCurrentMonth:false,isSub:true,mainID:item.id}}"
                                                                     v-for="subitem in item.nextList" :key="subitem.id">
                                                            <div class="head">
                                                                <div class="title">{{subitem.projectName}}</div>
                                                                <div class="date">{{subitem.endtime &&
                                                                    subitem.endtime.split(' ')[0]}}
                                                                </div>
                                                            </div>
                                                            <div class="bottom">
                                                                <div class="tags">
                                                                    <p v-if="subitem.state === 0">
                                                                        <span>暂存</span>
                                                                    </p>
                                                                    <p v-if="subitem.state === 1">
                                                                        <span>新增</span>
                                                                    </p>
                                                                    <p v-if="subitem.state === 2">
                                                                        <span v-if="util.compareDate(subitem.endtime,today)">推进中</span>
                                                                        <span v-else>未完成</span>
                                                                    </p>
                                                                    <p v-if="subitem.state === 3">
                                                                        <span v-if="isFinish(subitem) === 0">未完成</span>
                                                                        <span v-if="isFinish(subitem) === 1">已完成</span>
                                                                    </p>
                                                                    <p v-if="subitem.state === 4">
                                                                        <span>已废止</span>
                                                                    </p>
                                                                    <p v-show="false">
                                                                        <span>主席批示</span>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </router-link>
                                                    </ul>
                                                </div>
                                                <div class="toggle-bottom" v-if="item.nextList.length>0">
                                                    <div @click="onClickToggle($event,item)">
                                                        <p v-if="folded">
                                                            <span>展开</span>
                                                            <i class="icon"></i>
                                                        </p>
                                                        <p v-else class="unfolded">
                                                            <span>收起</span>
                                                            <i class="icon"></i>
                                                        </p>
                                                    </div>
                                                </div>
                                            </router-link>
                                            <div v-if="showLoadingWrap9">
                                                <Loading :showloadingwrap="showLoadingWrap9"
                                                         :showloadingimg="showLoadingImg9"></Loading>
                                            </div>
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
                                    class="reward">{{item.reward?('(+'+ item.reward+'分)'):''}}</span>
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
  import taskSearch from './taskSearch'
  import util from '../util'

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
      num: ''
    },
    {
      name: '本月已完成',
      num: ''
    },
    {
      name: '本月推进中',
      num: ''
    },
    {
      name: '未完成',
      num: ''
    },
  ]
  const titlebar2 = [
    {
      name: '全部工作',
      num: ''
    },
    {
      name: '已完成',
      num: ''
    },
    {
      name: '推进中',
      num: ''
    },
    {
      name: '未完成',
      num: ''
    },
    {
      name: '已废止',
      num: ''
    },
  ]
  export default {
    name: "list",
    components: {
      'taskSearch': taskSearch,
    },
    data() {
      return {
        btnTitle,
        titlebar1: [
          {
            name: '本月工作',
            num: ''
          },
          {
            name: '本月已完成',
            num: ''
          },
          {
            name: '本月推进中',
            num: ''
          },
          {
            name: '未完成',
            num: ''
          },
        ],
        titlebar2: [
          {
            name: '全部工作',
            num: ''
          },
          {
            name: '已完成',
            num: ''
          },
          {
            name: '推进中',
            num: ''
          },
          {
            name: '未完成',
            num: ''
          },
          {
            name: '已废止',
            num: ''
          },
        ],
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
        scroll:null,
        scroll1: null,
        scroll2: null,
        scroll3: null,
        scroll4: null,
        scroll5: null,
        scroll6: null,
        scroll7: null,
        scroll8: null,
        scroll9: null,
        list:[],
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
        isFromRanking:false,
        openSearch:false,
        showSearchResult:false,
        searchResultLength:0,
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
    beforeRouteEnter(to, from, next) {
      console.log('beforeRouteEnter')
      console.log('from.name', from.name)
      console.log('from.name', from)
      next(vm => {
        if (from.name === 'index') {
          qing.call('setWebViewTitle', { 'title': '工作列表' })

          let { timeRange, taskStatus, taskType } = vm.$route.params
          vm.timeRange = timeRange
          vm.taskStatus = taskStatus
          vm.taskType = taskType
          console.log('vm.timeRange', vm.timeRange)

          vm.$store.commit('setCurrentBtnIndex', vm.timeRange)
          vm.$store.commit('setCurrentTabIndex', vm.taskStatus)
          vm.$store.commit('setTaskType', vm.taskType)
          vm.$store.commit('setIsFromRanking', 0)
          vm.$store.commit('setOthersOpenID', '')

        }
        else if (from.name === 'ranking') {
          let { timeRange, taskStatus, taskType, othersOpenID, personName } = vm.$route.params
          vm.timeRange = timeRange
          vm.taskStatus = taskStatus
          vm.taskType = taskType
          vm.othersOpenID = othersOpenID


          qing.call('setWebViewTitle', { 'title': `${personName}的工作列表` });//设置页面标题并显示

          // vm.$getPersonInfoByOpenID(vm.othersOpenID)
          //   .then((response) => {
          //     let data = response.data.result.data[0]
          //
          //     qing.call('setWebViewTitle',{'title':data.name});//设置页面标题并显示
          //
          //   }).catch((error) => {
          //   alert("获取当前信息失败")
          // })


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
          vm.$store.commit('setIsFromRanking', 1)
          vm.$store.commit('setListPersonName', personName)
        }
        else if (from.name === null) {
          qing.call('setWebViewTitle', { 'title': '工作列表' })

          vm.timeRange = vm.$store.state.currentBtnIndex
          vm.taskStatus = vm.$store.state.currentTabIndex
          vm.taskType = vm.$store.state.taskType

          if (vm.$store.getters.isFromRanking) {
            vm.isFromRanking = vm.$store.getters.isFromRanking
            qing.call('setWebViewTitle', { 'title': `${vm.$store.state.listPersonName}的工作列表` })
          }
          if (vm.$store.getters.othersOpenID) {
            vm.othersOpenID = vm.$store.getters.othersOpenID
          }
        }
        else if(from.name === 'taskadd'){
          vm.timeRange = 0
          vm.taskStatus = 0
          vm.taskType = 'charge'
          vm.$store.commit('setCurrentBtnIndex', vm.timeRange)
          vm.$store.commit('setCurrentTabIndex', vm.taskStatus)
          vm.$store.commit('setTaskType', vm.taskType)
          vm.$store.commit('setIsFromRanking', 0)
          vm.$store.commit('setOthersOpenID', '')
        }
        else if(from.name === 'tempAdd'){
          vm.timeRange = 0
          vm.taskStatus = 0
          vm.taskType = 'sign'
          vm.$store.commit('setCurrentBtnIndex', vm.timeRange)
          vm.$store.commit('setCurrentTabIndex', vm.taskStatus)
          vm.$store.commit('setTaskType', vm.taskType)
          vm.$store.commit('setIsFromRanking', 0)
          vm.$store.commit('setOthersOpenID', '')
        }
        else {
          vm.timeRange = vm.$store.state.currentBtnIndex
          vm.taskStatus = vm.$store.state.currentTabIndex
          vm.taskType = vm.$store.state.taskType
          vm.isFromRanking = vm.$store.getters.isFromRanking
          vm.othersOpenID = vm.$store.getters.othersOpenID

          if (vm.isFromRanking) {
            qing.call('setWebViewTitle', { 'title': `${vm.$store.state.listPersonName}的工作列表` })
          } else {
            qing.call('setWebViewTitle', { 'title': '工作列表' })

          }



        }
        if(localStorage.getItem('keepShowResultOpen') === '1'){
          vm.showSearchResult = true
          let selectSource = localStorage.getItem('searchParams')
          vm.getQueryTaskListToSearch(JSON.parse(selectSource))
        }

        vm.isFromRanking = vm.$store.getters.isFromRanking
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

          // let getNumURL = vm.$url + "/taskSystem/task/statusNum"
          let queryListMonth = []
          let queryListYear = []
          if (vm.isFromRanking) {

            // axios.get(getNumURL, {
            //   params: {
            //     openIDStr: vm.$store.getters.othersOpenID,
            //     rangeStr: rangeCurrentMonth.join(',')
            //   }
            // })
            //   .then((response) => {
            //     // alert("getNumURL调用成功")
            //     console.log(response.data)
            //     if (response.data.result.length > 0) {
            //       let data = response.data.result[0]
            //       vm.charge = data.charge
            //       vm.sign = data.dispatch
            //
            //       if (vm.$store.state.taskType === 'charge') {
            //         titlebar1[0].num = vm.charge.all
            //         titlebar1[1].num = vm.charge.finished
            //         titlebar1[2].num = vm.charge.doing
            //         titlebar1[3].num = vm.charge.unfinished
            //       } else if (vm.$store.state.taskType === 'sign') {
            //         titlebar1[0].num = vm.sign.all
            //         titlebar1[1].num = vm.sign.finished
            //         titlebar1[2].num = vm.sign.doing
            //         titlebar1[3].num = vm.sign.unfinished
            //       }
            //     }
            //   })
            // axios.get(getNumURL, {
            //   params: {
            //     openIDStr: vm.$store.getters.othersOpenID,
            //     rangeStr: rangeCurrentYear.join(',')
            //   }
            // })
            //   .then((response) => {
            //     // alert("getNumURL调用成功")
            //     console.log(response.data)
            //     if (response.data.result.length > 0) {
            //       let data = response.data.result[0]
            //       vm.charge = data.charge
            //       vm.sign = data.dispatch
            //
            //       if (vm.$store.state.taskType === 'charge') {
            //         titlebar2[0].num = vm.charge.all
            //         titlebar2[1].num = vm.charge.finished
            //         titlebar2[2].num = vm.charge.doing
            //         titlebar2[3].num = vm.charge.unfinished
            //         titlebar2[4].num = vm.charge.abolish
            //       } else if (vm.$store.state.taskType === 'sign') {
            //         titlebar2[0].num = vm.sign.all
            //         titlebar2[1].num = vm.sign.finished
            //         titlebar2[2].num = vm.sign.doing
            //         titlebar2[3].num = vm.sign.unfinished
            //         titlebar2[4].num = vm.sign.abolish
            //       }
            //     }
            //   })
            queryListMonth = vm.createQueryList(vm.$store.state.othersOpenID, vm.$store.state.taskType, 0)
            queryListYear = vm.createQueryList(vm.$store.state.othersOpenID, vm.$store.state.taskType, 1)
            vm.loadData(vm.$store.getters.othersOpenID, vm.$store.state.taskType, vm.timeRange, vm.taskStatus, 1, 10)
          }
          else {
            // axios.get(getNumURL, {
            //   params: {
            //     openIDStr: vm.$store.state.openID,
            //     rangeStr: rangeCurrentMonth.join(',')
            //   }
            // })
            //   .then((response) => {
            //     // alert("getNumURL调用成功")
            //     console.log(response.data)
            //     if (response.data.result.length > 0) {
            //       let data = response.data.result[0]
            //       vm.charge = data.charge
            //       vm.sign = data.dispatch
            //
            //       if (vm.$store.state.taskType === 'charge') {
            //         titlebar1[0].num = vm.charge.all
            //         titlebar1[1].num = vm.charge.finished
            //         titlebar1[2].num = vm.charge.doing
            //         titlebar1[3].num = vm.charge.unfinished
            //       } else if (vm.$store.state.taskType === 'sign') {
            //         titlebar1[0].num = vm.sign.all
            //         titlebar1[1].num = vm.sign.finished
            //         titlebar1[2].num = vm.sign.doing
            //         titlebar1[3].num = vm.sign.unfinished
            //       }
            //     }
            //   })
            // axios.get(getNumURL, {
            //   params: {
            //     openIDStr: vm.$store.state.openID,
            //     rangeStr: rangeCurrentYear.join(',')
            //   }
            // })
            //   .then((response) => {
            //     // alert("getNumURL调用成功")
            //     console.log(response.data)
            //     if (response.data.result.length > 0) {
            //       let data = response.data.result[0]
            //       vm.charge = data.charge
            //       vm.sign = data.dispatch
            //
            //       if (vm.$store.state.taskType === 'charge') {
            //         titlebar2[0].num = vm.charge.all
            //         titlebar2[1].num = vm.charge.finished
            //         titlebar2[2].num = vm.charge.doing
            //         titlebar2[3].num = vm.charge.unfinished
            //         titlebar2[4].num = vm.charge.abolish
            //       } else if (vm.$store.state.taskType === 'sign') {
            //         titlebar2[0].num = vm.sign.all
            //         titlebar2[1].num = vm.sign.finished
            //         titlebar2[2].num = vm.sign.doing
            //         titlebar2[3].num = vm.sign.unfinished
            //         titlebar2[4].num = vm.sign.abolish
            //       }
            //     }
            //   })
            queryListMonth = vm.createQueryList(vm.$store.state.openID, vm.$store.state.taskType, 0)
            queryListYear = vm.createQueryList(vm.$store.state.openID, vm.$store.state.taskType, 1)
            vm.loadData(vm.$store.state.openID, vm.$store.state.taskType, vm.timeRange, vm.taskStatus, 1, 10)
          }

          // let getNumURL = vm.$url + "/taskSystem/task/getAmount"
          let getNumURL = "http://rest.apizza.net/mock/21c5cf3ed4022de252a80d8e8366c6f7/getAmount"

          axios({
            method: 'post',
            url: getNumURL,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: Qs.stringify({
              jsonStr: JSON.stringify(queryListMonth),
            })
          })
            .then((response) => {
              if (response.data.success) {
                let data = response.data.result

                // vm.titlebar1[0].num = data.all
                vm.titlebar1[0].num = data.finished + data.doing + data.unfinish + data.abolish
                vm.titlebar1[1].num = data.finished
                vm.titlebar1[2].num = data.doing
                vm.titlebar1[3].num = data.unfinish
              }
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

                vm.titlebar2[0].num = data.finished + data.doing + data.unfinish + data.abolish
                vm.titlebar2[1].num = data.finished
                vm.titlebar2[2].num = data.doing
                vm.titlebar2[3].num = data.unfinish
                vm.titlebar2[4].num = data.abolish
              }
            })
        })

      })
    },
    beforeRouteLeave(to, from, next) {
      if (to.name !== 'taskdetail') {
        this.$store.commit('noKeepAlive')
      }
      if (to.name === 'ranking') {
        this.$store.commit('setOthersOpenID', '')
        this.$store.commit('setIsFromRanking', 0)
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
            console.log(response.data)
            if (response.data.result.amount > 0) {
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

              // let newlist = response.data.result.data.concat(list);
              let newlist = response.data.result.data;
              console.log(newlist)
              newlist.forEach((item) => {
                // item.$set('folded',true)
                this.$set(item, 'folded', true)
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
          //将获取本年数据改为获取全部数据
          // queryTask.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]
          // queryTask.endtime = [util.getFirstDateOfYearHMS(today), '9999-12-31 23:59:59']
          // queryTaskHelper.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]
          // queryTaskHelper.endtime = [util.getFirstDateOfYearHMS(today), '9999-12-31 23:59:59']

          queryTask.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]
          queryTask.endtime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']
          queryTaskHelper.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]
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
            background: url("../assets/搜索.png") no-repeat !important;
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
                background: url("../assets/搜索.png") no-repeat !important;
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
                        background: url("../assets/right.png") no-repeat !important;
                        background-size: contain !important;
                    }
                }

            }
            .right {

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
        .toggle-bottom {
            text-align: right;
            div {
                > p {
                    margin-left: auto;
                    padding: 0.07rem 0 0 0.1rem;
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
                        background: url("../assets/收起.png") no-repeat;
                        background-size: contain;
                        transform: rotate(0deg);
                    }

                    &.unfolded {
                        .icon {
                            display: inline-block;
                            width: 0.14rem;
                            height: 0.1rem;
                            background: url("../assets/收起.png") no-repeat;
                            background-size: contain;
                            transform: rotate(180deg);
                        }
                    }
                }
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
