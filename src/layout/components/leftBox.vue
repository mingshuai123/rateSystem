<template>
  <div class="leftBox">
    <div class="logined">
      <div class="leftboxtop">
        <div class="starNum">
            <div class="starimg" v-if="netbarData.starNum<3" v-cloak>评级中...</div>
            <div class="starimg starimg1" v-if="netbarData.starNum==3" v-cloak></div>
            <div class="starimg starimg2" v-if="netbarData.starNum==4" v-cloak></div>
            <div class="starimg starimg3" v-if="netbarData.starNum==5" v-cloak></div>
        </div>
        <router-link class="name" to='/'>{{netbarData.name}}</router-link>
        <div class="cutline"></div>
      </div>
      <div class="leftboxbottom"  v-if="islogin">
          <div class="avatar">
              <img :src="memberData.avatar?memberData.avatar:'//static.iasac.org.cn/ratingPC/images/leftbox/avatar.png'" alt="">
          </div>
          <div class="membername">{{memberData.name}}</div>
          <div class="clock">
            <div class="time">在线时长</div>
            <time-clock :autoStart="autoStart" :sendSync="sendSync" :defaultVal="defaultVal" @getDataFromChild="getDataFromChild"></time-clock>
          </div>
          <div class="credit">可用积分</div>
          <div class="creditsNum">{{parseInt(memberData.amount)}}</div>
          <div class="btn-lgout" @click="logout">退出登录</div>
      </div>
      <div class="login" v-else>
      <div class="loginBox">
        <div class="title">用户登陆</div>
        <div class="item telnum">
            <input type="text" v-model="mobile" class="item-tel input"  placeholder="请输入手机号">
        </div>
        <div class="item code" >
            <input type="text" v-model="code" class="item-code input" placeholder="请输入验证码">
        </div>
        <div class="item-validatePhone">
            <div  @click="getCode"  class="validatePhone">{{btnStr}}</div>
        </div>
        <div class="item-validatePhone">
            <div @click="ajaxSubmit" class="validatePhone">登 录</div>
        </div>
    </div>
    </div>
      <div class="descbottom">
          全国上网场所<br/>
          评级系统<br/>
          V0.9.02 
      </div>
    </div>
    
  </div>
</template>
<script>
import timeClock from './timer.vue';
import qs from 'qs'
export default {
    data(){
      return {
        netbarData:{},
        memberData:{},
        islogin:false,
        autoStart:false,
        sendSync: false,
        defaultVal:sessionStorage.getItem('timer')?parseInt(sessionStorage.getItem('timer')):0,
        starNum:5,
        time:0,
        mobile:'',
        code:'',
        validate:'获取验证码',
        btnStr:'获取验证码',
        test:false,
        timer:null
      }
    },
    components:{
      timeClock
    },
    created(){
      // this.getNetbarId();
      // this.test=(navigator.userAgent.indexOf('10.0')>0)
      this.test=!(window.mjGetAppSign&&typeof(window.mjGetAppSign)=='function');
      if(sessionStorage.getItem('token')){
        this.getMember();
        // this.islogin=true;
        // this.sendSync=true;
        // this.autoStart=true;
      }else{
        this.sendSync=false;
        this.autoStart=false;
        this.islogin=false;
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('timer')
        sessionStorage.removeItem('memberData')
      }
      if(sessionStorage.getItem('netbarDetail')){
        var data=JSON.parse(sessionStorage.getItem('netbarDetail'))
        this.netbarData=data;
      }
      
    },
    methods:{
      getDataFromChild(data) {
        sessionStorage.setItem('timer',parseInt(data))
      },
      getCode(){
        var _this = this;
        if(_this.validate=='获取验证码' || _this.validate=='重新获取'){
          if(  !/^1[34578]\d{9}$/.test(this.mobile) ){
            this.$message.error("手机号码有误,请重填！")
            return false;
          }else {
            var data  = {
                act : 'login',
                mobile: _this.mobile
            }
            _this.postAxios('member/sms/getcode',data).then(function(json){
                if(!json.code){
                    _this.validate = 60;
                    _this.timer = setInterval(function(){
                        _this.validate--;
                        _this.btnStr=_this.validate+' 秒'
                        if(_this.validate == 0){
                            _this.btnStr = '重新获取';
                            clearInterval(_this.timer);
                        }
                    },1000)
                }
                else {
                  _this.$message({
                    showClose:true,
                    message:json.message,
                    type:'error'
                  });
                }
            });
          }
        }
      },
      ajaxSubmit(){
        // if(  !/^1[34578]\d{9}$/.test(this.mobile) ){
        //     alert("手机号码有误,请重填！");
        //     return false;
        // }
        if( !this.code){
            this.$message.error("验证码不能为空！")
            return false;
        }
        var _this=this;
        var data = {
            mobile   : _this.mobile,
            code     : _this.code,
        }
        if(this.test){
          var str='https://api.iasac.org.cn/front/api/member/login?accessToken=c23bb4d31c394a94b4473da23cbb1897&code=700173&deviceId=5&mobile=13520349386&nonce=41F0B5C07F1444dfA2667B82CB8BA03A&organId=19&sign=865BA869B201FFDB55CCE2E4C8790513&time=1571642490'
          var res={
            code:0,
            data:"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMDA1MCIsImlhdCI6MTU3MTg5MjcyMiwiZXhwIjoxNTcyMDY1NTIyfQ.F5h_RQbQFcD-zIPZuf3blEuvQMzjTfAdYWODZj_OhQc",
            message:"成功"
          }
          // this.$axios.post(str,'{}').
          // then(res=>{
            if(res.code==0){
              if(sessionStorage.getItem('netbarDetail')){
                var data=JSON.parse(sessionStorage.getItem('netbarDetail'))
                this.netbarData=data;
              }
              sessionStorage.setItem('token',res.data);
              this.getMember();
              
            }
          // })
          return false
        }else{
          console.log('https://api.iasac.org.cn/front/api/member/login?mobile='+_this.mobile+'&code='+_this.code);
          var str=window.mjGetAppSign('https://api.iasac.org.cn/front/api/member/login?mobile='+_this.mobile+'&code='+_this.code,'{}');
          console.log(str)
          this.$axios.post(str,'{}').
          then(res=>{
            if(res.code==0){
              if(sessionStorage.getItem('netbarDetail')){
                var data=JSON.parse(sessionStorage.getItem('netbarDetail'))
                this.netbarData=data;
              }
              sessionStorage.setItem('token',res.data);
              this.getMember();
              
            }else{
              _this.$message(res.message);
            }
          })
        }
      },
      getMember(){
        this.postAxios2('member/info').then(res=>{
          if(res.code==0){
            sessionStorage.setItem('memberData',JSON.stringify(res.data))
            this.memberData=res.data;
            this.sendSync=true;
            this.autoStart=true;
            this.islogin=true;
          }else if(res.code==10013){
            this.logout();
          }
        })
      },
      getTime(){
        var _this=this;
        var n=3800;
        var timer=setInterval(function () {
            n++;
            var h=parseInt(n/3600);
            var m=parseInt((n-h*3600)/60);
            var s=parseInt(n%60);
            _this.time=h+":"+m+":"+s;
        },1000);
          
      },
      logout(){
        if(this.test){
          var str='https://api.iasac.org.cn/front/api/member/logout?accessToken=928f4eca0b064d08adc8c59df857c09d&deviceId=3&nonce=842114E6B7814576A0379E3726AED1C9&organId=19&sign=8182A08DAC405CBC6A3BF1C4CB3E5D4B&time=1571285212'
          this.sendSync=false;
          this.autoStart=false;
          this.islogin=false;
          sessionStorage.removeItem('token')
          sessionStorage.removeItem('timer')
          sessionStorage.removeItem('netbarId')
          sessionStorage.removeItem('memberData')
          location.reload();
        }else{
          var str=window.mjGetAppSign('https://api.iasac.org.cn/front/api/member/logout','{}');
          this.$axios.post(str,'{}',{
            headers:{
              Authorization:sessionStorage.getItem('token'),
            }
          }).then(res=>{
            console.log(res)
            if(res.code==0){
              this.sendSync=false;
              this.autoStart=false;
              this.islogin=false;
              sessionStorage.removeItem('token')
              sessionStorage.removeItem('timer')
              sessionStorage.removeItem('netbarId')
              sessionStorage.removeItem('memberData')
              location.reload();
            }
          })
        }
      },
    }
}
</script>
<style lang="scss" scoped>
  .leftBox{
    position: fixed;
    top: 56px;
    left: 0;
    bottom: 0;
    width: 170px !important;
    flex-shrink:0;
    flex-grow: 0;
    height: 100%;
    background-color: #6bb8ff;
    color: #fff;
    text-align: center;
    z-index: 1000;
    font-family: "Microsoft YaHei";
    input{
      border:0 none;
      background: none ;
    }
    input,textarea,select,a:focus {
      outline: none;
    }
    .leftboxtop{
      height: 220px;
      padding: 20px 0;
      // box-shadow: rgba(0,0,0,.6) 0px 10px 10px -5px inset,rgba(0,0,0,.4) 0px 10px 10px -5px;
      .starNum{
        width: 140px;
        height: 40px;
        margin: 0 auto;
        .starimg{
          width: 140px;
          height: 40px;
          background-size: 140px 40px;
          background-repeat: no-repeat;
          background-position: center center;
        }
        .starimg1{
          background-image: url("//static.iasac.org.cn/ratingPC/images/leftbox/star3.png");
        }
        .starimg2{
          background-image: url("//static.iasac.org.cn/ratingPC/images/leftbox/star4.png");
        }
        .starimg3{
          background-image: url("//static.iasac.org.cn/ratingPC/images/leftbox/star5.png");
        }
      }
      .name{
        display: block;
        padding:10px 20px;
        font-size: 20px;
        line-height: 26px;
        letter-spacing: 0;
        text-align: center;
        color: #ffffff;
        text-shadow:0 2px 5px rgba(0,0,0,.5);
      }
      .cutline{
        width: 162px;
        height: 18px;
        margin: 20px auto;
        background-size: 162px 18px;
        background-repeat: no-repeat;
        background-position: center center;
        background-image: url("//static.iasac.org.cn/ratingPC/images/leftbox/cutline.png");
      }
      
    }
    .leftboxbottom{
      margin-top: 30px;
      .avatar{
        width: 40px;
        height: 40px;
        margin: 0 auto;
        border-radius: 50%;
        overflow: hidden;
        img{
          width: 40px;
          height: 40px;
        }
      }
      .membername{
        margin: 10px auto 30px auto;
      }
      .clock{
        margin-bottom: 20px;
        text-align: center;
        line-height: 30px;
        font-size: 16px;
        letter-spacing: 4px;
      } 
      .credit{
        line-height: 30px;
        text-align: center;
        font-size: 14px;
      }
      .creditsNum{
        width: 130px;
        height: 34px;
        line-height: 34px;
        margin: 0 auto;
        background-image: linear-gradient(0deg, #6bccff 0%, #6bb8ff 50%, #6bccff 100%), linear-gradient(#6bb8ff, #6bb8ff);
        background-blend-mode: normal,normal;
        box-shadow: 1px 2px 5px 0px rgba(107, 184, 255, 0.75);
        border-radius: 16px;
        border: solid 1px #ffffff;
        position: relative;
      }
      .creditsNum:before{
        content: '';
        position: absolute;
        left: 10px;
        top: 10px;
        display: inline-block;
        width: 16px;
        height: 14px;
        background-image: url("//static.iasac.org.cn/ratingPC/images/leftbox/icon-credits.png");
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 16px 14px;
      }
      .btn-lgout{
        width: 130px;
        height: 34px;
        line-height: 34px;
        margin: 20px auto;
        background-color: #6bb8ff;
        border-radius: 16px;
        border: solid 1px #acd7ff;
        position: relative;
        cursor: pointer;
      }
      .btn-lgout:before{
        content: '';
        position: absolute;
        left: 10px;
        top: 9px;
        display: inline-block;
        width: 16px;
        height: 16px;
        background-image: url("//static.iasac.org.cn/ratingPC/images/leftbox/icon-logout.png");
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 16px 16px;
      }
    }
    .login{
      margin-top: 30px;
      .loginBox{
        width: 100%;
        margin: 0 auto;
        .title{
          text-align: center;
          height:50px;
          font-size: 20px;
        }
        .item{
          width:80%;
          height:40px;
          border: 1px solid #ffffff;
          border-radius: 5px;
          margin: 0 auto 30px auto;
          .input{
            background-color: rgba(0,0,0,0);
            border: none;
            padding-left:10px;
            width: 100%;
            height:40px;
            line-height: 40px;
            color: #1d2b69;
          }
          .input::placeholder{
            color: #ffffff;
            font-size: 14px;
          }
        }
        .code{
          position: relative;
          .getCode{
            position: absolute;
            right:2px;
            top:2px;
            width: 50px;
            height: 34px;
            line-height: 34px;
            background-color: rgba(256,256,256,0.8);
            text-align: center;
            font-size: 14px;
            color: #1d2b69;
            z-index: 100;
            cursor : pointer;
          }
          .getCode.active{
            background:#999999;
            color: #000;
          }
        }
        .item-validatePhone{
          padding-top:10px;
          cursor: pointer;
          .validatePhone{
            width: 130px;
            height: 34px;
            line-height: 34px;
            margin: 0 auto;
            background-color: #6bb8ff;
            border-radius: 16px;
            border: solid 1px #acd7ff;
            cursor: pointer;
          }
        }
      }
    }
    .descbottom{
      position: fixed;
      width: 170px;
      bottom: 0;
      left: 0;
      margin: 30px auto;
      white-space: nowrap;
      text-align: center;
      font-size: 14px;
      color: #ffffff;
      span{
        color: #0b7cff;
      }
    }
  }
  
</style>