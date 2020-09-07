<template>
  <div class="container">
    <top @tocardfn="tocardfn"></top>
    <topnav></topnav>
    <div class="goodsdetail">
      <div class="detailadress">
        <span>您现在的位置：</span>
        <span class="tocartop" style="cursor: pointer" @click="$router.push({path:'/home'})">首页</span> >
        <span class="tocartop" @click="nowstep = 1" style="cursor: pointer">我的购物车</span>
      </div>
      <div class="stepbox">
        <div :class="nowstep==1?'stepitem':'stepitem2'">
          <div class="sanjiaoicon1 iconfont icon-triangle-right"></div>
          <div class="stepval">STEP 1.查看购物车</div>
          <div class="sanjiaoicon iconfont icon-triangle-right"></div>
        </div>
        <div :class="nowstep==2?'stepitem':'stepitem2'">
          <div class="sanjiaoicon1 iconfont icon-triangle-right"></div>
          <div class="stepval">STEP 2.确认收货地址</div>
          <div class="sanjiaoicon iconfont icon-triangle-right"></div>
        </div>
        <div :class="nowstep==3?'stepitem':'stepitem2'">
          <div class="sanjiaoicon1 iconfont icon-triangle-right"></div>
          <div class="stepval">STEP 3.成功提交订单</div>
          <div class="sanjiaoicon iconfont icon-triangle-right"></div>
        </div>
      </div>
      <div v-if="nowstep==1" class="cardcont">
        <table class="table table-hover" style="margin-top: 20px;border: 1px solid #ddd;font-size: 12px;width: 100%">
          <thead class="graythead">
          <tr class='grayTr'>
            <td style="padding: 15px 0;text-indent: 9px" width="5%"></td>
            <td style="padding: 15px 0;text-indent: 9px" width="35%">商品名称</td>
            <td style="padding: 15px 0;text-indent: 9px" width="10%">单价</td>
            <td style="padding: 15px 0;text-indent: 9px" width="20%">数量</td>
            <!--<td style="padding: 15px 0;text-indent: 9px" width="10%">重量</td>-->
            <td style="padding: 15px 0;text-indent: 9px" width="10%">商品合计</td>
            <td style="padding: 15px 0;text-indent: 9px" width="20%">操作</td>
          </tr>
          </thead>
          <tbody >
          <tr v-for="(item,index) in cardlist" class="table_td">
            <td class="sortEdit" >
              <el-checkbox v-model="item.check" @change="checkfn(item)"></el-checkbox>
            </td>
            <td class="sortEditimg" >
              <div class="sortimg">
                <img :src="imgapi+item.FUrl" height="40px">
              </div>
              <div class="goodsname">{{item.FName}}</div>
            </td>
            <td class="sortEdit" >
              <div style="height: 20px;line-height: 20px;color: red">￥{{item.FPrice}}</div>
            </td>
            <td class="sortEdit" >
              <div class="numjisuan">
                <div class="numbtn" @click="jianfn(item)">-</div>
                <div class="numinput">
                  <input type="number" v-model="item.FNumber" @input="inputnum(item)" @blur="blurinput(item)" />
                </div>
                <div class="numbtn" @click="jiafn(item)">+</div>
              </div>
            </td>
            <td class="sortEdit" style="color: red">￥{{(item.FNumber*item.FPrice).toFixed(2)}}</td>
            <td class="sortEdit">
              <span class="btnbox" @click="delcard(item.FID)">删除</span>
            </td>
          </tr>
          </tbody>
        </table>
        <div class="hejibox">
          <div class="hejileft">
          </div>
          <div class="hejiright">
            <span>商品金额:</span>
            <span style="color: red">{{allmoneynum}}</span>
            <span>元</span>
          </div>
        </div>
        <div class="cardcaozuo">
          <div class="checkall">
            <el-checkbox v-model="checkall" @change="checkallfn()">全选</el-checkbox>
            <span class="alldel" @click="delcard(-1)">批量删除</span>
            <span class="clearcard" @click="delcard(-2)">清空购物车</span>
          </div>
          <div class="checkgoodsprice">
            <span>商品总价:<span style="color: red;font-size: 20px;font-weight: bold">{{allmoneynum}}</span>元</span>
          </div>
          <div class="nextbox">
            <div class="jixubtn" @click="jixubtn">继续购物</div>
            <div class="nextbtn" @click="checkgoods">下一步</div>
          </div>
        </div>
        <div class="tjgoods">
          <div class="tjgoodstitle">推荐商品</div>
          <div class="tjcont">
            <div class="tjitem" v-for="(item,index) in tuijianarr" @click="todetai(item.FMaterialId)" :key="index"  v-if="index<=5">
              <img :src="imgapi+item.FUrl">
              <div class="tjitem_name">{{item.FName}}</div>
              <div class="tjitem_price">{{item.FPrice}}</div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="nowstep==2" class="cardcont2">
        <table class="table table-hover" style="margin-top: 20px;border: 1px solid #ddd;font-size: 12px;width: 100%">
          <thead class="graythead">
          <tr class='grayTr'>
            <td style="padding: 15px 0;text-indent: 9px" width="5%"></td>
            <td style="padding: 15px 0;text-indent: 9px" width="5%">收货人</td>
            <td style="padding: 15px 0;text-indent: 9px" width="35%">所在地区</td>
            <td style="padding: 15px 0;text-indent: 9px" width="20%">详细地址</td>
            <td style="padding: 15px 0;text-indent: 9px" width="5%">邮编</td>
            <td style="padding: 15px 0;text-indent: 9px" width="10%">手机</td>
            <td style="padding: 15px 0;text-indent: 9px" width="10%">固定电话</td>
            <td style="padding: 15px 0;text-indent: 9px" width="15%">操作</td>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in adresslist" class="table_td">
            <td class="sortEdit" >
              <el-radio v-model="itemradio" :label="item.FId"></el-radio>
            </td>
            <td class="sortEdit" >{{item.FRecieveName}}</td>
            <td class="sortEdit" >{{item.FPName}},{{item.FCName}},{{item.FDName}}</td>
            <td class="sortEdit" >{{item.FAddress}}</td>
            <td class="sortEdit" >{{item.FZipCode}}</td>
            <td class="sortEdit" >{{item.FMobilePhone}}</td>
            <td class="sortEdit" >{{item.FPhone}}</td>
            <td class="sortEdit caozuo">
              <div class="caozuobtn" @click="deladress(item.FId)">删除</div>
              <div class="caozuobtn" @click="setmoren(item.FId)">设置为默认</div>
            </td>
          </tr>
          </tbody>
        </table>
        <div class="jiesuanbox">
          <div class="jiesuantitle">结算信息</div>
          <div class="jiesuancont">
            <div class="jiesuanleft">
              <div class="jiesuanmoney"><span>商品金额:</span><span>￥{{allmoneynum}}元</span></div>
              <div class="jiesuanbz">
                <el-input
                  type="textarea"
                  :rows="3"
                  placeholder="请输入结算备注"
                  v-model="jiesuanbz">
                </el-input>
              </div>
            </div>
            <div class="jiesuanright">
              <div class="yfjine"><span>应付金额:</span><span style="color: red">{{allmoneynum}}元</span></div>
              <div class="subbtn" @click="suborderfn">提交订单</div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="nowstep==3" class="cardcont3">
        <div class="ordertishi">您的订单已提交成功，我们将尽快为您发货，请关注收货信息。</div>
        <div class="jiesuanbox">
          <div class="jiesuantitle">订单信息</div>
          <div class="infocont">
            <div class="infoleft">
              <div class="infoitem">
                <span>订单编号:</span>
                <span>{{FBillNo}}</span>
                <span class="lookorder" @click="toorderdetail">[查看订单]</span>
              </div>
              <div class="infoitem">
                <span>配送方式:</span>
                <span></span>
              </div>
            </div>
            <div class="inforight">
              <div class="infoitem">
                <span>应付金额:</span>
                <span>￥{{allmoneynum}}元</span>
              </div>
              <div class="infoitem">
                <span>支付方式:</span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
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
  export default {
    components: {Swiper,foot,baozheng,top,topnav},
    data() {
      return {
        goodsnum:1,
        checkall:false,
        tuijianarr:[],
        nowstep:1,
        cardlist:[],
        jiesuanbz:'',
        allmoneynum:0,
        itemradio:-1,
        adresslist:[],
        canbuy:true,
        FBillNo:'',
      }
    },
    props: {},
    methods:{
      tocardfn(){
        this.nowstep = 1
      },
      todetai(id){
        this.$router.push({path:'/goods_detail',query:{id:id}})
      },
      toorderdetail(){
        this.$router.push({path:'/order_detail',query:{id:this.FBillNo}})
      },
      allmoney(){
        this.allmoneynum = 0
        for(let i= 0;i<this.cardlist.length;i++){
          if(this.cardlist[i].check==true){
            var num = this.cardlist[i].FNumber*this.cardlist[i].FPrice
            this.allmoneynum+=num
          }
        }
        this.allmoneynum.toFixed(2)
      },
      checkfn(item){
        if(item.check) {
          var checkall = true
          for(let i= 0;i<this.cardlist.length;i++){
            if(this.cardlist[i].check==false){
              checkall = false
            }
          }
          if(checkall==true){
            this.checkall = true
          }else {
            this.checkall = false
          }
        }else {
          this.checkall = false
        }
        this.allmoney()
      },
      checkallfn(){
        if(!this.checkall){
          for(let i= 0;i<this.cardlist.length;i++){
            this.cardlist[i].check = false
          }
        }else {
          for(let i= 0;i<this.cardlist.length;i++){
            this.cardlist[i].check = true
          }
        }
        this.allmoney()
      },
      inputnum(item){
        console.log(item.FNumber)
        if(item.FNumber==''){
        }else {
          this.allmoney()
        }
      },
      blurinput(item){
        if(item.FNumber==''){
          item.FNumber = 1
        }
        this.allmoney()
      },
      jianfn(item){
        if(item.FNumber==''){
          item.FNumber = 1
        }else {
          if(item.FNumber<2){
            item.FNumber = 1
          }else {
            item.FNumber -=1
          }
        }
        this.allmoney()
      },//商品数量加
      jiafn(item){
        if(item.FNumber==''){
          item.FNumber = 1
        }else {
          item.FNumber+=1
        }
        this.allmoney()
      },//商品数量减
      setmoren(id){
        let _this = this
        var data = {
          Fid:id,
          FUid:localStorage.getItem('FId'),
        }
        this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
        _this.axios.post(this.apis+'/apix/User/User/SetDefaultAddr',data).then((res)=>{
          if(res.data.statuscode==200){
            _this.$message({
              type: 'success',
              message: res.data.message
            });
          }else {
            _this.$message(res.data.message);
          }
        })
      },
      deladress(id){
        let _this = this
        this.$confirm('此操作将永久删除该地址, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var data = {
            Fid:id,
            FUId:localStorage.getItem('FId'),
          }
          _this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
          _this.axios.post(_this.apis+'/apix/User/User/DelUserAddr',data).then((res)=>{
            if(res.data.statuscode==200){
              _this.$message({
                type: 'success',
                message: res.data.message
              });
              _this.getdata()
            }else {
              _this.$message(res.data.message);
            }
          })
        }).catch(() => {
        });
      },
      delcard(id){
        let _this = this
        var fidarr = []
        if(id!=-1&&id!=-2){
          fidarr.push(id)
        }else if(id==-1){
          for(let i= 0;i<this.cardlist.length;i++){
            if(this.cardlist[i].check==true){
              fidarr.push(this.cardlist[i].FID)
            }
          }
        }else if(id==-2){
          for(let i= 0;i<this.cardlist.length;i++){
            fidarr.push(this.cardlist[i].FID)
          }
        }
        this.$confirm('此操作将永久删除选中的商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var data = {
            FID:fidarr,
            FUId:localStorage.getItem('FId'),
          }
          _this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
          _this.axios.post(_this.apis+'/apix/Products/Products/CartDel',data).then((res)=>{
            if(res.data.statuscode==200){
              _this.$message({
                message: res.data.message,
                type: 'success'
              });
              _this.allmoneynum = 0
              _this.getdata()
            }else {
              _this.$message(res.data.message)
            }
          }).catch((res)=>{
          })
        }).catch(() => {
        });
      },
      checkgoods(){
        let _this  =this
        var arr = []
        for(let i= 0;i<this.cardlist.length;i++){
          if(this.cardlist[i].check==true){
            var obj = {
              FMaterialId:this.cardlist[i].FMaterialId,
              FPrice: this.cardlist[i].FPrice,
              FIsMarketable: this.cardlist[i].FIsMarketable,
            }
            arr.push(obj)
          }
        }
        if(arr.length==0){
          _this.$message('请选择商品');
          return false
        }
        var data = {
            FCustId:localStorage.getItem('FCustId'),
            CartLists:arr,
        }
        this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
        this.axios.post(this.apis+'/apix/Products/Products/ShopCartCheck',data).then((res)=>{
          if(res.data.statuscode==200){
            var num = parseInt(res.data.data)
            if(num==0){
              _this.nowstep = 2
            }else {
              _this.$message('商品有变动');
            }
          }else {
            _this.$message(res.data.message);
          }
        }).catch((res)=>{
        })
      },
      suborderfn(){
        let _this = this
        var enterarr  =[]
        if(this.itemradio==-1){
          _this.$message('请选择收货地址');
          return false
        }
        for(let i= 0;i<this.cardlist.length;i++){
          if(this.cardlist[i].check==true){
            var ojb = {
              FMaterialID:this.cardlist[i].FMaterialId,
              FMaterialNumber: this.cardlist[i].FMaterialNumber,
              FMaterialName:this.cardlist[i].FName,
              FMaterialModel: this.cardlist[i].FSpecification,
              FUnitID: this.cardlist[i].FUnitId,
              FDeliveryDate: new Date(),
              FQty:this.cardlist[i].FNumber,
              FPrice: this.cardlist[i].FPrice,
              FAmount: this.cardlist[i].FNumber*this.cardlist[i].FPrice,
            }
            enterarr.push(ojb)
          }
        }
        var data = {
            FBillNo: '1',
            FBillTypeID:localStorage.getItem('FBillTypeID'),
            FDate: new Date(),
            FSaleOrgID: localStorage.getItem('FSaleOrgID'),
            FCustID: localStorage.getItem('FCustId'),
            FSalerID: localStorage.getItem('FSeller'),
            FSettleCurrID:localStorage.getItem('FSettleCurrID'),
            FAddressID: this.itemradio,
            FUserID:  localStorage.getItem('FId'),
            FIsCart:  1,
            Entries: enterarr
        }
        this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
        this.axios.post(this.apis+'/apix/Order/Order/NewSaleOrder',data).then((res)=>{
          if(res.data.statuscode==200){
            _this.FBillNo = res.data.data[0].FBillNo
            _this.nowstep = 3
            _this.getdata()
            _this.$message({
              message:res.data.message,
              type: 'success'
            });
          }else {
            _this.$message(res.data.message);
          }
        }).catch((res)=>{
        })

      },
      jixubtn(){
        this.$router.push({path:'/home'})
      },
      setcard(data){
        for(let i = 0;i<data.length;i++){
          data[i]['check'] = false
        }
        console.log(data,'data')
        this.cardlist = data
      },
      getdata(){
        let _this = this
        var data = {
          params: {
            FUId:localStorage.getItem('FId'),
            FCustID:localStorage.getItem('FCustId'),
          }
        }
        this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
        this.axios.get(this.apis+'/apix/Products/Products/ShowCartProducts',data).then((res)=>{
          if(res.data.statuscode==200){
            _this.setcard(res.data.data)
          }
        }).catch((res)=>{
        })
      },
      gettuijian(){
        let _this = this
        var data = {
          params: {
            fCustId:localStorage.getItem('FCustId'),
            fNumber:'6',
          }
        }
        var url = this.apis+'/apix/Products/Products/RecommandProduct'
        this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
        this.axios.get(url,data).then((res)=>{
          if(res.data.statuscode==200){
            _this.tuijianarr = res.data.data
          }else {
          }
        }).catch((res)=>{
        })
      },
      getadress(){
        let _this = this
        var data = {
          params: {
            FUid:localStorage.getItem('FId'),
          }
        }
        this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
        this.axios.get(this.apis+'/apix/User/User/UserAddr',data).then((res)=>{
          if(res.data.statuscode==200){
            _this.adresslist = res.data.data
            for(let i = 0;i<_this.adresslist.length;i++){
              if(_this.adresslist[i].FIsDefault==true){
                _this.itemradio = _this.adresslist[i].FId
              }
            }
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
      this.gettuijian()
      this.getadress()
    },
  }
</script>

<style scoped lang="less">
  .container{
    width: 100%;
    .goodsdetail{
      width: 80%;
      margin-left: 10%;
      .detailadress{
        width: 100%;
        padding: 10px 0;
        box-sizing: border-box;
        .tocartop:hover{
          color: red;
          text-decoration: underline;
        }
      }
      .stepbox{
        width: 80%;
        margin-left: 10%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        .stepitem,.stepitem2{
          position: relative;
          display: flex;
          margin-right: 17px;
          .stepval{
            width: 270px;
            height: 30px;
            line-height: 30px;
            background-color: rgb(196,0,0);
            color: white;
            text-align: center;
          }
          .sanjiaoicon,.sanjiaoicon1{
            position: absolute;
            width: 30px;
            height: 30px;
            text-align: left;
            color: rgb(196,0,0);
            font-size: 32px;
            right: -21px;
            top: -2px;
          }
          .sanjiaoicon1{
            color: #fff;
            left: -10px;
          }
        }
        .stepitem2{
          background-color: rgb(231,231,231);
          .stepval{
            width: 270px;
            height: 30px;
            line-height: 30px;
            background-color: rgb(231,231,231);
            color: white;
            text-align: center;
            color: rgb(100,100,100);
          }
          .sanjiaoicon,.sanjiaoicon1{
            position: absolute;
            width: 30px;
            height: 30px;
            text-align: left;
            color: rgb(231,231,231);;
            font-size: 32px;
            right: -21px;
            top: -2px;
          }
          .sanjiaoicon1{
            color: #fff;
            left: -10px;
          }
        }
      }
      .cardcont{
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
            .sortEditimg{
              display: flex;
              .sortimg{
                height: 40px;
                font-size: 0px;
                margin-right: 10px;
                img{
                  height: 100%;
                }
              }
              .goodsname{
                height: 40px;
                line-height: 40px;
              }
            }
            .sortEdit{
              .numjisuan{
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                .numbtn{
                  width: 30px;
                  height: 30px;
                  border: 1px solid #eee;
                  text-align: center;
                  line-height: 30px;
                  font-size: 20px;
                  cursor: pointer;
                }
                .numinput{
                  width: 100px;
                  height: 30px;
                  border-top: 1px solid #eee;
                  border-bottom: 1px solid #eee;
                  input{
                    width: 95%;
                    height: 28px;
                    border: none;
                    outline: none;
                    text-align: center;
                  }
                  input::-webkit-outer-spin-button,
                  input::-webkit-inner-spin-button{
                    -webkit-appearance: none !important;
                    margin: 0;
                  }
                }
              }
              .btnbox:hover{
                text-decoration: underline;
                color: red;
                cursor: pointer;
              }
            }
          }
          .table_td:hover{
            background-color: #f2f2f2;
          }
        }
        .hejibox{
          width: 100%;
          padding: 10px 0;
          box-sizing: border-box;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }
        .cardcaozuo{
          width: 100%;
          padding: 15px;
          box-sizing: border-box;
          display: flex;
          border: 1px solid #eee;
          flex-direction: row;
          justify-content: space-between;
          line-height: 40px;
          .checkall{
            .alldel:hover,.clearcard:hover{
              color: red;
              text-decoration: underline;
              cursor: pointer;
            }
          }
          .nextbox{
            display: flex;
            flex-direction: row;
            .jixubtn,.nextbtn{
              height: 40px;
              width: 120px;
              margin-left: 10px;
              text-align: center;
              background-color: rgb(190,0,0);
              color: white;
              cursor: pointer;
            }
            .jixubtn:hover,.nextbtn:hover{
              background-color: rgb(150,0,0);
            }
          }
        }
        .tjgoods{
          width: 100%;
          margin-top: 20px;
          border: 1px solid #eee;
          .tjgoodstitle{
            width: 100%;
            padding: 10px;
            box-sizing: border-box;
            background-color: rgb(248,248,248);
            color: rgb(196,0,0);
          }
          .tjcont{
            width: 100%;
            border-top: 1px solid #eee;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            .tjitem{
              width: 100/6%;
              font-size: 0px;
              text-align: center;
              padding:15px;
              box-sizing: border-box;
              border: 1px solid rgb(244,244,244);
              text-align: center;
              img{
                height: 40px;
              }
              .tjitem_name{
                width: 100%;
                height: 20px;
                line-height: 20px;
                font-size: 0.9rem;
                text-align: left;
                color: rgb(100,100,100);
                margin-top: 15px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              .tjitem_price{
                font-size: 18px;
                color: red;
                height: 20px;
                line-height: 20px;
                text-align: left;
              }
            }
            .tjitem:hover{
              border: 1px solid red;
              cursor: pointer;
            }
          }
        }
      }
      .cardcont2{
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
              box-sizing: border-box;
            }
            .sortEdit{
              line-height: 20px;
              height: 60px;
              padding-top: 7px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .caozuo{
              height: 60px;
              padding-top: 7px;
              .caozuobtn{
                height: 15px;
                line-height: 15px;
                color: rgb(0,150,255);
              }
              .caozuobtn:hover{
                cursor: pointer;
                color: red;
                text-decoration: underline;
              }
            }
          }
          .table_td:hover{
            background-color: #f2f2f2;
          }
        }
        .jiesuanbox{
          width: 100%;
          margin-top: 20px;
          border: 1px solid #eee;
          .jiesuantitle{
            width: 100%;
            padding: 10px;
            box-sizing: border-box;
            background-color: rgb(248,248,248);
          }
          .jiesuancont{
            padding: 15px;
            box-sizing: border-box;
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            .jiesuanleft{
              width: 40%;
              .jiesuanbz{
                width: 100%;
                margin-top: 20px;
              }
            }
            .jiesuanright{
              width: 150px;
              display: flex;
              flex-direction: column;
              justify-content: flex-end;
              .subbtn{
                width: 100%;
                height: 40px;
                text-align: center;
                line-height: 40px;
                background-color: rgb(190,0,0);
                cursor: pointer;
                color: white;
                border-radius: 5px;
                margin-top: 20px;
              }
              .subbtn:hover{
                background-color: rgb(155,0,0);
              }
            }
          }
        }
      }
      .cardcont3{
        width: 100%;
        .ordertishi{
          width: 100%;
          height: 250px;
          margin-top: 20px;
          border: 1px solid #eee;
          text-align: center;
          padding: 10px;
          box-sizing: border-box;
          color:rgb(190,0,0);
        }
        .jiesuanbox{
          width: 100%;
          margin-top: 20px;
          border: 1px solid #eee;
          .jiesuantitle{
            width: 100%;
            padding: 10px;
            box-sizing: border-box;
            background-color: rgb(248,248,248);
          }
          .infocont{
            width: 100%;
            border-top: 1px solid #eee;
            padding:25px 15px;
            box-sizing: border-box;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            .infoleft,.inforight{
              width: 50%;
              .infoitem{
                width: 70%;
                margin-left: 30%;
                margin-bottom: 20px;
                .lookorder{
                  cursor: pointer;
                }
                .lookorder:hover{
                  color: red;
                  text-decoration: underline;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
<style>
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button{
    -webkit-appearance: none !important;
    margin: 0;
  }
  .sortEdit .el-radio__label{
    display: none;
  }
</style>
