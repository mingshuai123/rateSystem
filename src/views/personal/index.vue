<template>
  <div class="app-container profilePage">
    <div class="rightBox" v-if="islogin">
        <div class="profileheader">
            <img :src="memberinfo.avatar?memberinfo.avatar:'//static.iasac.org.cn/ratingPC/images/detail/avatar.png'" alt="" class="avatar">
            <div class="name">{{memberinfo.name}}</div>
            <router-link class="credits" to="/personalPage/myscore"><span>可用积分</span> {{memberinfo.amount}}</router-link>
        </div>
        <div class="btnBox">
            <router-link class="item" to="/personalPage/collect">
                <div class="icon"><img src="//static.iasac.org.cn/ratingPC/images/profile/sc.png" alt=""></div>
                <div class="name">我的收藏</div>
            </router-link>
            <div class="item color"  @click='nodata'>
                <div class="icon"><img src="//static.iasac.org.cn/ratingPC/images/profile/xf.png" alt=""></div>
                <div class="name">我的消费</div>
            </div>
            <router-link class="item" to="/personalPage/evaluation">
                <div class="icon"><img src="//static.iasac.org.cn/ratingPC/images/profile/pl.png" alt=""></div>
                <div class="name">我的评价</div>
            </router-link>
            <div class="item color"  @click='nodata' >
                <div class="icon"><img src="//static.iasac.org.cn/ratingPC/images/profile/wj.png" alt=""></div>
                <div class="name">我的问卷</div>
            </div>
            <router-link class="item" to="/personalPage/mycomplain">
                <div class="icon"><img src="//static.iasac.org.cn/ratingPC/images/profile/ts.png" alt=""></div>
                <div class="name">我的投诉</div>
            </router-link>
        </div>
    </div>
    <div class="rightBox" v-else>
        <div class="nologin"><i class="el-icon-back"></i> 请先在左侧登录~</div>
    </div>
  </div>
</template>

<script>
export default{
  data(){
    return {
        netbarInfo:{},
        memberinfo:{},
        islogin:false
    }
  },
  created(){
      if(sessionStorage.getItem('token')){
        this.islogin=true;
        this.getmemberinfo();
      }
  },
  methods:{
      getmemberinfo(){
          this.netbarInfo=JSON.parse(sessionStorage.getItem('netbarDetail'))
          this.memberinfo=JSON.parse(sessionStorage.getItem('memberData'));
      },
      nodata(){
          this.$message({
              duration:2000,
              showClose:true,
              message:'暂未开放'
          })
      },
  }
}
</script>
<style lang="scss" scoped>
  @import "~@/styles/detail.scss";

 </style>