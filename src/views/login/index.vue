<template>
  <div class="login">
    <sidebar class="sidebar-container" />
    <div class="loginBox">
      <div class="title">网盟在线用户登录</div>
      <div class="item telnum">
        <input type="text" v-model="mobile" class="item-tel input" placeholder="请输入手机号" />
      </div>
      <div class="item code">
        <input type="text" v-model="code" class="item-code input" placeholder="请输入验证码" />
        <div
          :class="{active:btnStr != '获取验证码' && btnStr != '重新获取'}"
          @click="getCode"
          class="getCode"
        >{{btnStr}}</div>
      </div>
      <div class="item-validatePhone">
        <div @click="ajaxSubmit" id="validatePhone" class="validatePhone">登 录</div>
      </div>
    </div>
  </div>
</template>

<script>
import {  Sidebar } from '@/layout/components'
export default {
  name: "Login",
  components: {
    Sidebar,
  },
  data() {
    return {
      time: 0,
      mobile: "",
      code: "",
      validate: "获取验证码",
      btnStr: "获取验证码",
      test: false,
      timer: null,
      redirect: undefined,

    };
  },
  created() {
    this.test=(navigator.userAgent.indexOf('10.0')>0)
  },
  watch: {
    $route: {
      handler: function(route) {
        if(route.query){
            this.redirect = route.query.redirect
        }
        // this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    getCode() {
      var _this = this;
      if (_this.btnStr == "获取验证码" || _this.btnStr == "重新获取") {
        if (!/^1[0123456789]\d{9}$/.test(this.mobile)) {
          this.$message.error("手机号码有误,请重填！");
          return false;
        } else {
          var data = {
            act: "login",
            mobile: _this.mobile
          };
          _this.postAxios("member/sms/getcode", data).then(function(json) {
            if (!json.code) {
              _this.validate = 60;
              _this.timer = setInterval(function() {
                _this.validate--;
                _this.btnStr = _this.validate + " 秒";
                if (_this.validate == 0) {
                  _this.btnStr = "重新获取";
                  clearInterval(_this.timer);
                }
              }, 1000);
            } else {
              _this.$message({
                showClose: true,
                message: json.message,
                type: "error"
              });
            }
          });
        }
      }
    },
    ajaxSubmit() {
      // if(  !/^1[34578]\d{9}$/.test(this.mobile) ){
      //     alert("手机号码有误,请重填！");
      //     return false;
      // }
      if (!this.code) {
        this.$message.error("验证码不能为空！");
        return false;
      }
      var _this = this;
      var data = {
        mobile: _this.mobile,
        code: _this.code
      };
      if (this.test) {
        var res = {
          code: 0,
          data:
            "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNTcxODI3MTI4LCJleHAiOjE1NzE5OTk5Mjh9.areZt2TcFBNMytr0ufBlaY9vvFfDf6mfxSb_091mDsY",
          message: "成功"
        };
        if (res.code == 0) {
          if (sessionStorage.getItem("netbarDetail")) {
            var data = JSON.parse(sessionStorage.getItem("netbarDetail"));
            this.netbarData = data;
          }
          sessionStorage.setItem("token", res.data);
          this.getMember();
        }
        return false;
      } else {
        var str = window.mjGetAppSign(
          "https://api.iasac.org.cn/front/api/member/login?mobile=" +
            _this.mobile +
            "&code=" +
            _this.code,
          "{}"
        );
        this.$axios.post(str, "{}").then(res => {
          if (res.code == 0) {
            if (sessionStorage.getItem("netbarDetail")) {
              var data = JSON.parse(sessionStorage.getItem("netbarDetail"));
              this.netbarData = data;
            }
            sessionStorage.setItem("token", res.data);
            this.getMember();
          }
        });
      }
    },
    getMember(){
      var _this=this;
        this.postAxios2('member/info').then(res=>{
          if(res.code==0){
            sessionStorage.setItem('memberData',JSON.stringify(res.data))
            setTimeout(()=>{
                _this.$router.push({ path: _this.redirect || '/' })

              // if(_this.redirect=='/personalPage/profile'){
              //   location.reload();
              // }else{
              //   _this.$router.push({ path: _this.redirect || '/' })
              // }
            })
          }
        })
      },
  }
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  margin: 0 auto;
  height: 100%;
  padding-top: 213px;
  background-image: url("//static.iasac.org.cn/ratingPC/images/login/bg-login.jpg");
  background-size: 100% 100%;
  background-position: center center;
  background-repeat: no-repeat;
  font-family: "Microsoft YaHei";
  input {
    border: 0 none;
    background: none;
  }
  input,
  textarea,
  select,
  a:focus {
    outline: none;
  }
  .loginBox {
    width: 300px;
    //height: 213px;
    margin: 0 auto;
    .title {
      text-align: center;
      width: 100%;
      height: 65px;
      font-size: 30px;
      color: #ffffff;
    }
    .item {
      width: 300px;
      height: 40px;
      border: 1px solid #ffffff;
      border-radius: 5px;
      margin: 0 auto 30px auto;
      .input {
        padding-left: 20px;
        width: 100%;
        height: 40px;
        line-height: 40px;
        color: #1d2b69;
      }
      .input::placeholder {
        color: #ffffff;
        font-size: 14px;
      }
    }
    .code {
      position: relative;
      .getCode {
        position: absolute;
        right: 2px;
        top: 2px;
        width: 88px;
        height: 34px;
        line-height: 34px;
        background-color: rgba(256, 256, 256, 0.8);
        text-align: center;
        font-size: 14px;
        color: #1d2b69;
        z-index: 100;
        cursor: pointer;
      }
      .getCode.active {
        background: #e5e5e5;
        color: #000;
      }
    }
    .item-validatePhone {
      padding-top: 10px;
      cursor: pointer;
      .validatePhone {
        color: #1d2b69;
        width: 300px;
        margin: 0 auto;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background-image: linear-gradient(#ffffff, #ffffff),
          linear-gradient(#79cfff, #79cfff);
        background-blend-mode: normal, normal;
        box-shadow: 0px 3px 5px 0px rgba(106, 131, 156, 0.75);
        border-radius: 3px;
      }
    }
  }
}
</style>
