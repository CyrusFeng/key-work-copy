<template>
    <div class="list-container" style="height: 100%">
        <header>
            <change-btn :titleData="btnTitle"
                        @update:currentIndex="getBtnCurrentIndex($event)"
                        :currentIndex="btnCurrentIndex"></change-btn>
        </header>
        <div class="swiper-container first-container swiper-no-swiping">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <div class="parent-tabwrap">
                        <c-tab :titlebar="titlebar"
                               @update:currentIndex="getTabCurrentIndex1($event)"
                               :currentIndex="tabCurrentIndex1" :showNum="false"></c-tab>
                    </div>

                    <div class="swiper-container second-container swiper-no-swiping">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide">
                                <div class="list-wrap" ref="wrapper1_1">
                                    <ul class="task" v-if="list1_1.length>0">
                                        <div class="top-three" v-if="list1_1[0].score>0">
                                            <div class="user_pic_wrap"
                                                 :class="{'no1':index==0,'not1':'index!=0'}"
                                                 :key="item.id"
                                                 v-for="(item,index) in list1_1"
                                                 v-if="index<3"
                                                 @click="jump(item)">
                                                <p class="user_pic">
                                                    <img :src="item.personUrl" alt="" v-if="item.personUrl">
                                                    <img src="../assets/defaultAvator.png" v-else>
                                                    <span class="ranking">{{item.rank}}</span>
                                                </p>
                                                <i class="icon"></i>
                                                <p class="des-wrap">
                                                    <span class="name">{{item.personName}}</span>
                                                    <span class="num"
                                                          :class="{'green-num':item.score>=100,'yellow-num':item.score>=70&&item.score<100,'red-num':item.score<70}"
                                                    >{{item.score}}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div v-for="(item,index) in list1_1"
                                             :key="item.id"
                                             v-if="index<3&& list1_1[0].score===0"
                                             @click="jump(item)">
                                            <div class="head">
                                                <span class="index">{{item.rank}}</span>
                                                <div class="left">
                                                    <div class="name">{{item.personName}}</div>
                                                    <div class="score-wrap">
                                                        <div class="score" :class="{'green-num':item.score>=100,'yellow-num':item.score>=70&&item.score<100,'red-num':item.score<70}">{{item.score}}</div>
                                                        <div class="icon" :class="{'hidden': $store.getters.currentRole!==1 && item.personID !== $store.getters.openID}"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-for="(item,index) in list1_1"
                                             :key="item.id"
                                             v-if="index>=3"
                                             @click="jump(item)"
                                             class="default"
                                             :class="{'no4':index==3,'not4':index!=3}">
                                            <div class="head">
                                                <span class="index">{{item.rank}}</span>
                                                <div class="left">
                                                    <div class="name">{{item.personName}}</div>
                                                    <div class="score-wrap">
                                                        <div class="score" :class="{'green-num':item.score>=100,'yellow-num':item.score>=70&&item.score<100,'red-num':item.score<70}">{{item.score}}</div>
                                                        <div class="icon" :class="{'hidden': $store.getters.currentRole!==1 && item.personID !== $store.getters.openID}"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </ul>
                                </div>
                            </div>
                            <div class="swiper-slide">
                                <div class="list-wrap" ref="wrapper1_2">
                                    <ul class="task" v-if="list1_2.length>0">
                                        <div class="top-three" v-if="list1_2[0].score !== -1">
                                            <div class="user_pic_wrap"
                                                 v-for="(item,index) in list1_2" :key="item.id" v-if="index<3" @click="jump(item)">
                                                <p class="user_pic">
                                                    <img :src="item.personUrl" alt="" v-if="item.personUrl">
                                                    <img src="../assets/defaultAvator.png" v-else>
                                                    <span class="ranking">{{item.rank}}</span>
                                                </p>
                                                <i class="icon"></i>
                                                <p class="des-wrap">
                                                    <span class="name">{{item.personName}}</span>
                                                    <span class="num">{{item.score===-1?'--':Number(item.score*100).toFixed(1)+'%'}}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div v-for="(item,index) in list1_2" :key="item.id"
                                             v-if="index<3&& list1_2[0].score === 'NaN'" @click="jump(item)">
                                            <div class="head">
                                                <span class="index">{{item.rank}}</span>
                                                <div class="left">
                                                    <div class="name">{{item.personName}}</div>
                                                    <div class="score-wrap">
                                                        <div class="score">{{item.score===-1?'--':Number(item.score*100).toFixed(1)+'%'}}</div>
                                                        <div class="icon" :class="{'hidden': $store.getters.currentRole!==1 && item.personID !== $store.getters.openID}"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-for="(item,index) in list1_2" :key="item.id" v-if="index>=3" class="default"
                                             @click="jump(item)">
                                            <div class="head">
                                                <span class="index">{{item.rank}}</span>
                                                <div class="left">
                                                    <div class="name">{{item.personName}}</div>
                                                    <div class="score-wrap">
                                                        <div class="score">{{item.score===-1?'--':Number(item.score*100).toFixed(1)+'%'}}</div>
                                                        <div class="icon" :class="{'hidden': $store.getters.currentRole!==1 && item.personID !== $store.getters.openID}"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </ul>
                                </div>
                            </div>
                            <div class="swiper-slide">
                                <div class="list-wrap" ref="wrapper1_3">
                                    <ul class="task" v-if="list1_3.length>0">
                                        <div class="top-three" v-if="list1_3[0].score>0">
                                            <div class="user_pic_wrap"
                                                 v-for="(item,index) in list1_3" :key="item.id" v-if="index<3"
                                                 @click="jump(item)">
                                                <p class="user_pic">
                                                    <img :src="item.personUrl" alt="" v-if="item.personUrl">
                                                    <img src="../assets/defaultAvator.png" v-else>
                                                    <span class="ranking">{{item.rank}}</span>
                                                </p>
                                                <i class="icon"></i>
                                                <p class="des-wrap">
                                                    <span class="name">{{item.personName}}</span>
                                                    <span class="num">{{item.score}}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div v-for="(item,index) in list1_3" :key="item.id" v-if="index<3&& list1_3[0].score===0" @click="jump(item)">
                                            <div class="head">
                                                <span class="index">{{item.rank}}</span>
                                                <div class="left">
                                                    <div class="name">{{item.personName}}</div>
                                                    <div class="score-wrap">
                                                        <div class="score">{{item.score}}</div>
                                                        <div class="icon" :class="{'hidden': $store.getters.currentRole!==1 && item.personID !== $store.getters.openID}"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-for="(item,index) in list1_3" :key="item.id" v-if="index>=3" class="default"
                                             @click="jump(item)">
                                            <div class="head">
                                                <span class="index">{{item.rank}}</span>
                                                <div class="left">
                                                    <div class="name">{{item.personName}}</div>
                                                    <div class="score-wrap">
                                                        <div class="score">{{item.score}}</div>
                                                        <div class="icon" :class="{'hidden': $store.getters.currentRole!==1 && item.personID !== $store.getters.openID}"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </ul>
                                </div>
                            </div>
                            <div class="swiper-slide">
                                <div class="list-wrap" ref="wrapper1_4">
                                    <ul class="task" v-if="list1_4.length>0">
                                        <div class="top-three" v-if="list1_4[0].score>0">
                                            <div class="user_pic_wrap"
                                                 v-for="(item,index) in list1_4" :key="item.id" v-if="index<3" @click="jump(item)">
                                                <p class="user_pic">
                                                    <img :src="item.personUrl" alt="" v-if="item.personUrl">
                                                    <img src="../assets/defaultAvator.png" v-else>
                                                    <span class="ranking">{{item.rank}}</span>
                                                </p>
                                                <p class="des-wrap">
                                                    <span class="name">{{item.personName}}</span>
                                                    <span class="num">{{item.score}}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div v-for="(item,index) in list1_4" :key="item.id" v-if="index<3&& list1_4[0].score===0"
                                             @click="jump(item)">
                                            <div class="head">
                                                <span class="index">{{item.rank}}</span>
                                                <div class="left">
                                                    <div class="name">{{item.personName}}</div>
                                                    <div class="score-wrap">
                                                        <div class="score">{{item.score}}</div>
                                                        <div class="icon" :class="{'hidden': $store.getters.currentRole!==1 && item.personID !== $store.getters.openID}"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-for="(item,index) in list1_4" :key="item.id" v-if="index>=3"
                                             @click="jump(item)" class="default">
                                            <div class="head">
                                                <span class="index">{{item.rank}}</span>
                                                <div class="left">
                                                    <div class="name">{{item.personName}}</div>
                                                    <div class="score-wrap">
                                                        <div class="score">{{item.score}}</div>
                                                        <div class="icon" :class="{'hidden': $store.getters.currentRole!==1 && item.personID !== $store.getters.openID}"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="parent-tabwrap">
                        <c-tab :titlebar="titlebar"
                               @update:currentIndex="getTabCurrentIndex2($event)"
                               :currentIndex="tabCurrentIndex2" :showNum="false"></c-tab>
                    </div>

                    <div class="swiper-container third-container swiper-no-swiping">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide">
                                <div class="list-wrap" ref="wrapper2_1">
                                    <ul class="task" v-if="list2_1.length>0">
                                        <div class="top-three" v-if="list2_1[0].score>0">
                                            <div class="user_pic_wrap"
                                                 v-for="(item,index) in list2_1" :key="item.id" v-if="index<3" @click="jump(item)">
                                                <p class="user_pic">
                                                    <img :src="item.personUrl" alt="" v-if="item.personUrl">
                                                    <img src="../assets/defaultAvator.png" v-else>
                                                    <span class="ranking">{{item.rank}}</span>
                                                </p>
                                                <i class="icon"></i>
                                                <p class="des-wrap">
                                                    <span class="name">{{item.personName}}</span>
                                                    <span class="num" :class="{'green-num':item.score>=100,'yellow-num':item.score>=70&&item.score<100,'red-num':item.score<70}">{{item.score}}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div v-for="(item,index) in list2_1" :key="item.id" v-if="index<3&& list2_1[0].score===0" @click="jump(item)">
                                            <div class="head">
                                                <span class="index">{{item.rank}}</span>
                                                <div class="left">
                                                    <div class="name">{{item.personName}}</div>
                                                    <div class="score-wrap">
                                                        <div class="score" :class="{'green-num':item.score>=100,'yellow-num':item.score>=70&&item.score<100,'red-num':item.score<70}">{{item.score}}</div>
                                                        <div class="icon" :class="{'hidden': $store.getters.currentRole!==1 && item.personID !== $store.getters.openID}"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-for="(item,index) in list2_1" :key="item.id" v-if="index>=3" class="default"
                                             :class="{'no4':index==3,'not4':index!=3}" @click="jump(item)">
                                            <div class="head">
                                                <span class="index">{{item.rank}}</span>
                                                <div class="left">
                                                    <div class="name">{{item.personName}}</div>
                                                    <div class="score-wrap">
                                                        <div class="score" :class="{'green-num':item.score>=100,'yellow-num':item.score>=70&&item.score<100,'red-num':item.score<70}">{{item.score}}</div>
                                                        <div class="icon" :class="{'hidden': $store.getters.currentRole!==1 && item.personID !== $store.getters.openID}"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </ul>
                                </div>
                            </div>
                            <div class="swiper-slide">
                                <div class="list-wrap" ref="wrapper2_2">
                                    <ul class="task" v-if="list2_2.length>0">
                                        <div class="top-three" v-if="list2_2[0].score !== -1">
                                            <div class="user_pic_wrap"
                                                 v-for="(item,index) in list2_2" :key="item.id" v-if="index<3"
                                                 @click="jump(item)" >
                                                <p class="user_pic">
                                                    <img :src="item.personUrl" alt="" v-if="item.personUrl">
                                                    <img src="../assets/defaultAvator.png" v-else>
                                                    <span class="ranking">{{item.rank}}</span>
                                                </p>
                                                <i class="icon"></i>
                                                <p class="des-wrap">
                                                    <span class="name">{{item.personName}}</span>
                                                    <span class="num">{{item.score===-1?'--':Number(item.score*100).toFixed(1)+'%'}}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div v-for="(item,index) in list2_2" :key="item.id" v-if="index<3&& list2_2[0].score === 'NaN'"
                                             @click="jump(item)">
                                            <div class="head">
                                                <span class="index">{{item.rank}}</span>
                                                <div class="left">
                                                    <div class="name">{{item.personName}}</div>
                                                    <div class="score-wrap">
                                                        <div class="score">{{item.score===-1?'--':Number(item.score*100).toFixed(1)+'%'}}</div>
                                                        <div class="icon" :class="{'hidden': $store.getters.currentRole!==1 && item.personID !== $store.getters.openID}"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-for="(item,index) in list2_2" :key="item.id" v-if="index>=3"
                                             @click="jump(item)" class="default">
                                            <div class="head">
                                                <span class="index">{{item.rank}}</span>
                                                <div class="left">
                                                    <div class="name">{{item.personName}}</div>
                                                    <div class="score-wrap">
                                                        <div class="score">{{item.score===-1?'--':Number(item.score*100).toFixed(1)+'%'}}</div>
                                                        <div class="icon" :class="{'hidden': $store.getters.currentRole!==1 && item.personID !== $store.getters.openID}"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </ul>
                                </div>
                            </div>
                            <div class="swiper-slide">
                                <div class="list-wrap" ref="wrapper2_3">
                                    <ul class="task" v-if="list2_3.length>0">
                                        <div class="top-three" v-if="list2_3[0].score>0">
                                            <div class="user_pic_wrap"
                                                 v-for="(item,index) in list2_3" :key="item.id" v-if="index<3"
                                                 @click="jump(item)">
                                                <p class="user_pic">
                                                    <img :src="item.personUrl" alt="" v-if="item.personUrl">
                                                    <img src="../assets/defaultAvator.png" v-else>
                                                    <span class="ranking">{{item.rank}}</span>
                                                </p>
                                                <i class="icon"></i>
                                                <p class="des-wrap">
                                                    <span class="name">{{item.personName}}</span>
                                                    <span class="num">{{item.score}}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div v-for="(item,index) in list2_3" :key="item.id" v-if="index<3&& list2_3[0].score===0"
                                             @click="jump(item)">
                                            <div class="head">
                                                <span class="index">{{item.rank}}</span>
                                                <div class="left">
                                                    <div class="name">{{item.personName}}</div>
                                                    <div class="score-wrap">
                                                        <div class="score">{{item.score}}</div>
                                                        <div class="icon" :class="{'hidden': $store.getters.currentRole!==1 && item.personID !== $store.getters.openID}"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-for="(item,index) in list2_3" :key="item.id" v-if="index>=3" class="default"
                                             @click="jump(item)">
                                            <div class="head">
                                                <span class="index">{{item.rank}}</span>
                                                <div class="left">
                                                    <div class="name">{{item.personName}}</div>
                                                    <div class="score-wrap">
                                                        <div class="score">{{item.score}}</div>
                                                        <div class="icon" :class="{'hidden': $store.getters.currentRole!==1 && item.personID !== $store.getters.openID}"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </ul>
                                </div>
                            </div>
                            <div class="swiper-slide">
                                <div class="list-wrap" ref="wrapper2_4">
                                    <ul class="task" v-if="list2_4.length>0">
                                        <div class="top-three" v-if="list2_4[0].score>0">
                                            <div class="user_pic_wrap"
                                                 v-for="(item,index) in list2_4" :key="item.id" v-if="index<3"
                                                 @click="jump(item)">
                                                <p class="user_pic">
                                                    <img :src="item.personUrl" alt="" v-if="item.personUrl">
                                                    <img src="../assets/defaultAvator.png" v-else>
                                                    <span class="ranking">{{item.rank}}</span>
                                                </p>
                                                <p class="des-wrap">
                                                    <span class="name">{{item.personName}}</span>
                                                    <span class="num">{{item.score}}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div v-for="(item,index) in list2_4" :key="item.id" v-if="index<3&& list2_4[0].score===0"
                                             @click="jump(item)">
                                            <div class="head">
                                                <span class="index">{{item.rank}}</span>
                                                <div class="left">
                                                    <div class="name">{{item.personName}}</div>
                                                    <div class="score-wrap">
                                                        <div class="score">{{item.score}}</div>
                                                        <div class="icon" :class="{'hidden': $store.getters.currentRole!==1 && item.personID !== $store.getters.openID}"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-for="(item,index) in list2_4" :key="item.id" v-if="index>=3"
                                             @click="jump(item)" class="default">
                                            <div class="head">
                                                <span class="index">{{item.rank}}</span>
                                                <div class="left">
                                                    <div class="name">{{item.personName}}</div>
                                                    <div class="score-wrap">
                                                        <div class="score">{{item.score}}</div>
                                                        <div class="icon" :class="{'hidden': $store.getters.currentRole!==1 && item.personID !== $store.getters.openID}"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="parent-tabwrap">
                        <c-tab :titlebar="titlebar"
                               @update:currentIndex="getTabCurrentIndex3($event)"
                               :currentIndex="tabCurrentIndex3" :showNum="false"></c-tab>
                    </div>

                    <div class="swiper-container forth-container swiper-no-swiping">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide">
                                <div class="list-wrap" ref="wrapper3_1">
                                    <ul class="task" v-if="list3_1.length>0">
                                        <div class="top-three" v-if="list3_1[0].score>0">
                                            <div class="user_pic_wrap"
                                                 v-for="(item,index) in list3_1" :key="item.id" v-if="index<3"
                                                 @click="jump(item)">
                                                <p class="user_pic">
                                                    <img :src="item.personUrl" alt="" v-if="item.personUrl">
                                                    <img src="../assets/defaultAvator.png" v-else>
                                                    <span class="ranking">{{item.rank}}</span>
                                                </p>
                                                <i class="icon"></i>
                                                <p class="des-wrap">
                                                    <span class="name">{{item.personName}}</span>
                                                    <span class="num" :class="{'green-num':item.score>=100,'yellow-num':item.score>=70&&item.score<100,'red-num':item.score<70}">{{item.score}}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div v-for="(item,index) in list3_1" :key="item.id" v-if="index<3&& list3_1[0].score===0"
                                             @click="jump(item)">
                                            <div class="head">
                                                <span class="index">{{item.rank}}</span>
                                                <div class="left">
                                                    <div class="name">{{item.personName}}</div>
                                                    <div class="score-wrap">
                                                        <div class="score" :class="{'green-num':item.score>=100,'yellow-num':item.score>=70&&item.score<100,'red-num':item.score<70}">{{item.score}}</div>
                                                        <div class="icon" :class="{'hidden': $store.getters.currentRole!==1 && item.personID !== $store.getters.openID}"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div v-for="(item,index) in list3_1" :key="item.id" v-if="index>=3" class="default"
                                             :class="{'no4':index==3,'not4':index!=3}" @click="jump(item)">
                                            <div class="head">
                                                <span class="index">{{item.rank}}</span>
                                                <div class="left">
                                                    <div class="name">{{item.personName}}</div>
                                                    <div class="score-wrap">
                                                        <div class="score" :class="{'green-num':item.score>=100,'yellow-num':item.score>=70&&item.score<100,'red-num':item.score<70}">{{item.score}}</div>
                                                        <div class="icon" :class="{'hidden': $store.getters.currentRole!==1 && item.personID !== $store.getters.openID}"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </ul>
                                </div>
                            </div>
                            <div class="swiper-slide">
                                <div class="list-wrap" ref="wrapper3_2">
                                    <ul class="task" v-if="list3_2.length>0">
                                        <div class="top-three" v-if="list3_2[0].score !== -1">
                                            <div class="user_pic_wrap"
                                                 v-for="(item,index) in list3_2" :key="item.id" v-if="index<3"
                                                 @click="jump(item)">
                                                <p class="user_pic">
                                                    <img :src="item.personUrl" alt="" v-if="item.personUrl">
                                                    <img src="../assets/defaultAvator.png" v-else>
                                                    <span class="ranking">{{item.rank}}</span>
                                                </p>
                                                <i class="icon"></i>
                                                <p class="des-wrap">
                                                    <span class="name">{{item.personName}}</span>
                                                    <span class="num">{{item.score===-1?'--':Number(item.score*100).toFixed(1)+'%'}}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div v-for="(item,index) in list3_2" :key="item.id" v-if="index<3&& list3_2[0].score === 'NaN'"
                                             @click="jump(item)">
                                            <div class="head">
                                                <span class="index">{{item.rank}}</span>
                                                <div class="left">
                                                    <div class="name">{{item.personName}}</div>
                                                    <div class="score-wrap">
                                                        <div class="score">{{item.score===-1?'--':Number(item.score*100).toFixed(1)+'%'}}</div>
                                                        <div class="icon" :class="{'hidden': $store.getters.currentRole!==1 && item.personID !== $store.getters.openID}"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-for="(item,index) in list3_2" :key="item.id" v-if="index>=3" class="default"
                                             @click="jump(item)">
                                            <div class="head">
                                                <span class="index">{{item.rank}}</span>
                                                <div class="left">
                                                    <div class="name">{{item.personName}}</div>
                                                    <div class="score-wrap">
                                                        <div class="score">{{item.score===-1?'--':Number(item.score*100).toFixed(1)+'%'}}</div>
                                                        <div class="icon" :class="{'hidden': $store.getters.currentRole!==1 && item.personID !== $store.getters.openID}"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </ul>
                                </div>
                            </div>
                            <div class="swiper-slide">
                                <div class="list-wrap" ref="wrapper3_3">
                                    <ul class="task" v-if="list3_3.length>0">
                                        <div class="top-three" v-if="list3_3[0].score>0">
                                            <div class="user_pic_wrap"
                                                 v-for="(item,index) in list3_3" :key="item.id" v-if="index<3" @click="jump(item)">
                                                <p class="user_pic">
                                                    <img :src="item.personUrl" alt="" v-if="item.personUrl">
                                                    <img src="../assets/defaultAvator.png" v-else>
                                                    <span class="ranking">{{item.rank}}</span>
                                                </p>
                                                <i class="icon"></i>
                                                <p class="des-wrap">
                                                    <span class="name">{{item.personName}}</span>
                                                    <span class="num">{{item.score}}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div v-for="(item,index) in list3_3" :key="item.id" v-if="index<3&& list3_3[0].score===0"
                                             @click="jump(item)">
                                            <div class="head">
                                                <span class="index">{{item.rank}}</span>
                                                <div class="left">
                                                    <div class="name">{{item.personName}}</div>
                                                    <div class="score-wrap">
                                                        <div class="score">{{item.score}}</div>
                                                        <div class="icon" :class="{'hidden': $store.getters.currentRole!==1 && item.personID !== $store.getters.openID}"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-for="(item,index) in list3_3" :key="item.id" v-if="index>=3"
                                             @click="jump(item)" class="default">
                                            <div class="head">
                                                <span class="index">{{item.rank}}</span>
                                                <div class="left">
                                                    <div class="name">{{item.personName}}</div>
                                                    <div class="score-wrap">
                                                        <div class="score">{{item.score}}</div>
                                                        <div class="icon" :class="{'hidden': $store.getters.currentRole!==1 && item.personID !== $store.getters.openID}"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </ul>
                                </div>
                            </div>
                            <div class="swiper-slide">
                                <div class="list-wrap" ref="wrapper3_4">
                                    <ul class="task" v-if="list3_4.length>0">
                                        <div class="top-three" v-if="list3_4[0].score>0">
                                            <div class="user_pic_wrap"
                                                 v-for="(item,index) in list3_4" :key="item.id" v-if="index<3"
                                                 @click="jump(item)">
                                                <p class="user_pic">
                                                    <img :src="item.personUrl" alt="" v-if="item.personUrl">
                                                    <img src="../assets/defaultAvator.png" v-else>
                                                    <span class="ranking">{{item.rank}}</span>
                                                </p>
                                                <p class="des-wrap">
                                                    <span class="name">{{item.personName}}</span>
                                                    <span class="num">{{item.score}}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div v-for="(item,index) in list3_4" :key="item.id" v-if="index<3&& list3_4[0].score===0" @click="jump(item)">
                                            <div class="head">
                                                <span class="index">{{item.rank}}</span>
                                                <div class="left">
                                                    <div class="name">{{item.personName}}</div>
                                                    <div class="score-wrap">
                                                        <div class="score">{{item.score}}</div>
                                                        <div class="icon" :class="{'hidden': $store.getters.currentRole!==1 && item.personID !== $store.getters.openID}"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-for="(item,index) in list3_4" :key="item.id" v-if="index>=3" class="default"
                                             @click="jump(item)">
                                            <div class="head">
                                                <span class="index">{{item.rank}}</span>
                                                <div class="left">
                                                    <div class="name">{{item.personName}}</div>
                                                    <div class="score-wrap">
                                                        <div class="score">{{item.score}}</div>
                                                        <div class="icon" :class="{'hidden': $store.getters.currentRole!==1 && item.personID !== $store.getters.openID}"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <FullPageLoading :loading="loading"></FullPageLoading>
    </div>
</template>

<script>
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'
  const btnTitle = [
    {
      name: '月',
      num: ''
    },
    {
      name: '季',
      num: ''
    },
    {
      name: '年',
      num: ''
    },
  ]
  const titlebar = [
    {
      name: '积分',
      num: ''
    },
    {
      name: '工作完成率',
      num: ''
    },
    {
      name: '完成工作数量',
      num: ''
    },
    {
      name: '未完成工作数量',
      num: ''
    },
  ]

  export default {
    name: "ranking",
    data(){
      return {
        btnTitle,
        titlebar,
        btnCurrentIndex:2,
        tabCurrentIndex1:0,
        tabCurrentIndex2:0,
        tabCurrentIndex3:0,
        detailSwiper1_1:null,
        detailSwiper2_1:null,
        detailSwiper2_2:null,
        detailSwiper2_3:null,
        list1_1:[],
        list1_2:[],
        list1_3:[],
        list1_4:[],
        list2_1:[],
        list2_2:[],
        list2_3:[],
        list2_4:[],
        list3_1:[],
        list3_2:[],
        list3_3:[],
        list3_4:[],
        scroll1_1:null,
        scroll1_2:null,
        scroll1_3:null,
        scroll1_4:null,
        scroll2_1:null,
        scroll2_2:null,
        scroll2_3:null,
        scroll2_4:null,
        scroll3_1:null,
        scroll3_2:null,
        scroll3_3:null,
        scroll3_4:null,
        loading:false
      }
    },
    watch:{
      btnCurrentIndex() {
        if (this.btnCurrentIndex === 0) {
          // this.$api.rank.rankList('http://rest.apizza.net/mock/21c5cf3ed4022de252a80d8e8366c6f7/score',{},
          this.$api.rank.rankList('http://rest.apizza.net/mock/21c5cf3ed4022de252a80d8e8366c6f7/rankingCopy',{},
          // this.$api.rank.rankList(this.$url + '/taskSystem/score/byTime',{type:'month'},
            (response)=>{
              console.log(response)
              this.list1_1 = response.data.result.pointsList
              this.list1_2 = response.data.result.rateList
              this.list1_3 = response.data.result.finishedQuantityList
              this.list1_4 = response.data.result.unfinishedQuantityList

              this.detailSwiper2_1 = new Swiper('.second-container', {
                on: {
                  slideChangeTransitionStart: () => {
                    this.tabCurrentIndex1 = this.detailSwiper2_1.activeIndex
                  }
                },
              })

              this.$initScroll(this.scroll1_1, this.$refs.wrapper1_1)
              this.$initScroll(this.scroll1_2, this.$refs.wrapper1_2)
              this.$initScroll(this.scroll1_3, this.$refs.wrapper1_3)
              this.$initScroll(this.scroll1_4, this.$refs.wrapper1_4)
            },
            ()=>{})
        }
        if (this.btnCurrentIndex === 1) {
          // this.$api.rank.rankList('http://rest.apizza.net/mock/21c5cf3ed4022de252a80d8e8366c6f7/score',{},
            this.$api.rank.rankList('http://rest.apizza.net/mock/21c5cf3ed4022de252a80d8e8366c6f7/rankingCopy',{},
          // this.$api.rank.rankList(this.$url + '/taskSystem/score/byTime',{type:'quarter'},
            (response)=>{
              console.log(response)
              this.list2_1 = response.data.result.pointsList
              this.list2_2 = response.data.result.rateList
              this.list2_3 = response.data.result.finishedQuantityList
              this.list2_4 = response.data.result.unfinishedQuantityList

              this.detailSwiper2_2 = new Swiper('.third-container', {
                on: {
                  slideChangeTransitionStart: () => {
                    this.tabCurrentIndex2 = this.detailSwiper2_2.activeIndex
                  }
                },
              })

              this.$initScroll(this.scroll2_1, this.$refs.wrapper2_1)
              this.$initScroll(this.scroll2_2, this.$refs.wrapper2_2)
              this.$initScroll(this.scroll2_3, this.$refs.wrapper2_3)
              this.$initScroll(this.scroll2_4, this.$refs.wrapper2_4)
            },
            ()=>{})
        }
        if (this.btnCurrentIndex === 2) {
          // this.$api.rank.rankList('http://rest.apizza.net/mock/21c5cf3ed4022de252a80d8e8366c6f7/score',{},
            this.$api.rank.rankList('http://rest.apizza.net/mock/21c5cf3ed4022de252a80d8e8366c6f7/rankingCopy',{},
          // this.$api.rank.rankList(this.$url + '/taskSystem/score/byTime',{type:'year'},
            (response)=>{
              console.log(response)
              this.list3_1 = response.data.result.pointsList
              this.list3_2 = response.data.result.rateList
              this.list3_3 = response.data.result.finishedQuantityList
              this.list3_4 = response.data.result.unfinishedQuantityList

              this.detailSwiper2_3 = new Swiper('.forth-container', {
                on: {
                  slideChangeTransitionStart: () => {
                    this.tabCurrentIndex3 = this.detailSwiper2_3.activeIndex
                  }
                },
              })

              this.$initScroll(this.scroll3_1, this.$refs.wrapper3_1)
              this.$initScroll(this.scroll3_2, this.$refs.wrapper3_2)
              this.$initScroll(this.scroll3_3, this.$refs.wrapper3_3)
              this.$initScroll(this.scroll3_4, this.$refs.wrapper3_4)
            },
            ()=>{})
        }
      },
    },
    mounted(){
      this.loading = true
        // this.$api.rank.rankList('http://rest.apizza.net/mock/21c5cf3ed4022de252a80d8e8366c6f7/rankingCopy',{},
        // this.$api.rank.rankList(this.$url + '/taskSystem/score/byTime',{type:'month'},
        //   (response)=>{
        //   console.log(response)
        //     this.loading = false
        //     this.list1_1 = response.data.result.pointsList
        //     console.log(response.data)
        //     console.log(response.data.result)
        //     console.log(response.data.result.pointsList)
        //     console.log('this.list1_1',this.list1_1)
        //     this.list1_2 = response.data.result.rateList
        //     this.list1_3 = response.data.result.finishedQuantityList
        //     this.list1_4 = response.data.result.unfinishedQuantityList
        //
        //     this.detailSwiper1_1 = new Swiper('.first-container', {
        //       on: {
        //         slideChangeTransitionStart: () => {
        //           this.btnCurrentIndex = this.detailSwiper1_1.activeIndex
        //         }
        //       },
        //     })
        //     this.detailSwiper2_1 = new Swiper('.second-container', {
        //       on: {
        //         slideChangeTransitionStart: () => {
        //           this.tabCurrentIndex1 = this.detailSwiper2_1.activeIndex
        //         }
        //       },
        //     })
        //
        //     this.$initScroll(this.scroll1_1, this.$refs.wrapper1_1)
        //     this.$initScroll(this.scroll1_2, this.$refs.wrapper1_2)
        //     this.$initScroll(this.scroll1_3, this.$refs.wrapper1_3)
        //     this.$initScroll(this.scroll1_4, this.$refs.wrapper1_4)
        //   },
        //   (error)=>{
        //     alert('接口调用失败')
        //     console.log('外部 error',error)
        //   })
      // this.$api.rank.rankList('http://rest.apizza.net/mock/21c5cf3ed4022de252a80d8e8366c6f7/score',{},
      this.$api.rank.rankList('http://rest.apizza.net/mock/21c5cf3ed4022de252a80d8e8366c6f7/rankingCopy',{},
        // this.$api.rank.rankList(this.$url + '/taskSystem/score/byTime',{type:'year'},
        (response)=>{
          console.log(response)
          this.loading = false

          this.detailSwiper1_1 = new Swiper('.first-container', {
            on: {
              slideChangeTransitionStart: () => {
                this.btnCurrentIndex = this.detailSwiper1_1.activeIndex
              }
            },
          })

          this.list3_1 = response.data.result.pointsList
          this.list3_2 = response.data.result.rateList
          this.list3_3 = response.data.result.finishedQuantityList
          this.list3_4 = response.data.result.unfinishedQuantityList

          this.detailSwiper2_3 = new Swiper('.forth-container', {
            on: {
              slideChangeTransitionStart: () => {
                this.tabCurrentIndex3 = this.detailSwiper2_3.activeIndex
              }
            },
          })

          this.$initScroll(this.scroll3_1, this.$refs.wrapper3_1)
          this.$initScroll(this.scroll3_2, this.$refs.wrapper3_2)
          this.$initScroll(this.scroll3_3, this.$refs.wrapper3_3)
          this.$initScroll(this.scroll3_4, this.$refs.wrapper3_4)

          this.detailSwiper1_1.slideTo(this.btnCurrentIndex);
        },
        (error)=>{
          alert('接口调用失败')
          console.log('外部 error',error)
        })
    },
    beforeRouteEnter(to, from, next){
      qing.call('setWebViewTitle',{'title':'排行榜'})
      next()
    },
    methods: {
      getBtnCurrentIndex(e) {
        this.btnCurrentIndex = e;
        this.detailSwiper1_1.slideTo(e);
      },
      getTabCurrentIndex1(e) {
        this.tabCurrentIndex1 = e;
        this.detailSwiper2_1.slideTo(e);
      },
      getTabCurrentIndex2(e) {
        this.tabCurrentIndex2 = e;
        this.detailSwiper2_2.slideTo(e);
      },
      getTabCurrentIndex3(e) {
        this.tabCurrentIndex3 = e;
        this.detailSwiper2_3.slideTo(e);
      },
      jump(item){
        if(this.$store.getters.currentRole !== 1){
          if(item.personID === this.$store.getters.openID){
            this.$router.push({
              name: 'list',
              params:{taskType:'charge',timeRange:0,taskStatus:0,othersOpenID:item.personID,personName:item.personName}
            })
          }
        }else{
          this.$router.push({
            name: 'list',
            params:{taskType:'charge',timeRange:0,taskStatus:0,othersOpenID:item.personID,personName:item.personName}
          })
        }
      }
    }
  }
</script>

<style scoped lang="scss">
    .list-container {
        height: 100%;
        background-color: #367be7;
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
        margin: 0 0.1rem;
        height: calc(100% - 0.46rem);
        background: #ffffff;
        border-top-left-radius: 0.08rem;
        border-top-right-radius: 0.08rem;
        overflow: hidden;
        .second-container, .third-container, .forth-container {
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

    .swiper-slide {
        font-size: 12px;
    }

    .task {
        /*overflow: hidden;*/
        .top-three{
            padding: 0.18rem 0.18rem 0.12rem 0.18rem;
            display: flex;
            justify-content: center;
            align-items: center;
            border-bottom:0.01rem solid #ebebeb;
            .user_pic_wrap {
                position: relative;
                .icon {
                    position: absolute;
                    top: -0.02rem;
                    right: -0.02rem;
                    z-index: 999;
                    display: inline-block;
                    width: 0.2rem;
                    height: 0.2rem;
                    /*background: url("../assets/Group 3.png") no-repeat !important;*/
                    background: url("../assets/huangguan.png") no-repeat !important;
                    background-size: contain !important;
                    transform: rotate(45deg);
                }
                .user_pic {
                    margin-bottom: 0.12rem;
                    position: relative;
                    width: 0.7rem;
                    height: 0.7rem;
                    border-radius: 50%;
                    border: 0.02rem solid #fff;
                    /*overflow: hidden;*/
                    img {
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                    }
                    .ranking{
                        position: absolute;
                        bottom: 0;
                        right: 0;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width:0.16rem;
                        height:0.16rem;
                        border-radius:50%;
                        /*background:#9dabb9;*/
                        color: #fff;

                    }
                }
                .des-wrap{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    >.name{
                        font-size:0.14rem;
                        color:#000000;
                    }
                    >.num{
                        font-size:0.13rem;
                        color:#666666;
                        &.green-num{
                            color:#19a260;
                        }
                        &.yellow-num{
                            color:#FECD51;
                        }
                        &.red-num{
                            color:#cb493c;
                        }
                    }
                }

                &:nth-of-type(1){
                    order: 2;
                    margin-bottom: 0.2rem;
                    margin-left: 0.45rem;
                    margin-right: 0.45rem;
                    .user_pic {
                        .ranking{
                            background:#ffb41d;
                        }
                    }
                    .des-wrap{
                        >.num{
                            font-size:0.13rem;
                        }
                    }
                }
                &:nth-of-type(2){
                    order: 1;
                    .user_pic {
                        .ranking{
                            background:#9dabb9;
                        }
                    }
                }
                &:nth-of-type(3){
                    order: 3;
                    .user_pic {
                        .ranking{
                            background:#bf9f6b;
                        }
                    }
                }
            }

            .name {
                font-size: 0.14rem;
                color: #ffffff;
                text-align: center;
            }
        }

        li {
            /*padding: 0 0 0 0.12rem;*/
            /*margin-bottom: 0.1rem;*/
            background-color: #fff;
            /*padding-bottom: 0.1rem;*/
            &:last-child {
                margin-bottom: 0;
            }
        }
        /*.default{*/
            /*&.no4{*/
                /*.left {*/
                    /*.score-wrap{*/
                        /*.score{*/
                            /*color:#FECD51;*/
                        /*}*/
                    /*}*/

                /*}*/
            /*}*/
            /*&.not4{*/
                /*.left {*/
                    /*.score-wrap{*/
                        /*.score{*/
                            /*color:#cb493c;*/
                        /*}*/
                    /*}*/

                /*}*/
            /*}*/
        /*}*/
        /*.score-wrap{*/
            /*.score{*/
                /*&.green-num{*/
                    /*color:#19a260;*/
                /*}*/
                /*&.yellow-num{*/
                    /*color:#FECD51;*/
                /*}*/
                /*&.red-num{*/
                    /*color:#cb493c;*/
                /*}*/
            /*}*/
        /*}*/
        .head {
            display: flex;
            justify-content: space-between;
            align-items: center;
            line-height: 1;

            .index {
                margin: 0 0.14rem;
                opacity:0.7;
                font-size:0.12rem;
                /*color:#737373;*/

                width: .16rem;
                height: .16rem;
                border-radius: 50%;
                color: #fff;
                background-color: #737373;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .left {
                padding: 0.14rem 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex: 1;
                border-bottom: 0.01rem solid #ebebeb;
                .name{
                    font-size:0.14rem;
                    color:#000000;
                }
                .score-wrap{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .score{
                        padding-right: 0.1rem;
                        font-size:0.14rem;
                        color:#000000;
                        /*color:#cb493c;*/
                        &.green-num{
                            color:#19a260;
                        }
                        &.yellow-num{
                            color:#FECD51;
                        }
                        &.red-num{
                            color:#cb493c;
                        }
                    }
                    >.icon {
                        display: inline-block;
                        width: 0.14rem;
                        height: 0.1rem;
                        background: url("../assets/right1.png") no-repeat;
                        background-size: contain;
                        &.hidden{
                            visibility:hidden;
                        }
                    }
                }

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
                        transform:rotate(0deg);
                    }

                    &.unfolded {
                        .icon {
                            display: inline-block;
                            width: 0.14rem;
                            height: 0.1rem;
                            background: url("../assets/收起.png") no-repeat;
                            background-size: contain;
                            transform:rotate(180deg);
                        }
                    }
                }
            }

        }
    }

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
            width: 2em;
            height: 2em;
            font-size: 0.1rem;
            color: #ffffff;
            line-height: 1;
        }
    }
</style>