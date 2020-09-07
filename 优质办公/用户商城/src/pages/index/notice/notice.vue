<template>
  <div class="container">
    <top></top>
    <topnav></topnav>
    <div class="ordercont">
      <div class="topnavbox">
        <div class="topnavitem">公告详情</div>
      </div>
      <div class="noticebox">
        <div class="noticetitle">{{dataobj.FTopic}}</div>
        <div class="noticecont" v-html="dataobj.FDetail"></div>
      </div>
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
        allyusuan:0,
        allcaigou:0,
        yusuanlist:[],
        dataobj:'',
      }
    },
    props: {},
    methods:{
      getdata(){
        let _this = this
        var data = {
          params: {
            FID:0,
          }
        }
        this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
        this.axios.get(this.apis+'/apix/Products/Products/ShowNoticeDetail',data).then((res)=>{
          if(res.data.statuscode==200){
            _this.dataobj = res.data.data[0]
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
      .noticebox{
        width: 100%;
        padding: 15px 25px;
        box-sizing: border-box;
        .noticetitle{
          width: 100%;
          padding: 10px 0;
          font-size: 22px;
          text-align: center;
        }
        .noticecont{
          width: 100%;
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
