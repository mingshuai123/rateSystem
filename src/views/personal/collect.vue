<template>
  <div class="app-container subpagePage">
    <div class="rightBox" id="app">
        <a class="netnavheader" href="javascript:history.go(-1);">个人中心</a>
        <div class="subpageHeader">我的收藏</div>
        <div class="questionList">
            <div class="item" v-for="(item,index) in netbarList" :key="index">
                <div class="itemimg"><img :src="item.img" alt=""></div>
                <div class="info">
                    <div class="name" v-cloak>{{item.name}}</div>
                    <div class="date">收藏时间：2018-09-22 12:00</div>
                </div>
                <div class="godetail" @click="godetail">查看详情</div>
            </div>
            <div class="nodata" v-if="netbarList.length==0">暂无收藏</div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default{
    data(){
        return {
            netbarId:3,
            netbarList:[
                {starNum:5,id:1,img:'//static.iasac.org.cn/ratingPC/images/netbarlist/1.jpg',name:'6号手游馆',state:1},
                {starNum:4,id:2,img:'//static.iasac.org.cn/ratingPC/images/netbarlist/2.jpg',name:'皓月连锁网咖',state:2},
                {starNum:5,id:3,img:'//static.iasac.org.cn/ratingPC/images/netbarlist/3.jpg',name:'接触时代网咖',state:1},
                {starNum:3,id:4,img:'//static.iasac.org.cn/ratingPC/images/netbarlist/4.jpg',name:'竞技世界电竞馆',state:2},
                {starNum:5,id:5,img:'//static.iasac.org.cn/ratingPC/images/netbarlist/5.jpg',name:'魔杰电竞馆',state:1},
                {starNum:5,id:6,img:'//static.iasac.org.cn/ratingPC/images/netbarlist/6.jpg',name:'任我游网咖',state:3}
            ],
        }
    },
    created(){
        this.netbarId=sessionStorage.getItem('netbarId');
        this.getscoreList();
    },
    methods:{
        getscoreList(){
            var _this=this;
            var data={
                pn:1,
                me:0,
                netbarid:0
            }
            this.postAxios('member/fav/list',data,{headers:{'Content-Type': 'multipart/form-data'}}).then(res=>{
                console.log(res)
                this.netbarList=res.data.list;
            })
        },
        godetail(){
            this.$message({
                type:'error',
                showClose:true,
                message:'该功能暂未开放'
            })
        }
    },
}
</script>
<style lang="scss" scoped>
  @import "~@/styles/detail.scss";

 </style>