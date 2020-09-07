<template>
  <div class="container"   :style="'min-height:'+ mincht">
    <leftnav></leftnav>
    <div class="rightbox">
      <div class="topbox">
        <topnav></topnav>
      </div>
      <!--首页内容-->
      <div class="content">
        <div class="listbox">
          <div class="listbox_title">
            <span v-if="pagetype==1">修改用户</span><span v-if="pagetype==0">新增用户</span><el-button size="small" class="return_list" @click="returnback()" >返回列表</el-button>
          </div>
          <div class="show_table">
             <!--展示-->
            <div class="detailcont">
              <div class="itembox">
                <div class="itemname iteminput">用户名</div>
                <div class="itemval inputvalbox">
                  <el-input v-model="userobj.FUserName" placeholder="请输入用户名"></el-input>
                </div>
              </div>
              <div class="itembox">
                <div class="itemname iteminput">登录名</div>
                <div class="itemval inputvalbox">
                  <el-input v-model="userobj.FLoginName" placeholder="请输入登录名"></el-input>
                </div>
              </div>
              <div class="itembox">
                <div class="itemname iteminput">电话</div>
                <div class="itemval inputvalbox">
                  <el-input v-model="userobj.FMobile" placeholder="请输入电话"></el-input>
                </div>
              </div>
              <div class="itembox">
                <div class="itemname iteminput">手机号</div>
                <div class="itemval inputvalbox">
                  <el-input v-model="userobj.FMobilePhone" placeholder="请输入手机号"></el-input>
                </div>
              </div>
              <div class="itembox">
                <div class="itemname iteminput">密码</div>
                <div class="itemval inputvalbox">
                  <el-input v-model="userobj.FPassWord" type="password" placeholder="请输入用户密码"></el-input>
                </div>
              </div>
              <div class="itembox">
                <div class="itemname iteminput">是否禁用</div>
                <div class="itemval inputvalbox"  style="position: relative;top: 15px">
                  <el-radio v-model="isbin" label="1">禁用</el-radio>
                  <el-radio v-model="isbin" label="2">不禁用</el-radio>
                </div>
              </div>
            </div>
            <div class="btnbox">
              <el-button type="primary" @click="subfn">保存</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import topnav from '@/components/sannav/top'
  import leftnav from  '@/components/sannav/left'
  import md5 from 'js-md5'
  export default {
    components: {topnav,leftnav},
    data() {
      return {
        mincht:'',
        name:'',
        userobj:{
          FUserName:'',
          FPassWord:'',
          FMobile:'',
          FMobilePhone:'',
          FForbidStstus:this.isbin,
        },
        FID:'',
        isbin:'1',
        pagetype:0,
      }
    },
    props: {},
    methods: {
      subfn(){
        let _this = this
        var data = {
          FUserName:this.userobj.FUserName,
          FPassWord:md5(this.userobj.FPassWord),
          FMobile:this.userobj.FMobile,
          FMobilePhone:this.userobj.FMobilePhone,
          FForbidStstus:this.isbin,
          FLoginName:this.userobj.FLoginName,
        }
        var url = this.apis+'/apix/User/User/AddAdminUser'
        if(this.pagetype==1){
          data['FID']= this.userobj.FID
          url = this.apis+'/apix/User/User/ModifyAdminUser'
        }
        this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
        this.axios.post(url,data).then((res)=>{
          console.log(res)
          if(res.data.statuscode==200){
            _this.$message(res.data.message)
            setTimeout(()=>{
              _this.$router.push({path:'/user_list'})
            },1500)
          }else {
            _this.$message(res.data.message)
          }
        }).catch((res)=>{})
      },
      handleChange1(e){
        console.log(e)
      },
      returnback(){
        this.$router.go(-1)
      },
      setdata(data){
        for(let i = 0;i<data.length;i++){
          if(data[i].FID==this.FID){
            this.userobj = data[i]
          }
        }
      },
      getdata(){
        let _this = this
        var data = {
          params: {
            FUserName: '',
          }
        }
        this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
        this.axios.get(this.apis+'/apix/User/User/AdminList',data).then((res)=>{
          console.log(res)
          if(res.data.statuscode==200){
            _this.setdata(res.data.data)
          }
        }).catch((res)=>{})
      },
    },
    mounted(){
      this.mincht = (this.docheight )  +'px'
    },
    created() {
      if(!localStorage.getItem('token')){
        this.$router.push({path:'/login'})
        return false
      }
      if(this.$route.query.id){
        this.getdata()
        this.FID = this.$route.query.id
        document.title = '修改用户'
        this.pagetype = 1
      }else {
        document.title = '新增用户'
      }
    },
  }
</script>

<style scoped lang="less">
  .container{
    display: flex;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    .rightbox{
      width: 87%;
      height: 100%;
      max-height: 100%;
      margin-left: 200px;
      display: flex;
      flex-direction: column;
      .topbox{
        width: 100%;
        height: 71px;
      }
      .content{
        flex: 1;
        overflow-y: auto;
        width: 100%;
        background-color: #f2f2f2;
        .listbox{
          width: 97%;
          margin-top: 20px;
          margin-bottom: 30px;
          margin-left: 1.5%;
          min-height: 400px;
          background-color: white;
          .listbox_title{
            padding: 15px 0px 15px 30px;
            font-size: 12px;
            border-bottom: 1px solid #e4e4e4;
            .return_list{
              margin-left:85%;
              text-decoration:none;
              color: #666666;
              display: inline-block;
            }
          }
          .show_table{
            width: 100%;
            padding: 30px 25px;
            box-sizing: border-box;
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
            .btnbox{
              width: 80%;
              margin-left: 20%;
              padding: 10px 30px;
              box-sizing: border-box;
              margin-top: 20px;
            }
          }
        }
      }
    }
  }
</style>
<style>
  .inputvalbox .el-select{
    width: 100%;
  }
</style>
