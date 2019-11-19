<template>
  <div class="app-container detailPage profilePage">
    <div class="rightBox" >
      <div class="navheader">
        <!-- <div class="item" @click="itemclick(3)" :class="{active:nowitem==3}">网咖信息</div> -->
        <div class="item" @click="itemclick(1)" :class="{active:nowitem==1}">有奖问卷</div>
        <div class="item" @click="itemclick(2)" :class="{active:nowitem==2}">积分商城</div>
      </div>
      <div class="questionBox" v-if="nowitem==1&& islogin">
        <div class="header">
          我们非常重视您的意见和建议，它会影响网咖的排名和星级。
          <br />您填写的信息不会被公开，填写完毕后，您将会获得一定的奖励 ，还有机会获得评级大奖！
        </div>
        <div class="main">
          <form id="form1" runat="server">
            <div class="main-list clearfix">
              <transition-group :name="transitionName">
                <div
                  class="problemList"
                  v-show="dataIndex === index"
                  v-for="(item, index) in questions"
                  :key="index"
                >
                  <div class="subject">
                    <div class="questions">{{index+1}}.{{item.title}}</div>
                    <!-- <p>{{item.type}}</p> -->
                  </div>
                  <div class="option">
                    <ul class="clearfix">
                      <li
                        v-for="(li, liIndex) in item.optionList"
                        :key="liIndex"
                        @click="choiceRadio(index,liIndex)"
                      >
                        <input type="radio" :value="li" v-model="item.checkbox" />
                        <span>{{li.title}}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </transition-group>
            </div>
            <div class="btn-groups clearfix">
              <span v-show="isPrev" class="submit prev" @click="prev">上一题</span>
              <span v-show="isNext" class="submit next" @click="next">下一题</span>
              <span v-show="isSubmit" class="submit save" @click="save">提交</span>
            </div>
          </form>
        </div>
      </div>
      <div class="nologin" v-if="nowitem==1 && !islogin"><i class="el-icon-back"></i> 请先在左侧登录~</div>
      <div class="creditsBox" v-if="nowitem==2">
        <div class="creditsheader" v-if="memberinfo">
          <a class="name">{{netbarInfo.name}}</a>
          <!-- <div class="icon-change"></div> -->
          <div class="mycredits">我的积分 {{memberinfo.amount}}</div>
          <router-link to='/personalPage/myscore'><div class="detail" >积分明细</div></router-link>
        </div>
        <div class="nodata" v-else>未登录</div>
        <div class="shopList">
          <router-link
            class="item"
            v-for="(item,index) in creditsList"
            :key="index"
            :to="{ path: '/serve/creditsDetail',query:{id:item.id} }"
          >
            <div class="itemimg">
              <img :src="'//static.iasac.org.cn/ratingPC/images/credits/'+item.id+'.jpg'" alt />
            </div>
            <div class="name" v-cloak>{{item.name}}</div>
            <div class="price" v-cloak>{{item.price}}积分</div>
          </router-link>
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
      netbarInfo: {},
      memberinfo: {},
      nowitem: 1,
      navNum: 1,
      netbarId: 1,
      pn: 1,
      creditsList: [
        { id: 1, name: "光明使者皮肤", price: 300 },
        { id: 2, name: "乱斗之王大奖", price: 200 },
        { id: 3, name: "王者荣耀赛区资格", price: 600 },
        { id: 4, name: "英雄礼包7天体验卡", price: 400 },
        { id: 5, name: "周瑜＆小乔CP皮肤", price: 500 },
        { id: 1, name: "光明使者皮肤", price: 300 },
        { id: 2, name: "乱斗之王大奖", price: 200 },
        { id: 3, name: "王者荣耀赛区资格", price: 600 },
        { id: 4, name: "英雄礼包7天体验卡", price: 400 },
        { id: 5, name: "周瑜＆小乔CP皮肤", price: 500 }
      ],
      transitionName: "slide",
      questions: [],
      dataIndex: 0, //问题索引
      isPrev: false, //上一题是否显示
      isNext: false, //下一题是否显示
      isSubmit: false, //提交是否显示
      islogin:false
    };
  },
  created() {
    this.islogin=Boolean(sessionStorage.getItem('token'))
    this.netbarId = sessionStorage.getItem("netbarId");
    if (localStorage.getItem("item")) {
      this.nowitem = Number(localStorage.getItem("item"));
      localStorage.clear("item");
    }
    this.getmemberinfo();
    this.getQuest();
  },
  methods: {
    getQuest() {
      this.postAxios("netbar/question/list").then(res => {
        if(res.code==0){
          var list = res.data;
          list.forEach((item, index) => {
            (item.checkbox = []), (item.multiSelect = 0), (item.isFirst = false),(item.isSelect = false);
            item.isSelect = false;
            if (index == 0) {
              item.isFirst = true;
            }
          });
          this.questions = list;
        }
        
      });
    },
    getmemberinfo() {
      this.netbarInfo = JSON.parse(sessionStorage.getItem("netbarDetail"));
      this.memberinfo = JSON.parse(sessionStorage.getItem("memberData"));
    },
    itemclick(num) {
      var _this = this;
      _this.nowitem = num;
    },
    //问卷
    choiceRadio(index, liIndex) {
      //单选操作
      this.choice(index, liIndex, 0, null);
    },
    choice(index, liIndex, choiceStyle, liChildIndex) {
      setTimeout(() => {
        if (this.questions[index].checkbox) {
          this.isNext = true;
          this.questions[index].isSelect = true;
        } else {
          this.isNext = false;
          this.questions[index].isSelect = false;
        }

        if (this.dataIndex === this.questions.length - 1) {
          //判断是否是最后一题，并隐藏下一题按钮
          this.isNext = false;
        }
        //    console.log(this.data[index].checkbox)
      });
    },

    prev() {
      //上一题
      this.dataIndex -= 1;
      if (this.dataIndex <= 0) {
        this.isPrev = false;
      }
      this.isNext = true;
      this.isSubmit = false;
    },
    next() {
      //下一题
      this.dataIndex += 1;
      if (this.dataIndex > 0) {
        this.isPrev = true;
        if (this.questions[this.dataIndex].isSelect) {
          this.isNext = true;
        } else {
          this.isNext = false;
        }
      }
      if (this.questions.length - 1 == this.dataIndex) {
        this.isNext = false;
        this.isSubmit = true;
      }
    },
    save() {
      var _this = this;
      //保存数据---这是完成按钮
      console.log(this.questions[this.dataIndex].isSelect)
      if (this.questions[this.dataIndex].isSelect) {
        var list=this.questions,oids=[],qids=[];
        list.forEach(item=>{
            qids.push(Number(item.id));
            oids.push(Number(item.checkbox.id));
        })
        var data={
            netbarid:Number(_this.netbarId),
            qids:qids.join(","),
            oids:oids.join(",")
        }
        console.log(data);
        this.postAxios('https://api.iasac.org.cn/front/api/netbar/question/post',data
        
        ).then(res=>{
            if(res.code==0){
                this.$message({
                    duration: 2000,
                    type: "success",
                    message: "已完成，感谢您的配合",
                    onClose: function() {
                        _this.$router.push("/");
                    }
                });
            }
        })
        
      } else {
        this.$message(this.questions[this.dataIndex].title + "必选");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@/styles/detail.scss";
</style>