<template>
  <div class="app-container subpagePage">
    <div class="rightBox" id="app">
        <a class="netnavheader" href="javascript:history.go(-1);">个人中心</a>
        <div class="subpageHeader">我的积分:  <span>{{memberInfo.amount}}</span></div>
        <div class="scroeList">
            <div class="item2" v-for="(item,index) in newrecordList" :key="index">
                <div class="match_date" v-cloak>{{item.date}}</div>
                <div class="recorditem" v-for="(xx,index2) in item.list" :key="index2">
                    <div class="date item">{{xx.createdDate.split(" ")[1]}}</div>
                    <div class="name item">{{typeCN[xx.type]}}</div>
                    <div class="num item" :style="{color:xx.score>0?'#fb674a':'#00c838'}">{{parseInt(xx.amount)}}</div>
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
            netbarId:3,
            shopid:0,
            newrecordList:[],
            pn:1,
            memberInfo:{},
            typeCN:{
                'COMMENT':'评论',
                'LOGIN':'登录',
                'USER_NET':'上网'
            }
        }
    },
    created(){
        this.memberInfo=JSON.parse(sessionStorage.getItem('memberData'));
        this.getscoreList();
    },
    methods:{
      getNowDate(){
          var dd = new Date();
          var year = dd.getFullYear();
          var month = dd.getMonth()+1;
          var date = dd.getDate();
          month = month < 10 ? '0'+month : month;
          date = date < 10 ? '0'+date : date;
          var nowDate  = year+'-'+month+'-'+date;
          return nowDate;
      },
      getLastDate(){
        var dd = new Date();
        dd.setDate(dd.getDate()-1);
        var year = dd.getFullYear();
        var month = dd.getMonth()+1;
        var date = dd.getDate();
        month = month < 10 ? '0'+month : month;
        date = date < 10 ? '0'+date : date;
        var lastDate = year+'-'+month+'-'+date;
        return lastDate;
    },
        getscoreList(){
            var _this=this;
            this.postAxios('member/integral/history',{pn:_this.pn}).then(res=>{
                if(res.code==0){
                    var list=res.data.data.list;
                    var convertArr ={} ;
                    var nowDate = this.getNowDate();
                    var lastDate = this.getLastDate();
                    list.forEach(function(item){
                        var itemDate = item.createdDate.split(" ")[0];
                        var kk = itemDate;
                        itemDate == nowDate?kk = '今天':itemDate == lastDate?kk = '昨天':itemDate;
                        convertArr.hasOwnProperty(kk)?convertArr[kk].push(item):convertArr[kk] = new Array(item);
                    })
                    var newList=[];
                    for(let item in convertArr){
                        var oneday={date:'',list:[]};
                        oneday.date=item;
                        oneday.list=convertArr[item];
                        newList.push(oneday);
                    }
                    _this.newrecordList=newList;
                }
            })
            
        },
        getShopid(){
            var _this=this;
            var url=window.location.href;
            var reg = /(.*?)id=(\d+)(.*?)/;
            if(url.indexOf("?id")>0){
                _this.shopid=url.match(reg)[2];
            }
        },
        confirm(num){

        },
    },
}
</script>
<style lang="scss" scoped>
  @import "~@/styles/detail.scss";

 </style>