<template>
  <div class="app-container indexListPage">
    <div id="app" class="rightBox">
        <div class="navheader">
            <div class="item" @click="itemclick(1)" :class="{active:nowitem==1}">首页123</div>
            <div class="item" @click="itemclick(2)" :class="{active:nowitem==2}">评级公示</div>
            <div class="item" @click="itemclick(3)" :class="{active:nowitem==3}">评级介绍</div>
        </div>
        <!--<div class="allitem">-->
        <div v-if="nowitem==1" class="splititem ">
            <div class="swiper-shadow">
              <el-carousel indicator-position="inside" height='272px'>
                <el-carousel-item v-for="item in slider" :key="item.id" >
                  <img :src="item.img" alt="" @click="gonews(item.id)">
                </el-carousel-item>
              </el-carousel>
            </div>
            <div class="infoBox">
                <div class="advList">
                    <a class="item border-shadow" v-for="(item,index) in advList" :key="index" :href="item.newsUrl">
                        <img :src="item.img" alt="">
                    </a>
                </div>
                <div class="newsList border-shadow">
                    <div class="title">网协资讯</div>
                    <a class="newsitem" v-for="(item,index) in newsList" :key="index" :href="item.newsUrl" >
                        <img :src="item.img" alt="">
                        <div class="desc">
                            <div class="name">{{item.name}}</div>
                            <div class="desc2">2018-09-22 12:00</div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
        <div v-if="nowitem==2" class="splititem splititem2">
            <div class="listnavaaa">
                <span class="item1" @click="navclick(1)" :class="{active:navNum==1}" >最新申请</span>
                <span class="item1" @click="navclick(2)" :class="{active:navNum==2}" >最新评选</span>
            </div>
            <div class="nearly" v-if="navNum==1">
                <div class="item" v-for="(item,index) in netbarList" :key="index">
                    <div class="itemimg"><img :src="item.img" alt=""></div>
                    <div class="info">
                        <div class="infoname">{{item.name}}</div>
                        <div class="serverList">
                            <div class="serveritem" >
                                <span class="icon"><img src="//static.iasac.org.cn/ratingPC/images/detail//icon/vip.png" alt=""></span>
                                <span class="name">vip包房</span>
                            </div>
                            <div class="serveritem" >
                                <span class="icon"><img src="//static.iasac.org.cn/ratingPC/images/detail//icon/cy.png" alt=""></span>
                                <span class="name">餐饮</span>
                            </div>
                            <div class="serveritem" >
                                <span class="icon"><img src="//static.iasac.org.cn/ratingPC/images/detail//icon/djzy.png" alt=""></span>
                                <span class="name">电竞座椅</span>
                            </div>
                            <div class="serveritem" >
                                <span class="icon"><img src="//static.iasac.org.cn/ratingPC/images/detail//icon/lxlm.png" alt=""></span>
                                <span class="name">英雄联盟特权</span>
                            </div>
                        </div>
                        <div class="date">2019-06-26 12:18</div>
                    </div>
                    <div class="stateicon">{{item.state==1?"初审中":item.state==2?"评级中":"已通过"}}</div>
                </div>
            </div>
            <div class="nearly" v-if="navNum==2">
                <div class="item" v-for="(item,index) in netbarList" :key="index" >
                    <div class="itemimg"><img :src="item.img" alt=""></div>
                    <div class="info">
                        <div class="infoname">{{item.name}}</div>
                        <div class="serverList">
                            <div class="serveritem" >
                                <span class="icon"><img src="//static.iasac.org.cn/ratingPC/images/detail//icon/vip.png" alt=""></span>
                                <span class="name">vip包房</span>
                            </div>
                            <div class="serveritem" >
                                <span class="icon"><img src="//static.iasac.org.cn/ratingPC/images/detail//icon/cy.png" alt=""></span>
                                <span class="name">餐饮</span>
                            </div>
                            <div class="serveritem" >
                                <span class="icon"><img src="//static.iasac.org.cn/ratingPC/images/detail//icon/djzy.png" alt=""></span>
                                <span class="name">电竞座椅</span>
                            </div>
                            <div class="serveritem" >
                                <span class="icon"><img src="//static.iasac.org.cn/ratingPC/images/detail//icon/lxlm.png" alt=""></span>
                                <span class="name">英雄联盟特权</span>
                            </div>
                        </div>
                        <div class="date">2019-06-26 12:18</div>
                    </div>
                    <div class="starImg"><img :src='"//static.iasac.org.cn/ratingPC/images/common/star-"+item.starNum+".png"' alt=""></div>
                </div>
            </div>
        </div>
        <div v-if="nowitem==3" class="splititem ">
            <div class="swiper-shadow">
              <el-carousel indicator-position="inside" height="272px">
                <el-carousel-item v-for="(item,index) in slider2" :key="index">
                  <img :src="item.img" alt="">
                </el-carousel-item>
              </el-carousel>
            </div>
            <div class="titlebox">
                <div class="title1">星级场所特权</div>
                <div class="title2">Prerogative</div>
            </div>
            <div class="prerogative">
                <div class="item item1">
                    <div class="name">官方定级</div>
                    <div class="desc">'中国上网服务行业'颁<br/>发星级证书,优秀场所有机<br/>会获得协会评级案例推广</div>
                </div>
                <div class="item item2">
                    <div class="name">定制特权</div>
                    <div class="desc">参与场所评级,赚取神秘定<br/>制场所特权</div>
                </div>
                <div class="item item3">
                    <div class="name">运营提效</div>
                    <div class="desc">场所线上运营管理工具,助<br/>力场所日常运营</div>
                </div>
                <div class="item item4">
                    <div class="name">助力推广</div>
                    <div class="desc">帮助星级场所提升品牌影响<br/>力,获取优质用户</div>
                </div>
            </div>
            <div class="titlebox">
                <div class="title1">星级评定标准</div>
                <div class="title2">Standard</div>
            </div>
            <div class="standard">
                <div class="item">
                    <div class="icon-01"></div>
                    <div class="desc">场所环境</div>
                </div>
                <div class="item">
                    <div class="icon-01"></div>
                    <div class="desc">服务质量</div>
                </div>
                <div class="item">
                    <div class="icon-01"></div>
                    <div class="desc">管理能力</div>
                </div>
                <div class="item">
                    <div class="icon-01"></div>
                    <div class="desc">周边服务</div>
                </div>
            </div>
            <div class="titlebox">
                <div class="title1">评级流程</div>
                <div class="title2">Process</div>
            </div>
            <div class="process">
                <div class="item">
                    <div class="icon-02"></div>
                    <div class="desc">1 创建上网场所</div>
                </div>
                <div class="item">
                    <div class="icon-02"></div>
                    <div class="desc">2 提交评级资料</div>
                </div>
                <div class="item">
                    <div class="icon-02"></div>
                    <div class="desc">3 场所星级评定</div>
                </div>
                <div class="item">
                    <div class="icon-02"></div>
                    <div class="desc">4 线上平台运营</div>
                </div>
            </div>
        </div>
        <!--</div>-->
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
        navlist:[
            {name:"最近提交",index:1},
            {name:"评级日志",index:2}
        ],
        slider:[
            {img:'//static.iasac.org.cn/ratingPC/images/index/swiper1.jpg',id:1},
            {img:'//static.iasac.org.cn/ratingPC/images/index/swiper2.jpg',id:4},
            {img:'//static.iasac.org.cn/ratingPC/images/index/swiper3.jpg',id:2},
        ],
        slider2:[
            {img:'//static.iasac.org.cn/svrbackend/bms/images/guide/swiper-1.jpg'},
            {img:'//static.iasac.org.cn/svrbackend/bms/images/guide/swiper-2.jpg'},
        ],
        advList:[
            {newsUrl:"newsDetail2.html?id=1",img:'//static.iasac.org.cn/ratingPC/images/index/ad1.jpg?v=20190715',name:'官方定制'},
            {newsUrl:"newsDetail2.html?id=2",img:'//static.iasac.org.cn/ratingPC/images/index/ad2.jpg?v=20190715',name:'官方定制'},
            {newsUrl:"newsDetail2.html?id=3",img:'//static.iasac.org.cn/ratingPC/images/index/ad3.jpg?v=20190715',name:'官方定制'},
            {newsUrl:"newsDetail2.html?id=4",img:'//static.iasac.org.cn/ratingPC/images/index/ad4.jpg?v=20190715',name:'官方定制'}
        ],
        newsList:[
            {newsUrl:"newsDetail2.html?id=1",img:'//static.iasac.org.cn/ratingPC/images/index/news4.jpg',name:'习近平向首届中国国际智能产业博览会致贺信',date:'2018-09-22 12:00'},
            {newsUrl:"newsDetail2.html?id=4",img:'//static.iasac.org.cn/ratingPC/images/index/news5.jpg',name:'2018CEST华中赛区圆满落幕',date:'2018-09-22 12:00'},
            {newsUrl:"newsDetail2.html?id=2",img:'//static.iasac.org.cn/ratingPC/images/index/ad2.jpg',name:'2018全国互联网上网服务行业转型升级万里行深圳站活动举办',date:'2018-09-22 12:00'},
        ],
        navNum2:1,
        netbarId:3,
        pn:1,
        detailInfo:{},
        commentinfo:{},
        menunum:[],
        netmenu:[],
        foodmenu:[],
        commentList:[],
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
        netbarList:[
            {id:1,img:'//static.iasac.org.cn/ratingPC/images/netbarlist/1.jpg',name:'6号手游馆',state:1},
            {id:2,img:'//static.iasac.org.cn/ratingPC/images/netbarlist/2.jpg',name:'皓月连锁网咖',state:2},
            {id:3,img:'//static.iasac.org.cn/ratingPC/images/netbarlist/3.jpg',name:'接触时代网咖',state:1},
            {id:4,img:'//static.iasac.org.cn/ratingPC/images/netbarlist/4.jpg',name:'竞技世界电竞馆',state:2},
            {id:5,img:'//static.iasac.org.cn/ratingPC/images/netbarlist/5.jpg',name:'魔杰电竞馆',state:1},
            {id:6,img:'//static.iasac.org.cn/ratingPC/images/netbarlist/6.jpg',name:'任我游网咖',state:3}
        ],
        netbarList2:[
            {id:3,img:'//static.iasac.org.cn/ratingPC/images/netbarlist/3.jpg',name:'接触时代网咖',state:1,starNum:3},
            {id:2,img:'//static.iasac.org.cn/ratingPC/images/netbarlist/2.jpg',name:'皓月连锁网咖',state:2,starNum:4},
            {id:4,img:'//static.iasac.org.cn/ratingPC/images/netbarlist/4.jpg',name:'竞技世界电竞馆',state:2,starNum:5},
            {id:1,img:'//static.iasac.org.cn/ratingPC/images/netbarlist/1.jpg',name:'6号手游馆',state:1,starNum:4},
            {id:6,img:'//static.iasac.org.cn/ratingPC/images/netbarlist/6.jpg',name:'任我游网咖',state:3,starNum:5},
            {id:5,img:'//static.iasac.org.cn/ratingPC/images/netbarlist/5.jpg',name:'魔杰电竞馆',state:1,starNum:3}
        ],
        swiperImg:[
            {id:1,img:'//static.iasac.org.cn/ratingPC/images/detail/1.jpg'},
            {id:1,img:'//static.iasac.org.cn/ratingPC/images/detail/2.jpg'},
            {id:1,img:'//static.iasac.org.cn/ratingPC/images/detail/3.jpg'},
            {id:1,img:'//static.iasac.org.cn/ratingPC/images/detail/4.jpg'},
            {id:1,img:'//static.iasac.org.cn/ratingPC/images/detail/1.jpg'},
            {id:1,img:'//static.iasac.org.cn/ratingPC/images/detail/2.jpg'},
        ]
    }
  },
  created(){
      this.getItem();
      // this.getList();
  },
  methods:{
      getList(type){
          var _this=this;
          this.postAxios('netbar/rate/list',{type: type?type:1}).then(function(res){
              _this.netbarList=res.data;
          })
      },
      getItem(){
          var _this=this;
          if(sessionStorage.getItem("item")){
              _this.nowitem=sessionStorage.getItem("item");
              sessionStorage.clear("item")
          }
      },
      itemclick(num){
          var _this=this;
          _this.nowitem=num;
      },
      gonews(id){
        if(id!=2){
          window.location.href="newsDetail2.html?id="+id;
        }else{
          this.nowitem=id;
        }
      },
      navclick(num){
          var _this=this;
          _this.navNum=num;
          // _this.getList(num);
      },
      logout(){
          window.location.href="login.html"
      },
  }
}
</script>
<style lang="scss" scoped>
  @import "~@/styles/main.scss";

 </style>