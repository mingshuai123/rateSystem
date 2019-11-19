<template>
  <div class="app-container indexListPage">
    <div class="rightBox">
        <a class="netnavheader" href="javascript:history.back();">评级首页</a>
        <div class="newsInfo">
            <div class="title">{{nowNews.title}}</div>
            <div class="date">{{nowNews.date}}</div>
           <div class="desc" v-for="(item,index) in nowNews.contents" :key="index">
                <img v-if="item.url"  :src="item.url" alt="">
                <span v-if="item.content">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.content}}</span>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import newsdata from '@/assets/data.json'
export default{
  data(){
    return {
        newsList:[
        ],
        nowNews:{contents:[]}
    }
  },
  created(){
      this.getData();
  },
  methods:{
    getData(){
        var _this=this;
        var newsList=newsdata.list;
        var id=this.$route.query.id;
        console.log(newsList)
        console.log(id)
        newsList.forEach(function(item){
            if(item.id==id){
                _this.nowNews=item;
            }
        })
    },
  }
}
</script>
<style lang="scss" scoped>
  @import "~@/styles/main.scss";

 </style>