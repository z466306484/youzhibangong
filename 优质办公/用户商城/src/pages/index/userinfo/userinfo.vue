<template>
  <div class="container">
    <top></top>
    <topnav></topnav>
    <div class="ordercont">
      <div class="topnavbox">
        <div class="topnavitem">个人资料</div>
      </div>
      <div class="userbox">
        <div class="upimgbox">
          <input class="upimage" type="file" @change="handleChange" accept="image/jpg,image/jpeg,image/png,image/gif">
          <img id="imgDom" :src="FUrl">
        </div>
        <div class="usertext">
          <div class="username">{{userobj.FLoginName}} ({{userobj.FCompanyName}})</div>
          <div class="userlogintime" style="margin: 5px 0">上次登录时间：{{userobj.FLastLoginTime}}</div>
          <div class="userxiaofei">
            <span>今年已消费:<span style="color: rgb(150,0,0)">￥{{userobj.FConsumed}}</span></span>
            <span style="margin-left: 15px">预算余额:<span style="color: rgb(150,0,0)">￥{{userobj.FCurrentAmountPrice}}</span></span>
          </div>
        </div>
      </div>
      <div class="userxinxi">
        <el-tabs type="border-card">
          <el-tab-pane label="个人信息">
            <div class="detailcont">
              <div class="itembox">
                <div class="itemname iteminput">用户名</div>
                <div class="itemval inputvalbox">
                  <div style="line-height: 40px">{{userobj.FLoginName}}</div>
                </div>
              </div>
              <div class="itembox">
                <div class="itemname iteminput"><span style="color: red">*</span>邮箱:</div>
                <div class="itemval inputvalbox">
                  <el-input v-model="userobj.FEmail" placeholder="请输入邮箱"></el-input>
                </div>
              </div>
              <div class="itembox">
                <div class="itemname iteminput"><span style="color: red">*</span>姓名:</div>
                <div class="itemval inputvalbox">
                  <el-input v-model="userobj.FUserName" placeholder="请输入姓名"></el-input>
                </div>
              </div>
              <div class="itembox">
                <div class="itemname iteminput"><span style="color: red">*</span>手机号:</div>
                <div class="itemval inputvalbox">
                  <el-input v-model="userobj.FMobilePhone" placeholder="请输入手机号"></el-input>
                </div>
              </div>
              <div class="itembox">
                <div class="itemname iteminput">电话:</div>
                <div class="itemval inputvalbox">
                  <el-input v-model="userobj.FMobile" placeholder="请输入电话"></el-input>
                </div>
              </div>
              <div class="itembox">
                <div class="itemname iteminput"><span style="color: red">*</span>性别:</div>
                <div class="itemval inputvalbox" style="position: relative;top: 14px">
                  <el-radio v-model="userobj.FSex" :label="true">男</el-radio>
                  <el-radio v-model="userobj.FSex" :label="false">女</el-radio>
                </div>
              </div>
              <div class="itembox">
                <div class="itemname iteminput">部门:</div>
                <div class="itemval inputvalbox">
                  <el-input v-model="userobj.FOccupation" placeholder="请输入职务"></el-input>
                </div>
              </div>
              <div class="itembox">
                <div class="itemname iteminput"></div>
                <div class="itemval inputvalbox">
                  <el-button type="primary" @click="subfn">提交</el-button>
                  <el-button type="danger" @click="czbtn">重置</el-button>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
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
  export default {
    components: {Swiper,foot,baozheng,top,topnav,order_left},
    data() {
      return {
        name:'',
        sex:1,
        jiaoyu:1,
        nianxian:'',
        pingpai:'',
        userobj:'',
        FUrl:'',
      }
    },
    props: {},
    methods:{
      handleChange(e){
        let _this = this;
        var f = e.target.files
        if(e.length==0){
          return false
        }
          var reads= new FileReader();
          reads.readAsDataURL(f[0]);
          reads.onload=function (event) {
            _this.FUrl = event.target.result
          };
      },
      getdata(){
        let _this = this
        var data = {
          params: {
            FUId:localStorage.getItem('FId')
          }
        }
        this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
        this.axios.get(this.apis+'/apix/User/User/UserInfo',data).then((res)=>{
          if(res.data.statuscode==200){
            _this.FUrl = res.data.data.FUrl
            _this.userobj = res.data.data
          }else {
          }
        }).catch((res)=>{
        })
      },
      czbtn(){
        this.userobj.fUserName = ''
        this.userobj.fEmail = ''
        this.userobj.fMobile = ''
        this.userobj.fOccupation = ''
      },
      subfn(){
        let _this = this
        console.log(this.FUrl)
        var data = {
            FId:localStorage.getItem('FId'),
            FEmail:this.userobj.FEmail,
            FMobilePhone:this.userobj.FMobilePhone,
            FMobile:this.userobj.FMobile,
            FSex:this.userobj.FSex,
            FOccupation:this.userobj.FOccupation,
            FUserName:this.userobj.FUserName,
            FUrl:this.FUrl,
        }
        this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
        this.axios.post(this.apis+'/apix/User/User/UserInfoEdit',data).then((res)=>{
          if(res.data.statuscode==200){
            _this.$message({
              type: 'success',
              message: '修改成功!'
            });
            _this.getdata()
          }else {
            _this.$message(res.data.message)
          }
        }).catch((res)=>{
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
      this.getdata()
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
      .userbox{
        width: 100%;
        padding: 30px 50px;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        .upimgbox{
          width: 80px;
          height: 80px;
          position: relative;
          margin-right: 25px;
          border-radius: 50%;
          overflow: hidden;
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
        .usertext{
          flex: 1;
          display: flex;
          flex-direction: column;
          margin-left: 20px;
          justify-content: center;
          .username,.userlogintime,.userxiaofei{
            height: 15px;
            line-height: 15px;
          }
          .username{
            font-weight: bold;
          }
        }
      }
      .userxinxi{
        width: 90%;
        margin-left: 5%;
        border: 1px solid #eee;
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
