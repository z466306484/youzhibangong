<template>
  <div class="ordertr">
    <div class="thitem" style="width: 40%;display: flex;flex-direction: row;justify-content: flex-start">
      <div class="orderimg">
        <img src="/static/img/u1556.png">
      </div>
      <div class="ordername">
        <div style="height: 25px;margin-top: 25px">【低价疯抢】Apple iPhone 6 32G [版本:联通3G]   [购买方式:0元购机]   [颜色:黑]</div>
      </div>
    </div>
    <div class="thitem" style="width: 10%">￥1000</div>
    <div class="thitem" style="width: 5%;line-height: 80px">1</div>
    <div class="thitem" style="width: 10%;line-height: 80px">￥1000</div>
    <div class="thitem" style="width: 10%;line-height: 80px">网上支付</div>
    <div class="thitem" style="width: 10%;line-height: 80px">已取消</div>
    <div class="thitem" style="width: 15%;">
      <div class="orderbrn">再次购买</div>
      <div class="orderbrn">删除订单</div>
      <div class="paybtn">立即支付</div>
    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
        //动态列表回复弹框参数
        answeralertobj:{
          answeralert:false,
          alertitle:'提示',
          content:'',
          btnarr:[{type:0,val:'确定'},{type:2,val:'取消'}]
        },
        username:'',
        userpwd:'',
        mincht:'',
        img:'http://dongwu.siantest.com/san/Login/capcha',
        showforget:false,
      }
    },
    props: {},
    methods: {
    },
    mounted(){
    },
    created() {
      this.mincht = (this.docheight )+'px'
    },
  }
</script>

<style scoped lang="less">
  .ordertr{
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    border-bottom: 1px solid #eee;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .thitem{
      padding: 10px 0;
      box-sizing: border-box;
      .orderimg{
        height: 80px;
        font-size: 0px;
        img{
          height: 80px;
        }
      }
      .ordername{
        flex: 1;
        box-sizing: border-box;
        height: 80px;
        margin-left: 10px;
      }
      .paybtn{
        width: 100px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        background-color: rgb(190,0,0);
        color: white;
        margin-top: 5px;
      }
      .paybtn:hover{
        background-color: rgb(155,0,0);
      }
      .orderbrn{
        margin-top: 5px;
      }
      .orderbrn:hover{
        color: red;
        text-decoration: underline;
      }
    }
  }
</style>
