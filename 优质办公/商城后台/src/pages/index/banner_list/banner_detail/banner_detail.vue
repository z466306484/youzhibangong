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
            轮播图详情<el-button size="small" class="return_list" @click="returnback()" >返回列表</el-button>
          </div>
          <div class="show_table">
             <!--展示-->
            <div class="detailcont">
              <div class="itembox">
                <div class="itemname iteminput">描述</div>
                <div class="itemval inputvalbox">
                  <el-input v-model="bannerobj.FDescription" placeholder="请输入轮播图名称"></el-input>
                </div>
              </div>
              <div class="itembox" v-if="false">
                <div class="itemname iteminput">发布时间</div>
                <div class="itemval inputvalbox">
                  <el-input :disabled="true" v-model="name" placeholder="请输入商品名称"></el-input>
                </div>
              </div>
              <div class="itembox">
                <div class="itemname">轮播图片</div>
                <div class="itemval">
                  <div class="upimgbox">
                    <input class="upimage" type="file" @change="handleChange1" accept="image/jpg,image/jpeg,image/png,image/gif">
                    <img :src="imgurl">
                  </div>
                </div>
              </div>
              <div class="itembox">
                <div class="itemname iteminput">链接</div>
                <div class="itemval inputvalbox">
                  <el-input v-model="bannerobj.FGetUrl" placeholder="请输入链接"></el-input>
                </div>
              </div>
            </div>
            <div class="btnbox">
              <!--<el-button type="primary">新增</el-button>-->
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
  export default {
    components: {topnav,leftnav},
    data() {
      return {
        mincht:'',
        name:'',
        bannerid:'',
        bannerobj:'',
        imgurl:'',
        changeimg:false,
      }
    },
    props: {},
    methods: {
      subfn(){
        let _this = this
        var img = ''
        if(this.imgurl==''||this.imgurl=='/static/img/senadd.jpg'){
          img = ''
        }else {
          img = this.imgurl
        }
        var data = [{
          FIndex:this.bannerobj.FIndex,
          FUrl:img,
          FDescription:this.bannerobj.FDescription,
          FMaterialId:this.bannerobj.FMaterialId,
          FGetUrl:this.bannerobj.FGetUrl,
        }]
        this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
        this.axios.post(this.apis+'/apix/Products/Products/UploadRotation',data).then((res)=>{
          console.log(res)
          if(res.data.statuscode==200){
            _this.$message({
              message: '操作成功',
              type: 'success'
            });
            _this.$router.push({path:'/banner_list'})
          }else {
            _this.$message(res.data.message)
          }
        }).catch((res)=>{})
      },
      handleChange1(e){
        console.log(e)
        let _this = this
        var f = e.target.files
        if(e.length==0){
          return false
        }
        var reads= new FileReader();
        reads.readAsDataURL(f[0]);
        reads.onload=function (event) {
          _this.changeimg = true
          _this.imgurl = event.target.result
        };
      },
      returnback(){
        this.$router.go(-1)
      },
      setdata(data){
        for(let i = 0;i<data.length;i++){
          if(data[i].FIndex==this.bannerid){
            this.bannerobj = data[i]
            this.imgurl =this.imgapis+data[i].FUrl
          }
        }
        console.log(this.bannerobj,'this.bannerobj')
      },
      getdata(){
        let _this = this
        var data = {
          params: {
            FCustID: localStorage.getItem('FCustId')
          }
        }
        this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
        this.axios.get(this.apis+'/apix/Products/Products/Rotation',data).then((res)=>{
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
      this.bannerid = this.$route.query.id
      this.getdata()
      document.title = '轮播图详情'
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
