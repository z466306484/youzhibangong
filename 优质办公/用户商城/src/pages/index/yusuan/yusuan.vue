<template>
  <div class="container">
    <top></top>
    <topnav></topnav>
    <div class="ordercont">
      <div class="topnavbox">
        <div class="topnavitem">采购预算</div>
      </div>
      <div class="yusuanbox">
        <table class="table table-hover" style="margin-top: 20px;border: 1px solid #ddd;font-size: 12px;width: 100%">
          <thead class="graythead">
          <tr class='grayTr'>
            <td style="padding: 15px 0;text-indent: 9px" width="10%">序号</td>
            <td style="padding: 15px 0;text-indent: 9px" width="20%">采购员</td>
            <td style="padding: 15px 0;text-indent: 9px" width="20%">年度</td>
            <td style="padding: 15px 0;text-indent: 9px" width="20%">预算金额</td>
            <td style="padding: 15px 0;text-indent: 9px" width="20%">采购金额</td>
          </tr>
          </thead>
          <tbody >
          <tr v-for="(item,index) in yusuanlist" class="table_td">
            <td class="sortEdit" >{{index+1}}</td>
            <td class="sortEdit" >{{item.FUserName}}</td>
            <td class="sortEdit" >{{item.FSYear}}</td>
            <td class="sortEdit" >{{item.FAmountPrice}}</td>
            <td class="sortEdit" >{{item.FPurAmount}}</td>
          </tr>
          <tr class="table_td">
            <td class="sortEdit" colspan="3" style="text-align: center;border-right: 1px solid #eee">合计</td>
            <td class="sortEdit" >{{allyusuan}}</td>
            <td class="sortEdit" >{{allcaigou}}</td>
          </tr>
          </tbody>
        </table>
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
        allyusuan:0,
        allcaigou:0,
        yusuanlist:[],
      }
    },
    props: {},
    methods:{
      getdata(){
        let _this = this
        var data = {
          FCustID: localStorage.getItem('FCustId'),
          FSYear: '',
          FUserID: localStorage.getItem('FId'),
        }
        this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
        this.axios.post(this.apis+'/apix/Order/Order/BudgetExecution',data).then((res)=>{
          if(res.data.statuscode==200){
            _this.yusuanlist = res.data.data
            for(let i = 0;i<res.data.data.length;i++){
              _this.allyusuan+=res.data.data[i].FAmountPrice
              _this.allcaigou+=res.data.data[i].FPurAmount
            }
          }
        }).catch((res)=>{})
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
      .yusuanbox{
        width: 100%;
        .table{
          border-collapse:collapse;
          .graythead{
            background-color: #f2f2f2;
          }
          .table_td{
            border-bottom: 1px solid #e6e6e6;
            td{
              padding-left: 9px;
            }
            .sortEdit{
              height: 40px;
              line-height: 40px;
            }
          }
          .table_td:hover{
            background-color: #f2f2f2;
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
