<template>
  <div class="container">
    <top></top>
    <topnav></topnav>
    <div class="ordercont">
      <div class="topnavbox">
        <div class="topnavitem">我的订单</div>
      </div>
      <div class="serbox" @keydown="keyserch($event)">
        <div class="seritem">
          <div class="itemname">商品名称:</div>
          <div class="itemval">
            <el-input v-model="ordername" placeholder="请输入商品名称"></el-input>
          </div>
        </div>
        <div class="seritem">
          <div class="itemname">订单编号:</div>
          <div class="itemval">
            <el-input v-model="ordernum" placeholder="请输入订单编号"></el-input>
          </div>
        </div>
        <div class="seritem">
          <div class="itemname">下单时间:</div>
          <div class="itemval">
            <el-date-picker
              v-model="timeval"
              type="daterange"
              @change="changetime"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </div>
        <div class="seritem">
          <div class="itemname">收货人:</div>
          <div class="itemval">
            <el-input v-model="user" placeholder="请输入收货人"></el-input>
          </div>
        </div>
        <div class="seritem">
          <div class="itemname">订单金额:</div>
          <div class="itemval">
            <el-input v-model="startmoney" placeholder="请输入金额" style="width: 135px"></el-input>
            <span style="display: inline-block;width: 20px;text-align: center">到</span>
            <el-input v-model="endmoney" placeholder="请输入金额" style="width: 135px"></el-input>
          </div>
        </div>
        <div class="seritem">
          <div class="itemname"></div>
          <div class="itemval serchbox">
            <div class="serchbtn" @click="serchfn">搜索</div>
          </div>
        </div>
      </div>
      <div class="undernavbox">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="全部" name="first"></el-tab-pane>
          <el-tab-pane label="待发货" name="second"></el-tab-pane>
          <el-tab-pane label="待收货" name="third"></el-tab-pane>
          <el-tab-pane label="已完成订单" name="fourth"></el-tab-pane>
          <el-tab-pane label="已取消" name="five"></el-tab-pane>
        </el-tabs>
        <div class="listcont">
          <div class="tabletop">
            <div class="thitem" style="width: 5%"><el-checkbox v-model="checkall" @change="checkallfn"></el-checkbox></div>
            <div class="thitem" style="width: 40%">商品名称</div>
            <div class="thitem" style="width: 10%">单价(元)</div>
            <div class="thitem" style="width: 5%">数量</div>
            <div class="thitem" style="width: 10%">金额(元)</div>
            <div class="thitem" style="width: 10%">审核状态</div>
            <div class="thitem" style="width: 10%">订单状态</div>
            <div class="thitem" style="width: 15%">交易操作</div>
          </div>
          <div class="listitem" v-for="item in noworder">
            <div class="listitem_top">
              <el-checkbox v-model="item.active" @change="checkone(item)"></el-checkbox>
              <div>订单编号:<span style="color: red">{{item.FBillNo}}</span></div>
              <div>订单时间:<span>{{item.FBillTime}}</span></div>
              <div class="orderdetaibtn" @click="todetail(item.FBillNo)">订单详情</div>
            </div>
            <div class="ordertr" v-for="item2 in item.Detailses">
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
              <div class="thitem" style="width: 10%;line-height: 80px">{{item.FStatus}}</div>
              <div class="thitem" style="width: 10%;line-height: 80px">
                <span v-if="item.FExectionStat==2">待发货</span>
                <span v-if="item.FExectionStat==3">待收货</span>
                <span v-if="item.FExectionStat==4">已完成</span>
                <span v-if="item.FExectionStat==5">已取消</span>
                <span v-if="item.FExectionStat==6">部分退货</span>
                <span v-if="item.FExectionStat==7">全部退货</span>
              </div>
              <div class="thitem orderbtnbox" style="width: 15%;">
                <div class="orderbrn" @click="aginbuy(item2)">再次购买</div>
                <div class="orderbrn" v-if="item.FExectionStat==3" @click="confimorder(item.FBillNo)">确认收货</div>
                <div class="orderbrn" v-if="item.FExectionStat==2" @click="cancelfn(item2.FBillNo)">取消订单</div>
                <div class="orderbrn" v-if="item.bReturn==1" @click="returfn(item2.FEntryID)">申请退货</div>
              </div>
            </div>
          </div>
          <div class="nodata" v-if="noworder.length==0">暂无数据</div>
          <div class="goodsfenye">
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
        <el-button class="daochubtn" size="small" type="primary" plain @click="daochu">导出选中订单</el-button>
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
        checkall:false,
        radio:1,
        jiesuanbz:'',
        activeName:'first',
        ordernum:'',
        ordername:'',
        timeval:'',
        startmoney:'',
        endmoney:'',
        user:'',
        noworder:[],
        nowpage:1,
        pagenum:5,
        allpage:1,
      }
    },
    props: {},
    methods:{
      keyserch(e){
        if(e.keyCode==13){
          this.serchfn()
        }
      },
      changetime(){},
      checkallfn(){
          for(let i= 0;i<this.noworder.length;i++){
            this.noworder[i].active = this.checkall
          }
      },
      checkone(item){
        if(item.active) {
          var checkall = true
          for(let i= 0;i<this.noworder.length;i++){
            if(!this.noworder[i].active){
              checkall = false
            }
          }
          console.log(this.noworder)
          if(checkall){
            this.checkall = true
          }else {
            this.checkall = false
          }
        }else {
          this.checkall = false
        }
      },
      daochu(){
        let _this = this
        var arr = []
        for(let i = 0;i<this.noworder.length;i++){
          if(this.noworder[i].active){
            arr.push(this.noworder[i].FBillNo)
          }
        }
        var fbtype = '全部'
        if(this.activeName == 'second'){
          fbtype = '待发货'
        }else if(this.activeName == 'third'){
          fbtype = '待收货'
        }else if(this.activeName == 'fourth'){
          fbtype = '已完成订单'
        }else if(this.activeName == 'five'){
          fbtype = '已取消'
        }
        window.location.href = this.apis+'/apix/Export/Export/ExportOrdersToExcel?FBillNo='+JSON.stringify(arr)+'&fBillType='+fbtype
      },
      confimorder(item){
        console.log(item)
        let _this = this
        var data = {
          FUId:localStorage.getItem('FId'),
          FBillNo:item,
        }
        this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
        this.axios.post(this.apis+'/apix/Order/Order/ConfirmOrder',data).then((res)=>{
          if(res.data.statuscode==200){
            _this.$message({
              message: '收货成功',
              type: 'success'
            });
            _this.getdata()
          }else {
            _this.$message(res.data.message)
          }
        }).catch((res)=>{
        })
      },
      returfn(id){
        this.$router.push({path:'/sqtuihuo',query:{id:id}})
      },
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
            _this.$router.push({path:'/card'})
          }
        }).catch((res)=>{
        })
      },
      changepage(index){
        this.nowpage = index
        this.getdata()
      }, // 分页
      cancelfn(id){
        let _this = this
        var data = {
          FBillNo:id,
          FCloseID:localStorage.getItem('FId'),
        }
        this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
        this.axios.post(this.apis+'/apix/Order/Order/CloseOrder',data).then((res)=>{
          if(res.data.statuscode==200){
            _this.$message({
              type: 'success',
              message: '取消成功!'
            });
            _this.getdata()
          }else {
            _this.$message(res.data.message)
          }
        }).catch((res)=>{
        })
      },
      serchfn(){
        let _this = this
        this.nowpage = 1
        this.activeName = 'first'
        var start2 = ''
        var end2 = ''
        if(this.timeval){
          start2 = new Date(this.timeval[0].valueOf()+1000*3600*24).toISOString().split('T')[0]
          end2 = new Date(this.timeval[1].valueOf()+1000*3600*24).toISOString().split('T')[0]
        }
        var data = {
          FUId:localStorage.getItem('FId'),
          FName:this.ordername,
          FBillNo:this.ordernum,
          FSDate:this.timeval!=''?start2:'',
          FEDate:this.timeval!=''?end2:'',
          FReceiveName:this.user,
          FSAmount:this.startmoney,
          FEAmount:this.endmoney,
          FPageIndex:this.nowpage,
          FPageSize:this.pagenum,
        }
        this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
        this.axios.post(this.apis+'/apix/Order/Order/SearchOrders',data).then((res)=>{
          if(res.data.statuscode==200){
            if(res.data.data.length>0){
              for(let i = 0;i<res.data.data;i++){
                res.data.data[i]['active'] = false
              }
            }
            _this.noworder = res.data.data
            _this.allpage = parseInt(res.data.message)
          }
        }).catch((res)=>{
        })
      },
      handleClick(e){
        console.log(this.activeName)
        this.nowpage = 1
        this.getdata()
      },
      todetail(id){
        this.$router.push({path:'/order_detail',query:{id:id}})
      },
      getdata(){
        let _this = this
        var data = {
          params: {
            FUid:localStorage.getItem('FId'),
            fPageIndex:this.nowpage,
            fPageSize:this.pagenum,
          }
        }
        var url = '/apix/Order/Order/ShowOrders'
        if(this.activeName=='second'){
          url = '/apix/Order/Order/ShowND'
        }else if(this.activeName=='third'){
          url = '/apix/Order/Order/DeliveriedOrder'
        }else if(this.activeName=='fourth'){
          url = '/apix/Order/Order/CompletedOrder'
        }else if(this.activeName=='five'){
          url = '/apix/Order/Order/CanceledOrder'
        }
        this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
        this.axios.get(this.apis+url,data).then((res)=>{
          if(res.data.statuscode==200){
            console.log(res)
            if(res.data.data.length>0){
              for(let i = 0;i<res.data.data;i++){
                res.data.data[i]['active'] = false
              }
            }
            _this.noworder = res.data.data
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
      .serbox{
        width: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        flex-wrap: wrap;
        .seritem{
          width: 380px;
          display: flex;
          flex-direction: row;
          margin-top: 20px;
          .itemname{
            width: 70px;
            text-align: right;
            height: 40px;
            line-height: 40px;
            margin-right: 10px;
          }
          .itemval{
            width: 300px;
            .serchbtn{
              width: 100px;
              height: 40px;
              line-height: 40px;
              text-align: center;
              background-color: rgb(190,0,0);
              color: white;
              border-radius: 3px;
            }
            .serchbtn:hover{
              background-color: rgb(150,0,0);
              cursor: pointer;
            }
          }
        }
      }
      .undernavbox{
        width: 100%;
        margin-top: 20px;
        position: relative;
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
                .orderimg,.orderbtnbox{
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
                }
                .paybtn:hover{
                  background-color: rgb(155,0,0);
                }
              }
              .orderbtnbox{
                display: flex;
                flex-direction: column;
                justify-content: center;
                .orderbrn:hover{
                  color: red;
                  text-decoration: underline;
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
        .daochubtn{
          position: absolute;
          top: 0;
          right: 15px;
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
  .el-pager li.active:hover{
    color: white !important;
  }
  .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 300px!important;
  }
</style>
