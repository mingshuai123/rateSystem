<template>
  <div class=" app-container commentPage">
    <div class="header">
        <div class="back"><a href="javascript:history.go(-1);"><i class="el-icon-arrow-left"></i> 返回</a></div>
        <div class="title">评论 {{info.name}}</div>
        <el-button type="primary" size="mini" class="submit" @click="subComment()">发表</el-button>
    </div>
    <div class="starsubmit">
        <div class="staritem">
            <div class="name">环境</div>
            <el-rate v-model="commentdata.evnnum" show-score></el-rate>
        </div>
        <div class="staritem">
            <div class="name">配置</div>
            <el-rate v-model="commentdata.confnum" show-score></el-rate>
        </div>
        <div class="staritem">
            <div class="name">服务</div>
            <el-rate v-model="commentdata.servnum" show-score></el-rate>
        </div>
    </div>
    <div class="textinput">
      <el-input type="textarea" v-model="commentdata.content" rows="5" placeholder="请填写评论..."></el-input>
    </div>
    <div class="imginputbox">
        <el-upload
          action="https://data.jesport.com/filecenter/image/upload"
          list-type="picture-card"
          name='img'
          ref="uploads"
          :limit=5
          :on-preview="handlePictureCardPreview"
          :on-success="spaceImgUpload"
          :on-remove="spaceImgRemove"
          :file-list='spaceimgList'>
          <i class="el-icon-plus"></i>
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
      spaceimgList:[],
      commentdata:{
          img:[],
          netbarid:'',
          servnum:0,
          confnum:0,
          evnnum:0,
          content:''
      },
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  created(){
    this.netbarId=sessionStorage.getItem('netbarId');
    this.info=JSON.parse(sessionStorage.getItem('netbarDetail'));
  },
  methods:{
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    spaceImgUpload(res,file,fileList){
        
        let obj={};
        obj.url=res.errMsg; 
        obj.name='building_img'+fileList.length;
        // this.spaceimgList.push(obj);
        this.spaceimgList=fileList
    },
    spaceImgRemove(file,fileList){
        var list=[]
        console.log(fileList)
        // fileList.forEach((item,index) => {
        //     var obj={};
        //     obj.name='building_img'+(index+1)
        //     obj.url=item.url
        //     list.push(obj)
        // });
        this.spaceimgList=fileList;
    },
    subComment(){
        var _this=this;
        _this.commentdata.netbarid=_this.netbarId;
        var list=this.spaceimgList;
        var img=[]
        list.forEach((item,index) => {
          img.push(item.response.errMsg)
        });
        _this.commentdata.img=img;
        var data=_this.commentdata;
        if(data.content==''){
            this.$message("填写评论")
        }
        console.log(_this.commentdata)
        this.postAxios('netbar/comment/add',data,).then(res=>{
            if(res.code==0){
                _this.$message({
                  duration:2000,
                  type:'success',
                  message:res.message,
                  onClose:function(){
                    _this.$router.push('/netbar');
                  }
                })
            }
        })
    },
  },
}
</script>
<style lang="scss" scoped>
  @import "~@/styles/main.scss";

</style>