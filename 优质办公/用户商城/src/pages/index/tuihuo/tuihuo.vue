<template>
  <div class="container">
    <top></top>
    <topnav></topnav>
    <div class="ordercont">
      <div class="topnavbox">
        <div class="topnavitem">退换货订单</div>
      </div>
      <div class="tuihuocont">
        <table class="table table-hover" style="margin-top: 20px;border: 1px solid #ddd;font-size: 12px;width: 100%">
          <thead class="graythead">
          <tr class='grayTr'>
            <td style="padding: 15px 0;text-indent: 9px" width="25%">订单号</td>
            <td style="padding: 15px 0;text-indent: 9px" width="25%">退货类型</td>
            <td style="padding: 15px 0;text-indent: 9px" width="25%">申请时间</td>
            <td style="padding: 15px 0;text-indent: 9px" width="25%">状态</td>
          </tr>
          </thead>
          <tbody >
          <tr v-for="(item,index) in orderlist" class="table_td">
            <td class="sortEdit tuihuonum" @click="tuihuo(item.BillNo)">{{item.FBillNo}}</td>
            <td class="sortEdit" >{{item.FBillStatus}}</td>
            <td class="sortEdit" >{{item.FCreateTime}}</td>
            <td class="sortEdit" >{{item.Fstatus}}</td>
          </tr>
          </tbody>
        </table>
        <div class="pagenav">
          <el-pagination
            background
            :page-size="pagenum"
            :current-page="nowpage"
            layout="prev, pager, next"
            @current-change="changepage"
            :total="allpage*pagenum">
          </el-pagination>
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
  export default {
    components: {Swiper,foot,baozheng,top,topnav,order_left},
    data() {
      return {
        orderlist:[],
        nowpage:1,
        pagenum:5,
        allpage:1,
      }
    },
    props: {},
    methods:{
      changepage(index){
        this.nowpage = index
        this.getdata()
      },
      tuihuo(id){
        this.$router.push({path:'/order_detail',query:{id:id}})
      },
      getdata(){
        let _this = this
        var data = {
          params: {
            fUId:localStorage.getItem('FId'),
            fPageIndex:this.nowpage,
            fPageSize:this.pagenum,
          }
        }
        this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
        this.axios.get(this.apis+'/apix/Order/Order/ReOrders',data).then((res)=>{
          if(res.data.statuscode==200){
            _this.orderlist = res.data.data
            _this.allpage = parseInt(res.data.message)
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
      .tuihuocont{
        width: 100%;
        .table{
          border-collapse:collapse;
          .graythead{
            background-color: #f2f2f2;
          }
          .table_td{
            border-bottom: 1px solid #e6e6e6;
            .tuihuonum{
              color: deepskyblue;
              cursor: pointer;
            }
            .tuihuonum:hover{
              color: red;
            }
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
        .pagenav{
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: center;
          margin-top: 20px;
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
