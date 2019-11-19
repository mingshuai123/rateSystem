<template>
  <div class="app-container subpagePage">
    <div class="rightBox" id="app">
        <a class="netnavheader" href="javascript:history.go(-1);">个人中心</a>
        <div class="complainHeader">
            <div class="head-icon">我的投诉</div>
            <div class="complainnav">
                <div class="item" :class="{active:nowitem==1}" @click="itemclick2(1)">已提交</div>
                <div class="item" :class="{active:nowitem==2}" @click="itemclick2(2)" >已处理</div>
                <div class="item" :class="{active:nowitem==3}" @click="itemclick2(3)">已评价</div>
            </div>
        </div>
        <div class="complainList">
            <router-link class="item2" v-for="(item,index) in complainList" :key="index" :to="{path:'/personalPage/complainDetail',query:{id:item.id}}">
                <div class="top">深圳旗舰店  <span>2018-10-22 14:00</span></div>
                <div class="content" v-cloak>{{item.content}}</div>
            </router-link>
            <div class="nodata" v-if="complainList.length==0">暂无投诉</div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default{
  data(){
        return {
            nowitem:1,
            netbarId:sessionStorage.getItem('netbarid'),
            complainList:[],
            complaintInfo: {
                "id": 8,
                "memberId": 3,
                "netbarId": 3,
                "typeName": "空间设施类",
                "subTypeName": "场所面积",
                "img": "https://static.iasac.org.cn/images/upload/2018-08-14/1534242171687MDG.jpg",
                "memo": "上午活动上午活动上午活动上午活动上午活动上午活动上午活动上午活动上午活动上午活动上午活动上午活动",
                "appealMemo": "",
                "netbarName": "魔杰电竞深圳店",
                "callbackSmsTime": null,
                "callbackConfirmDate": null,
                "confirmDate": null,
                "status": 1,
                "callbackStatus": 0,
                "createdDate": "2018-08-14 18:22:52"
            },
        }
    },
    created(){
        this.getscoreList();
    },
    methods:{
        getscoreList(){
            var _this=this;
            this.postAxios('member/complaint/list',{status:this.nowitem}).then(res=>{
                if(res.code==0){
                    this.complainList=res.data;
                }
            })
        },
        itemclick2(num){
            this.nowitem=num
            this.getscoreList();
        }
    },
}
</script>
<style lang="scss" scoped>
  @import "~@/styles/detail.scss";

 </style>