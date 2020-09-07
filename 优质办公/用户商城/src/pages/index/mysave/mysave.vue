<template>
  <div class="container">
    <top></top>
    <topnav></topnav>
    <div class="ordercont">
      <div class="topnavbox">
        <div class="topnavitem">我的收藏夹</div>
        <div>你共收藏了{{savelist.length}}个商品</div>
      </div>
      <div class="savecont">
        <div class="savetop">
          <el-checkbox v-model="checkall" @change="checkallfn">全选</el-checkbox>
          <div class="delbtn" @click="delsave(-1)">删除</div>
        </div>
        <div class="savelist">
          <div class="saveitem" v-for="item in savelist">
            <div class="checkbpx"><el-checkbox v-model="item.check" @change="checkfn(item)"></el-checkbox></div>
            <div class="saveinfo">
              <div class="saveimg">
                <img :src="imgapi+item.FUrl">
              </div>
              <div class="saveinfocont">
                <div class="savetitle">{{item.FName}}</div>
                <div class="saveprice"><span style="color: red;font-size: 18px">￥{{item.Fprice}}</span></div>
              </div>
            </div>
            <div class="savebtnbox">
              <div class="savebtn" @click="goodsdetail(item)">查看详情</div>
              <div class="savebtn" @click="delsave(item.FID)">删除</div>
            </div>
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
        checkall:false,
        savelist:[],
      }
    },
    props: {},
    methods:{
      delsave(id){
        let _this = this
        var fidarr = []
        if(id!=-1){
          fidarr.push(id)
        }else if(id==-1){
          for(let i= 0;i<this.savelist.length;i++){
            if(this.savelist[i].check==true){
              fidarr.push(this.savelist[i].FID)
            }
          }
        }
        this.$confirm('此操作将永久删除该收藏商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var data = {
            FUId:localStorage.getItem('FId'),
            FID:fidarr,
          }
          this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
          _this.axios.post(_this.apis+'/apix/Products/Products/DelFavourite',data).then((res)=>{
            if(res.data.statuscode==200){
              _this.$message({
                type: 'success',
                message: '删除成功!'
              });
              _this.getdata()
            }else {
              _this.$message(res.data.msg)
            }
          }).catch((res)=>{
          })
        }).catch(() => {
        });
      },
      checkfn(item){
        if(item.check) {
          var checkall = true
          for(let i= 0;i<this.savelist.length;i++){
            if(this.savelist[i].check==false){
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
      },
      checkallfn(){
        if(!this.checkall){
          for(let i= 0;i<this.savelist.length;i++){
            this.savelist[i].check = false
          }
        }else {
          for(let i= 0;i<this.savelist.length;i++){
            this.savelist[i].check = true
          }
        }
      },
      goodsdetail(item){
        this.$router.push({path:'/goods_detail',query:{id:item.FMaterialId}})
      },
      setdata(data){
        for(let i = 0;i<data.length;i++){
          data[i]['check'] = false
        }
        this.savelist = data
      },
      getdata(){
        let _this = this
        console.log(2222)
        var data = {
          params: {
            FUId:localStorage.getItem('FId'),
            FCustId:localStorage.getItem('FCustId'),
          }
        }
        this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
        this.axios.get(this.apis+'/apix/Products/Products/FavouriteDetail',data).then((res)=>{
          if(res.data.statuscode==200){
            _this.setdata(res.data.data)
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
        justify-content: space-between;
        border-bottom: 1px solid #eee;
        .topnavitem:hover{
          color: red;
          text-decoration: underline;
          cursor: pointer;
        }
      }
      .savecont{
        width: 100%;
        margin-top: 20px;
        .savetop{
          padding: 10px;
          box-sizing: border-box;
          border-bottom: 1px solid #eee;
          display: flex;
          .delbtn{
            height: 30px;
            width: 80px;
            text-align: center;
            line-height: 30px;
            color: white;
            background-color: rgb(190,0,0);
            position: relative;
            top: -5px;
            cursor: pointer;
          }
          .delbtn:hover{
            background-color: rgb(150,0,0);
          }
        }
        .savelist{
          width: 100%;
          .saveitem{
            width: 100%;
            padding: 20px 10px;
            box-sizing: border-box;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            border-bottom: 1px solid #eee;
            .checkbpx{
              width: 60px;
              height: 80px;
              display: flex;
              justify-content: center;
              flex-direction: column;
            }
            .saveinfo{
              flex: 1;
              display: flex;
              flex-direction: row;
              justify-content: flex-start;
              .saveimg{
                height: 80px;
                font-size: 0px;
                img{
                  height: 100%;
                }
              }
              .saveinfocont{
                height: 80px;
                display: flex;
                flex-direction: column;
                justify-content: center;
              }
            }
            .savebtnbox{
              width: 120px;
              margin-left: 10px;
              height: 80px;
              display: flex;
              flex-direction: column;
              justify-content: center;
              .savebtn{
                height: 30px;
                width: 120px;
                text-align: center;
                line-height: 30px;
                border: 1px solid #eee;
                cursor: pointer;
                margin: 5px 0;
              }
              .savebtn:hover{
                color: rgb(150,0,0);
                border:1px solid rgb(150,0,0);
              }
            }
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
