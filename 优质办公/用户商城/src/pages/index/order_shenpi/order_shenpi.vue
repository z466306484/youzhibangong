<template>
  <div class="container">
    <top></top>
    <topnav></topnav>
    <div class="ordercont">
      <div class="topnavbox">
        <div :class="pagetype==1?'topnavitem2':'topnavitem'" style="margin-right: 20px" @click="checktype(1)">待我审核的订单</div>
        <div :class="pagetype==2?'topnavitem2':'topnavitem'" @click="checktype(2)">我审核的订单</div>
      </div>
      <div class="undernavbox">
        <div class="listcont">
          <div class="tabletop">
            <div class="thitem" style="width: 40%">商品名称</div>
            <div class="thitem" style="width: 10%">单价(元)</div>
            <div class="thitem" style="width: 5%">数量</div>
            <div class="thitem" style="width: 10%">金额(元)</div>
            <div class="thitem" style="width: 10%">支付方式</div>
            <div class="thitem" style="width: 10%">订单状态</div>
            <div class="thitem" style="width: 15%">交易操作</div>
          </div>
          <div class="listitem" v-for="item in orderlist">
            <div class="listitem_top">
              <div>订单编号:<span style="color: red">{{item.FBillNo}}</span></div>
              <div>订单时间:<span>{{item.FBillTime}}</span></div>
              <div class="orderdetaibtn" @click="todetail(item.FBillNo)">订单详情</div>
            </div>
            <div class="ordertr" v-for="item2 in item.entries">
              <div class="thitem" style="width: 40%;display: flex;flex-direction: row;justify-content: flex-start">
                <div class="orderimg">
                  <img :src="imgapi+item2.FUrl">
                </div>
                <div class="ordername">
                  <div style="height: 25px;margin-top: 25px">{{item2.FMaterialName}}</div>
                </div>
              </div>
              <div class="thitem" style="width: 10%;line-height: 80px">￥{{item2.FPrice}}</div>
              <div class="thitem" style="width: 5%;line-height: 80px">{{item2.FQty}}</div>
              <div class="thitem" style="width: 10%;line-height: 80px">￥{{item2.FAmount}}</div>
              <div class="thitem" style="width: 10%;line-height: 80px">网上支付</div>
              <div class="thitem" style="width: 10%;line-height: 80px">
                <span v-if="item2.FExectionStat==2">待发货</span>
                <span v-if="item2.FExectionStat==3">待收货</span>
                <span v-if="item2.FExectionStat==4">已完成</span>
                <span v-if="item2.FExectionStat==5">已取消</span>
              </div>
              <div class="thitem" style="width: 15%;">
                <div class="orderbrn" @click="aginbuy(item2)">再次购买</div>
              </div>
            </div>
            <div class="shenpiheji">
              <div class="hejival">
                <span>审核状态:<span v-if="pagetype==1">审核中</span><span v-if="pagetype==2">已审核</span></span>
                <span :class="item.FCurrentFlowID>=1?'shenpiname':'shenpiname2'">采购员:<span>【{{item.FFlow1Name}}】</span></span>
                <span :class="item.FCurrentFlowID>=2?'shenpiname':'shenpiname2'">---一级审核【{{item.FFlow2Name}}】</span>
                <span :class="item.FCurrentFlowID>=3?'shenpiname':'shenpiname2'">---二级审核【{{item.FFlow3Name}}】</span>
                <span :class="item.FCurrentFlowID>=4?'shenpiname':'shenpiname2'">---三级审核【{{item.FFlow4Name}}】</span>
              </div>
              <div class="shenhebtn" v-if="item.FExectionStat=='审核中'">
                <div class="passbtn" @click="passfn(item,2)">通过</div>
                <div class="cacelbtn" @click="passfn(item,3)">驳回</div>
              </div>
            </div>
          </div>
          <div class="nodata" v-if="orderlist.length==0">暂无数据</div>
          <div class="goodsfenye">
            <el-pagination
              background
              :page-size="pagenum"
              layout="prev, pager, next"
              @current-change="changepage"
              :total="allpage*pagenum">
            </el-pagination>
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
  import orderlist from '@/components/orderlist/orderlist'
  export default {
    components: {Swiper,foot,baozheng,top,topnav,order_left,orderlist},
    data() {
      return {
        pagetype:1,
        orderlist:[],
        nowpage:1,
        pagenum:5,
        allpage:1,
      }
    },
    props: {},
    methods:{
      aginbuy(item){
        console.log(item)
        let _this = this
        var data = {
          FMaterialId:item.FMaterialId,
          FUId:localStorage.getItem('FId'),
          FCustID:localStorage.getItem('FCustId'),
          FNumber:1,
        }
        this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
        this.axios.post(this.apis+'/apix/Products/Products/AddShopCart',data).then((res)=>{
          this.$message(res.data.message);
          if(res.data.statuscode==200){
            _this.$message({
              type: 'success',
              message: '操作成功!'
            });
          }else {
            _this.$message(res.data.message)
          }
        }).catch((res)=>{
        })
      },
      changepage(index){
        this.nowpage = index
        this.getdata()
      }, // 分页
      passfn(item,type){
        let _this = this
        console.log(item)
        var data = {
            FBillNo:item.FBillNo,
            FRemark:'',
            FCurrentFlowID:item.FCurrentFlow,
            OPType:type,
            FUserID:localStorage.getItem('FId'),
        }
        this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
        this.axios.post(this.apis+'/apix/Flow/Flow/ExecFlow',data).then((res)=>{
          if(res.data.statuscode==200){
            _this.$message({
              type: 'success',
              message: '操作成功!'
            });
            _this.getdata()
          }else {
            _this.$message(res.data.message);
          }
        }).catch((res)=>{
        })
      },
      checktype(id){
        this.pagetype = id
        this.nowpage = 1
        this.getdata()
      },
      todetail(id){
        this.$router.push({path:'/order_detail',query:{id:id}})
      },
      getdata(){
        let _this = this
        _this.orderlist  = []
        var url = this.apis+'/apix/Flow/Flow/FlowAuthList'
        if(this.pagetype ==2){
          url = this.apis+'/apix/Flow/Flow/FlowAuthedList'
        }
        var data = {
            FUserID:localStorage.getItem('FId'),
            FPageIndex:this.nowpage,
            FPageSize:this.pagenum,
        }
        this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
        this.axios.post(url,data).then((res)=>{
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
        .topnavitem2{
          color: rgb(190,0,0);
        }
        .topnavitem:hover,.topnavitem2:hover{
          color: red;
          text-decoration: underline;
          cursor: pointer;
        }
      }
      .serbox{
        width: 100%;
        padding: 0 10%;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex-wrap: wrap;
        .seritem{
          width: 45%;
          display: flex;
          flex-direction: row;
          margin-top: 20px;
          .itemname{
            width: 100px;
            text-align: right;
            height: 40px;
            line-height: 40px;
            margin-right: 10px;
          }
          .itemval{
            width: 100px;
            flex: 1;
          }
        }
        .serbtn{
          width: 45%;
          .serchbtn{
            width: 100px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            background-color: rgb(190,0,0);
            color: white;
            margin-top: 20px;
            border-radius: 3px;
            margin-left: 110px;
          }
          .serchbtn:hover{
            background-color: rgb(150,0,0);
            cursor: pointer;
          }
        }
      }
      .undernavbox{
        width: 100%;
        margin-top: 20px;
        .listcont{
          width: 100%;
          .tabletop{
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding: 10px;
            box-sizing: border-box;
            background-color: rgb(249,249,249);
            cursor: pointer;
          }
          .tabletop:hover{
            background-color: rgb(239,239,239);
          }
          .listitem{
            width: 100%;
            margin-top: 15px;
            border: 1px solid #eee;
            .listitem_top{
              width: 100%;
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              padding: 10px 15px;
              box-sizing: border-box;
              border-bottom: 1px solid #eee;
              background-color: rgb(249,249,249);
              .orderdetaibtn{
                color: red;
                text-decoration: underline;
                cursor: pointer;
              }
            }
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
                .orderbrn{
                  line-height: 80px;
                }
                .orderbrn:hover{
                  color: red;
                  text-decoration: underline;
                }
              }
            }
            .shenpiheji{
              width: 100%;
              box-sizing: border-box;
              display: flex;
              flex-direction: row;
              height: 90px;
              padding: 0 10px;
              justify-content: flex-start;
              background-color: rgb(245,245,245);
              .hejival{
                margin-top: 35px;
                width: 200px;
                flex: 1;
                .shenpiname{
                  color: black;
                }
                .shenpiname2{
                  color: rgb(150,150,150);
                }
              }
              .shenhebtn{
                width: 120px;
                .cacelbtn,.passbtn{
                  width: 120px;
                  height: 30px;
                  line-height: 30px;
                  background-color: rgb(0,191,255);
                  color: white;
                  text-align: center;
                  line-height: 30px;
                  margin: 10px 0;
                  cursor: pointer;
                }
                .passbtn:hover{
                  background-color: rgb(0,151,255);
                }
                .cacelbtn{
                  background-color: rgb(195,0,0);
                }
                .cacelbtn:hover{
                  background-color: rgb(150,0,0);
                }
              }
            }
          }
          .nodata{
            width: 100%;
            border: 1px solid #eee;
            padding: 30px 10px;
            box-sizing: border-box;
            text-align: center;
          }
          .goodsfenye{
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: center;
            margin-top: 30px;
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
