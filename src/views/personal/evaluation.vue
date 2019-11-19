<template>
  <div class="app-container subpagePage">
    <div class="rightBox">
        <a class="netnavheader" href="javascript:history.go(-1);">个人中心</a>
        <div class="subpageHeader">我的评价</div>
        <div class="commentbox-scroll">
            <div class="evaluaList">
            <div class="item" v-for="(item,index) in commentList" :key="index">
                <div class="commentheader">
                    <div class="avatar"><img :src="item.avatar?item.avatar:'//static.iasac.org.cn/svr/images/common/avatar.jpg'" alt=""></div>
                    <div class="info">
                        <div class="name">{{item.name}}</div>
                        <div class="starinfo">
                            <el-rate
                                v-model="item.servNum"
                                disabled
                                show-score
                                text-color="#333"
                                :score="item.servNum"
                            ></el-rate>
                        </div>
                    </div>

                </div>
                <div class="textbox">{{item.content}}</div>
                <div class="imgbox">
                    <div class="imgitem" v-for="(xx,index) in item.imgCommentList" :key="index"><img :src="xx.img" alt=""></div>
                </div>
                <div class="date">{{item.createdDate}}</div>
            </div>
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
            nowitem:1,
            starNum:5,
            navNum:1,
            navNum2:1,
            netbarId:0,
            shopid:0,
            pn:1,
            commentList:[],
        }
    },
    created(){
        this.netbarId=sessionStorage.getItem('netbarId')
        this.getComment();
    },
    methods:{
        getComment(){
          var _this=this;
          var data={
              pn:_this.pn,
            //   netbarid:_this.netbarId,
              me:1,
          }
          this.postAxios('member/comment/list',data).then(function (json) {
              var info=json.data;
              //评论
              _this.hasNextPage=info.hasNextPage;
              _this.nextPage=info.nextPage;
              _this.commentinfo=info
              var list=info.list;
              list.forEach(item=>{
                  item.createdDate=new Date(parseInt(item.createdDate)).toLocaleString().replace(/:\d{1,2}$/,' ')
              })
              _this.commentList=list;
          })
      },
    },
}
</script>
<style lang="scss" scoped>
  @import "~@/styles/detail.scss";

 </style>