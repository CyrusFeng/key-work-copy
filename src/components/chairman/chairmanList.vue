<template>
    <div class="container" style="height: 100%;">
        <div class="list-container" :class="{'riseup':showSearchResult}">
            <header>
                <change-btn :titleData="btnTitle"
                            @update:currentIndex="getCurrentIndex1($event)"
                            :currentIndex="btnCurrentIndex"></change-btn>
                <i class="icon" v-if="true" @click="openSearch = true"></i>
            </header>
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
                                    <div class="list-wrap" ref="wrapper1_1">
                                        <ul class="task">
                                            <router-link tag="li"
                                                         :to="{name:'taskdetail',params:{detailObj:JSON.stringify(item),isCurrentMonth:true}}"
                                                         v-for="item in list1_1" :key="item.id">
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
                                                            <span v-if="item.endtime && util.compareDate(item.endtime,today)">推进中</span>
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
                                                <div class="child-list" :class="{folded:!folded}">
                                                    <ul class="task">
                                                        <router-link tag="li"
                                                                     :to="{name:'taskdetail',params:{detailObj:JSON.stringify(subitem),isCurrentMonth:true}}"
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
                                                                        <span v-if="subitem.endtime && util.compareDate(subitem.endtime.split(' ')[0],today)">推进中</span>
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
                                            </router-link>
                                            <div>
                                                <Loading :showloadingwrap="showLoadingWrap1_1"
                                                         :showloadingimg="showLoadingImg1_1"></Loading>
                                            </div>
                                        </ul>
                                    </div>
                                </div>
                                <div class="swiper-slide">
                                    <div class="list-wrap" ref="wrapper1_2">
                                        <ul class="task">
                                            <router-link tag="li"
                                                         :to="{name:'taskdetail',params:{detailObj:JSON.stringify(item),isCurrentMonth:true}}"
                                                         v-for="item in list1_2" :key="item.id">
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
                                                <div class="child-list" :class="{folded:!folded}">
                                                    <ul class="task">
                                                        <router-link tag="li"
                                                                     :to="{name:'taskdetail',params:{detailObj:JSON.stringify(subitem),isCurrentMonth:true}}"
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
                                                                        <span v-if="subitem.endtime && util.compareDate(subitem.endtime.split(' ')[0],today)">推进中</span>
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
                                            </router-link>
                                            <div>
                                                <Loading :showloadingwrap="showLoadingWrap1_2"
                                                         :showloadingimg="showLoadingImg1_2"></Loading>
                                            </div>
                                        </ul>
                                    </div>
                                </div>
                                <div class="swiper-slide">
                                    <div class="list-wrap" ref="wrapper1_3">
                                        <ul class="task">
                                            <router-link tag="li"
                                                         :to="{name:'taskdetail',params:{detailObj:JSON.stringify(item),isCurrentMonth:true}}"
                                                         v-for="item in list1_3" :key="item.id">
                                                <div class="head">
                                                    <div class="title"><span class="projectName ellipsis">{{item.projectName}}</span>
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
                                                <div class="child-list" :class="{folded:!folded}">
                                                    <ul class="task">
                                                        <router-link tag="li"
                                                                     :to="{name:'taskdetail',params:{detailObj:JSON.stringify(subitem),isCurrentMonth:true}}"
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
                                                                        <span v-if="subitem.endtime && util.compareDate(subitem.endtime.split(' ')[0],today)">推进中</span>
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
                                            </router-link>
                                            <div>
                                                <Loading :showloadingwrap="showLoadingWrap1_3"
                                                         :showloadingimg="showLoadingImg1_3"></Loading>
                                            </div>
                                        </ul>
                                    </div>
                                </div>
                                <div class="swiper-slide">
                                    <div class="list-wrap" ref="wrapper1_4">
                                        <ul class="task">
                                            <router-link tag="li"
                                                         :to="{name:'taskdetail',params:{detailObj:JSON.stringify(item),isCurrentMonth:true}}"
                                                         v-for="item in list1_4" :key="item.id">
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
                                                        <p>
                                                            <span>未完成</span>
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
                                                <div class="child-list" :class="{folded:!folded}">
                                                    <ul class="task">
                                                        <router-link tag="li"
                                                                     :to="{name:'taskdetail',params:{detailObj:JSON.stringify(subitem),isCurrentMonth:true}}"
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
                                                                        <span v-if="subitem.endtime && util.compareDate(subitem.endtime.split(' ')[0],today)">推进中</span>
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
                                            </router-link>
                                            <div>
                                                <Loading :showloadingwrap="showLoadingWrap1_4"
                                                         :showloadingimg="showLoadingImg1_4"></Loading>
                                            </div>
                                        </ul>
                                    </div>
                                </div>
                                <div class="swiper-slide">
                                    <div class="list-wrap" ref="wrapper1_5">
                                        <ul class="task">
                                            <router-link tag="li"
                                                         :to="{name:'taskdetail',params:{detailObj:JSON.stringify(item),isCurrentMonth:true}}"
                                                         v-for="item in list1_5" :key="item.id">
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
                                                        <p>
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
                                                <div class="child-list" :class="{folded:!folded}">
                                                    <ul class="task">
                                                        <router-link tag="li"
                                                                     :to="{name:'taskdetail',params:{detailObj:JSON.stringify(subitem),isCurrentMonth:true}}"
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
                                                                        <span v-if="subitem.endtime && util.compareDate(subitem.endtime.split(' ')[0],today)">推进中</span>
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
                                            </router-link>
                                            <div>
                                                <Loading :showloadingwrap="showLoadingWrap1_5"
                                                         :showloadingimg="showLoadingImg1_5"></Loading>
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
                                    <div class="list-wrap" ref="wrapper2_1">
                                        <ul class="task">
                                            <router-link tag="li"
                                                         :to="{name:'taskdetail',params:{detailObj:JSON.stringify(item)},isCurrentMonth:false}"
                                                         v-for="item in list2_1" :key="item.id">
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
                                                <div class="child-list" :class="{folded:!folded}">
                                                    <ul class="task">
                                                        <router-link tag="li"
                                                                     :to="{name:'taskdetail',params:{detailObj:JSON.stringify(subitem),isCurrentMonth:false}}"
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
                                                                        <span v-if="subitem.endtime && util.compareDate(subitem.endtime.split(' ')[0],today)">推进中</span>
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
                                            </router-link>
                                            <div>
                                                <Loading :showloadingwrap="showLoadingWrap2_1"
                                                         :showloadingimg="showLoadingImg2_1"></Loading>
                                            </div>
                                        </ul>
                                    </div>
                                </div>
                                <div class="swiper-slide">
                                    <div class="list-wrap" ref="wrapper2_2">
                                        <ul class="task">
                                            <router-link tag="li"
                                                         :to="{name:'taskdetail',params:{detailObj:JSON.stringify(item),isCurrentMonth:false}}"
                                                         v-for="item in list2_2" :key="item.id">
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
                                                <div class="child-list" :class="{folded:!folded}">
                                                    <ul class="task">
                                                        <router-link tag="li"
                                                                     :to="{name:'taskdetail',params:{detailObj:JSON.stringify(subitem),isCurrentMonth:false}}"
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
                                                                        <span v-if="subitem.endtime && util.compareDate(subitem.endtime.split(' ')[0],today)">推进中</span>
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
                                            </router-link>
                                            <div>
                                                <Loading :showloadingwrap="showLoadingWrap2_2"
                                                         :showloadingimg="showLoadingImg2_2"></Loading>
                                            </div>
                                        </ul>
                                    </div>
                                </div>
                                <div class="swiper-slide">
                                    <div class="list-wrap" ref="wrapper2_3">
                                        <ul class="task">
                                            <router-link tag="li"
                                                         :to="{name:'taskdetail',params:{detailObj:JSON.stringify(item),isCurrentMonth:false}}"
                                                         v-for="item in list2_3" :key="item.id">
                                                <div class="head">
                                                    <div class="title"><span class="projectName ellipsis">{{item.projectName}}</span>
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
                                                <div class="child-list" :class="{folded:!folded}">
                                                    <ul class="task">
                                                        <router-link tag="li"
                                                                     :to="{name:'taskdetail',params:{detailObj:JSON.stringify(subitem),isCurrentMonth:false}}"
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
                                                                        <span v-if="subitem.endtime && util.compareDate(subitem.endtime.split(' ')[0],today)">推进中</span>
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
                                            </router-link>
                                            <div>
                                                <Loading :showloadingwrap="showLoadingWrap2_3"
                                                         :showloadingimg="showLoadingImg2_3"></Loading>
                                            </div>
                                        </ul>
                                    </div>
                                </div>
                                <div class="swiper-slide">
                                    <div class="list-wrap" ref="wrapper2_4">
                                        <ul class="task">
                                            <router-link tag="li"
                                                         :to="{name:'taskdetail',params:{detailObj:JSON.stringify(item),isCurrentMonth:false}}"
                                                         v-for="item in list2_4" :key="item.id">
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
                                                <div class="child-list" :class="{folded:!folded}">
                                                    <ul class="task">
                                                        <router-link tag="li"
                                                                     :to="{name:'taskdetail',params:{detailObj:JSON.stringify(subitem),isCurrentMonth:false}}"
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
                                                                        <span v-if="subitem.endtime && util.compareDate(subitem.endtime.split(' ')[0],today)">推进中</span>
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
                                            </router-link>
                                            <div>
                                                <Loading :showloadingwrap="showLoadingWrap2_4"
                                                         :showloadingimg="showLoadingImg2_4"></Loading>
                                            </div>
                                        </ul>
                                    </div>
                                </div>
                                <div class="swiper-slide">
                                    <div class="list-wrap" ref="wrapper2_5">
                                        <ul class="task">
                                            <router-link tag="li"
                                                         :to="{name:'taskdetail',params:{detailObj:JSON.stringify(item),isCurrentMonth:false}}"
                                                         v-for="item in list2_5" :key="item.id">
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
                                                <div class="child-list" :class="{folded:!folded}">
                                                    <ul class="task">
                                                        <router-link tag="li"
                                                                     :to="{name:'taskdetail',params:{detailObj:JSON.stringify(subitem),isCurrentMonth:false}}"
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
                                                                        <span v-if="subitem.endtime && util.compareDate(subitem.endtime.split(' ')[0],today)">推进中</span>
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
                                            </router-link>
                                            <div>
                                                <Loading :showloadingwrap="showLoadingWrap2_5"
                                                         :showloadingimg="showLoadingImg2_5"></Loading>
                                            </div>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="swiper-slide">
                        <div class="parent-tabwrap">
                            <c-tab :titlebar="titlebar3"
                                   @update:currentIndex="getCurrentIndex4($event)"
                                   :currentIndex="tabCurrentIndex3"></c-tab>
                        </div>

                        <div class="swiper-container forth-container swiper-no-swiping">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide">
                                    <div class="list-wrap" ref="wrapper3_1">
                                        <ul class="task">
                                            <router-link tag="li"
                                                         :to="{name:'taskdetail',params:{detailObj:JSON.stringify(item)},isCurrentMonth:false}"
                                                         v-for="item in list3_1" :key="item.id">
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
                                                <div class="child-list" :class="{folded:!folded}">
                                                    <ul class="task">
                                                        <router-link tag="li"
                                                                     :to="{name:'taskdetail',params:{detailObj:JSON.stringify(subitem),isCurrentMonth:false}}"
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
                                                                        <span v-if="subitem.endtime && util.compareDate(subitem.endtime.split(' ')[0],today)">推进中</span>
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
                                            </router-link>
                                            <div>
                                                <Loading :showloadingwrap="showLoadingWrap3_1"
                                                         :showloadingimg="showLoadingImg3_1"></Loading>
                                            </div>
                                        </ul>
                                    </div>
                                </div>
                                <div class="swiper-slide">
                                    <div class="list-wrap" ref="wrapper3_2">
                                        <ul class="task">
                                            <router-link tag="li"
                                                         :to="{name:'taskdetail',params:{detailObj:JSON.stringify(item),isCurrentMonth:false}}"
                                                         v-for="item in list3_2" :key="item.id">
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
                                                <div class="child-list" :class="{folded:!folded}">
                                                    <ul class="task">
                                                        <router-link tag="li"
                                                                     :to="{name:'taskdetail',params:{detailObj:JSON.stringify(subitem),isCurrentMonth:false}}"
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
                                                                        <span v-if="subitem.endtime && util.compareDate(subitem.endtime.split(' ')[0],today)">推进中</span>
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
                                            </router-link>
                                            <div>
                                                <Loading :showloadingwrap="showLoadingWrap3_2"
                                                         :showloadingimg="showLoadingImg3_2"></Loading>
                                            </div>
                                        </ul>
                                    </div>
                                </div>
                                <div class="swiper-slide">
                                    <div class="list-wrap" ref="wrapper3_3">
                                        <ul class="task">
                                            <router-link tag="li"
                                                         :to="{name:'taskdetail',params:{detailObj:JSON.stringify(item),isCurrentMonth:false}}"
                                                         v-for="item in list3_3" :key="item.id">
                                                <div class="head">
                                                    <div class="title"><span class="projectName ellipsis">{{item.projectName}}</span>
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
                                                <div class="child-list" :class="{folded:!folded}">
                                                    <ul class="task">
                                                        <router-link tag="li"
                                                                     :to="{name:'taskdetail',params:{detailObj:JSON.stringify(subitem),isCurrentMonth:false}}"
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
                                                                        <span v-if="subitem.endtime && util.compareDate(subitem.endtime.split(' ')[0],today)">推进中</span>
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
                                            </router-link>
                                            <div>
                                                <Loading :showloadingwrap="showLoadingWrap3_3"
                                                         :showloadingimg="showLoadingImg3_3"></Loading>
                                            </div>
                                        </ul>
                                    </div>
                                </div>
                                <div class="swiper-slide">
                                    <div class="list-wrap" ref="wrapper3_4">
                                        <ul class="task">
                                            <router-link tag="li"
                                                         :to="{name:'taskdetail',params:{detailObj:JSON.stringify(item),isCurrentMonth:false}}"
                                                         v-for="item in list3_4" :key="item.id">
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
                                                <div class="child-list" :class="{folded:!folded}">
                                                    <ul class="task">
                                                        <router-link tag="li"
                                                                     :to="{name:'taskdetail',params:{detailObj:JSON.stringify(subitem),isCurrentMonth:false}}"
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
                                                                        <span v-if="subitem.endtime && util.compareDate(subitem.endtime.split(' ')[0],today)">推进中</span>
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
                                            </router-link>
                                            <div>
                                                <Loading :showloadingwrap="showLoadingWrap3_4"
                                                         :showloadingimg="showLoadingImg3_4"></Loading>
                                            </div>
                                        </ul>
                                    </div>
                                </div>
                                <div class="swiper-slide">
                                    <div class="list-wrap" ref="wrapper3_5">
                                        <ul class="task">
                                            <router-link tag="li"
                                                         :to="{name:'taskdetail',params:{detailObj:JSON.stringify(item),isCurrentMonth:false}}"
                                                         v-for="item in list3_5" :key="item.id">
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
                                                <div class="child-list" :class="{folded:!folded}">
                                                    <ul class="task">
                                                        <router-link tag="li"
                                                                     :to="{name:'taskdetail',params:{detailObj:JSON.stringify(subitem),isCurrentMonth:false}}"
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
                                                                        <span v-if="subitem.endtime && util.compareDate(subitem.endtime.split(' ')[0],today)">推进中</span>
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
                                            </router-link>
                                            <div>
                                                <Loading :showloadingwrap="showLoadingWrap3_5"
                                                         :showloadingimg="showLoadingImg3_5"></Loading>
                                            </div>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="swiper-slide">
                        <div class="parent-tabwrap">
                            <c-tab :titlebar="titlebar4"
                                   @update:currentIndex="getCurrentIndex5($event)"
                                   :currentIndex="tabCurrentIndex4"></c-tab>
                        </div>

                        <div class="swiper-container fifth-container swiper-no-swiping">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide">
                                    <div class="list-wrap" ref="wrapper4_1">
                                        <ul class="task">
                                            <router-link tag="li"
                                                         :to="{name:'taskdetail',params:{detailObj:JSON.stringify(item)},isCurrentMonth:false}"
                                                         v-for="item in list4_1" :key="item.id">
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
                                                <div class="child-list" :class="{folded:!folded}">
                                                    <ul class="task">
                                                        <router-link tag="li"
                                                                     :to="{name:'taskdetail',params:{detailObj:JSON.stringify(subitem),isCurrentMonth:false}}"
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
                                                                        <span v-if="subitem.endtime && util.compareDate(subitem.endtime.split(' ')[0],today)">推进中</span>
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
                                            </router-link>
                                            <div>
                                                <Loading :showloadingwrap="showLoadingWrap4_1"
                                                         :showloadingimg="showLoadingImg4_1"></Loading>
                                            </div>
                                        </ul>
                                    </div>
                                </div>
                                <div class="swiper-slide">
                                    <div class="list-wrap" ref="wrapper4_2">
                                        <ul class="task">
                                            <router-link tag="li"
                                                         :to="{name:'taskdetail',params:{detailObj:JSON.stringify(item),isCurrentMonth:false}}"
                                                         v-for="item in list4_2" :key="item.id">
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
                                                <div class="child-list" :class="{folded:!folded}">
                                                    <ul class="task">
                                                        <router-link tag="li"
                                                                     :to="{name:'taskdetail',params:{detailObj:JSON.stringify(subitem),isCurrentMonth:false}}"
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
                                                                        <span v-if="subitem.endtime && util.compareDate(subitem.endtime.split(' ')[0],today)">推进中</span>
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
                                            </router-link>
                                            <div>
                                                <Loading :showloadingwrap="showLoadingWrap4_2"
                                                         :showloadingimg="showLoadingImg4_2"></Loading>
                                            </div>
                                        </ul>
                                    </div>
                                </div>
                                <div class="swiper-slide">
                                    <div class="list-wrap" ref="wrapper4_3">
                                        <ul class="task">
                                            <router-link tag="li"
                                                         :to="{name:'taskdetail',params:{detailObj:JSON.stringify(item),isCurrentMonth:false}}"
                                                         v-for="item in list4_3" :key="item.id">
                                                <div class="head">
                                                    <div class="title"><span class="projectName ellipsis">{{item.projectName}}</span>
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
                                                <div class="child-list" :class="{folded:!folded}">
                                                    <ul class="task">
                                                        <router-link tag="li"
                                                                     :to="{name:'taskdetail',params:{detailObj:JSON.stringify(subitem),isCurrentMonth:false}}"
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
                                                                        <span v-if="subitem.endtime && util.compareDate(subitem.endtime.split(' ')[0],today)">推进中</span>
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
                                            </router-link>
                                            <div>
                                                <Loading :showloadingwrap="showLoadingWrap4_3"
                                                         :showloadingimg="showLoadingImg4_3"></Loading>
                                            </div>
                                        </ul>
                                    </div>
                                </div>
                                <div class="swiper-slide">
                                    <div class="list-wrap" ref="wrapper4_4">
                                        <ul class="task">
                                            <router-link tag="li"
                                                         :to="{name:'taskdetail',params:{detailObj:JSON.stringify(item),isCurrentMonth:false}}"
                                                         v-for="item in list4_4" :key="item.id">
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
                                                <div class="child-list" :class="{folded:!folded}">
                                                    <ul class="task">
                                                        <router-link tag="li"
                                                                     :to="{name:'taskdetail',params:{detailObj:JSON.stringify(subitem),isCurrentMonth:false}}"
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
                                                                        <span v-if="subitem.endtime && util.compareDate(subitem.endtime.split(' ')[0],today)">推进中</span>
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
                                            </router-link>
                                            <div>
                                                <Loading :showloadingwrap="showLoadingWrap4_4"
                                                         :showloadingimg="showLoadingImg4_4"></Loading>
                                            </div>
                                        </ul>
                                    </div>
                                </div>
                                <div class="swiper-slide">
                                    <div class="list-wrap" ref="wrapper4_5">
                                        <ul class="task">
                                            <router-link tag="li"
                                                         :to="{name:'taskdetail',params:{detailObj:JSON.stringify(item),isCurrentMonth:false}}"
                                                         v-for="item in list4_5" :key="item.id">
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
                                                <div class="child-list" :class="{folded:!folded}">
                                                    <ul class="task">
                                                        <router-link tag="li"
                                                                     :to="{name:'taskdetail',params:{detailObj:JSON.stringify(subitem),isCurrentMonth:false}}"
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
                                                                        <span v-if="subitem.endtime && util.compareDate(subitem.endtime.split(' ')[0],today)">推进中</span>
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
                                            </router-link>
                                            <div>
                                                <Loading :showloadingwrap="showLoadingWrap4_5"
                                                         :showloadingimg="showLoadingImg4_5"></Loading>
                                            </div>
                                        </ul>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--<router-link :to="{name:'tempAdd'}"-->
            <!--tag="div" class="btn">-->
            <!--<span class="icon">临时下发</span>-->
            <!--</router-link>-->
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
      name: '董事会',
    },
    {
      name: '执委会'
    },
    {
      name: '我下发的'
    },
    {
      name: '全部'
    }
  ]
  let titlebar1_1 = [
    {
      name: '本月工作',
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
  let titlebar1_2 = [
    {
      name: '本月工作',
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
  let titlebar1_3 = [
    {
      name: '本月工作',
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
  let titlebar1_4 = [
    {
      name: '本月工作',
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
  let titlebar2_1 = [
    {
      // name: '本年工作',
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
  let titlebar2_2 = [
    {
      // name: '本年工作',
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
  let titlebar2_3 = [
    {
      // name: '本年工作',
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
  let titlebar2_4 = [
    {
      // name: '本年工作',
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
    name: "chairmanList",
    components: {
      'taskSearch': taskSearch,
    },
    data() {
      return {
        btnTitle,
        titlebar1: titlebar1_1,
        titlebar2: titlebar1_2,
        titlebar3: titlebar1_3,
        titlebar4: titlebar1_4,
        titlebar1_1,
        titlebar1_2,
        titlebar1_3,
        titlebar1_4,
        titlebar2_1,
        titlebar2_2,
        titlebar2_3,
        titlebar2_4,
        detailSwiper1: null,
        detailSwiper2: null,
        detailSwiper3: null,
        detailSwiper4: null,
        detailSwiper5: null,
        btnCurrentIndex: 0,
        tabCurrentIndex1: 0,
        tabCurrentIndex2: 0,
        tabCurrentIndex3: 0,
        tabCurrentIndex4: 0,
        showLoadingWrap10: false,
        showLoadingWrap1_1: false,
        showLoadingWrap1_2: false,
        showLoadingWrap1_3: false,
        showLoadingWrap1_4: false,
        showLoadingWrap1_5: false,
        showLoadingWrap2_1: false,
        showLoadingWrap2_2: false,
        showLoadingWrap2_3: false,
        showLoadingWrap2_4: false,
        showLoadingWrap2_5: false,
        showLoadingWrap3_1: false,
        showLoadingWrap3_2: false,
        showLoadingWrap3_3: false,
        showLoadingWrap3_4: false,
        showLoadingWrap3_5: false,
        showLoadingWrap4_1: false,
        showLoadingWrap4_2: false,
        showLoadingWrap4_3: false,
        showLoadingWrap4_4: false,
        showLoadingWrap4_5: false,
        showLoadingImg10: false,
        showLoadingImg1_1: false,
        showLoadingImg1_2: false,
        showLoadingImg1_3: false,
        showLoadingImg1_4: false,
        showLoadingImg1_5: false,
        showLoadingImg2_1: false,
        showLoadingImg2_2: false,
        showLoadingImg2_3: false,
        showLoadingImg2_4: false,
        showLoadingImg2_5: false,
        showLoadingImg3_1: false,
        showLoadingImg3_2: false,
        showLoadingImg3_3: false,
        showLoadingImg3_4: false,
        showLoadingImg3_5: false,
        showLoadingImg4_1: false,
        showLoadingImg4_2: false,
        showLoadingImg4_3: false,
        showLoadingImg4_4: false,
        showLoadingImg4_5: false,
        element: null,
        scroll1_1: null,
        scroll1_2: null,
        scroll1_3: null,
        scroll1_4: null,
        scroll1_5: null,
        scroll2_1: null,
        scroll2_2: null,
        scroll2_3: null,
        scroll2_4: null,
        scroll2_5: null,
        scroll3_1: null,
        scroll3_2: null,
        scroll3_3: null,
        scroll3_4: null,
        scroll3_5: null,
        scroll4_1: null,
        scroll4_2: null,
        scroll4_3: null,
        scroll4_4: null,
        scroll4_5: null,
        scroll:null,
        list:[],
        list1_1: [],
        list1_2: [],
        list1_3: [],
        list1_4: [],
        list1_5: [],
        list2_1: [],
        list2_2: [],
        list2_3: [],
        list2_4: [],
        list2_5: [],
        list3_1: [],
        list3_2: [],
        list3_3: [],
        list3_4: [],
        list3_5: [],
        list4_1: [],
        list4_2: [],
        list4_3: [],
        list4_4: [],
        list4_5: [],
        openId: '',
        taskStatus: 0,
        taskType: 0,
        timeRange: [],
        folded: false,
        charge: null,
        sign: null,
        timeType: 0,
        util,
        today: new Date(),
        openSearch:false,
        showSearchResult:false,
        searchResultLength:0,
      }
    },
    watch: {
      btnCurrentIndex() {
        this.$store.commit('setCurrentBtnIndex', this.btnCurrentIndex)

        if (this.btnCurrentIndex === 0) {
          // this.loadData(this.$store.state.openID, this.$store.state.taskType, 0, this.tabCurrentIndex1, 1, 10)
          this.$store.commit('setTaskType', '')
          this.loadData(1, 10, this.$store.getters.openID, this.timeType, this.tabCurrentIndex1, this.btnCurrentIndex)
        }
        if (this.btnCurrentIndex === 1) {
          // this.loadData(this.$store.state.openID, this.$store.state.taskType, 1, this.tabCurrentIndex2, 1, 10)
          this.$store.commit('setTaskType', '')
          this.loadData(1, 10, this.$store.getters.openID, this.timeType, this.tabCurrentIndex2, this.btnCurrentIndex)
        }
        if (this.btnCurrentIndex === 2) {
          // this.loadData(this.$store.state.openID, this.$store.state.taskType, 2, this.tabCurrentIndex3, 1, 10)
          this.$store.commit('setTaskType', 'sign')
          this.loadData(1, 10, this.$store.getters.openID, this.timeType, this.tabCurrentIndex3, this.btnCurrentIndex)

        }
        if (this.btnCurrentIndex === 3) {
          this.$store.commit('setTaskType', '')
          // this.loadData(this.$store.state.openID, this.$store.state.taskType, 3, this.tabCurrentIndex4, 1, 10)
          this.loadData(1, 10, this.$store.getters.openID, this.timeType, this.tabCurrentIndex4, this.btnCurrentIndex)

        }
      },
      tabCurrentIndex1() {
        this.$store.commit('setCurrentTabIndex', this.tabCurrentIndex1)

        // this.loadData(this.$store.state.openID, this.$store.state.taskType, 0, this.tabCurrentIndex1, 1, 10)
        this.loadData(1, 10, this.$store.getters.openID, this.timeType, this.tabCurrentIndex1, this.btnCurrentIndex)

      },
      tabCurrentIndex2() {
        this.$store.commit('setCurrentTabIndex', this.tabCurrentIndex2)

        // this.loadData(this.$store.state.openID, this.$store.state.taskType, 1, this.tabCurrentIndex2, 1, 10)
        this.loadData(1, 10, this.$store.getters.openID, this.timeType, this.tabCurrentIndex2, this.btnCurrentIndex)

      },
      tabCurrentIndex3() {
        this.$store.commit('setCurrentTabIndex', this.tabCurrentIndex3)

        console.log('this.tabCurrentIndex3', this.tabCurrentIndex3)
        // this.loadData(this.$store.state.openID, this.$store.state.taskType, 2, this.tabCurrentIndex3, 1, 10)
        this.loadData(1, 10, this.$store.getters.openID, this.timeType, this.tabCurrentIndex3, this.btnCurrentIndex)

      },
      tabCurrentIndex4() {
        this.$store.commit('setCurrentTabIndex', this.tabCurrentIndex4)

        // this.loadData(this.$store.state.openID, this.$store.state.taskType, 3, this.tabCurrentIndex4, 1, 10)
        this.loadData(1, 10, this.$store.getters.openID, this.timeType, this.tabCurrentIndex4, this.btnCurrentIndex)

      },
    },
    beforeRouteEnter(to, from, next) {
      qing.call('setWebViewTitle', { 'title': '工作列表' })

      next(vm => {
        if (from.name === 'chairmanIndex') {
          let { timeType, source, taskStatus } = vm.$route.params
          vm.timeType = timeType
          vm.source = source
          vm.taskStatus = taskStatus

          // if (vm.timeRange) {
          //   localStorage.setItem('timeRange', vm.timeRange)
          // }
          // if (vm.taskStatus) {
          //   localStorage.setItem('taskStatus', vm.taskStatus)
          // }
          if (vm.timeType || vm.timeType == 0) {
            localStorage.setItem('timeType', vm.timeType)
          }

          vm.$store.commit('setCurrentBtnIndex', vm.source)
          vm.$store.commit('setCurrentTabIndex', vm.taskStatus)


          console.log('vm.timeType', vm.timeType)

        }
        else {
          // vm.timeRange = localStorage.getItem('timeRange')
          vm.timeType = Number(localStorage.getItem('timeType'))
          // vm.taskStatus = localStorage.getItem('taskStatus')
          vm.source = vm.$store.state.currentBtnIndex
          vm.taskStatus = vm.$store.state.currentTabIndex
          console.log('vm.timeType else', vm.timeType)
          console.log(typeof vm.timeType)


        }
        if(localStorage.getItem('keepShowResultOpen') === '1'){
          vm.showSearchResult = true
          let selectSource = localStorage.getItem('searchParams')
          vm.getQueryTaskListToSearch(JSON.parse(selectSource))
        }

        let range = []
        let today = new Date()
        if (vm.timeType === 0) {
          vm.titlebar1 = titlebar1_1
          vm.titlebar2 = titlebar1_2
          vm.titlebar3 = titlebar1_3
          vm.titlebar4 = titlebar1_4

          range = [util.getFirstDateOfMonthHMS(today), util.getLastDateOfMonthHMS(today)]

        }
        else {
          vm.titlebar1 = titlebar2_1
          vm.titlebar2 = titlebar2_2
          vm.titlebar3 = titlebar2_3
          vm.titlebar4 = titlebar2_4

          // range = [util.getFirstDateOfYearHMS(today), util.getLastDateOfYearHMS(today)]
          range = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']
        }

        // let getNumURL = vm.$url + "/taskSystem/task/statusNum"
        let getNumURL = "http://rest.apizza.net/mock/21c5cf3ed4022de252a80d8e8366c6f7/statusNum"

        // axios.get(getNumURL, {
        //   params: {
        //     openIDStr: vm.$store.getters.openID,
        //     rangeStr: range.join(',')
        //   }
        // })
        //   .then((response) => {
        //     // alert("getNumURL调用成功")
        //     console.log(response.data)
        //     if (response.data.result.length > 0) {
        //       let data = response.data.result[0]
        //       let sign = data.dispatch
        //
        //       // vm.titlebar3[0].num = sign.all
        //       vm.titlebar3[0].num = sign.finished + sign.doing + sign.unfinished + sign.abolish
        //       vm.titlebar3[1].num = sign.finished
        //       vm.titlebar3[2].num = sign.doing
        //       vm.titlebar3[3].num = sign.unfinished
        //       vm.titlebar3[4].num = sign.abolish
        //     }
        //   })
        axios.get(getNumURL, {
          params: {
            sourceStr: '1,3,7',
            rangeStr: range.join(',')
          }
        })
          .then((response) => {
            // alert("getNumURL调用成功")
            console.log(response.data)
            if (response.data.result.length > 0) {
              response.data.result.forEach((item) => {
                if (item.sourceId === '1') {
                  let sourceDSH = item.all
                  // vm.titlebar1[0].num = sourceDSH.all

                  vm.titlebar1[0].num = sourceDSH.finished + sourceDSH.doing + sourceDSH.unfinished + sourceDSH.abolish
                  vm.titlebar1[1].num = sourceDSH.finished
                  vm.titlebar1[2].num = sourceDSH.doing
                  vm.titlebar1[3].num = sourceDSH.unfinished
                  vm.titlebar1[4].num = sourceDSH.abolish
                }
                if (item.sourceId === '3') {
                  let sourceZWH = item.all
                  vm.titlebar2[0].num = sourceZWH.finished + sourceZWH.doing + sourceZWH.unfinished + sourceZWH.abolish
                  vm.titlebar2[1].num = sourceZWH.finished
                  vm.titlebar2[2].num = sourceZWH.doing
                  vm.titlebar2[3].num = sourceZWH.unfinished
                  vm.titlebar2[4].num = sourceZWH.abolish
                }
                if (item.sourceId === '7') {
                  let sourceZXAP = item.all
                  vm.titlebar3[0].num = sourceZXAP.finished + sourceZXAP.doing + sourceZXAP.unfinished + sourceZXAP.abolish
                  vm.titlebar3[1].num = sourceZXAP.finished
                  vm.titlebar3[2].num = sourceZXAP.doing
                  vm.titlebar3[3].num = sourceZXAP.unfinished
                  vm.titlebar3[4].num = sourceZXAP.abolish
                }
              })
            }
          })
        axios.get(getNumURL, {
          params: {
            rangeStr: range.join(',')
          }
        })
          .then((response) => {
            // alert("getNumURL调用成功")
            console.log(response.data)
            if (response.data.result.length > 0) {
              let all = response.data.result[0].all
              // vm.titlebar4[0].num = all.all
              vm.titlebar4[0].num = all.finished + all.doing + all.unfinished + all.abolish
              vm.titlebar4[1].num = all.finished
              vm.titlebar4[2].num = all.doing
              vm.titlebar4[3].num = all.unfinished
              vm.titlebar4[4].num = all.abolish
            }
          })

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
          vm.detailSwiper4 = new Swiper('.forth-container', {
            on: {
              slideChangeTransitionStart: () => {
                vm.tabCurrentIndex3 = vm.detailSwiper4.activeIndex
              }
            },
          })
          vm.detailSwiper5 = new Swiper('.fifth-container', {
            on: {
              slideChangeTransitionStart: () => {
                vm.tabCurrentIndex4 = vm.detailSwiper5.activeIndex
              }
            },
          })

          vm.btnCurrentIndex = vm.source
          // vm.$store.commit('setCurrentBtnIndex', vm.btnCurrentIndex)

          vm.detailSwiper1.slideTo(vm.btnCurrentIndex);

          if (vm.btnCurrentIndex === 0) {
            console.log('vm.tabCurrentIndex1', vm.taskStatus)
            vm.detailSwiper2.slideTo(vm.taskStatus);
            vm.$nextTick(() => {
              vm.tabCurrentIndex1 = vm.taskStatus
            })
          } else if (vm.btnCurrentIndex === 1) {
            vm.detailSwiper3.slideTo(vm.taskStatus);
            vm.$nextTick(() => {
              vm.tabCurrentIndex2 = vm.taskStatus
            })
          } else if (vm.btnCurrentIndex === 2) {
            vm.detailSwiper4.slideTo(vm.taskStatus);
            vm.$nextTick(() => {
              vm.tabCurrentIndex3 = vm.taskStatus
            })
          } else if (vm.btnCurrentIndex === 3) {
            vm.detailSwiper5.slideTo(vm.taskStatus);
            vm.$nextTick(() => {
              vm.tabCurrentIndex4 = vm.taskStatus
            })
          }
          vm.$store.commit('setCurrentTabIndex', vm.taskStatus)


          vm.loadData(1, 10, vm.$store.getters.openID, vm.timeType, vm.taskStatus, vm.btnCurrentIndex)
        })

      })
    },
    beforeRouteLeave(to, from, next) {
      if (to.name !== 'taskdetail') {
        this.$store.commit('noKeepAlive')
      }
      next();
    },
    beforeDestroy() {
      this.titlebar1_1 = []
      this.titlebar1_2 = []
      this.titlebar1_3 = []
      this.titlebar1_4 = []
      this.titlebar2_1 = []
      this.titlebar2_2 = []
      this.titlebar2_3 = []
      this.titlebar2_4 = []
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
      getCurrentIndex4(e) {
        this.tabCurrentIndex3 = e;
        this.detailSwiper4.slideTo(e);
      },
      getCurrentIndex5(e) {
        this.tabCurrentIndex4 = e;
        this.detailSwiper5.slideTo(e);
      },
      onClickToExpand() {

      },
      onClickToggle($event) {
        $event.stopPropagation()
        this.folded = !this.folded
      },
      objAssignment(obj) {

      },
      ajax(url, params, list, scroll, wrapElement, orderNum) {
        switch (orderNum) {
          case '1_1': {
            this.showLoadingWrap1_1 = true
            this.showLoadingImg1_1 = true
            break
          }
          case '1_2': {
            this.showLoadingWrap1_2 = true
            this.showLoadingImg1_2 = true
            break
          }
          case '1_3': {
            this.showLoadingWrap1_3 = true
            this.showLoadingImg1_3 = true
            break
          }
          case '1_4': {
            this.showLoadingWrap1_4 = true
            this.showLoadingImg1_4 = true
            break
          }
          case '1_5': {
            this.showLoadingWrap1_5 = true
            this.showLoadingImg1_5 = true
            break
          }
          case '2_1': {
            this.showLoadingWrap2_1 = true
            this.showLoadingImg2_1 = true
            break
          }
          case '2_2': {
            this.showLoadingWrap2_2 = true
            this.showLoadingImg2_2 = true
            break
          }
          case '2_3': {
            this.showLoadingWrap2_3 = true
            this.showLoadingImg2_3 = true
            break
          }
          case '2_4': {
            this.showLoadingWrap2_4 = true
            this.showLoadingImg2_4 = true
            break
          }
          case '2_5': {
            this.showLoadingWrap2_5 = true
            this.showLoadingImg2_5 = true
            break
          }
          case '3_1': {
            this.showLoadingWrap3_1 = true
            this.showLoadingImg3_1 = true
            break
          }
          case '3_2': {
            this.showLoadingWrap3_2 = true
            this.showLoadingImg3_2 = true
            break
          }
          case '3_3': {
            this.showLoadingWrap3_3 = true
            this.showLoadingImg3_3 = true
            break
          }
          case '3_4': {
            this.showLoadingWrap3_4 = true
            this.showLoadingImg3_4 = true
            break
          }
          case '3_5': {
            this.showLoadingWrap3_5 = true
            this.showLoadingImg3_5 = true
            break
          }

          case '4_1': {
            this.showLoadingWrap4_1 = true
            this.showLoadingImg4_1 = true
            break
          }
          case '4_2': {
            this.showLoadingWrap4_2 = true
            this.showLoadingImg4_2 = true
            break
          }
          case '4_3': {
            this.showLoadingWrap4_3 = true
            this.showLoadingImg4_3 = true
            break
          }
          case '4_4': {
            this.showLoadingWrap4_4 = true
            this.showLoadingImg4_4 = true
            break
          }
          case '4_5': {
            this.showLoadingWrap4_5 = true
            this.showLoadingImg4_5 = true
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
                case '1_1': {
                  this.showLoadingWrap1_1 = false
                  break
                }
                case '1_2': {
                  this.showLoadingWrap1_2 = false
                  break
                }
                case '1_3': {
                  this.showLoadingWrap1_3 = false
                  break
                }
                case '1_4': {
                  this.showLoadingWrap1_4 = false
                  break
                }
                case '1_5': {
                  this.showLoadingWrap1_5 = false
                  break
                }
                case '2_1': {
                  this.showLoadingWrap2_1 = false
                  break
                }
                case '2_2': {
                  this.showLoadingWrap2_2 = false
                  break
                }
                case '2_3': {
                  this.showLoadingWrap2_3 = false
                  break
                }
                case '2_4': {
                  this.showLoadingWrap2_4 = false
                  break
                }
                case '2_5': {
                  this.showLoadingWrap2_5 = false
                  break
                }
                case '3_1': {
                  this.showLoadingWrap3_1 = false
                  break
                }
                case '3_2': {
                  this.showLoadingWrap3_2 = false
                  break
                }
                case '3_3': {
                  this.showLoadingWrap3_3 = false
                  break
                }
                case '3_4': {
                  this.showLoadingWrap3_4 = false
                  break
                }
                case '3_5': {
                  this.showLoadingWrap3_5 = false
                  break
                }

                case '4_1': {
                  this.showLoadingWrap4_1 = false
                  break
                }
                case '4_2': {
                  this.showLoadingWrap4_2 = false
                  break
                }
                case '4_3': {
                  this.showLoadingWrap4_3 = false
                  break
                }
                case '4_4': {
                  this.showLoadingWrap4_4 = false
                  break
                }
                case '4_5': {
                  this.showLoadingWrap4_5 = false
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
              console.log('newList', newlist)
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
                case '1_1': {
                  this.showLoadingImg1_1 = false
                  break
                }
                case '1_2': {
                  this.showLoadingImg1_2 = false
                  break
                }
                case '1_3': {
                  this.showLoadingImg1_3 = false
                  break
                }
                case '1_4': {
                  this.showLoadingImg1_4 = false
                  break
                }
                case '1_5': {
                  this.showLoadingImg1_5 = false
                  break
                }
                case '2_1': {
                  this.showLoadingImg2_1 = false
                  break
                }
                case '2_2': {
                  this.showLoadingImg2_2 = false
                  break
                }
                case '2_3': {
                  this.showLoadingImg2_3 = false
                  break
                }
                case '2_4': {
                  this.showLoadingImg2_4 = false
                  break
                }
                case '2_5': {
                  this.showLoadingImg2_5 = false
                  break
                }
                case '3_1': {
                  this.showLoadingImg3_1 = false
                  break
                }
                case '3_2': {
                  this.showLoadingImg3_2 = false
                  break
                }
                case '3_3': {
                  this.showLoadingImg3_3 = false
                  break
                }
                case '3_4': {
                  this.showLoadingImg3_4 = false
                  break
                }
                case '3_5': {
                  this.showLoadingImg3_5 = false
                  break
                }
                case '4_1': {
                  this.showLoadingImg4_1 = false
                  break
                }
                case '4_2': {
                  this.showLoadingImg4_2 = false
                  break
                }
                case '4_3': {
                  this.showLoadingImg4_3 = false
                  break
                }
                case '4_4': {
                  this.showLoadingImg4_4 = false
                  break
                }
                case '4_5': {
                  this.showLoadingImg4_5 = false
                  break
                }
                case 10: {
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
              case '1_1': {
                this.showLoadingImg1_1 = false
                break
              }
              case '1_2': {
                this.showLoadingImg1_2 = false
                break
              }
              case '1_3': {
                this.showLoadingImg1_3 = false
                break
              }
              case '1_4': {
                this.showLoadingImg1_4 = false
                break
              }
              case '1_5': {
                this.showLoadingImg1_5 = false
                break
              }
              case '2_1': {
                this.showLoadingImg2_1 = false
                break
              }
              case '2_2': {
                this.showLoadingImg2_2 = false
                break
              }
              case '2_3': {
                this.showLoadingImg2_3 = false
                break
              }
              case '2_4': {
                this.showLoadingImg2_4 = false
                break
              }
              case '2_5': {
                this.showLoadingImg2_5 = false
                break
              }
              case '3_1': {
                this.showLoadingImg3_1 = false
                break
              }
              case '3_2': {
                this.showLoadingImg3_2 = false
                break
              }
              case '3_3': {
                this.showLoadingImg3_3 = false
                break
              }
              case '3_4': {
                this.showLoadingImg3_4 = false
                break
              }
              case '3_5': {
                this.showLoadingImg3_5 = false
                break
              }

              case '4_1': {
                this.showLoadingImg4_1 = false
                break
              }
              case '4_2': {
                this.showLoadingImg4_2 = false
                break
              }
              case '4_3': {
                this.showLoadingImg4_3 = false
                break
              }
              case '4_4': {
                this.showLoadingImg4_4 = false
                break
              }
              case '4_5': {
                this.showLoadingImg4_5 = false
                break
              }
              case 10: {
                this.showLoadingImg10 = false
                break
              }
              default: {
                break
              }
            }
          })
      },
      loadData(page, pageAmount, openId, timeType, taskStatus, btnCurrentIndex, taskType) {
        this.$store.commit('setCurrentBtnIndex', btnCurrentIndex)
        this.$store.commit('setCurrentTabIndex', taskStatus)
        let queryTask = {
          endtime: undefined,
          starttime: undefined,
          state: undefined,
          chargerID: undefined,
          signerID: undefined,
          life_done_type: undefined,
          helperID: undefined,
          sourceID: undefined
        }

        // let url = this.$url + '/taskSystem/task/list'
        let url = 'http://rest.apizza.net/mock/21c5cf3ed4022de252a80d8e8366c6f7/getList'

        // console.log('taskType', taskType)
        // if (taskType === 'charge') {
        //   queryTask.chargerID = openId
        //   queryTaskHelper.helperID = openId
        // } else if (taskType === "sign") {
        //   queryTask.signerID = openId
        // }
        let today = new Date()
        let newDay = today.getDate() + 1
        let todayCopy = new Date(today)
        todayCopy.setDate(newDay)
        console.log('-----------------')
        console.log(typeof this.timeType)
        console.log(this.timeType)
        console.log(typeof timeType)
        console.log(timeType)
        if (timeType === 0) {
          queryTask.starttime = ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)]
          queryTask.endtime = [util.getFirstDateOfMonthHMS(today), '9999-12-31 23:59:59']

          if (btnCurrentIndex === 0) {
            queryTask.sourceID = '1'

            if (taskStatus === 0) {
              queryTask.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]
              queryTask.life_done_type = undefined
              queryTask.state = [2, 3, 4]

              let queryTaskList = []
              queryTaskList.push(queryTask)

              let params = {
                page,
                pageAmount,
                queryTaskList: JSON.stringify(queryTaskList),
              }

              if (!this.showLoadingWrap1_1 && this.list1_1.length === 0) {
                // this.showLoadingWrap1_1 = true
                // this.showLoadingImg1_1 = true
                this.ajax(url, params, this.list1_1, this.scroll1_1, this.$refs.wrapper1_1, '1_1')
              }

            }
            else if (taskStatus === 1) {
              queryTask.starttime = ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)]
              queryTask.life_done_type = 1
              queryTask.state = [3]
              queryTask.life_state = 3

              let queryTaskList = []
              queryTaskList.push(queryTask)

              // axios.get('http://www.doclever.cn:8090/mock/5ca56bd7c273b90cd8215ed9/getBillListV1', {
              let params = {
                page,
                pageAmount,
                queryTaskList: JSON.stringify(queryTaskList),
              }
              if (!this.showLoadingWrap1_2 && this.list1_2.length === 0) {
                this.showLoadingWrap1_2 = true
                this.showLoadingImg1_2 = true
                this.ajax(url, params, this.list1_2, this.scroll1_2, this.$refs.wrapper1_2, '1_2')
              }

            }
            else if (taskStatus === 2) {

              queryTask.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]
              queryTask.endtime = [util.getYearMonthDayHMSString(today), '9999-12-31 23:59:59']
              queryTask.life_done_type = undefined
              queryTask.state = [2]

              let queryTaskList = []
              queryTaskList.push(queryTask)

              let params = {
                page,
                pageAmount,
                queryTaskList: JSON.stringify(queryTaskList),
              }
              if (!this.showLoadingWrap1_3 && this.list1_3.length === 0) {
                this.showLoadingWrap1_3 = true
                this.showLoadingImg1_3 = true
                this.ajax(url, params, this.list1_3, this.scroll1_3, this.$refs.wrapper1_3, '1_3')
              }
            }
            else if (taskStatus === 3) {
              queryTask.starttime = ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)]
              queryTask.life_done_type = 0
              queryTask.state = [3]
              queryTask.life_state = 3

              let queryTask2 = {
                sourceID: '1',
                state: [2],
                starttime: ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)],
                endtime: [util.getFirstDateOfMonthHMS(today), util.getYearMonthDayHMSString(today)],
                chargerID: undefined,
                signerID: undefined,
              }

              let queryTaskList = []
              queryTaskList.push(queryTask)
              queryTaskList.push(queryTask2)

              let params = {
                page,
                pageAmount,
                queryTaskList: JSON.stringify(queryTaskList),
              }
              if (!this.showLoadingWrap1_4 && this.list1_4.length === 0) {
                this.showLoadingWrap1_4 = true
                this.showLoadingImg1_4 = true
                this.ajax(url, params, this.list1_4, this.scroll1_4, this.$refs.wrapper1_4, '1_4')
              }
            }
            else if (taskStatus === 4) {
              queryTask.starttime = ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)]
              queryTask.state = [4]

              let queryTaskList = []
              queryTaskList.push(queryTask)

              let params = {
                page,
                pageAmount,
                queryTaskList: JSON.stringify(queryTaskList),
              }
              if (!this.showLoadingWrap1_5 && this.list1_5.length === 0) {
                this.showLoadingWrap1_5 = true
                this.showLoadingImg1_5 = true
                this.ajax(url, params, this.list1_5, this.scroll1_5, this.$refs.wrapper1_5, '1_5')
              }
            }
          }
          else if (btnCurrentIndex === 1) {
            queryTask.sourceID = '3'
            if (taskStatus === 0) {
              queryTask.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]
              queryTask.life_done_type = undefined
              queryTask.state = [2, 3, 4]

              let queryTaskList = []
              queryTaskList.push(queryTask)

              let params = {
                page,
                pageAmount,
                queryTaskList: JSON.stringify(queryTaskList),
              }
              // xxx(this.showLoadingWrap2_1,this.showLoadingImg2_1,this.list2_1,this.scroll2_1,this.$refs.wrapper2_1,'2_1')
              if (!this.showLoadingWrap2_1 && this.list2_1.length === 0) {
                this.showLoadingWrap2_1 = true
                this.showLoadingImg2_1 = true
                this.ajax(url, params, this.list2_1, this.scroll2_1, this.$refs.wrapper2_1, '2_1')
              }

            }
            else if (taskStatus === 1) {
              queryTask.starttime = ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)]
              queryTask.life_done_type = 1
              queryTask.state = [3]
              queryTask.life_state = 3

              let queryTaskList = []
              queryTaskList.push(queryTask)

              // axios.get('http://www.doclever.cn:8090/mock/5ca56bd7c273b90cd8215ed9/getBillListV1', {
              let params = {
                page,
                pageAmount,
                queryTaskList: JSON.stringify(queryTaskList),
              }
              if (!this.showLoadingWrap2_2 && this.list2_2.length === 0) {
                this.showLoadingWrap2_2 = true
                this.showLoadingImg2_2 = true
                this.ajax(url, params, this.list2_2, this.scroll2_2, this.$refs.wrapper2_2, '2_2')
              }

            }
            else if (taskStatus === 2) {

              queryTask.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]
              queryTask.endtime = [util.getYearMonthDayHMSString(today), '9999-12-31 23:59:59']
              queryTask.life_done_type = undefined
              queryTask.state = [2]

              let queryTaskList = []
              queryTaskList.push(queryTask)

              let params = {
                page,
                pageAmount,
                queryTaskList: JSON.stringify(queryTaskList),
              }
              if (!this.showLoadingWrap2_3 && this.list2_3.length === 0) {
                this.showLoadingWrap2_3 = true
                this.showLoadingImg2_3 = true
                this.ajax(url, params, this.list2_3, this.scroll2_3, this.$refs.wrapper2_3, '2_3')
              }
            }
            else if (taskStatus === 3) {
              queryTask.starttime = ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)]
              queryTask.life_done_type = 0
              queryTask.state = [3]
              queryTask.life_state = 3

              let queryTask2 = {
                sourceID: '3',
                state: [2],
                starttime: ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)],
                endtime: [util.getFirstDateOfMonthHMS(today), util.getYearMonthDayHMSString(today)],
                chargerID: undefined,
                signerID: undefined,
              }

              let queryTaskList = []
              queryTaskList.push(queryTask)
              queryTaskList.push(queryTask2)

              let params = {
                page,
                pageAmount,
                queryTaskList: JSON.stringify(queryTaskList),
              }
              if (!this.showLoadingWrap2_4 && this.list2_4.length === 0) {
                this.showLoadingWrap2_4 = true
                this.showLoadingImg2_4 = true
                this.ajax(url, params, this.list2_4, this.scroll2_4, this.$refs.wrapper2_4, '2_4')
              }
            }
            else if (taskStatus === 4) {
              queryTask.starttime = ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)]
              queryTask.state = [4]

              let queryTaskList = []
              queryTaskList.push(queryTask)

              let params = {
                page,
                pageAmount,
                queryTaskList: JSON.stringify(queryTaskList),
              }
              if (!this.showLoadingWrap2_5 && this.list2_5.length === 0) {
                this.showLoadingWrap2_5 = true
                this.showLoadingImg2_5 = true
                this.ajax(url, params, this.list2_5, this.scroll2_5, this.$refs.wrapper2_5, '2_5')
              }
            }
          }
          else if (btnCurrentIndex === 2) {
            // queryTask.signerID = openId
            queryTask.sourceID = '7'
            if (taskStatus === 0) {
              queryTask.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]
              queryTask.life_done_type = undefined
              queryTask.state = [2, 3, 4]

              let queryTaskList = []
              queryTaskList.push(queryTask)

              let params = {
                page,
                pageAmount,
                queryTaskList: JSON.stringify(queryTaskList),
              }

              if (!this.showLoadingWrap3_1 && this.list3_1.length === 0) {
                this.showLoadingWrap3_1 = true
                this.showLoadingImg3_1 = true
                this.ajax(url, params, this.list3_1, this.scroll3_1, this.$refs.wrapper3_1, '3_1')
              }

            }
            else if (taskStatus === 1) {
              queryTask.starttime = ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)]
              queryTask.life_done_type = 1
              queryTask.state = [3]
              queryTask.life_state = 3

              let queryTaskList = []
              queryTaskList.push(queryTask)

              // axios.get('http://www.doclever.cn:8090/mock/5ca56bd7c273b90cd8215ed9/getBillListV1', {
              let params = {
                page,
                pageAmount,
                queryTaskList: JSON.stringify(queryTaskList),
              }
              if (!this.showLoadingWrap3_2 && this.list3_2.length === 0) {
                this.showLoadingWrap3_2 = true
                this.showLoadingImg3_2 = true
                this.ajax(url, params, this.list3_2, this.scroll3_2, this.$refs.wrapper3_2, '3_2')
              }

            }
            else if (taskStatus === 2) {

              queryTask.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]
              queryTask.endtime = [util.getYearMonthDayHMSString(today), '9999-12-31 23:59:59']
              queryTask.life_done_type = undefined
              queryTask.state = [2]

              let queryTaskList = []
              queryTaskList.push(queryTask)

              let params = {
                page,
                pageAmount,
                queryTaskList: JSON.stringify(queryTaskList),
              }
              if (!this.showLoadingWrap3_3 && this.list3_3.length === 0) {
                this.showLoadingWrap3_3 = true
                this.showLoadingImg3_3 = true
                this.ajax(url, params, this.list3_3, this.scroll3_3, this.$refs.wrapper3_3, '3_3')
              }
            }
            else if (taskStatus === 3) {
              queryTask.starttime = ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)]
              queryTask.life_done_type = 0
              queryTask.state = [3]
              queryTask.life_state = 3

              let queryTask2 = {
                state: [2],
                starttime: ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)],
                endtime: [util.getFirstDateOfMonthHMS(today), util.getYearMonthDayHMSString(today)],
                chargerID: undefined,
                // signerID: openId,
                sourceID: '7'
              }

              let queryTaskList = []
              queryTaskList.push(queryTask)
              queryTaskList.push(queryTask2)

              let params = {
                page,
                pageAmount,
                queryTaskList: JSON.stringify(queryTaskList),
              }
              if (!this.showLoadingWrap3_4 && this.list3_4.length === 0) {
                this.showLoadingWrap3_4 = true
                this.showLoadingImg3_4 = true
                this.ajax(url, params, this.list3_4, this.scroll3_4, this.$refs.wrapper3_4, '3_4')
              }
            }
            else if (taskStatus === 4) {
              queryTask.starttime = ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)]
              queryTask.state = [4]

              let queryTaskList = []
              queryTaskList.push(queryTask)

              let params = {
                page,
                pageAmount,
                queryTaskList: JSON.stringify(queryTaskList),
              }
              if (!this.showLoadingWrap3_5 && this.list3_5.length === 0) {
                this.showLoadingWrap3_5 = true
                this.showLoadingImg3_5 = true
                this.ajax(url, params, this.list3_5, this.scroll3_5, this.$refs.wrapper3_5, '3_5')
              }
            }
          }
          else if (btnCurrentIndex === 3) {
            queryTask.state = [2, 3, 4]
            if (taskStatus === 0) {
              queryTask.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]
              queryTask.life_done_type = undefined
              // queryTask.state = [1, 2, 3, 4]

              let queryTaskList = []
              queryTaskList.push(queryTask)

              let params = {
                page,
                pageAmount,
                queryTaskList: JSON.stringify(queryTaskList),
              }

              if (!this.showLoadingWrap4_1 && this.list4_1.length === 0) {
                this.showLoadingWrap4_1 = true
                this.showLoadingImg4_1 = true
                this.ajax(url, params, this.list4_1, this.scroll4_1, this.$refs.wrapper4_1, '4_1')
              }

            }
            else if (taskStatus === 1) {
              queryTask.starttime = ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)]
              queryTask.life_done_type = 1
              queryTask.state = [3]
              queryTask.life_state = 3

              let queryTaskList = []
              queryTaskList.push(queryTask)

              // axios.get('http://www.doclever.cn:8090/mock/5ca56bd7c273b90cd8215ed9/getBillListV1', {
              let params = {
                page,
                pageAmount,
                queryTaskList: JSON.stringify(queryTaskList),
              }
              if (!this.showLoadingWrap4_2 && this.list4_2.length === 0) {
                this.showLoadingWrap4_2 = true
                this.showLoadingImg4_2 = true
                this.ajax(url, params, this.list4_2, this.scroll4_2, this.$refs.wrapper4_2, '4_2')
              }

            }
            else if (taskStatus === 2) {

              queryTask.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]
              queryTask.endtime = [util.getYearMonthDayHMSString(today), '9999-12-31 23:59:59']
              queryTask.life_done_type = undefined
              queryTask.state = [2]

              let queryTaskList = []
              queryTaskList.push(queryTask)

              let params = {
                page,
                pageAmount,
                queryTaskList: JSON.stringify(queryTaskList),
              }
              if (!this.showLoadingWrap4_3 && this.list4_3.length === 0) {
                this.showLoadingWrap4_3 = true
                this.showLoadingImg4_3 = true
                this.ajax(url, params, this.list4_3, this.scroll4_3, this.$refs.wrapper4_3, '4_3')
              }
            }
            else if (taskStatus === 3) {
              queryTask.starttime = ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)]
              queryTask.life_done_type = 0
              queryTask.state = [3]
              queryTask.life_state = 3

              let queryTask2 = {
                state: [2],
                starttime: ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)],
                endtime: [util.getFirstDateOfMonthHMS(today), util.getYearMonthDayHMSString(today)],
                chargerID: undefined,
                signerID: undefined,
              }

              let queryTaskList = []
              queryTaskList.push(queryTask)
              queryTaskList.push(queryTask2)

              let params = {
                page,
                pageAmount,
                queryTaskList: JSON.stringify(queryTaskList),
              }
              if (!this.showLoadingWrap4_4 && this.list4_4.length === 0) {
                this.showLoadingWrap4_4 = true
                this.showLoadingImg4_4 = true
                this.ajax(url, params, this.list4_4, this.scroll4_4, this.$refs.wrapper4_4, '4_4')
              }
            }
            else if (taskStatus === 4) {
              queryTask.starttime = ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)]
              queryTask.state = [4]

              let queryTaskList = []
              queryTaskList.push(queryTask)

              let params = {
                page,
                pageAmount,
                queryTaskList: JSON.stringify(queryTaskList),
              }
              if (!this.showLoadingWrap4_5 && this.list4_5.length === 0) {
                this.showLoadingWrap4_5 = true
                this.showLoadingImg4_5 = true
                this.ajax(url, params, this.list4_5, this.scroll4_5, this.$refs.wrapper4_5, '4_5')
              }
            }
          }

        }
        else if (timeType === 1) {

          // queryTask.starttime = ['1970-01-01 00:00:00', util.getLastDateOfYearHMS(today)]
          queryTask.starttime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']
          // queryTask.endtime = [util.getFirstDateOfYearHMS(today), '9999-12-31 23:59:59']
          queryTask.endtime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']


          if (btnCurrentIndex === 0) {
            queryTask.sourceID = '1'

            if (taskStatus === 0) {
              queryTask.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]
              queryTask.life_done_type = undefined
              queryTask.state = [2, 3, 4]

              let queryTaskList = []
              queryTaskList.push(queryTask)

              let params = {
                page,
                pageAmount,
                queryTaskList: JSON.stringify(queryTaskList),
              }

              if (!this.showLoadingWrap1_1 && this.list1_1.length === 0) {
                this.showLoadingWrap1_1 = true
                this.showLoadingImg1_1 = true
                this.ajax(url, params, this.list1_1, this.scroll1_1, this.$refs.wrapper1_1, '1_1')
              }

            }
            else if (taskStatus === 1) {
              // queryTask.starttime = ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)]
              queryTask.starttime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']
              queryTask.life_done_type = 1
              queryTask.state = [3]
              queryTask.life_state = 3

              let queryTaskList = []
              queryTaskList.push(queryTask)

              // axios.get('http://www.doclever.cn:8090/mock/5ca56bd7c273b90cd8215ed9/getBillListV1', {
              let params = {
                page,
                pageAmount,
                queryTaskList: JSON.stringify(queryTaskList),
              }
              if (!this.showLoadingWrap1_2 && this.list1_2.length === 0) {
                this.showLoadingWrap1_2 = true
                this.showLoadingImg1_2 = true
                this.ajax(url, params, this.list1_2, this.scroll1_2, this.$refs.wrapper1_2, '1_2')
              }

            }
            else if (taskStatus === 2) {

              queryTask.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]
              queryTask.endtime = [util.getYearMonthDayHMSString(today), '9999-12-31 23:59:59']
              queryTask.life_done_type = undefined
              queryTask.state = [2]

              let queryTaskList = []
              queryTaskList.push(queryTask)

              let params = {
                page,
                pageAmount,
                queryTaskList: JSON.stringify(queryTaskList),
              }
              if (!this.showLoadingWrap1_3 && this.list1_3.length === 0) {
                this.showLoadingWrap1_3 = true
                this.showLoadingImg1_3 = true
                this.ajax(url, params, this.list1_3, this.scroll1_3, this.$refs.wrapper1_3, '1_3')
              }
            }
            else if (taskStatus === 3) {
              // queryTask.starttime = ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)]
              queryTask.starttime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']
              queryTask.life_done_type = 0
              queryTask.state = [3]
              queryTask.life_state = 3

              let queryTask2 = {
                sourceID: '1',
                state: [2],
                // starttime: ['1970-01-01 00:00:00', util.getLastDateOfYearHMS(today)],
                starttime: ['1970-01-01 00:00:00', '9999-12-31 23:59:59'],
                // endtime: [util.getFirstDateOfYearHMS(today), util.getYearMonthDayHMSString(today)],
                endtime: ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)],
                chargerID: undefined,
                signerID: undefined,
              }

              let queryTaskList = []
              queryTaskList.push(queryTask)
              queryTaskList.push(queryTask2)

              let params = {
                page,
                pageAmount,
                queryTaskList: JSON.stringify(queryTaskList),
              }
              if (!this.showLoadingWrap1_4 && this.list1_4.length === 0) {
                this.showLoadingWrap1_4 = true
                this.showLoadingImg1_4 = true
                this.ajax(url, params, this.list1_4, this.scroll1_4, this.$refs.wrapper1_4, '1_4')
              }
            }
            else if (taskStatus === 4) {
              // queryTask.starttime = ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)]
              queryTask.starttime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']
              queryTask.state = [4]

              let queryTaskList = []
              queryTaskList.push(queryTask)

              let params = {
                page,
                pageAmount,
                queryTaskList: JSON.stringify(queryTaskList),
              }
              if (!this.showLoadingWrap1_5 && this.list1_5.length === 0) {
                this.showLoadingWrap1_5 = true
                this.showLoadingImg1_5 = true
                this.ajax(url, params, this.list1_5, this.scroll1_5, this.$refs.wrapper1_5, '1_5')
              }
            }
          }
          else if (btnCurrentIndex === 1) {
            queryTask.sourceID = '3'
            if (taskStatus === 0) {
              queryTask.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]
              queryTask.life_done_type = undefined
              queryTask.state = [2, 3, 4]

              let queryTaskList = []
              queryTaskList.push(queryTask)

              let params = {
                page,
                pageAmount,
                queryTaskList: JSON.stringify(queryTaskList),
              }
              // xxx(this.showLoadingWrap2_1,this.showLoadingImg2_1,this.list2_1,this.scroll2_1,this.$refs.wrapper2_1,'2_1')
              if (!this.showLoadingWrap2_1 && this.list2_1.length === 0) {
                this.showLoadingWrap2_1 = true
                this.showLoadingImg2_1 = true
                this.ajax(url, params, this.list2_1, this.scroll2_1, this.$refs.wrapper2_1, '2_1')
              }

            }
            else if (taskStatus === 1) {
              // queryTask.starttime = ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)]
              queryTask.starttime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']
              queryTask.life_done_type = 1
              queryTask.state = [3]
              queryTask.life_state = 3

              let queryTaskList = []
              queryTaskList.push(queryTask)

              // axios.get('http://www.doclever.cn:8090/mock/5ca56bd7c273b90cd8215ed9/getBillListV1', {
              let params = {
                page,
                pageAmount,
                queryTaskList: JSON.stringify(queryTaskList),
              }
              if (!this.showLoadingWrap2_2 && this.list2_2.length === 0) {
                this.showLoadingWrap2_2 = true
                this.showLoadingImg2_2 = true
                this.ajax(url, params, this.list2_2, this.scroll2_2, this.$refs.wrapper2_2, '2_2')
              }

            }
            else if (taskStatus === 2) {

              queryTask.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]
              queryTask.endtime = [util.getYearMonthDayHMSString(today), '9999-12-31 23:59:59']
              queryTask.life_done_type = undefined
              queryTask.state = [2]

              let queryTaskList = []
              queryTaskList.push(queryTask)

              let params = {
                page,
                pageAmount,
                queryTaskList: JSON.stringify(queryTaskList),
              }
              if (!this.showLoadingWrap2_3 && this.list2_3.length === 0) {
                this.showLoadingWrap2_3 = true
                this.showLoadingImg2_3 = true
                this.ajax(url, params, this.list2_3, this.scroll2_3, this.$refs.wrapper2_3, '2_3')
              }
            }
            else if (taskStatus === 3) {
              // queryTask.starttime = ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)]
              queryTask.starttime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']
              queryTask.life_done_type = 0
              queryTask.state = [3]
              queryTask.life_state = 3

              let queryTask2 = {
                sourceID: '3',
                state: [2],
                // starttime: ['1970-01-01 00:00:00', util.getLastDateOfYearHMS(today)],
                // endtime: [util.getFirstDateOfYearHMS(today), util.getYearMonthDayHMSString(today)],
                starttime: ['1970-01-01 00:00:00', '9999-12-31 23:59:59'],
                endtime: ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)],
                chargerID: undefined,
                signerID: undefined,
              }

              let queryTaskList = []
              queryTaskList.push(queryTask)
              queryTaskList.push(queryTask2)

              let params = {
                page,
                pageAmount,
                queryTaskList: JSON.stringify(queryTaskList),
              }
              if (!this.showLoadingWrap2_4 && this.list2_4.length === 0) {
                this.showLoadingWrap2_4 = true
                this.showLoadingImg2_4 = true
                this.ajax(url, params, this.list2_4, this.scroll2_4, this.$refs.wrapper2_4, '2_4')
              }
            }
            else if (taskStatus === 4) {
              // queryTask.starttime = ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)]
              queryTask.starttime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']
              queryTask.state = [4]

              let queryTaskList = []
              queryTaskList.push(queryTask)

              let params = {
                page,
                pageAmount,
                queryTaskList: JSON.stringify(queryTaskList),
              }
              if (!this.showLoadingWrap2_5 && this.list2_5.length === 0) {
                this.showLoadingWrap2_5 = true
                this.showLoadingImg2_5 = true
                this.ajax(url, params, this.list2_5, this.scroll2_5, this.$refs.wrapper2_5, '2_5')
              }
            }
          }
          else if (btnCurrentIndex === 2) {
            // queryTask.signerID = openId
            queryTask.sourceID = '7'
            if (taskStatus === 0) {
              queryTask.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]
              queryTask.life_done_type = undefined
              queryTask.state = [2, 3, 4]

              let queryTaskList = []
              queryTaskList.push(queryTask)

              let params = {
                page,
                pageAmount,
                queryTaskList: JSON.stringify(queryTaskList),
              }

              if (!this.showLoadingWrap3_1 && this.list3_1.length === 0) {
                this.showLoadingWrap3_1 = true
                this.showLoadingImg3_1 = true
                this.ajax(url, params, this.list3_1, this.scroll3_1, this.$refs.wrapper3_1, '3_1')
              }

            }
            else if (taskStatus === 1) {
              // queryTask.starttime = ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)]
              queryTask.starttime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']

              queryTask.life_done_type = 1
              queryTask.state = [3]
              queryTask.life_state = 3

              let queryTaskList = []
              queryTaskList.push(queryTask)

              // axios.get('http://www.doclever.cn:8090/mock/5ca56bd7c273b90cd8215ed9/getBillListV1', {
              let params = {
                page,
                pageAmount,
                queryTaskList: JSON.stringify(queryTaskList),
              }
              if (!this.showLoadingWrap3_2 && this.list3_2.length === 0) {
                this.showLoadingWrap3_2 = true
                this.showLoadingImg3_2 = true
                this.ajax(url, params, this.list3_2, this.scroll3_2, this.$refs.wrapper3_2, '3_2')
              }

            }
            else if (taskStatus === 2) {

              queryTask.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]
              queryTask.endtime = [util.getYearMonthDayHMSString(today), '9999-12-31 23:59:59']
              queryTask.life_done_type = undefined
              queryTask.state = [2]

              let queryTaskList = []
              queryTaskList.push(queryTask)

              let params = {
                page,
                pageAmount,
                queryTaskList: JSON.stringify(queryTaskList),
              }
              if (!this.showLoadingWrap3_3 && this.list3_3.length === 0) {
                this.showLoadingWrap3_3 = true
                this.showLoadingImg3_3 = true
                this.ajax(url, params, this.list3_3, this.scroll3_3, this.$refs.wrapper3_3, '3_3')
              }
            }
            else if (taskStatus === 3) {
              // queryTask.starttime = ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)]
              queryTask.starttime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']
              queryTask.life_done_type = 0
              queryTask.state = [3]
              queryTask.life_state = 3

              let queryTask2 = {
                state: [2],
                // starttime: ['1970-01-01 00:00:00', util.getLastDateOfYearHMS(today)],
                // endtime: [util.getFirstDateOfYearHMS(today), util.getYearMonthDayHMSString(today)],
                starttime: ['1970-01-01 00:00:00', '9999-12-31 23:59:59'],
                endtime: ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)],
                chargerID: undefined,
                // signerID: openId,
                sourceID: '7'
            }

              let queryTaskList = []
              queryTaskList.push(queryTask)
              queryTaskList.push(queryTask2)

              let params = {
                page,
                pageAmount,
                queryTaskList: JSON.stringify(queryTaskList),
              }
              if (!this.showLoadingWrap3_4 && this.list3_4.length === 0) {
                this.showLoadingWrap3_4 = true
                this.showLoadingImg3_4 = true
                this.ajax(url, params, this.list3_4, this.scroll3_4, this.$refs.wrapper3_4, '3_4')
              }
            }
            else if (taskStatus === 4) {
              // queryTask.starttime = ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)]
              queryTask.starttime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']
              queryTask.state = [4]

              let queryTaskList = []
              queryTaskList.push(queryTask)

              let params = {
                page,
                pageAmount,
                queryTaskList: JSON.stringify(queryTaskList),
              }
              if (!this.showLoadingWrap3_5 && this.list3_5.length === 0) {
                this.showLoadingWrap3_5 = true
                this.showLoadingImg3_5 = true
                this.ajax(url, params, this.list3_5, this.scroll3_5, this.$refs.wrapper3_5, '3_5')
              }
            }
          }
          else if (btnCurrentIndex === 3) {
            queryTask.state = [2, 3, 4]
            if (taskStatus === 0) {
              queryTask.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]
              queryTask.life_done_type = undefined
              queryTask.state = [1, 2, 3, 4]

              let queryTaskList = []
              queryTaskList.push(queryTask)

              let params = {
                page,
                pageAmount,
                queryTaskList: JSON.stringify(queryTaskList),
              }

              if (!this.showLoadingWrap4_1 && this.list4_1.length === 0) {
                this.showLoadingWrap4_1 = true
                this.showLoadingImg4_1 = true
                this.ajax(url, params, this.list4_1, this.scroll4_1, this.$refs.wrapper4_1, '4_1')
              }

            }
            else if (taskStatus === 1) {
              // queryTask.starttime = ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)]
              queryTask.starttime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']
              queryTask.life_done_type = 1
              queryTask.state = [3]
              queryTask.life_state = 3

              let queryTaskList = []
              queryTaskList.push(queryTask)

              // axios.get('http://www.doclever.cn:8090/mock/5ca56bd7c273b90cd8215ed9/getBillListV1', {
              let params = {
                page,
                pageAmount,
                queryTaskList: JSON.stringify(queryTaskList),
              }
              if (!this.showLoadingWrap4_2 && this.list4_2.length === 0) {
                this.showLoadingWrap4_2 = true
                this.showLoadingImg4_2 = true
                this.ajax(url, params, this.list4_2, this.scroll4_2, this.$refs.wrapper4_2, '4_2')
              }

            }
            else if (taskStatus === 2) {

              queryTask.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]
              queryTask.endtime = [util.getYearMonthDayHMSString(today), '9999-12-31 23:59:59']
              queryTask.life_done_type = undefined
              queryTask.state = [2]

              let queryTaskList = []
              queryTaskList.push(queryTask)

              let params = {
                page,
                pageAmount,
                queryTaskList: JSON.stringify(queryTaskList),
              }
              if (!this.showLoadingWrap4_3 && this.list4_3.length === 0) {
                this.showLoadingWrap4_3 = true
                this.showLoadingImg4_3 = true
                this.ajax(url, params, this.list4_3, this.scroll4_3, this.$refs.wrapper4_3, '4_3')
              }
            }
            else if (taskStatus === 3) {
              // queryTask.starttime = ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)]
              queryTask.starttime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']
              queryTask.life_done_type = 0
              queryTask.state = [3]
              queryTask.life_state = 3

              let queryTask2 = {
                state: [2],
                // starttime: ['1970-01-01 00:00:00', util.getLastDateOfYearHMS(today)],
                // endtime: [util.getFirstDateOfYearHMS(today), util.getYearMonthDayHMSString(today)],
                starttime: ['1970-01-01 00:00:00', '9999-12-31 23:59:59'],
                endtime: ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)],
                chargerID: undefined,
                signerID: undefined,
              }

              let queryTaskList = []
              queryTaskList.push(queryTask)
              queryTaskList.push(queryTask2)

              let params = {
                page,
                pageAmount,
                queryTaskList: JSON.stringify(queryTaskList),
              }
              if (!this.showLoadingWrap4_4 && this.list4_4.length === 0) {
                this.showLoadingWrap4_4 = true
                this.showLoadingImg4_4 = true
                this.ajax(url, params, this.list4_4, this.scroll4_4, this.$refs.wrapper4_4, '4_4')
              }
            }
            else if (taskStatus === 4) {
              // queryTask.starttime = ['1970-01-01 00:00:00', util.getLastDateOfMonthHMS(today)]
              queryTask.starttime = ['1970-01-01 00:00:00', '9999-12-31 23:59:59']
              queryTask.state = [4]

              let queryTaskList = []
              queryTaskList.push(queryTask)

              let params = {
                page,
                pageAmount,
                queryTaskList: JSON.stringify(queryTaskList),
              }
              if (!this.showLoadingWrap4_5 && this.list4_5.length === 0) {
                this.showLoadingWrap4_5 = true
                this.showLoadingImg4_5 = true
                this.ajax(url, params, this.list4_5, this.scroll4_5, this.$refs.wrapper4_5, '4_5')
              }
            }
          }

          // if (taskStatus === 0) {
          //   queryTask.state = [2, 3, 4]
          //
          //   let queryTaskList = []
          //   queryTaskList.push(queryTask)
          //
          //   // axios.get('http://www.doclever.cn:8090/mock/5ca56bd7c273b90cd8215ed9/getBillListV1', {
          //   // ajax(url,queryTask,showLoadingWrap1_1,list1_1,scroll1_1,showLoadingImg1_1)
          //   let params = {
          //     page,
          //     pageAmount,
          //     queryTaskList: JSON.stringify(queryTaskList),
          //   }
          //   if (!this.showLoadingWrap2_1 && this.list2_1.length === 0) {
          //     this.showLoadingWrap2_1 = true
          //     this.showLoadingImg2_1 = true
          //     this.ajax(url, params, this.list2_1, this.scroll2_1, this.$refs.wrapper2_1, '1_1')
          //   }
          // }
          // else if (taskStatus === 1) {
          //
          //   queryTask.life_done_type = 1
          //   queryTask.state = [3]
          //
          //   let queryTaskList = []
          //   queryTaskList.push(queryTask)
          //
          //   let params = {
          //     page,
          //     pageAmount,
          //     queryTaskList: JSON.stringify(queryTaskList),
          //   }
          //   if (!this.showLoadingWrap2_2 && this.list2_2.length === 0) {
          //     this.showLoadingWrap2_2 = true
          //     this.showLoadingImg2_2 = true
          //     this.ajax(url, params, this.list2_2, this.scroll2_2, this.$refs.wrapper2_2, 6)
          //   }
          // }
          // else if (taskStatus === 2) {
          //   queryTask.starttime = ['1970-01-01 00:00:00', util.getYearMonthDayHMSString(today)]
          //   queryTask.endtime = [util.getYearMonthDayHMSString(today), '9999-12-31 23:59:59']
          //   queryTask.life_done_type = undefined
          //   queryTask.state = [2]
          //
          //   let queryTaskList = []
          //   queryTaskList.push(queryTask)
          //
          //   let params = {
          //     page,
          //     pageAmount,
          //     queryTaskList: JSON.stringify(queryTaskList),
          //   }
          //   if (!this.showLoadingWrap2_3 && this.list2_3.length === 0) {
          //     this.showLoadingWrap2_3 = true
          //     this.showLoadingImg2_3 = true
          //     this.ajax(url, params, this.list2_3, this.scroll2_3, this.$refs.wrapper2_3, 7)
          //   }
          // }
          // else if (taskStatus === 3) {
          //
          //   queryTask.life_done_type = 0
          //   queryTask.state = [3]
          //
          //   let queryTask2 = {
          //     state: [2],
          //     starttime: ['1970-01-01 00:00:00', util.getLastDateOfYearHMS(today)],
          //     endtime: [util.getFirstDateOfYearHMS(today), util.getYearMonthDayHMSString(today)],
          //     chargerID: undefined,
          //     signerID: undefined
          //   }
          //
          //   if (taskType === 'charge') {
          //     queryTask2.chargerID = openId
          //     queryTask2.signerID = undefined
          //   } else if (taskType === "sign") {
          //     queryTask2.chargerID = undefined
          //     queryTask2.signerID = openId
          //   }
          //   let queryTaskList = []
          //   queryTaskList.push(queryTask)
          //   queryTaskList.push(queryTask2)
          //
          //   let params = {
          //     page,
          //     pageAmount,
          //     queryTaskList: JSON.stringify(queryTaskList),
          //   }
          //   if (!this.showLoadingWrap2_4 && this.list2_4.length === 0) {
          //     this.showLoadingWrap2_4 = true
          //     this.showLoadingImg2_4 = true
          //     this.ajax(url, params, this.list2_4, this.scroll2_4, this.$refs.wrapper2_4, 8)
          //   }
          // }
          // else if (taskStatus === 4) {
          //   queryTask.state = [4]
          //
          //   let queryTaskList = []
          //   queryTaskList.push(queryTask)
          //
          //   let params = {
          //     page,
          //     pageAmount,
          //     queryTaskList: JSON.stringify(queryTaskList),
          //   }
          //   if (!this.showLoadingWrap2_5 && this.list2_5.length === 0) {
          //     this.showLoadingWrap2_5 = true
          //     this.showLoadingImg2_5 = true
          //     this.ajax(url, params, this.list2_5, this.scroll2_5, this.$refs.wrapper2_5, 9)
          //   }
          // }
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
        .second-container, .third-container, .forth-container, .fifth-container {
            height: calc(100% - 0.41rem);
            .swiper-wrapper {
                height: 100%;
                .swiper-slide {
                    height: 100%;
                    .list-wrap {
                        height: 100%;
                        overflow: hidden;
                        ul {
                        }

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
            /*padding-bottom: 0.06rem;*/
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
                        background: url("../../assets/logo.png") no-repeat;
                        background-size: contain;
                    }

                    &.unfolded {
                        .icon {
                            display: inline-block;
                            width: 0.14rem;
                            height: 0.1rem;
                            background: url("../../assets/收起.png") no-repeat;
                            background-size: contain;
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
