<template>
  <div class="app-container detailPage">
    <div class="rightBox">
        <div class="navheader">
            <!-- <div class="item" @click="itemclick(3)" :class="{active:nowitem==3}">网咖信息</div> -->
            <div class="item" @click="itemclick(1)" :class="{active:nowitem==1}">有奖问卷</div>
            <div class="item" @click="itemclick(2)" :class="{active:nowitem==2}">积分商城</div>
        </div>
        <div class="creditsDetail">
            <a class="creditsheader" href="javascript:history.go(-1);">商城首页</a>
            <div class="shopinfo">
                <div class="info">
                    <img :src="'//static.iasac.org.cn/ratingPC/images/credits/'+shopid+'.jpg'" alt="">
                    <div class="desc">
                        <p>{{shopinfo.name}}</p>
                        <p><span>{{shopinfo.price}}</span> 积分</p>
                    </div>
                </div>
                <a class="btn-buy" @click="buyBtn()">确认购买</a>
            </div>
            <div class="info2">
                <span class="icon icon-date"></span>
                兑换有效期 : <span>30天</span>
            </div>
            <div class="info2">
                <span class="icon icon-position"></span>
                兑换门店 : <span>魔杰电竞深圳店</span>
            </div>
            <div class="descbox">
                <div class="title">兑换说明</div>
                <div class="desc">购买后可获得英雄联盟全英雄1天使用特权；本商品为虚拟物品，购买后需提供游戏账号信息以便开通特权。</div>
                <div class="title2">兑换流程:</div>
                <div class="desc">1.购买后在“个人-我的消费”查看购买记录并获得【兑换码】;</div>
                <div class="desc">2.向店面工作人员出示兑换码，并提供游戏账号信息;</div>
                <div class="desc">3.验证无误后即可完成商品兑换。</div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default{
  data(){
    return {
      nowitem:2,
      starNum:5,
      navNum:1,
      navNum2:1,
      netbarId:3,
      shopid:0,
      creditsList:[
          {id:1,name:"光明使者皮肤",price:300},
          {id:2,name:"乱斗之王大奖",price:200},
          {id:3,name:"王者荣耀赛区资格",price:600},
          {id:4,name:"英雄礼包7天体验卡",price:400},
          {id:5,name:"周瑜＆小乔CP皮肤",price:500},
          {id:1,name:"光明使者皮肤",price:300},
          {id:2,name:"乱斗之王大奖",price:200},
          {id:3,name:"王者荣耀赛区资格",price:600},
          {id:4,name:"英雄礼包7天体验卡",price:400},
          {id:5,name:"周瑜＆小乔CP皮肤",price:500}],
      shopinfo:{
          id:1,name:"光明使者皮肤",price:300,img:'//static.iasac.org.cn/ratingPC/images/credits/1.jpg'
      },
      transitionName: 'slide'
    }
  },
  created(){
      this.getShopid();
  },
  methods:{
      getShopid(){
          var _this=this;
          var url=window.location.href;
          localStorage.setItem("item",2);
          var reg = /(.*?)id=(\d+)(.*?)/
          _this.shopid=url.match(reg)[2];
      },
      itemclick(num){
          if(num==1){
              this.$router.push({path:'/serve/serveIndex'})
          }else{
              this.$router.back(-1);
          }
      },
      
      buyBtn(){
          this.$message({
              message:'该功能暂未开放',
              showClose:true,
              duration:2000,
          });
      },
      
  },
}
</script>
<style lang="scss" scoped>
  @import "~@/styles/detail.scss";

 </style>