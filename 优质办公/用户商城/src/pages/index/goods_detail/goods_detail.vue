<template>
  <div class="container goodsdetail">
    <top></top>
    <topnav></topnav>
    <div class="goodsdetail">
      <div class="detailadress">
        <span class="">您现在的位置：</span>
        <span class="topnavitem" @click="$router.push({path:'/home'})">首页</span> >
        <span class="topnavitem" @click="tomore(goodstype.id,goodstype.name)">{{goodstype.name}}</span> >
        <span class="topnavitem" @click="tomore(goodstype2.id,goodstype2.name)">{{goodstype2.name}}</span>
      </div>
      <div class="detailimg">
        <div class="infoleft">
          <div class="topimg">
            <img :src="imgapi+nowimg">
          </div>
          <div class="underimg">
            <div class="underimgitem" v-for="item in goodsobj.PIC" @click="lookimg(item)">
              <img :src="imgapi+item.FUrl">
            </div>
          </div>
        </div>
        <div class="inforight">
          <div class="righttitle">{{goodsobj.FName}}</div>
          <div class="rightprice">
            <div class="priceleft">
              <div class="xljbox">
                <span>销售价:</span>
                <span style="color: red;font-size: 20px">￥<span style="font-size: 20px">{{goodsobj.FPrice}}</span></span>
              </div>
              <div class="procebox" v-if="false">
                <span>价格:</span>
                <span style="text-decoration: line-through">￥3100</span>
              </div>
            </div>
            <div class="priceright" @click="tosavegoods">
              <div :class="goodsobj.FIsFavourite==1?'saveicon2 iconfont icon-xin':'saveicon iconfont icon-xin'"></div>
              <div><span v-if="goodsobj.FIsFavourite==1">已</span>收藏</div>
            </div>
          </div>
          <div class="infoxqbox">
            <div class="goodsxqtitle">商品说明</div>
            <div style="padding: 10px;box-sizing: border-box;width: 100%">{{goodsobj.FInfo}}</div>
          </div>
          <div class="goodsnumbox">
            <div style="height: 30px;line-height: 30px;margin-right: 50px;margin-left: 10px">数量</div>
            <div class="numjisuan">
              <div class="numbtn" @click="jianfn">-</div>
              <div class="numinput">
                <input type="number" v-model="goodsnum" />
              </div>
              <div class="numbtn" @click="jiafn">+</div>
            </div>
            <div class="kucun" style="line-height: 35px;margin-left: 25px">
              <span>库存:</span>
              <span v-if="goodsobj.FBaseQty==0">可预订</span>
              <span v-if="goodsobj.FBaseQty==1">少量</span>
              <span v-if="goodsobj.FBaseQty==2">有货</span>
            </div>
          </div>
          <div class="goodsaddbtn">
            <div class="buybtn" @click="showadress = true">立即购买</div>
            <div class="addbtn" @click="addcard"><span class="iconfont icon-qicheqianlian-" style="font-size: 20px;margin-right: 5px"></span><span>加入购物车</span></div>
          </div>
          <div class="goodsbianhao"><span style="margin-right: 20px">商品编号</span><span>{{goodsobj.FMaterialNumber }}</span></div>
        </div>
      </div>
    </div>
    <div class="xiangqingbox">
      <div class="xqleft">
        <div class="leftitem" v-for="item in hotlist" @click="hotfn(item.FMaterialId)">
          <img :src="imgapi+item.FUrl">
          <div class="goodsname">{{item.FName}}</div>
          <div class="goodsjiage">￥{{item.FPrice}}</div>
        </div>
      </div>
      <div class="xqright">
        <div class="xqtitle">商品详情</div>
        <div class="xqcontent" v-html="goodsobj.FDetail"></div>
      </div>
    </div>
    <baozheng></baozheng>
    <foot></foot>
    <el-dialog
      title="提示"
      :visible.sync="showadress"
      width="30%"
      >
      <div class="shouhuobox">
        <table class="table table-hover" style="margin-top: 20px;border: 1px solid #ddd;font-size: 12px;width: 100%">
          <thead class="graythead">
          <tr class='grayTr'>
            <td style="padding: 15px 0;text-indent: 9px" width="5%"></td>
            <td style="padding: 15px 0;text-indent: 9px" width="5%">收货人</td>
            <td style="padding: 15px 0;text-indent: 9px" width="35%">所在地区</td>
            <td style="padding: 15px 0;text-indent: 9px" width="15%">详细地址</td>
            <td style="padding: 15px 0;text-indent: 9px" width="5%">邮编</td>
            <td style="padding: 15px 0;text-indent: 9px" width="10%">手机</td>
            <td style="padding: 15px 0;text-indent: 9px" width="10%">固定电话</td>
          </tr>
          </thead>
          <tbody >
          <tr v-for="(item,index) in adresslist" class="table_td">
            <td class="sortEdit" >
              <el-radio v-model="adressid" :label="item.FId"></el-radio>
            </td>
            <td class="sortEdit" >{{item.FRecieveName}}</td>
            <td class="sortEdit" >{{item.FPName}},{{item.FCName}},{{item.FDName}}</td>
            <td class="sortEdit" >{{item.FAddress}}</td>
            <td class="sortEdit" >{{item.FZipCode}}</td>
            <td class="sortEdit" >{{item.FMobilePhone}}</td>
            <td class="sortEdit" >{{item.FPhone}}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="adreebtn">
        <el-button @click="showadress = false">取 消</el-button>
        <el-button type="primary" @click="suborderfn">确 定</el-button>
      </div>
    </el-dialog>
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
        goodsid:'',
        goodsobj:'',
        hotlist:[],
        adressid:-1,
        showadress:false,
        nowimg:'',
        goodstype:{
          name:'',
          id:''
        },
        goodstype2:{
          name:'',
          id:''
        },
        adresslist:[],
      }
    },
    props: {},
    methods:{
      tomore(id,val){
        this.$router.push({path:'/goods_list',query:{floorid:id,topnavval:val}})
      },
      hotfn(id){
        this.goodsid = id
        this.getdata()
      },
      lookimg(item){
        this.nowimg = item.FUrl
      },
      jianfn(){
        if(this.goodsnum==''){
          this.goodsnum = 1
        }else {
          if(this.goodsnum<2){
            this.goodsnum = 1
          }else {
            this.goodsnum -=1
          }
        }
      },//商品数量加
      jiafn(){
        if(this.goodsnum==''){
          this.goodsnum = 1
        }else {
          this.goodsnum+=1
        }
      },//商品数量减
      addcard(){
        let _this = this
        var data = {
            FMaterialId:this.goodsid,
            FUId:localStorage.getItem('FId'),
            FCustID:localStorage.getItem('FCustId'),
            FNumber:this.goodsnum,
        }
        this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
        this.axios.post(this.apis+'/apix/Products/Products/AddShopCart',data).then((res)=>{
          if(res.data.statuscode==200){
            _this.$message({
              message: res.data.message,
              type: 'success'
            });
          }else {
            _this.$message(res.data.message)
          }
        }).catch((res)=>{
        })
      },
      tosavegoods(){
        let _this = this
        var data = {
            FMaterialId:this.goodsid,
            FUId:localStorage.getItem('FId'),
        }
        this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
        this.axios.post(this.apis+'/apix/Products/Products/AddFavourite',data).then((res)=>{
          if(res.data.statuscode==200){
            _this.$message({
              message:res.data.message,
              type: 'success'
            });
            _this.getdata()
          }else {
            _this.$message(res.data.message)
          }
        }).catch((res)=>{
        })
      },
      getdata(){
        let _this = this
        var data = {
          params: {
            FMaterialId:this.goodsid,
            fCustId:localStorage.getItem('FCustId'),
            FUId:localStorage.getItem('FId'),
          }
        }
        this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
        this.axios.get(this.apis+'/apix/Products/Products/ProductDetail',data).then((res)=>{
          if(res.data.statuscode==200){
            if(res.data.data.PIC.length>0){
              _this.nowimg = res.data.data.PIC[0].FUrl
              _this.goodstype.name = res.data.data.PRoute[0].FChildren[0].FName
              _this.goodstype.id = res.data.data.PRoute[0].FChildren[0].FID
              _this.goodstype2.name = res.data.data.PRoute[0].FChildren[0].FChildren[0].FName
              _this.goodstype2.id = res.data.data.PRoute[0].FChildren[0].FChildren[0].FID
            }
            _this.goodsobj = res.data.data
          }
        }).catch((res)=>{
        })
      },
      gethot(){
        let _this = this
        var data = {
          params: {
            fCustId:localStorage.getItem('FCustId'),
            fNumber:0,
            fType:1,
            fSPrice:0,
            fEPrice:0,
            fPageIndex:1,
            fPageSize:8,
          }
        }
        this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
        this.axios.get(this.apis+'/apix/Products/Products/HotSalesProducts',data).then((res)=>{
          if(res.data.statuscode==200){
            _this.hotlist = res.data.data
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
                _this.adressid = _this.adresslist[i].FId
              }
            }
          }
        }).catch((res)=>{
        })
      },
      suborderfn(){
        let _this = this
        if(this.adressid==-1){
          _this.$message('请选择收货地址');
          return false
        }
        var enterarr  =[]
            var ojb = {
              FMaterialID:this.goodsobj.FMaterialId,
              FMaterialNumber: this.goodsobj.FMaterialNumber,
              FMaterialName:this.goodsobj.FName,
              FMaterialModel: this.goodsobj.FSpecification,
              FUnitID: this.goodsobj.FUnitId,
              FDeliveryDate: new Date(),
              FQty:this.goodsnum,
              FPrice: this.goodsobj.FPrice,
              FAmount: this.goodsnum*parseInt(this.goodsobj.FPrice),
            }
            enterarr.push(ojb)
        var data = {
            FBillNo: '1',
            FBillTypeID: localStorage.getItem('FBillTypeID'),
            FDate: new Date(),
            FSaleOrgID: localStorage.getItem('FSaleOrgID'),
            FCustID: localStorage.getItem('FCustId'),
            FSalerID: localStorage.getItem('FSeller'),
            FSettleCurrID:localStorage.getItem('FSettleCurrID'),
            FAddressID: this.adressid,
            FUserID:  localStorage.getItem('FId'),
            FIsCart:  0,
            Entries: enterarr
        }
        console.log(data)
        this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
        this.axios.post(this.apis+'/apix/Order/Order/NewSaleOrder',data).then((res)=>{
          if(res.data.statuscode==200){
            _this.$message({
              message: '购买成功',
              type: 'success'
            });
            setTimeout(()=>{
              _this.$router.push({path:'/order'})
            },500)
          }else {
            _this.$message(res.data.message)
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
      this.goodsid = this.$route.query.id
      console.log(this.goodsid)
      this.getdata()
      this.gethot()
      this.getadress()
    },
  }
</script>

<style scoped lang="less">
  .container{
    width: 100%;
    .goodsdetail{
      width: 70%;
      margin-left:15%;
      .detailadress{
        width: 100%;
        padding: 10px 0;
        box-sizing: border-box;
        .topnavitem:hover{
          cursor: pointer;
          color: red;
          text-decoration: underline;
        }
      }
      .detailimg{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        padding: 15px 0;
        box-sizing: border-box;
        .infoleft{
          margin-right: 50px;
          .topimg{
            width: 400px;
            height: 400px;
            text-align: center;
            border: 1px solid #eee;
            font-size: 0px;
            overflow: hidden;
            img{
              width: 100%;
            }
          }
          .underimg{
            margin-top: 20px;
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            .underimgitem{
              width: 60px;
              height: 60px;
              overflow: hidden;
              border: 2px solid #eee;
              cursor: pointer;
              img{
                width: 100%;
              }
            }
            .underimgitem:hover{
              border: 2px solid red;
            }
          }
        }
        .inforight{
          width: 60%;
          .righttitle{
            width: 100%;
            padding: 10px 0;
            box-sizing: border-box;
            font-size: 18px;
            font-weight: bold;
          }
          .rightprice{
            width: 100%;
            display: flex;
            background-color: rgb(228,228,228);
            padding: 15px;
            box-sizing: border-box;
            flex-direction: row;
            justify-content: space-between;
            .priceleft{
              width: 70%;
              .xljbox{
                width: 100%;
                height: 30px;
                line-height: 30px;
                color: rgb(100,100,100);
              }
              .procebox{
                width: 100%;
                height: 30px;
                line-height: 30px;
                color: rgb(100,100,100);
              }
            }
            .priceright{
              color: rgb(100,100,100);
              height: 100%;
              text-align: center;
              cursor: pointer;
              .saveicon,.saveicon2{
                font-size: 20px;
                margin-top: 10px;
              }
              .saveicon2{
                color: red;
              }
            }
          }
          .infoxqbox{
            margin-top: 10px;
            width: 100%;
            border: 1px solid #eee;
            height: 180px;
            overflow-y: auto;
            .goodsxqtitle{
              text-align: center;
            }
          }
          .goodsnumbox{
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            margin-top: 20px;
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
          }
          .goodsaddbtn{
            width: 100%;
            display: flex;
            flex-direction: row;
            margin-top: 20px;
            .buybtn,.addbtn{
              width: 160px;
              height: 40px;
              line-height: 40px;
              text-align: center;
              color: white;
              cursor: pointer;
              background-color: rgb(190,0,0);
            }
            .addbtn{
              margin-left: 25px;
            }
            .buybtn:hover,.addbtn:hover{
              background-color: rgb(155,0,0);
            }
          }
          .goodsbianhao{
            margin-top: 10px;
          }
        }
      }
    }
    .xiangqingbox{
      width: 70%;
      margin-left: 15%;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      margin-top: 40px;
      .xqleft{
        width: 195px;
        margin-top: 30px;
        padding: 10px 10px;
        box-sizing: border-box;
        .leftitem{
          width: 100%;
          border-left: 1px solid #eee;
          border-right: 1px solid #eee;
          border-bottom: 1px dashed #eee;
          padding: 0 5px 10px;
          box-sizing: border-box;
          min-height: 280px;
          img{
            width: 100%;
          }
          .goodsname{
            color: rgb(100,100,100);
            margin: 10px 0;
          }
          .goodsjiage{
            color: red;
          }
        }
        .leftitem:hover{
          border-left: 1px solid red;
          border-right: 1px solid red;
          cursor: pointer;
        }
      }
      .xqright{
        flex: 1;
        width: 300px;
        margin-left: 20px;
        .xqtitle{
          width: 160px;
          height: 30px;
          border: 1px solid #eee;
          border-bottom: none;
          text-align: center;
          line-height: 30px;
        }
        .xqcontent{
          border: 1px solid #eee;
          border-top: none;
          width: 100%;
          padding: 20px 160px;
          box-sizing: border-box;
          img{
            width: 100%;
          }
        }
      }
    }
    .shouhuobox{
      width: 100%;
      margin-bottom: 20px;
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
    }
    .adreebtn{
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
    }
  }
</style>
<style>
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button{
    -webkit-appearance: none !important;
    margin: 0;
  }
  .goodsdetail .el-dialog{
    width: 80%!important;
  }
  .xqcontent img{
    max-width: 750px;
  }
</style>
