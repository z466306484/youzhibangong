<template>
  <div class="container">
    <top></top>
    <topnav></topnav>
    <div class="ordercont">
      <div class="topnavbox">
        <div class="topnavitem" @click="tuihuofn">申请退货</div>
      </div>
      <div class="sqcont">
        <div class="sqitem" v-if="false">
          <div class="sqname" style="line-height: 40px"><span style="color: red">*</span>需要退货的金额:</div>
          <div class="sqval" style="line-height: 40px">3300元</div>
        </div>
        <div class="sqitem">
          <div class="sqname" style="line-height: 40px">退货原因:</div>
          <div class="sqval">
            <el-select v-model="tuihuoyy" placeholder="请选择" style="width: 400px">
              <el-option
                v-for="item in yuanyin"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="sqitem">
          <div class="sqname">退货数量:</div>
          <div class="sqval">
            <el-input v-model="shuliang" @input="inputnum" type="number" placeholder="请输入退货数量"></el-input>
          </div>
        </div>
        <div class="sqitem">
          <div class="sqname">退货说明:</div>
          <div class="sqval">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="请输入内容"
              v-model="textarea">
            </el-input>
          </div>
        </div>
        <div class="sqitem" style="margin-top: 20px" v-if="false">
          <div class="sqname"></div>
          <div class="sqval">
            <div class="topnavitem2">申请退货</div>
          </div>
        </div>
      </div>
      <div class="topnavbox">
        <div class="topnavitem">退货商品信息</div>
      </div>
      <div class="listcont">
        <div class="tabletop">
          <div class="thitem" style="width: 30%">商品名称</div>
          <div class="thitem" style="width: 20%">订单编号</div>
          <div class="thitem" style="width: 10%">商品金额</div>
          <!--<div class="thitem" style="width: 10%">运费</div>-->
          <div class="thitem" style="width: 10%">总计</div>
          <div class="thitem" style="width: 20%">成交时间</div>
          <div class="thitem" style="width: 20%">操作</div>
        </div>
        <div class="ordertr" v-for="item in orderobj">
          <div class="thitem" style="width: 30%;display: flex;flex-direction: row;justify-content: flex-start">
            <div class="orderimg">
              <img :src="item.FUrl">
            </div>
            <div class="ordername">
              <div style="height: 25px;margin-top: 25px">{{item.FMaterialName}}</div>
            </div>
          </div>
          <div class="thitem" style="width: 20%;line-height: 80px">{{item.FBillNo}}</div>
          <div class="thitem" style="width: 10%;line-height: 80px">{{item.FPrice}}元</div>
          <div class="thitem" style="width: 10%;line-height: 80px">{{item.FAmount}}</div>
          <div class="thitem" style="width: 20%;line-height: 80px">{{item.FBillTime}}</div>
          <div class="thitem" style="width: 20%;line-height: 80px">
            <div class="orderbrn" @click="tuihuofn(item)">申请退货</div>
          </div>
        </div>
      </div>
      <div class="sqtishibox">
        <div style="color: rgb(150,0,0)">退货说明</div>
        <div style="font-weight: bold;margin: 15px 0">1.申请退货我要怎么操作?</div>
        <div>答：在交易还未成功前，您可以再次根据您当前的实际情况申请退货。</div>
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
        input:'',
        yuanyin:[],
        tuihuoyy:'',
        textarea:'',
        orderid:'',
        orderobj:'',
        shuliang:1,
      }
    },
    props: {},
    methods:{
      inputnum(){
        if(this.shuliang>this.orderobj[0].FMaxReturnQty){
          this.$message('超过商品最大数量');
          this.shuliang = this.orderobj[0].FMaxReturnQty
        }
      },
      setreason(data){
        for(let i =0;i<data.length;i++){
          data[i]['label'] = data[i].FReturnReasonText
          data[i]['value'] = data[i].FID
        }
        this.yuanyin = data
      },
      getreason(){
        let _this = this
        var data = {}
        this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
        this.axios.post(this.apis+'/apix/Order/Order/ReturnReasonList',data).then((res)=>{
          if(res.data.statuscode==200){
            _this.setreason(res.data.data)
          }
        }).catch((res)=>{
        })
      },
      tuihuofn(item){
        let _this = this
        if(this.tuihuoyy==''){
          this.$message('请选择原因');
          return false
        }
        if(this.textarea==''){
          this.$message('请输入退货说明');
          return false
        }
        var data = {
            FEntryID:item.FBillEntryID,
            FReturnQty:this.shuliang,
            FRetrunReason:this.tuihuoyy,
            FReturnPolicy:this.textarea,
        }
        this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
        this.axios.post(this.apis+'/apix/Order/Order/NewReturnGoods',data).then((res)=>{
          if(res.data.statuscode==200){
            _this.$message({
              message: '退货成功',
              type: 'success'
            });
            _this.$router.push({path:'/order'})
          }else {
            _this.$message(res.data.message)
          }
        }).catch((res)=>{
        })
      },
      getdata(){
        let _this = this
        var data = {
          FEntryID:this.orderid,
        }
        this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
        this.axios.post(this.apis+'/apix/Order/Order/ReturnDetails',data).then((res)=>{
          if(res.data.statuscode==200){
            _this.orderobj = res.data.data
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
      this.orderid=  this.$route.query.id
      this.getdata()
      this.getreason()
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
      }
      .sqcont{
        width: 100%;
        .sqitem{
          width: 100%;
          padding: 10px 0;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          box-sizing: border-box;
          margin-top: 15px;
          .sqname{
            width: 120px;
            height: 40px;
            text-align: right;
            margin-right: 15px;
          }
          .sqval{
            min-height: 40px;
            width: 400px;
            .topnavitem2{
              width: 120px;
              height: 35px;
              text-align: center;
              line-height: 35px;
              color: white;
              background-color: rgb(190,0,0);
              cursor: pointer;
            }
            .topnavitem2:hover{
              background-color: rgb(150,0,0);
            }
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
          border-top: none;
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
              width: 100px;
              box-sizing: border-box;
              height: 80px;
              margin-left: 10px;
              overflow: hidden;
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
            }
            .orderbrn:hover{
              color: red;
              text-decoration: underline;
            }
          }
        }
        .goodsfenye{
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: center;
          margin-top: 30px;
        }
      }
      .sqtishibox{
        width: 100%;
        border: 1px solid #eee;
        background-color: rgb(245,245,245);
        margin-top: 20px;
        padding: 30px;
        box-sizing: border-box;
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
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  input[type="number"]{
    -moz-appearance: textfield;
  }
</style>
