<template>
  <div class="app-container subpagePage">
    <div class="rightBox" id="app">
        <a class="netnavheader" href="javascript:history.go(-1);">我的投诉 > <span>投诉详情</span></a>
        <div class="detail">
            <div class="item">
                <div class="name">场所名称</div>
                <div class="value">{{complaintInfo.netbarName}}</div>
            </div>
            <div class="item">
                <div class="name">投诉项目</div>
                <div class="value">{{complaintInfo.typeName}}</div>
            </div>
            <div class="item">
                <div class="name">投诉详情</div>
                <div class="value">{{complaintInfo.memo}}</div>
            </div>
            <div class="item">
                <div class="name">图片</div>
                <div class="value example" >
                    <img :src="complaintInfo.img" alt="">
                    <span v-if="!complaintInfo.img">未上传图片</span>
                </div>
            </div>
            <div class="btnbox" v-if="complaintInfo.status==1">
                <div class="desc">商家已处理此问题，您对处理结果是否满意？</div>
                <div class="date" v-if="complaintInfo.callbackStatus==0">({{time}})</div>
                <div class="btn-box">
                    <div v-if="complaintInfo.callbackStatus==0" class="btn btn-no" @click="confirm(2)">不满意</div>
                    <div v-if="complaintInfo.callbackStatus==0" class="btn btn-yes" @click="confirm(1)">满意</div>
                    <div v-if="complaintInfo.callbackStatus==1" class="btn btn-defult">已处理</div>
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
            creditsList:[
                {state:1,num:123123123,id:1,name:"光明使者皮肤",price:300},
                {state:0,num:123123123,id:2,name:"乱斗之王大奖",price:200},
                {state:1,num:123123123,id:3,name:"王者荣耀赛区资格",price:600},
                {state:0,num:123123123,id:4,name:"英雄礼包7天体验卡",price:400},
                {state:1,num:123123123,id:5,name:"周瑜＆小乔CP皮肤",price:500},
                ],
            netbarList:[
                {starNum:5,id:1,img:'//static.iasac.org.cn/ratingPC/images/netbarlist/1.jpg',name:'6号手游馆',state:1},
                {starNum:4,id:2,img:'//static.iasac.org.cn/ratingPC/images/netbarlist/2.jpg',name:'皓月连锁网咖',state:2},
                {starNum:5,id:3,img:'//static.iasac.org.cn/ratingPC/images/netbarlist/3.jpg',name:'接触时代网咖',state:1},
                {starNum:3,id:4,img:'//static.iasac.org.cn/ratingPC/images/netbarlist/4.jpg',name:'竞技世界电竞馆',state:2},
                {starNum:5,id:5,img:'//static.iasac.org.cn/ratingPC/images/netbarlist/5.jpg',name:'魔杰电竞馆',state:1},
                {starNum:5,id:6,img:'//static.iasac.org.cn/ratingPC/images/netbarlist/6.jpg',name:'任我游网咖',state:3}
            ],
            commentList:[
                {avatar: "https://static.iasac.org.cn/avatar/def.png",
                confNum: 5,
                content: "还不错，啊水烟的噶偶一个的ad",
                createdDate: "2018-09-03 11:14:23",
                evnNum: 5,
                id: 4,
                imgCommentList: [
                    {memberId: 0, netbarId: 0, commentId: 0,createdDate: "2018-09-03 11:14:23", img: "https://static.iasac.org.cn/images/upload/2018-09-03/1535944442795K8G.png"}
                    ],
                memberId: 0,
                memberName: "135****9386",
                netbarId: 3,
                servNum: 4,
                totalNum: 4
                },
                {avatar: "https://static.iasac.org.cn/avatar/def.png",
                    confNum: 5,
                    content: "兑换说明，兑换说明兑换说明兑换说明兑换说明兑换说明兑换说明兑换说明兑换说明兑换说明兑换说明兑换说明兑换说明。好家居垃圾袋拉大锯拉萨附近的垃圾堆的加拉。",
                    createdDate: "2018-09-03 11:14:23",
                    evnNum: 5,
                    id: 4,
                    imgCommentList: [
                        {memberId: 0, netbarId: 0, commentId: 0,createdDate: "2018-09-03 11:14:23", img: "https://static.iasac.org.cn/images/upload/2018-09-03/1535944442795K8G.png"}
                    ],
                    memberId: 0,
                    memberName: "135****9386",
                    netbarId: 3,
                    servNum: 4,
                    totalNum: 4}
            ],
            complainList:[
                {id:1,content:'上午活动上午活动上午活动上午活动上午活动上午活动上午活动上午活动上午活动上午活动上午活动上午活动'},
                {id:2,content:'上午活动上午活动上午活动上午活动上午活动上午活动上午活动上午活动上午活动上午活动上午活动上午活动。上午活动上\n' +
                    '午活动上午活动上午活动上午活动上午活动上午活动上午活动上午活动上午活动上午活动上午活动。'},
                {id:3,content:'上午活动上午活动上午活动上午活动上午活动上午活动上午活动上午活动上午活动上午活动上午活动上午活动'},
            ],
            scoreList2:[
                {
                    "id": 6034,
                    "memberId": 66051,
                    "netbarId": 0,
                    "source": "WEB",
                    "refId": "77",
                    "num": 100,
                    "type": "EXCHANGE",
                    "typeCn": "-兑换商品",
                    "createdDate": "2018-11-01 17:57:44"
                }, {
                    "id": 6033,
                    "memberId": 66051,
                    "netbarId": 0,
                    "source": "WEB",
                    "refId": "76",
                    "num": 100,
                    "type": "EXCHANGE",
                    "typeCn": "-兑换商品",
                    "createdDate": "2018-11-01 17:40:11"
                }, {
                    "id": 5969,
                    "memberId": 66051,
                    "netbarId": 0,
                    "source": "WEB",
                    "refId": "529",
                    "num": 10,
                    "type": "OFFICIL_BET",
                    "typeCn": "-竞猜投注",
                    "createdDate": "2018-10-31 11:24:41"
                }, {
                    "id": 5968,
                    "memberId": 66051,
                    "netbarId": 0,
                    "source": "WEB",
                    "refId": "529",
                    "num": 1,
                    "type": "OFFICIL_BET",
                    "typeCn": "-竞猜投注",
                    "createdDate": "2018-10-30 11:24:16"
                }, {
                    "id": 5964,
                    "memberId": 66051,
                    "netbarId": 0,
                    "source": "WEB",
                    "refId": "177",
                    "num": 1000,
                    "type": "CHARGE",
                    "typeCn": "+充值",
                    "createdDate": "2018-10-30 10:12:31"
                }, {
                    "id": 5963,
                    "memberId": 66051,
                    "netbarId": 0,
                    "source": "WEB",
                    "refId": "176",
                    "num": 1000,
                    "type": "CHARGE",
                    "typeCn": "+充值",
                    "createdDate": "2018-10-19 12:10:28"
                }, {
                    "id": 5959,
                    "memberId": 66051,
                    "netbarId": 0,
                    "source": "WEB",
                    "refId": "168",
                    "num": 1000,
                    "type": "CHARGE",
                    "typeCn": "+充值",
                    "createdDate": "2018-10-19 11:45:03"
                }, {
                    "id": 5952,
                    "memberId": 66051,
                    "netbarId": 0,
                    "source": "WEB",
                    "refId": "5",
                    "num": 100,
                    "type": "OFFICIL_BET_REFUND",
                    "typeCn": "+投注退还",
                    "createdDate": "2018-01-06 17:47:54"
                }, {
                    "id": 5925,
                    "memberId": 66051,
                    "netbarId": 0,
                    "source": "WEB",
                    "refId": "5",
                    "num": 100,
                    "type": "BAR_ENROLL",
                    "typeCn": "-网吧活动报名",
                    "createdDate": "2017-12-27 16:48:44"
                }, {
                    "id": 5923,
                    "memberId": 66051,
                    "netbarId": 0,
                    "source": "WEB",
                    "refId": "5",
                    "num": 100,
                    "type": "BAR_ENROLL",
                    "typeCn": "-网吧活动报名",
                    "createdDate": "2017-12-27 16:31:27"
                }
            ],
            newrecordList:[],
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
            time:'1天'
        }
    },
    created(){
        this.getShopid();
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
            if (_this.scoreList2.length > 0) {
                _this.recordList = _this.scoreList2;
                var convertArr ={} ;
                var nowDate = this.getNowDate();
                var lastDate = this.getLastDate();
                _this.recordList.forEach(function(item){
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