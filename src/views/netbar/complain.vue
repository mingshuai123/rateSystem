<template>
  <div class=" app-container complainPage">
    <div class="header">
        <div class="back"><a href="javascript:history.go(-1);"><i class="el-icon-arrow-left"></i>返回</a></div>
        <div class="title">投诉与意见</div>
        <el-button type="primary" size='mini' class="submit" @click="subcomplain">提交</el-button>
    </div>
    <div class="title"><span>*</span> 投诉项目</div>
    <div class="complainnav">
      <el-radio-group v-model="complaininfo.type" size="medium">
        <el-radio  border  v-for="(item,index) in complainnav" :key="index" v-model="item.name" :label="item.name">{{item.name}}</el-radio>
      </el-radio-group>
    </div>
    <div class="title"><span>*</span> 填写评论</div>
    
    <div class="textinput">
      <el-input type="textarea" v-model="complaininfo.memo" rows="5" placeholder="请详细描述您遇到的问题..."></el-input>
    </div>
    <div class="title"><span>*</span> 上传图片</div>
    <div class="imginputbox">
      <el-upload
        class="avatar-uploader"
        action="https://data.jesport.com/filecenter/image/upload"
        name='img'
        :show-file-list="false"
        :on-success="spaceImgUpload">
        <img v-if="complaininfo.img" :src="complaininfo.img" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
export default {
  data(){
    return {
      info:{},
      complaininfo:{img:'',type:'空间设施类',memo:'',netbarid:''},
      netbarId:0,
      complainnav:[
        {name:'空间设施类',id:1,typeCn:'space'},
        {name:'设备性能类',id:2,typeCn:'equip'},
        {name:'卫生管理类',id:3,typeCn:'health'},
        {name:'服务质量类',id:4,typeCn:'survice'},
      ],
      spaceimgList:[],
      dialogImageUrl:'',
      dialogVisible:false
    }
  },
  created(){
    this.netbarId=sessionStorage.getItem('netbarId');
    this.info=JSON.parse(sessionStorage.getItem('netbarDetail'));
  },
  methods:{
    getdataList(){
      var _this=this;
      this.postAxios('complaint/option/list').then(res=>{
        if(res.code==0){
          var qlist=[];var navList=[];var index=0;
          var data=json.data.data;
          for(key in data){
              var obj={name:'',list:[]},obj2={};
              obj.name=key;
              obj.list=data[key];
              obj.list.forEach(function (item) {
                  item.type=false;
              })
              qlist.push(obj);
              obj2.name=key;
              console.log(index);
              if(index==0){
                  obj2.active=true;
                  index++;
              }else{
                  obj2.active=false;
                  index++;
              }
              navList.push(obj2);

          }
          console.log(qlist);
          console.log(navList);
          _this.complainnav=navList;
          _this.questionList=qlist;
          _this.complaininfo.type=_this.complainnav[0].name;
          _this.nowlist=_this.questionList[0].list;
      }
    })
    },
    spaceImgUpload(res,file,fileList){
        this.complaininfo.img=res.errMsg
    },
    subcomplain(){
      var _this=this;
      _this.complaininfo.netbarid=_this.netbarId;
      var data=_this.complaininfo;
      if(data.memo==''){
          this.$message("请描述问题")
      }
      console.log(data)
      this.postAxios('member/complaint/add',data).then(res=>{
        if(res.code==0){
            _this.$message({
              duration:2000,
              type:'success',
              message:res.message,
              onClose:function(){
                _this.$router.push('/netbar');
              }
            })
        }else{
          _this.$message.error({
            showClose: true,
            message:res.message
            })
        }
      })
    },
  }
}
</script>
<style lang="scss" scoped>
  @import "~@/styles/main.scss";

</style>