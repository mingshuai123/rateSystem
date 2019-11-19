<template>
  <div class="app-container indexListPage">
    <div id="app" class="rightBox">
      <div class="navheader">
        <div class="item" @click="itemclick(1)" :class="{active:nowitem==1}">首页</div>
        <div class="item" @click="itemclick(2)" :class="{active:nowitem==2}">评级公示</div>
        <div class="item" @click="itemclick(3)" :class="{active:nowitem==3}">评级介绍</div>
      </div>
      <!--<div class="allitem">-->
      <div v-if="nowitem==1" class="splititem">
        <div class="swiper-shadow">
          <el-carousel indicator-position="inside" height="272px">
            <el-carousel-item v-for="item in slider" :key="item.id">
              <img :src="item.img" alt @click="gonews(item.id)" />
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="infoBox">
          <div class="advList">
            <router-link
              class="item border-shadow"
              v-for="(item,index) in advList"
              :key="index"
              :to="{path:'/rate/news',query:{id:item.id}}"
            >
              <img :src="item.img" alt />
            </router-link>
          </div>
          <div class="newsList border-shadow">
            <div class="title">网协资讯</div>
            <router-link
              class="newsitem"
              v-for="(item,index) in newsList"
              :key="index"
              :to="{path:'/rate/news',query:{id:item.id}}"
            >
              <img :src="item.img" alt />
              <div class="desc">
                <div class="name">{{item.name}}</div>
                <div class="desc2">{{item.date}}</div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <div v-if="nowitem==2" class="splititem splititem2">
        <div class="listnavaaa">
          <span class="item1" @click="navclick(1)" :class="{active:navNum==1}">最新评选</span>
          <span class="item1" @click="navclick(2)" :class="{active:navNum==2}">最新申请</span>
        </div>
        <div class="nearly" v-if="navNum==2">
          <div class="item" v-for="(item,index) in netbarList" :key="index">
            <div class="itemimg">
              <img :src="item.buildingImg1" alt />
            </div>
            <div class="info">
              <div class="infoname">{{item.name}}</div>
              <div class="serverList">
                <div class="serveritem" v-for="(xx,index2) in item.configureList" :key="index2" >
                  <div v-if="index2<6">
                    <span class="icon">
                      <img :src="xx.icon" alt />
                    </span>
                    <span class="name">{{xx.name}}</span>
                  </div>
                  
                </div>
              </div>
              <div class="date">{{item.created}}</div>
            </div>
            <div class="stateicon">{{item.state==1?"初审中":item.state==2?"评级中":"已通过"}}</div>
          </div>
        </div>
        <div class="nearly" v-if="navNum==1">
          <div class="item" v-for="(item,index) in netbarList" :key="index">
            <div class="itemimg">
              <img :src="item.buildingImg1" alt />
            </div>
            <div class="info">
              <div class="infoname">{{item.name}}</div>
              <div class="serverList">
                <div class="serveritem" v-for="(xx,index2) in item.configureList" :key="index2">
                  <div v-if="index2<6">
                  <span class="icon">
                    <img :src="xx.icon" alt />
                  </span>
                  <span class="name">{{xx.name}}</span>
                </div>
                </div>
              </div>
              <div class="date">{{item.created}}</div>
            </div>
            <div class="starImg">
              <img v-if='item.starNum>0' :src="'//static.iasac.org.cn/ratingPC/images/common/star-'+ item.starNum +'.png'" alt />
              <span v-else>暂未获取星级</span>
            </div>
          </div>
        </div>
      </div>
      <div v-if="nowitem==3" class="splititem">
        <div class="swiper-shadow">
          <el-carousel indicator-position="inside" height="272px">
            <el-carousel-item v-for="(item,index) in slider2" :key="index">
              <img :src="item.img" alt />
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
            <div class="desc">
              '中国上网服务行业'颁
              <br />发星级证书,优秀场所有机
              <br />会获得协会评级案例推广
            </div>
          </div>
          <div class="item item2">
            <div class="name">定制特权</div>
            <div class="desc">
              参与场所评级,赚取神秘定
              <br />制场所特权
            </div>
          </div>
          <div class="item item3">
            <div class="name">运营提效</div>
            <div class="desc">
              场所线上运营管理工具,助
              <br />力场所日常运营
            </div>
          </div>
          <div class="item item4">
            <div class="name">助力推广</div>
            <div class="desc">
              帮助星级场所提升品牌影响
              <br />力,获取优质用户
            </div>
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
import axios from "axios";

export default {
  data() {
    return {
      nowitem: 1,
      starNum: 5,
      navNum: 1,
      navlist: [{ name: "最近提交", index: 1 }, { name: "评级日志", index: 2 }],
      slider: [
        {
          img: "//static.iasac.org.cn/ratingPC/images/index/swiper1.jpg?v-1",
          id: 1
        },
        {
          img: "//static.iasac.org.cn/ratingPC/images/index/swiper2.jpg?v-1",
          id: 2
        },
        {
          img: "//static.iasac.org.cn/ratingPC/images/index/swiper3.jpg?v-1",
          id: 3
        }
      ],
      slider2: [
        {
          img: "//static.iasac.org.cn/svrbackend/bms/images/guide/swiper-1.jpg?v=1"
        },
        {
          img: "//static.iasac.org.cn/svrbackend/bms/images/guide/swiper-2.jpg?v=1"
        }
      ],
      advList: [
        {
          newsUrl: "newsDetail2.html?id=1",
          img: "//static.iasac.org.cn/ratingPC/images/index/ad1.jpg?v=1",
          name: "官方定制",
          id: 3
        },
        {
          newsUrl: "newsDetail2.html?id=2",
          img: "//static.iasac.org.cn/ratingPC/images/index/ad2.jpg?v=1",
          name: "官方定制",
          id: 4
        },
        {
          newsUrl: "newsDetail2.html?id=3",
          img: "//static.iasac.org.cn/ratingPC/images/index/ad3.jpg?v=1",
          name: "官方定制",
          id: 5
        },
        {
          newsUrl: "newsDetail2.html?id=4",
          img: "//static.iasac.org.cn/ratingPC/images/index/ad4.jpg?v=1",
          name: "官方定制",
          id: 6
        }
      ],
      newsList: [
        {
          id: 7,
          newsUrl: "newsDetail2.html?id=1",
          img: "//static.iasac.org.cn/ratingPC/images/index/news1.jpg?v=1",
          name: "中共中央、国务院：强化对网络游戏、微视频等的价值引领与管控",
          date: "2019-09-26 08:06:02"
        },
        {
          id: 8,
          newsUrl: "newsDetail2.html?id=4",
          img: "//static.iasac.org.cn/ratingPC/images/index/news2.jpg?v=1",
          name: "中国互联网上网服务行业协会开展 “不忘初心、牢记使命”主题教育动员会",
          date: "2019-09-24 12:55:51"
        },
        {
          id: 9,
          newsUrl: "newsDetail2.html?id=2",
          img: "//static.iasac.org.cn/ratingPC/images/index/news3.jpg?v=1",
          name: "四部委开展云计算服务评估",
          date: "2019-09-12 07:53:11"
        }
      ],
      pn: 1,
      netbarList:[]
    };
  },
  created() {
    this.getItem();
    this.getList();
  },
  methods: {
    swiperClick(num){
      if(num!=3){
        this.$router.push({path:'/rate/news',query:{id:item.id}})
      }else{
        this.nowitem = num;
      }
    },
    getList() {
      var _this = this;
      this.postAxios("netbar/rate/list", { type: this.navNum }).then(
        function(res) {
          _this.netbarList = res.data;
        }
      );
    },
    getItem() {
      var _this = this;
      if (sessionStorage.getItem("item")) {
        _this.nowitem = sessionStorage.getItem("item");
        sessionStorage.clear("item");
      }
    },
    itemclick(num) {
      var _this = this;
      _this.nowitem = num;
    },
    gonews(id) {
      if (id != 3) {
        this.$router.push({ path: "news", query: { id: id } });
      } else {
        this.nowitem = id;
      }
    },
    navclick(num) {
      var _this = this;
      _this.navNum = num;
      _this.getList();
    },
    logout() {
      window.location.href = "login.html";
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@/styles/main.scss";
</style>