<template>
  <div class="container">
    <top></top>
    <topnav></topnav>
    <div style="width: 60%;margin-left:20%;padding: 10px 0;"><span @click="toindex" class="tohome">首页</span> >采购说明</div>
    <div class="ordercont">
      <div class="topnavbox">
        <div class="topnavitem">购买流程</div>
      </div>
      <div class="goodscont">
        <div class="liuchengitem"><span style="color:rgb(150,0,0);font-size: 15px">Step.1 </span> 登录 商城 网站后，浏览商品并添加入购物车。</div>
        <div class="liuchengitem"><span style="color:rgb(150,0,0);font-size: 15px">Step.2 </span>确认商品信息及价格后提交。</div>
        <div class="liuchengitem"><span style="color:rgb(150,0,0);font-size: 15px">Step.3 </span> 用户的订单提交后（如果设置了审批流程的，进入内部审批流程），自动进入商家后台安排发货。</div>
        <div class="liuchengitem"><span style="color:rgb(150,0,0);font-size: 15px">Step.4 </span> 商家发货时，会进行短信提醒，收到货物后在商城进行收货确认，完成采购流程。</div>
      </div>
    </div>
    <baozheng></baozheng>
    <foot></foot>
  </div>
</template>

<script>
  import foot from '@/components/foot/foot'
  import baozheng from '@/components/foot/baozheng'
  import top from '@/components/top/top'
  import topnav from '@/components/top/topnav'
  import order_left from '@/components/order_left/order_left'
  export default {
    components: {foot,baozheng,top,topnav,order_left},
    data() {
      return {
      }
    },
    props: {},
    methods:{
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
    .tohome:hover{
      cursor: pointer;
      color: red;
      text-decoration: underline;
    }
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
      .goodscont{
        padding: 30px 30px ;
        box-sizing: border-box;
        width: 100%;
        background-color: #fff;
        .liuchengitem{
          width: 100%;
          padding: 10px 0;
          box-sizing: border-box;
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
