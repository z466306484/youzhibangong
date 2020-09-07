<template>
  <div class="container">
    <top></top>
    <topnav></topnav>
    <div class="ordercont">
      <div class="topnavbox">
        <div class="topnavitem">订单详情</div>
      </div>
      <div class="orderinfo">
        <span>订单编号:<span style="color: red">{{orderobj.FBillNo}}</span></span>
        <span style="margin: 0 20px">下单日期:<span style="color: red">{{orderobj.FBillTime}}</span></span>
        <span v-if="false">
          订单状态:
          <span v-if="orderobj.FExectionStat==2">代发货</span>
          <span v-if="orderobj.FExectionStat==3">待收货</span>
          <span v-if="orderobj.FExectionStat==4">已完成</span>
          <span v-if="orderobj.FExectionStat==5">已取消</span>
        </span>
      </div>
      <div class="sqcont">
        <div class="sqconttitle">收货人信息</div>
        <div class="sqinfo" v-if="orderobj.orderaddr!=undefined">
          <div class="adrleft">
            <div class="sqitem">
              <div class="sqname" style="line-height: 40px">收货人:</div>
              <div class="sqval" style="line-height: 40px">{{orderobj.orderaddr.FRecieveName}}</div>
            </div>
            <div class="sqitem">
              <div class="sqname" style="line-height: 40px">手机号码:</div>
              <div class="sqval" style="line-height: 40px">{{orderobj.orderaddr.FMobilePhone}}</div>
            </div>
            <div class="sqitem">
              <div class="sqname" style="line-height: 40px">邮政编码:</div>
              <div class="sqval" style="line-height: 40px">{{orderobj.orderaddr.FZipCode}}</div>
            </div>
          </div>
          <div class="adrright">
            <div class="sqitem">
              <div class="sqname" style="line-height: 40px">收货地址:</div>
              <div class="sqval" style="line-height: 40px">{{orderobj.orderaddr.FAddress}}</div>
            </div>
            <div class="sqitem">
              <div class="sqname" style="line-height: 40px">固定电话:</div>
              <div class="sqval" style="line-height: 40px">{{orderobj.orderaddr.FPhone}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="sqcont" v-if="false" style="margin-bottom: 20px">
        <div class="sqconttitle">配送信息</div>
        <div class="sqinfo">
          <div class="sqitem">
            <div class="sqname" style="line-height: 40px">物流单号:</div>
            <div class="sqval" style="line-height: 40px">1846484545</div>
          </div>
          <div class="sqitem">
            <div class="sqname" style="line-height: 40px">配送方式:</div>
            <div class="sqval" style="line-height: 40px">普通快递</div>
          </div>
          <div class="sqitem">
            <div class="sqname" style="line-height: 40px">运费:</div>
            <div class="sqval" style="line-height: 40px">￥0</div>
          </div>
        </div>
      </div>
      <div class="listcont">
        <div style="padding: 20px;box-sizing: border-box;width: 100%">商品信息</div>
        <div class="tabletop">
          <div class="thitem" style="width: 40%">商品名称</div>
          <div class="thitem" style="width: 10%">价格</div>
          <div class="thitem" style="width: 10%">数量</div>
          <div class="thitem" style="width: 10%">金额小计</div>
          <div class="thitem" style="width: 20%">操作</div>
        </div>
        <div class="ordertr" v-for="item in orderobj.Products">
          <div class="thitem" style="width: 40%;display: flex;flex-direction: row;justify-content: flex-start">
            <div class="orderimg">
              <img :src="imgapi+item.FUrl">
            </div>
            <div class="ordername">
              <div style="height: 25px;margin-top: 25px">{{item.FMaterialName}}</div>
            </div>
          </div>
          <div class="thitem" style="width: 10%;line-height: 80px">{{item.FPrice}}</div>
          <div class="thitem" style="width: 10%;line-height: 80px">{{item.FQty}}</div>
          <div class="thitem" style="width: 10%;line-height: 80px">{{item.FAmount}}</div>
          <div class="thitem btnitem" style="width: 20%;line-height: 80px">
            <div class="delbtn">
              <div class="orderbrn" @click="savegoods(item.FMaterialId)">收藏</div>
              <div class="orderbrn" @click="addcard(item.FMaterialId)">加入购物车</div>
              <div class="orderbrn" v-if="item.bReturn==1" @click="returfn(item.FEntryID)">申请退货</div>
            </div>
          </div>
        </div>
        <div class="orderheji">
          <div class="hejiitem">
            <span>商品总金额:<span style="display: inline-block;width: 100px">￥{{allmonry}}</span></span>
          </div>
          <div class="hejiitem">
            <span>应付金额:<span style="color: red;font-size: 17px;font-weight: bold;display: inline-block;width: 100px">￥{{allmonry}}</span></span>
          </div>
        </div>
        <div class="liuchengbox">
          备注:
        </div>
        <div class="liuchengbox" v-if="orderobj">
          <span>审核状态:<span v-if="orderobj.Flow.FIsClose==1">审核完成</span><span v-if="orderobj.Flow.FIsClose==0">审核中</span></span>
          <span style="margin: 0 10px">采购员:【<span v-if="orderobj.Flow">{{orderobj.Flow.FFlow1Name}}</span>】</span>
          <span>---一级审核:【<span v-if="orderobj.Flow">{{orderobj.Flow.FFlow2Name}}</span>】</span>
          <span style="margin: 0 10px" >---二级审核:【<span v-if="orderobj.Flow">{{orderobj.Flow.FFlow3Name}}</span>】</span>
          <span>---三级审核:【<span v-if="orderobj.Flow">{{orderobj.Flow.FFlow4Name}}</span>】</span>
        </div>
        <!--<div class="tuihuobtn" @click="returfn">申请退货</div>-->
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
        orderid:'',
        orderobj:'',
        allmonry:0,
      }
    },
    props: {},
    methods:{
      savegoods(id){
        let _this = this
        var data = {
          FMaterialId:id,
          FUId:localStorage.getItem('FId'),
        }
        this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
        this.axios.post(this.apis+'/apix/Products/Products/AddFavourite',data).then((res)=>{
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
      addcard(id){
        let _this = this
        var data = {
          FMaterialId:id,
          FUId:localStorage.getItem('FId'),
          FCustID:localStorage.getItem('FCustId'),
          FNumber:1,
        }
        this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
        this.axios.post(this.apis+'/apix/Products/Products/AddShopCart',data).then((res)=>{
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
      returfn(id){
        this.$router.push({path:'/sqtuihuo',query:{id:id}})
      },
      setmoney(){
        for(let i = 0;i<this.orderobj.Products.length;i++){
          this.allmonry+=this.orderobj.Products[i].FQty*this.orderobj.Products[i].FPrice
        }
      },
      getdata(){
        let _this = this
        var data = {
          params: {
            FBillNo:this.orderid,
          }
        }
        this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
        this.axios.get(this.apis+'/apix/Order/Order/MyOrderDetails',data).then((res)=>{
          if(res.data.statuscode==200){
            _this.orderobj = res.data.data
            _this.setmoney()
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
      this.orderid = this.$route.query.id
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
      .orderinfo{
        width: 100%;
        margin-top: 20px;
        padding: 30px;
        box-sizing: border-box;
        background-color: rgb(250,250,235);
        border: 1px solid #eee;
      }
      .sqcont{
        width: 100%;
        margin-top: 20px;
        border-bottom: 1px solid #eee;
        padding-bottom: 20px;
        .sqconttitle{
          width: 100%;
          padding: 10px 20px;
          box-sizing: border-box;
        }
        .sqinfo{
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          padding: 10px 5%;
          box-sizing: border-box;
          flex-wrap: wrap;
          .adrleft,.adrright{
            width: 25%;
            .sqitem{
              width: 100%;
              display: flex;
              flex-direction: row;
              justify-content: center;
              box-sizing: border-box;
              margin-top: 5px;
              .sqname{
                width: 60px;
                height: 20px;
                text-align: right;
                margin-right: 15px;
              }
              .sqval{
                flex: 1;
                min-height: 20px;
                width: 300px;
              }
            }
          }
          .adrright{
            width: 70%;
          }
        }
      }
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
          border: 1px solid #eee;
          border-bottom: none;
        }
        .tabletop:hover{
          background-color: rgb(239,239,239);
        }
        .ordertr{
          width: 100%;
          padding: 10px;
          box-sizing: border-box;
          border: 1px solid #eee;
          cursor: pointer;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          .thitem,.btnitem{
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
            .delbtn{
              display: flex;
              flex-direction: column;
              justify-content: center;
              .orderbrn{
                height: 20px;
                line-height: 20px;
              }
              .orderbrn:hover{
                color: red;
                text-decoration: underline;
              }
            }
          }
          .btnitem{
            height: 100px;
            padding: 10px 0;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: center;
            .savebtn,.addcardbtn{
              height: 20px;
              line-height: 20px;
            }
            .savebtn:hover,.addcardbtn:hover{
              color: red;
              text-decoration: underline;
              cursor: pointer;
            }
          }
        }
        .orderheji{
          width: 100%;
          border: 1px solid #eee;
          text-align: right;
          padding: 20px 30px;
          box-sizing: border-box;
          border-top: none;
          .hejiitem{
            margin-top: 10px;
          }
        }
        .liuchengbox{
          background-color: rgb(249,249,249);
          border: 1px solid #eee;
          padding: 25px 15px;
          box-sizing: border-box;
          width: 100%;
        }
        .tuihuobtn{
          width: 160px;
          height: 40px;
          text-align: center;
          line-height: 40px;
          background-color: rgb(190,0,0);
          color: white;
          margin-top: 20px;
          cursor: pointer;
        }
        .tuihuobtn:hover{
          background-color: rgb(150,0,0);
        }
      }
    }
  }
</style>
