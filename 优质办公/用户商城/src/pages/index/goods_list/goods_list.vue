<template>
  <div class="container">
    <top @serchfn="serchfn"></top>
    <topnav @tomore="tomore" @navfn="navfn" :showcaidan="showlist"></topnav>
    <div class="goodscont">
      <div class="detailadress">
        <span class="">您现在的位置：</span>
        <span class="topnavitem" @click="$router.push({path:'/home'})">首页</span> >
        <span class="">{{topnavval}}</span>
      </div>
      <div class="goodsnav">
        <el-select v-model="sortval" placeholder="请选择">
          <el-option
            v-for="item in sortarr"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <div class="qujian">
          <div style="margin-left: 20px;line-height: 40px;width: 80px">区间价格</div>
          <div class="qujianinput">
            <el-input v-model="startmoney" placeholder="请输入"></el-input>
          </div>
          <div style="margin: 0 10px;line-height: 40px">-</div>
          <div class="qujianinput">
            <el-input v-model="endmoney" placeholder="请输入"></el-input>
          </div>
        </div>
        <el-button type="primary" @click="serchok">确定</el-button>
        <el-button type="danger">清除</el-button>
      </div>
      <div class="goodslist">
        <div class="goodslistitem" v-if="datalist.length>0" v-for="item in datalist" @click="togoods_detail(item.FMaterialId)">
          <div class="zhuanshulog" v-if="item.FIsSpecial==1">协议</div>
          <div class="goodsimgbox">
            <img :src="imgapi+item.FUrl">
          </div>
          <div class="goodsprice">
            <span  style="color: red;font-size: 1.1rem">￥{{item.FPrice}}</span>
          </div>
          <div class="goodsname">{{item.FName}}</div>
        </div>
        <div class="nodataimg" v-if="datalist.length==0">
          暂无数据
        </div>
      </div>
      <div class="goodsfenye">
        <el-pagination
          background
          :current-page="nowpage"
          :page-size="pagenum"
          layout="prev, pager, next"
          @current-change="changepage"
          :total="allpage*pagenum">
        </el-pagination>
      </div>
    </div>
    <baozheng @navfn="navfn"></baozheng>
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
        typeid:2,
        sortarr:[
          {value:1,label:'综合'},
          {value:2,label:'销量'},
          {value:3,label:'价格'},
          {value:4,label:'上架时间'},
        ],
        sortval:1,
        startmoney:0,
        endmoney:0,
        datalist:[],
        nowpage:1,
        pagenum:20,
        allpage:1,
        pagetype:'',
        serchval:'',
        FCategoryID:'',
        topnavval:'',
        showlist:true,
      }
    },
    props: {},
    methods:{
      serchok(){
        if(this.pagetype=='serch'){
          this.serchdata()
        }else if(this.pagetype=='list'){
          this.getdata()
        }else if(this.pagetype=='type') {
          this.gettypedata()
        }
      },
      changepage(index){
        console.log(index)
        this.nowpage = index
        if(this.pagetype=='serch'){
          this.serchdata()
        }else if(this.pagetype=='list'){
          this.getdata()
        }else if(this.pagetype=='type') {
          this.gettypedata()
        }
      }, // 分页
      togoods_detail(id){
        this.$router.push({path:'/goods_detail',query:{id:id}})
      },
      navfn(obj){
        this.typeid = obj.id
        if(this.typeid==2){
          this.topnavval = '热卖'
        }else if(this.typeid==3){
          this.topnavval = '推荐'
        }else if(this.typeid==4){
          this.topnavval = '新品'
        }else if(this.typeid==5){
          this.topnavval = '最近购买'
        }
        this.nowpage = 1
        this.getdata()
      },
      getdata(){
        let _this = this
        var data = {
          params: {
            fCustId:localStorage.getItem('FCustId'),
            fNumber:0,
            fType:this.sortval,
            fSPrice:this.startmoney,
            fEPrice:this.endmoney,
            fPageIndex:this.nowpage,
            fPageSize:this.pagenum,
          }
        }
        var url = this.apis+'/apix/Products/Products/HotSalesProducts'
        if(this.typeid ==3){
          url = this.apis+'/apix/Products/Products/RecommandProduct'
        }else if(this.typeid ==4){
          url = this.apis+'/apix/Products/Products/ShowNewProduct'
        }else if(this.typeid ==5){
          data = {
            params: {
              fCustId:localStorage.getItem('FCustId'),
              fUid:localStorage.getItem('FId'),
              fType:this.sortval,
              fSPrice:this.startmoney,
              fEPrice:this.endmoney,
              fPageIndex:this.nowpage,
              fPageSize:this.pagenum,
            }
          }
          url = this.apis+'/apix/Products/Products/RecentBuy'
        }
        this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
        this.axios.get(url,data).then((res)=>{
          if(res.data.statuscode==200){
            _this.datalist = res.data.data
            _this.allpage = parseInt(res.data.message)
          }else {
          }
        }).catch((res)=>{
        })
      },
      tomore(obj){
        console.log(obj)
        this.FCategoryID = obj.floorid
        this.topnavval = obj.topnavval
        this.gettypedata()
        this.pagetype = 'type'
      },
      gettypedata(){
        let _this = this
        var data = {
          params: {
            fCustID:localStorage.getItem('FCustId'),
            fCategoryId:this.FCategoryID,
            fPageIndex:this.nowpage,
            fPageSize:this.pagenum,
            fSPrice:this.startmoney,
            fEPrice:this.endmoney,
            fType:this.sortval,
          }
        }
        console.log(data,'data')
        var url = this.apis+'/apix/Products/Products/CategoryProducts'
        this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
        this.axios.get(url,data).then((res)=>{
          if(res.data.statuscode==200){
            _this.datalist = res.data.data
            _this.allpage = parseInt(res.data.message)
          }
        }).catch((res)=>{
        })
      },
      serchdata(){
        let _this = this
        var arr = this.serchval.split(' ')
        var newarr = []
        for(let i = 0;i<arr.length;i++){
          var obj = {
            SearchKey:arr[i]
          }
          newarr.push(obj)
        }
        var data = {
            FCustID:localStorage.getItem('FCustId'),
            search:newarr,
            FPageIndex:this.nowpage,
          FPageSize:this.pagenum,
        }
        var url = this.apis+'/apix/Products/Products/SearchProducts'
        this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
        this.axios.post(url,data).then((res)=>{
          if(res.data.statuscode==200){
            _this.datalist = res.data.data
            _this.allpage = parseInt(res.data.message)
          }else {
          }
        }).catch((res)=>{
        })
      },
      serchfn(obj){
        this.serchval = obj.serchval
        this.serchdata()
      },
    },
    mounted(){
    },
    created() {
      if(!localStorage.getItem('token')){
        this.$router.push({path:'/login'})
        return false
      }
      this.typeid = this.$route.query.id
      if(this.$route.query.serchval){
        this.topnavval = this.$route.query.serchval
        this.serchval = this.$route.query.serchval
        this.serchdata()
        this.pagetype = 'serch'
      } else if(this.$route.query.id){
          if(this.$route.query.id==2){
            this.topnavval = '热卖'
          }else if(this.$route.query.id==3){
            this.topnavval = '推荐'
          }else if(this.$route.query.id==4){
            this.topnavval = '新品'
          }else if(this.$route.query.id==5){
            this.topnavval = '最近购买'
          }
          this.getdata()
        this.pagetype = 'list'
      }
      else if(this.$route.query.floorid) {
          this.FCategoryID = this.$route.query.floorid
          this.topnavval = this.$route.query.topnavval
          this.gettypedata()
        this.pagetype = 'type'
      }//商品分类的
    },
  }
</script>

<style scoped lang="less">
  .container{
    width: 100%;
    .goodscont{
      width: 60%;
      margin-left: 20%;
      padding: 10px 0;
      box-sizing: border-box;
      .detailadress{
        width: 100%;
        padding: 10px 0 20px;
        box-sizing: border-box;
        .topnavitem:hover{
          cursor: pointer;
          color: red;
          text-decoration: underline;
        }
      }
      .goodsnav{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        padding: 10px;
        box-sizing: border-box;
        background-color: rgb(245,245,245);
        .itemsort,.navbtn,.sortbox{
          padding: 0 5px;
          box-sizing: border-box;
          height: 20px;
          line-height: 20px;
          text-align: center;
          margin-right: 15px;
          cursor: pointer;
        }
        .sortbox:hover{
          color: red;
          text-decoration: underline;
        }
        .navbtn{
          background-color: rgb(211,211,211);
        }
        .qujian{
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          .qujianinput{
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            border: 1px solid #eee;
            background-color: #fff;
            input{
              width: 100px;
              border: none;
              outline: none;
            }
          }
        }
      }
      .goodslist{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        flex-wrap: wrap;
        .goodslistitem{
          width: 23%;
          border: 1px solid #eee;
          box-sizing: border-box;
          cursor: pointer;
          margin: 0 1%;
          margin-top: 20px;
          position: relative;
          .zhuanshulog{
            position: absolute;
            top: 0;
            right: 0;
            width: 40px;
            height: 25px;
            line-height: 25px;
            text-align: center;
            background-color: red;
            color: white;
          }
          .goodsimgbox{
            height: 250px;
            font-size: 0px;
            width: 100%;
            text-align: center;
            overflow: hidden;
            img{
              width: 100%;
            }
          }
          .goodsprice{
            padding: 0 15px;
            box-sizing: border-box;
            margin-top: 10px;
          }
          .goodsname{
            padding: 10px 15px;
            box-sizing: border-box;
          }
        }
        .goodslistitem:hover{
          border: 1px solid red;
        }
        .nodataimg{
          width: 100%;
          text-align: center;
          margin: 20px 0;
          color: rgb(150,150,150);
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
  }
</style>
<style>
   .banner .el-carousel__container{
    height: 380px!important;
  }
  .bannercont .el-carousel__indicator{
    padding: 0px;
    margin: 20px 5px;
    background-color: white;
  }
  .bannercont .el-carousel__button{
    background-color: #18C28D;
    opacity: 0;
  }
  .bannercont .el-carousel__indicator.is-active button{
    opacity: 1;
  }
  .banner img{
    width: 100%;
  }
  .vux-swiper{
    height: 440px !important;
  }
   .el-pagination.is-background .el-pager li:not(.disabled).active{
     background-color: red;
   }
   .el-pager li:hover{
     color: red !important;
   }
</style>
