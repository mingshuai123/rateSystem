<template>
  <div class="app-container detailPage">
    <div class="rightBox">
      <!-- <a class="netnavheader" href="javascript:history.go(-1);" v-if='netbarId!=1'>评级公示</a> -->
      <div class="showBox">
        <div class="leftitem">
          <div class="picbox">
            <el-carousel indicator-position="inside" height="288px">
              <el-carousel-item v-for="(item,index) in slider" :key="index">
                <img :src="item" alt />
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="infobox border-shadow2">
            <div class="header">
              <div class="name">{{detailInfo.name}}</div>
              <!-- <div class="btnicon icon-sc"></div> -->
              <el-tooltip content="投诉" placement="right-start">
                <div class="btnicon icon-jb" @click="complaint"></div>
              </el-tooltip>
            </div>
            <div class="priceinfo2">
              <div class="starinfo" v-if="starNum>2">
                <span class="star_icon" :class="{active:starNum>0}"></span>
                <span class="star_icon" :class="{active:starNum>1}"></span>
                <span class="star_icon" :class="{active:starNum>2}"></span>
                <span class="star_icon" :class="{active:starNum>3}"></span>
                <span class="star_icon" :class="{active:starNum>4}"></span>
              </div>
              <div class="num" v-if="starNum>3">{{starNum.toFixed(1)}}</div>
              <div class="nostar" v-if="starNum<3">未获取星级</div>
              <div class="btn-join" @click="addComment">参与评级赢积分</div>
            </div>
            <div class="desc">地址：{{detailInfo.addr}}</div>
            <div class="desc">电话：{{detailInfo.tel}}</div>
          </div>
          <div class="serverinfo border-shadow2">
            <div class="title"></div>
            <div class="serverList">
              <div class="serveritem" v-for="(item,index) in configureList" :key="index">
                <span class="icon">
                  <img :src="item.icon" alt />
                </span>
                <span class="name">{{item.name}}</span>
              </div>
              <div class="nodata" v-if="detailInfo.configureList.length==0">未添加配置</div>
            </div>
          </div>
          <div class="activity border-shadow2">
            <div class="nodata" v-if="detailInfo.privilegeActivityList.length==0">该场所暂无优惠</div>
            <el-carousel :direction="'vertical'" v-else>
              <el-carousel-item
                v-for="(item,index) in detailInfo.privilegeActivityList"
                :key="index"
              >
                <div class="item" v-for="(yy,index2) in item" :key="index2">
                  <span class="activityicon">{{yy.name}}</span>
                  <span>{{yy.info}}</span>
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
        <div class="rightitem">
          <div class="commentBoxs">
            <el-tabs v-model="navNum" stretch type="border-card">
              <el-tab-pane name="1" label="网友评论">
                <div class="commentbox">
                  <div class="commentheader">
                    <div class="title">
                      <span>
                        网友点评
                        <span class="num">({{commentinfo.total}})</span>
                      </span>
                      <el-tooltip content="添加评论" placement="left-start">
                        <i class="el-icon-edit" @click="addComment" style="cursor:pointer"></i>
                      </el-tooltip>
                    </div>
                    <div class="scoreinfo">
                      <div class="scoreitem">
                        <div class="name">环境</div>
                        <div class="lg-bg">
                          <el-progress :percentage="detailInfo.evnNum*20" :show-text="false"></el-progress>
                        </div>
                        <div class="scorenum">{{detailInfo.evnNum}}</div>
                      </div>
                      <div class="scoreitem">
                        <div class="name">配置</div>
                        <div class="lg-bg">
                          <el-progress :percentage="detailInfo.confNum*20" :show-text="false"></el-progress>
                        </div>
                        <div class="scorenum">{{detailInfo.confNum}}</div>
                      </div>
                      <div class="scoreitem">
                        <div class="name">服务</div>
                        <div class="lg-bg">
                          <el-progress :percentage="detailInfo.servNum*20" :show-text="false"></el-progress>
                        </div>
                        <div class="scorenum">{{detailInfo.servNum}}</div>
                      </div>
                    </div>
                  </div>
                  <div class="commentbox-scroll">
                    <div class="commentList">
                      <div class="commentitem" v-for="(item,index) in commentList" :key="index">
                        <div class="commentheader2">
                          <div class="avatar">
                            <img
                              :src="item.avatar?item.avatar:'//static.iasac.org.cn/ratingPC/images/detail/wm-avatar.png'"
                              alt
                            />
                          </div>
                          <div class="info">
                            <div class="name">{{item.memberName}}</div>
                            <div class="date">{{item.createdDate}}</div>
                          </div>
                          <div class="starinfo">
                            <el-rate
                              v-model="item.servNum"
                              disabled
                              show-score
                              text-color="#ff9900"
                              :score="item.servNum"
                            ></el-rate>
                          </div>
                        </div>
                        <div class="textbox">{{item.content}}</div>
                        <div class="imgbox">
                          <div
                            class="imgitem example"
                            v-for="(xx,index) in item.imgCommentList"
                            :key="index"
                          >
                            <img :src="xx.img" alt />
                          </div>
                        </div>
                      </div>
                      <div class="page"></div>
                      <div class="divider">没有更多了</div>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane name="2" label="价格菜单">
                <div class="netmenu">
                  <div class="title">上网价格</div>
                  <div class="menuList1">
                    <div class="menuitem" v-for="(item,index) in netmenu" :key="index">
                      <div class="menuicon">{{item.name}}</div>
                      <div class="name" v-cloak>{{item.num}}{{item.unit}}</div>
                    </div>
                    <div class="nodata" v-if="netmenu.length==0">该场所暂无上网价格信息</div>
                  </div>
                  <div class="border-top"></div>
                  <div class="title">餐饮价格</div>
                  <div class="menuList">
                    <div class="menuitem2" v-for="(item,index) in foodmenu" :key="index">
                      <div class="menuicon5"></div>
                      <div>
                        <span class="name">{{item.name}}</span>
                        <span class="info">{{item.num}}元/{{item.unit}}</span>
                      </div>
                    </div>
                    <div class="nodata" v-if="foodmenu.length==0">该场所暂无菜单信息</div>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane name="3" label="比赛活动">
                <div class="activityScroll">
                  <div class="activity" v-for="(item,index) in activityList" :key="index">
                    <div class="name">
                      <span>{{item.name}}</span>
                      <span class="date">{{item.startDate}}</span>
                    </div>
                    <div class="img">
                      <img :src="item.img" alt />
                    </div>
                    <div class="info">{{item.intro}}</div>
                  </div>
                  <div class="nodata" v-if="activityList.length==0">没有发现新活动</div>
                  <div class="divider" v-else>没有更多了</div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
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
      navNum: "1",
      netbarId: 0,
      pn: 1,
      detailInfo: {
        name: "",
        evnNum: 0,
        confNum: 0,
        servNum: 0,
        starNum: 0,
        configureList: [],
        privilegeActivityList: []
      },
      configureList: [],
      activityList: [],
      commentinfo: {},
      menunum: [],
      netmenu: [],
      foodmenu: [],
      commentList: [],
      slider: [],
      islogin: false,
      test: false
    };
  },
  created() {
    var _this = this;
    // this.test = navigator.userAgent.indexOf("10.0") > 0;
    this.test = !(
      window.mjGetAppSign && typeof window.mjGetAppSign == "function"
    );
    if (_this.test) {
      var str =
        "https://api.iasac.org.cn/front/api/netbar/id/get?accessToken=7a64a034e151445d8f01b4642a5cbfb4&deviceId=5&nonce=50840074DDDC4624965FA3157776FE99&organId=19&sign=6ED86389A3AA8FB73ACF6E8A07694819&time=1571379720";
    } else {
      var str = window.mjGetAppSign(
        "https://api.iasac.org.cn/front/api/netbar/id/get",
        {}
      );
    }
    var urldata = {};
    str = str.split("?")[1];
    var strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      urldata[strs[i].split("=")[0]] = decodeURIComponent(
        strs[i].split("=")[1]
      );
    }
    this.islogin = Boolean(sessionStorage.getItem("token"));
    sessionStorage.setItem("netbarId", urldata.organId);
    _this.netbarId = urldata.organId;
    _this.init();
  },
  methods: {
    init() {
      this.getdetail();
      this.getcomment();
      this.getItem();
    },
    complaint() {
      this.$router.push({ path: "/complain" });
    },
    addComment() {
      console.log("add");
      this.$router.push({ path: "/comment" });
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
      if (num == 1) {
        // this.getswiper();
      }
    },
    navclick(num) {
      var _this = this;
      console.log(num);
      _this.navNum = num.name;
    },
    logout() {
      window.location.href = "login.html";
    },
    getdetail() {
      var _this = this;
      var data = { id: _this.netbarId };
      this.postAxios("netbar/detail", data).then(function(json) {
        if (json.code == 0) {
          //详情
          sessionStorage.setItem("netbarDetail", JSON.stringify(json.data));
          _this.detailInfo = json.data;
          _this.starNum = json.data.starNum;

          var privilegeActivityList = json.data.privilegeActivityList,
            list2 = [];
          for (let k = 0; k < privilegeActivityList.length; k = k + 2) {
            var list1=[];
            list1.push(privilegeActivityList[k]);
            if (privilegeActivityList[k + 1]) {
              list1.push(privilegeActivityList[k + 1]);
            }
            list2.push(list1)
          }
          _this.detailInfo.privilegeActivityList = list2;

          var slider = [];
          for (let x = 1; x < 5; x++) {
            if (json.data["buildingImg" + x] != "") {
              slider.push(json.data["buildingImg" + x]);
            }
          }
          _this.slider = slider;
          //菜单价格
          _this.firstmenu = json.data.menuList[0];
          var allmenu = json.data.menuList;
          var foodmenu = [],
            netmenu = [];
          allmenu.forEach(function(item) {
            item.type == "NET" ? netmenu.push(item) : foodmenu.push(item);
          });
          _this.menunum = allmenu.length;
          _this.netmenu = netmenu;
          _this.foodmenu = foodmenu;

          //活动
          var actlist = json.data.activityList;
          actlist.forEach(function(item) {
            item.startDate = new Date(item.startDate)
              .toLocaleString()
              .replace(/:\d{1,2}$/, " ");
          });
          _this.activityList = actlist;
        }
        var configureList = json.data.configureList;
        if (configureList.length > 12) {
          var arr2 = [];
          configureList.forEach((item, index) => {
            if (index < 12) {
              arr2.push(item);
            }
          });
          _this.configureList = arr2;
        } else {
          _this.configureList = configureList;
        }
      });
    },
    getcomment() {
      var _this = this;
      var data = {
        netbarid: this.netbarId,
        pn: this.pn,
        me: 0
      };
      this.postAxios("netbar/comment/list", data).then(function(json) {
        var info = json.data.commentList;
        //评论
        _this.hasNextPage = info.hasNextPage;
        _this.nextPage = info.nextPage;
        _this.commentinfo = info;
        var list = info.list;
        list.forEach(item => {
          item.createdDate = new Date(parseInt(item.createdDate))
            .toLocaleString()
            .replace(/:\d{1,2}$/, " ");
        });
        _this.commentList = list;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@/styles/detail.scss";
</style>