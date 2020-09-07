<template>
  <div class="container">
    <top></top>
    <topnav></topnav>
    <div class="ordercont">
      <div class="topnavbox">
        <div class="topnavitem">密码管理</div>
      </div>
      <div class="detailcont">
        <div class="itembox">
          <div class="itemname iteminput"><span style="color: red">*</span>旧密码:</div>
          <div class="itemval inputvalbox">
            <el-input v-if="showey0" v-model="oldpwd" type="text" placeholder="请输入旧密码"></el-input>
            <el-input v-if="!showey0" v-model="oldpwd" type="password" placeholder="请输入旧密码"></el-input>
          </div>
          <div :class="!showey0?'yanbox iconfont icon-yanjing-biyan':'yanbox iconfont icon-yanjing-tianchong'" @click="yanfn(0)"></div>
        </div>
        <div class="itembox">
          <div class="itemname iteminput"><span style="color: red">*</span>新密码:</div>
          <div class="itemval inputvalbox">
            <el-input v-if="showey1" v-model="newpwd" type="text" placeholder="请输入新密码"></el-input>
            <el-input v-if="!showey1" v-model="newpwd" type="password" placeholder="请输入新密码"></el-input>
          </div>
          <div :class="!showey1?'yanbox iconfont icon-yanjing-biyan':'yanbox iconfont icon-yanjing-tianchong'" @click="yanfn(1)"></div>
        </div>
        <div class="itembox">
          <div class="itemname iteminput"><span style="color: red">*</span>确认密码:</div>
          <div class="itemval inputvalbox">
            <el-input v-if="showey2" v-model="surepwd" type="text" placeholder="请输入确认密码"></el-input>
            <el-input v-if="!showey2" v-model="surepwd" type="password" placeholder="请输入确认密码"></el-input>
          </div>
          <div :class="!showey2?'yanbox iconfont icon-yanjing-biyan':'yanbox iconfont icon-yanjing-tianchong'" @click="yanfn(2)"></div>
        </div>
        <div class="itembox">
          <div class="itemname iteminput"></div>
          <div class="itemval inputvalbox">
            <el-button type="primary" @click="updatepwd">提交</el-button>
            <el-button type="danger" @click="chongzhi">重置</el-button>
          </div>
        </div>
      </div>
      <order_left></order_left>
    </div>
    <baozheng></baozheng>
    <foot></foot>
  </div>
</template>

<script>
  import { Swiper } from 'vux'
  import foot from '@/components/foot/foot'
  import baozheng from '@/components/foot/baozheng'
  import top from '@/components/top/top'
  import topnav from '@/components/top/topnav'
  import order_left from '@/components/order_left/order_left'
  import md5 from 'js-md5'
  export default {
    components: {Swiper,foot,baozheng,top,topnav,order_left},
    data() {
      return {
        oldpwd:'',
        newpwd:'',
        surepwd:'',
        showey0:false,
        showey1:false,
        showey2:false,
      }
    },
    props: {},
    methods:{
      chongzhi(){
        this.oldpwd = ''
        this.newpwd = ''
        this.surepwd = ''
      },
      yanfn(id){
        if(id==1){
          this.showey1 = !this.showey1
        }else if(id==2){
          this.showey2 = !this.showey2
        }else if(id==0){
          this.showey0 = !this.showey0
        }
      },
      updatepwd(){
        let _this = this
        if(this.newpwd!=this.surepwd){
          this.$message('两次密码不一致');
          return false
        }
        if(this.newpwd==''){
          this.$message('密码不能为空');
          return false
        }
        var data = {
            FId:localStorage.getItem('FId'),
            FPassWord:md5(this.oldpwd),
            FNewPassWord:md5(this.newpwd),
        }
        this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
        this.axios.post(this.apis+'/apix/User/User/EditUserPsw',data).then((res)=>{
          if(res.data.statuscode==200){
            _this.$message({
              type: 'success',
              message: '修改成功!'
            });
          }else {
            _this.$message(res.data.message)
          }
        }).catch((res)=>{
          console.log(res)
          this.$message(res.Message);
        })
      },
    },
    mounted(){
    },
    created() {
      if(!localStorage.getItem('token')){
        this.$router.push({path:'/login'})
        return false
      }
    },
  }
</script>

<style scoped lang="less">
  .container{
    width: 100%;
    background-color: rgb(245,245,245);
    .ordercont{
      width: 60%;
      margin-left: 20%;
      position: relative;
      margin-top: 20px;
      background-color: #fff;
      padding: 15px;
      box-sizing: border-box;
      .topnavbox{
        width: 100%;
        padding: 0px 0 15px;
        padding-bottom: 15px;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        border-bottom: 1px solid #eee;
        .topnavitem:hover{
          color: red;
          text-decoration: underline;
          cursor: pointer;
        }
      }
      .detailcont{
        width: 100%;
        .itembox{
          width: 100%;
          display: flex;
          padding: 15px 0;
          box-sizing: border-box;
          .itemname{
            width: 20%;
            text-align: right;
            margin-right: 30px;
          }
          .iteminput{
            line-height: 40px;
          }
          .itemval{
            display: flex;
            .upimgbox{
              width: 80px;
              height: 80px;
              position: relative;
              margin-right: 25px;
              .videobox{
                position: absolute;
                width: 100%;
                height: 100%;
                opacity: 0;
                z-index: 100;
                #videobtn{
                  width: 80px;
                  height: 80px;
                }
              }
              .upimage{
                position: absolute;
                width: 100%;
                height: 100%;
                opacity: 0;
                z-index: 100;
              }
              img{
                width: 100%;
                height: 100%;
              }
            }
            .tagitem{
              width: 100%;
              display: flex;
              margin-right: 30px;
              .tagname{
                margin-right: 10px;
              }
              .tagval{
                position: relative;
                top: -1px;
              }
            }
          }
          .inputvalbox{
            width: 400px;
          }
          .yanbox{
            line-height: 40px;
            margin-left: 15px;
            color: rgb(100,100,100);

          }
        }
      }
    }
  }
</style>
<style>
  .el-pagination.is-background .el-pager li:not(.disabled).active{
    background-color: red;
  }
  .el-pager li:hover{
    color: red !important;
  }
</style>
