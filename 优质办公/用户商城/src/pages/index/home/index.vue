<template>
  <div class="container">
    <top></top>
    <div class="topnavbox">
      <div class="topnav">
        <div class="navitem" style="padding: 20px 70px;" @mouseover="showtlistfn" @mouseleave="closelistfn">
          <div>全部商品</div>
          <div class="caidan" v-if="showlist">
            <div class="erji">
              <div class="caidanitem" v-for="(item,index) in twolist" :key="index" @click="tomore(item.FRegionId,item.FNameRegion)" @mouseover="showthree(item)">
                <span>{{item.FNameRegion}}</span>
              </div>
            </div>
            <div class="atcaidanbox" v-if="threebox" @mousemove="showthree" @mouseleave="closethree">
              <div class="threebox" v-for="item in threelistnow">
                <div class="erjicaidan" @click="tomore(item.FRegionId,item.FNameRegion)">{{item.FNameRegion}}</div>
                <div class="sijicaidan">
                  <span class="sijiitem" v-for="item4 in item.children" @click="tomore(item4.FRegionId,item4.FNameRegion)">{{item4.FNameRegion}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="navitem" v-for="item in navarr" @click="navfn(item.id)">{{item.val}}</div>
      </div>
      <div class="navlaba">
        <div class="labaicon iconfont icon-laba"></div>
        <div class="labatext">
          <div @click="notice">{{notearr.FTopic}}</div>
          <!--<swiper loop auto height="30px" direction="vertical" :interval=2000 class="text-scroll" :show-dots="false">-->
            <!--<swiper-item v-for="(item, index) in notearr" :key="index"><div @click="notice(item)">{{item.FTopic}}</div></swiper-item>-->
          <!--</swiper>-->
        </div>
      </div>
    </div>
    <div class="bannercont">
      <div class="block banner">
        <el-carousel trigger="click">
          <el-carousel-item v-for="(item,index) in bannerlist" :key="index">
            <img :src="imgapi+item.FUrl" @click="advrouer(item.FGetUrl)">
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="centerbox">
      <div class="newbox">
        <div class="conteritem" v-for="(item,index) in newgoods" :key="index" v-if="index<=1" @click="tolist(4)">
          <img :src="imgapi+item.FUrl">
          <div class="contitemat">
            <div class="item_title">新品</div>
            <div class="item_text">全场满减 低价钜惠</div>
          </div>
        </div>
      </div>
      <div class="newbox">
        <div class="conteritem" v-for="(item,index) in tjgoods" :key="index" v-if="index<=1" @click="tolist(3)">
          <img :src="imgapi+item.FUrl">
          <div class="contitemat">
            <div class="item_title">推荐</div>
            <div class="item_text">全场满减 低价钜惠</div>
          </div>
        </div>
      </div>
    </div>
    <div class="floorbox" v-for="(item,index) in floorarr" :key="index">
      <div class="floortop" v-if="index==0||index==4">
        <div class="floortitle">{{item.FFloorName}}</div>
        <div class="floormore" @click="tomore(item.FCategoryID,item.FFloorName)"><span style="margin-right: 15px">更多</span><span class="moreicon iconfont icon-shuangyoujiantou-"></span></div>
      </div>
      <div class="floortop" v-if="index==1||index==5" style="border-bottom:3px solid rgb(10,166,233);">
        <div class="floortitle" style="background-color:rgb(10,166,233);">{{item.FFloorName}}</div>
        <div class="floormore" @click="tomore(item.FCategoryID,item.FFloorName)"><span style="margin-right: 15px">更多</span><span class="moreicon iconfont icon-shuangyoujiantou-"></span></div>
      </div>
      <div class="floortop" v-if="index==2||index==6" style="border-bottom:3px solid rgb(249,149,182);">
        <div class="floortitle" style="background-color:rgb(249,149,182);">{{item.FFloorName}}</div>
        <div class="floormore" @click="tomore(item.FCategoryID,item.FFloorName)"><span style="margin-right: 15px;">更多</span><span class="moreicon iconfont icon-shuangyoujiantou-"></span></div>
      </div>
      <div class="floortop" v-if="index==3||index==7" style="border-bottom:3px solid rgb(106,190,89);">
        <div class="floortitle" style="background-color:rgb(106,190,89);">{{item.FFloorName}}</div>
        <div class="floormore" @click="tomore(item.FCategoryID,item.FFloorName)"><span style="margin-right: 15px">更多</span><span class="moreicon iconfont icon-shuangyoujiantou-"></span></div>
      </div>
      <div class="floorunder">
        <div class="flooradv" :style="getbg(index)">
          <div class="advtitle">{{item.FFloorName}}</div>
          <div class="advtype" :style="getbg3(index)" v-if="item.FloorAdvs.length>0">{{item.FloorAdvs[0].FDescription}}</div>
          <div class="advbtn" :style="getbg2(index)" v-if="item.FloorAdvs.length>0">{{item.FloorAdvs[0].FDescription}}</div>
          <img v-if="item.FloorAdvs.length>0" :src="imgapi+item.FloorAdvs[0].FUrl" style="cursor: pointer" @click="advrouer(item.FloorAdvs[0].FGetUrl)">
        </div>
        <div class="floorbanner">
          <el-carousel height="440px" trigger="click">
            <el-carousel-item v-for="(item2,index) in item.Rotations" :key="index">
              <div class="floorbaner">
                <img :src="imgapi+item2.FUrl" style="cursor: pointer" @click="advrouer(item2.FGetUrl)">
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="floorlist">
          <div class="floorlistitem" v-for="(item3,index3) in item.Productses" @click="todetai(item3.FMaterialId)" :key="index3" v-if="index3<=5">
            <div class="zhuanshulog" v-if="item3.FIsSpecial==1">协议</div>
            <div class="fl_itemtitle">{{item3.FName}}</div>
            <div class="fl_itemaval">{{item3.FDescription}}</div>
            <div class="floorimgbox">
              <img :src="imgapi+item3.FUrl">
            </div>+
            <div style="height: 20px;line-height: 20px;font-size:18px;color: red;margin-top: 10px">￥{{item3.FPrice}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="hotgoods">
      <div class="hottitle">——   热卖商品   ——</div>
      <div class="hotlist">
        <div class="hotitem" v-for="(item,index) in hotlist" @click="todetai(item.FMaterialId)" :key="index" v-if="index<=5">
          <div class="itemimgbox">
            <img :src="imgapi+item.FUrl">
          </div>
          <div class="houitemtitle">{{item.FName}}</div>
          <div class="houitemprice">￥{{item.FPrice}}</div>
        </div>
      </div>
    </div>
    <baozheng></baozheng>
    <foot></foot>
  </div>
</template>

<script>
  import { Swiper,SwiperItem } from 'vux'
  import foot from '@/components/foot/foot'
  import baozheng from '@/components/foot/baozheng'
  import top from '@/components/top/top'
  export default {
    components: {Swiper,SwiperItem,foot,baozheng,top},
    data() {
      return {
        bannerlist:[],//轮播图
        twolist:[],//二级菜单列表
        threelistnow:[],//三级菜单列表
        threebox:false,//显示三级菜单
        showlist:false,//显示二级菜单
        navarr:[
          {val:'首页',id:1,active:false},
          {val:'热卖',id:2,active:false},
          {val:'推荐',id:3,active:false},
          {val:'新品',id:4,active:false},
          {val:'最近购买',id:5,active:false},
        ],//导航栏
        hotlist:[],//热卖商品
        floorarr:[],
        newgoods:[],
        tjgoods:[],
        notearr:[],
        dataobj:'',
      }
    },
    props: {},
    methods:{
      notice(){
        this.$router.push({path:'/notice'})
      },
      getbg(index){
        if(index==0||index==4){
          return 'background-color:rgba(194,128,255,0.4);'
        }
        if(index==1||index==5){
          return 'background-color:rgb(194,235,253);'
        }
        if(index==2||index==6){
          return 'background-color:rgb(255,228,237);'
        }
        if(index==3||index==7){
          return 'background-color:rgb(212,242,206);'
        }
      },
      getbg2(index){
        if(index==0||index==4){
          return 'background-color:rgb(194,128,255);'
        }
        if(index==1||index==5){
          return 'background-color:rgb(10,166,233);'
        }
        if(index==2||index==6){
          return 'background-color:rgb(249,149,182);'
        }
        if(index==3||index==7){
          return 'background-color:rgb(106,190,89);'
        }
      },
      getbg3(index){
        if(index==0||index==4){
          return 'color:rgb(194,128,255);'
        }
        if(index==1||index==5){
          return 'color:rgb(10,166,233);'
        }
        if(index==2||index==6){
          return 'color:rgb(249,149,182);'
        }
        if(index==3||index==7){
          return 'color:rgb(106,190,89);'
        }
      },
      advrouer(val){
        if(val){
          window.location.href = val
        }
      },
      tolist(id){
        this.$router.push({path:'/goods_list',query:{id:id}})
      },
      tomore(id,val){
        this.$router.push({path:'/goods_list',query:{floorid:id,topnavval:val}})
      },
      todetai(id){
        this.$router.push({path:'/goods_detail',query:{id:id}})
      },
      sijifn(val){
        this.$router.push({path:'/goods_list',query:{id:0,serchval:val}})
      },
      navfn(id){
        if(id==1){
          this.$router.push({path:'/home'})
        }else{
          this.$router.push({path:'/goods_list',query:{id:id}})
        }
      },
      showtlistfn(){
        this.showlist = true
      },
      closelistfn(){
        this.showlist = false
      },
      closethree(){
        this.threebox = false
      },
      showthree(item){
        this.threebox = true
        if(item){
          for(let i = 0;i<this.twolist.length;i++){
            if(this.twolist[i].FRegionId == item.FRegionId){
              this.threelistnow = this.twolist[i].children
            }
          }
        }
      },
      setlist(data){
        this.twolist = data[0].children
      },
      getlist(){
        let _this = this
        var data = {
          params: {}
        }
        this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
        this.axios.get(this.apis+'/apix/Category/Category/MenuTree',data).then((res)=>{
              if(res.data.statuscode==200){
            _this.setlist(res.data.data)
          }
        }).catch((res)=>{
        })
      },
      getbanner(){
        let _this = this
        var data = {
          params: {}
        }
        this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
        this.axios.get(this.apis+'/apix/Products/Products/Rotation',data).then((res)=>{
          if(res.data.statuscode==200){
            _this.bannerlist = res.data.data
          }else {
          }
        }).catch((res)=>{
        })
      },
      getfloor(){
        let _this = this
        var data = {
          params: {
            FCustID:localStorage.getItem('FCustId')
          }
        }
        this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
        this.axios.get(this.apis+'/apix/Products/Products/FloorDetails',data).then((res)=>{
          if(res.data.statuscode==200){
            _this.floorarr = res.data.data
          }else {
          }
        }).catch((res)=>{
        })
      },
      gethot(){
        let _this = this
        var data = {
          params: {
            fCustId:localStorage.getItem('FCustId'),
            fNumber:'8',
          }
        }
        this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
        this.axios.get(this.apis+'/apix/Products/Products/HotSalesProducts',data).then((res)=>{
          if(res.data.statuscode==200){
            _this.hotlist = res.data.data
          }else {
          }
        }).catch((res)=>{
        })
      },
      getnew(){
        let _this = this
        var data = {
          params: {
            fCustId:localStorage.getItem('FCustId'),
            fNumber:'300',
          }
        }
        var url = this.apis+'/apix/Products/Products/ShowNewProduct'
        this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
        this.axios.get(url,data).then((res)=>{
          if(res.data.statuscode==200){
            _this.newgoods = res.data.data
          }
        }).catch((res)=>{
        })
      },
      gettj(){
        let _this = this
        var data = {
          params: {
            fCustId:localStorage.getItem('FCustId'),
            fNumber:'300',
          }
        }
        var url = this.apis+'/apix/Products/Products/RecommandProduct'
        this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
        this.axios.get(url,data).then((res)=>{
          if(res.data.statuscode==200){
            _this.tjgoods = res.data.data
          }
        }).catch((res)=>{
        })
      },
      getadv(){
        let _this = this
        var data = {
          params: {}
        }
        var url = this.apis+'/apix/Products/Products/ShowNotice'
        this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
        this.axios.get(url,data).then((res)=>{
          if(res.data.statuscode==200){
            _this.notearr = res.data.data[0]
          }
        }).catch((res)=>{
        })
      },
      getnotice(){
        let _this = this
        var data = {
          params: {
            FID:0,
          }
        }
        this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
        this.axios.get(this.apis+'/apix/Products/Products/ShowNoticeDetail',data).then((res)=>{
          if(res.data.statuscode==200){
            _this.dataobj = res.data.data
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

      var data = {
        FCustID:'"100061"',
        search:[
          {
            SearchKey:'safsad',
          }
        ],
      }

      this.getbanner()
      this.getlist()
      this.getfloor()
      this.gethot()
      this.getnew()
      this.gettj()
      this.getadv()
      this.getnotice()
    },
  }
</script>

<style scoped lang="less">
  .container{
    width: 100%;
    background-color: rgb(245,245,245);
    .topnavbox{
      width: 100%;
      background-color: rgb(226,52,52);
      color: white;
      padding: 0 30px;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      .topnav{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        margin-left: 100px;
        .navitem{
          padding: 20px 20px;
          box-sizing: border-box;
          margin-right: 30px;
          cursor: pointer;
          position: relative;
          /*border: 1px solid rgb(192,171,131);*/
          .caidan{
            position: absolute;
            width: 192px;
            height: 450px;
            box-sizing: border-box;
            background-color: rgb(37,37,37);
            padding: 10px 0;
            top: 57px;
            left: 0;
            z-index: 1000;
            .atcaidanbox{
              position: absolute;
              width: 750px;
              top: 0;
              left: 192px;
              background-color: white;
              z-index: 10001;
              padding: 10px;
              box-sizing: border-box;
              flex-wrap: wrap;
              height: 450px;
              color: black;
              overflow-y: auto;
              scrollbar-width: none;
              .threebox{
                width: 100%;
                border-bottom: 1px solid #eee;
                padding: 3px 10px;
                box-sizing: border-box;
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                .erjicaidan{
                  width: 100px;
                  line-height: 20px;
                  text-align: center;
                  /*border: 1px solid rgb(192,171,131);*/
                  margin-right: 10px;
                  font-size: 0.9rem;
                  font-weight: bold;
                }
                .erjicaidan:hover{
                  color: red;
                  text-decoration: underline;
                }
                .sijicaidan{
                  width: 200px;
                  flex: 1;
                  margin-left: 10px;
                  line-height: 20px;
                  .sijiitem{
                    margin-left: 5px;
                    font-size: 0.9rem;
                  }
                  .sijiitem:hover{
                    color: red;
                    text-decoration: underline;
                  }
                }
              }
            }
            .atcaidanbox::-webkit-scrollbar{
              display: none;
            }
            .allcaidan{
              height: 35px;
              line-height: 35px;
              color: white;
            }
            .erji{
              width: 100%;
              height: 100%;
              overflow-y: auto;
              scrollbar-width: none;
              .caidanitem{
                width: 100%;
                text-align: center;
                height: 30px;
                line-height: 30px;
                border-bottom: 1px solid rgb(70,70,70);
                color: rgb(150,150,150);
                cursor: pointer;
                font-size: 0.9rem;
              }
              .caidanitem:hover{
                background-color: white;
                color: rgb(70,70,70);
              }
            }
            .erji::-webkit-scrollbar{
              display: none;
            }
          }
        }
        .navitem:hover{
          background-color: rgb(196,0,0);
        }
      }
      .navlaba{
        margin-left: 100px;
        display: flex;
        flex-direction: row;
        .labaicon{
          padding: 20px 0;
          box-sizing: border-box;
        }
        .labatext{
          padding: 13px 20px;
          box-sizing: border-box;
          margin-left: 15px;
          width: 260px;
            div{
              width: 100%;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              height: 30px;
              line-height: 30px;
            }
        }
        .labatext:hover{
          background-color: rgb(196,0,0);
          cursor: pointer;
        }
      }
    }
    .bannercont{
      margin-top: 20px;
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      padding: 0 10px;
      box-sizing: border-box;
      .banner{
        width: 100%;
        margin: 0 10px;
      }
      .banneradv{
        width: 260px;
        height: 100%;
        border: 1px solid rgb(192,171,131);
        position: relative;
        img{
          width: 100%;
        }
        .advtishi{
          position: absolute;
          width: 100%;
          text-align: center;
          bottom: 30px;
          left: 0;
        }
        .advname{
          position: absolute;
          width: 100%;
          text-align: center;
          top: 20px;
          left: 0;
        }
      }
    }
    .centerbox{
      width: 80%;
      margin: 20px 10%;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      .newbox{
        display: flex;
        flex-direction: row;
        width: 50%;
        .conteritem{
          font-size: 0px;
          width: 49%;
          margin: 0 0.5%;
          height: 130px;
          background-color: #fff;
          position: relative;
          text-align: left;
          cursor: pointer;
          img{
            height: 100%;
          }
          .contitemat{
            position: absolute;
            width: 100%;
            top: 0px;
            left: 0px;
            padding: 30px 20px;
            box-sizing: border-box;
            font-size: 13px;
            .item_title{
              font-size: 18px;
            }
          }
        }
      }
    }
    .floorbox{
      width: 80%;
      margin-left: 10%;
      .floortop{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        border-bottom: 3px solid rgb(194,128,255);
        .floortitle{
          color: white;
          width: 100px;
          height: 47px;
          line-height: 45px;
          text-align: center;
          font-size: 20px;
          font-weight: bold;
          background-color: rgb(194,128,255);
        }
        .floormore{
          height: 35px;
          line-height: 35px;
          margin-top: 5px;
          cursor: pointer;
        }
        .floormore:hover{
          color: red;
          text-decoration: underline;
        }
      }
      .floorunder{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        padding: 10px 0;
        .flooradv{
          width: 200px;
          height: 440px;
          background-color: rgb(194,235,253);
          overflow: hidden;
          .advtitle{
            width: 100%;
            margin-top:20px;
            padding: 0 12px;
            box-sizing: border-box;
            font-size: 18px;
          }
          .advtype{
            width: 100%;
            margin-top:15px;
            padding: 0 12px;
            box-sizing: border-box;
            color: #0aa6e9;
          }
          .advbtn{
            padding: 0 10px;
            box-sizing: border-box;
            height: 38px;
            background-color: rgba(10, 166, 233, 1);
            text-align: center;
            color: white;
            line-height: 38px;
            margin-left: 12px;
            margin-top: 15px;
            display: inline-block;
          }
          img{
            width: 100%;
            margin-top: 40px;
          }
        }
        .floorbanner{
          width: 350px;
          .floorbaner{
            height: 220px;
            img{
              width: 100%;
            }
          }
        }
        .floorlist{
          flex: 1;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          flex-wrap: wrap;
          background-color: #fff;
          .floorlistitem{
            width: 100/3%;
            height: 220px;
            font-size: 0px;
            text-align: center;
            outline: 1px solid #eee;
            cursor: pointer;
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
              font-size: 0.9rem;
            }
            .fl_itemtitle{
              width: 100%;
              margin: 10px 0;
              padding: 0px 20px;
              box-sizing: border-box;
              font-size: 15px;
              height: 20px;
              line-height: 20px;
              text-align: left;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            .fl_itemaval{
              width: 100%;
              padding: 0px 20px;
              box-sizing: border-box;
              height: 20px;
              line-height: 20px;
              font-size: 0.9rem;
              color: #0aa6e9;
              text-align: left;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            .floorimgbox{
              width: 100%;
              height: 115px;
              margin-top: 10px;
              font-size: 0px;
              overflow: hidden;
              img{
                height: 100%;
              }
              .floorbaner{
                width: 350px;
              }
            }
          }
        }
      }
    }
    .hotgoods{
      width: 100%;
      padding: 10px 10%;
      box-sizing: border-box;
      .hottitle{
        width: 100%;
        text-align: center;
        padding: 0px 0 20px;
        font-size: 18px;
      }
      .hotlist{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        background-color: #fff;
        width: 100%;
        .hotitem{
          width: 100/6%;
          border: 1px solid #eee;
          text-align: center;
          padding: 15px;
          box-sizing: border-box;
          cursor: pointer;
          .itemimgbox{
            width: 100%;
            height: 140px;
            overflow: hidden;
            img{
              width: 50%;
            }
          }
          .houitemtitle{
            width: 100%;
            text-align: left;
            color: rgb(100,100,100);
            margin: 10px 0;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .houitemprice{
            text-align: left;
            font-size: 18px;
            color: red;
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
</style>
<style>
   .banner .el-carousel__container{
    height: 450px!important;
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
</style>
