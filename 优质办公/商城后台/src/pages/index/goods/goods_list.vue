<template>
  <div class="container" v-if="showpage" :style="'min-height:'+ mincht">
    <leftnav></leftnav>
    <div class="rightbox">
      <div class="topbox">
        <topnav></topnav>
      </div>
      <!--首页内容-->
      <div class="content">
        <div class="goodsnav">
          <div class="onelist" v-for="item in navarr">
            <div class="oneval" @click="oneclick(item)">
              <div>
                <span v-if="item.active" style="color: #66b1ff">{{item.FNameRegion}}</span>
                <span v-if="!item.active">{{item.FNameRegion}}</span>
              </div>
              <div :class="!item.active?'iconfont icon-jiantou-copy-copy':'iconfont icon-jiantou-copy-copy-copy'"></div>
            </div>
            <div v-if="item.active" class="twolist" v-for="item2 in item.children">
              <div class="twoval" @click="twoclick(item2)">
                <div>
                  <span v-if="item2.active" style="color: #66b1ff">{{item2.FNameRegion}}</span>
                  <span v-if="!item2.active">{{item2.FNameRegion}}</span>
                </div>
                <div :class="!item2.active?'iconfont icon-jiantou-copy-copy':'iconfont icon-jiantou-copy-copy-copy'"></div>
              </div>
              <div v-if="item2.active" class="threelist" v-for="item3 in item2.children">
                <div class="threeval" @click="threeclick(item,item2,item3)">
                  <span v-if="item3.active" style="color: #66b1ff">{{item3.FNameRegion}}</span>
                  <span v-if="!item3.active">{{item3.FNameRegion}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="listbox">
          <div class="listbox_title">
            <div>商品列表</div>
          </div>
          <div class="martial_table" >
            <div class="tablebox">
              <table class="table table-hover" style="margin-top: 20px;border: 1px solid #ddd;font-size: 12px;width: 100%">
                <thead class="graythead">
                <tr class='grayTr'>
                  <td style="padding: 15px 0;text-indent: 9px" width="5%">货号</td>
                  <td style="padding: 15px 0;text-indent: 9px" width="20%">商品名称</td>
                  <td style="padding: 15px 0;text-indent: 9px" width="10%">一级分类名</td>
                  <td style="padding: 15px 0;text-indent: 9px" width="10%">二级分类名</td>
                  <td style="padding: 15px 0;text-indent: 9px" width="10%">三级分类名</td>
                  <td style="padding: 15px 0;text-indent: 9px" width="10%">商品图片</td>
                  <td style="padding: 15px 0;text-indent: 9px" width="20%">商品说明</td>
                  <td style="padding: 15px 0;text-indent: 9px" width="20%">操作</td>
                </tr>
                </thead>
                <tbody  v-if="tablearr.length>0">
                <tr v-for="(item,index) in tablearr" class="table_td">
                  <td class="sortEdit" >{{item.FMaterialId}}</td>
                  <td class="sortEdit" >{{item.FName}}</td>
                  <td class="sortEdit" >{{item.FL1Name}}</td>
                  <td class="sortEdit" >{{item.FL2Name}}</td>
                  <td class="sortEdit" >{{item.FL3Name}}</td>
                  <td class="sortEditimg">
                    <img :src="imgapis+item.FUrl" height="80px">
                  </td>
                  <td class="sortEdit" >{{item.FDescription}}</td>
                  <td class="sortEdit">
                    <span class="btnbox" style="margin-right: 10px" @click="todetail(item.FMaterialId)">编辑</span>
                  </td>
                </tr>
                </tbody>
              </table>
              <div v-if="false" class="lodmore" style="width: 100%;height:auto">
                <div class="noimg"><img src="/static/img/nodata.png" alt=""></div>
                <div>暂无相关信息</div>
              </div>
            </div>
          </div>
          <div class="pagenav">
            <el-pagination
              background
              layout="prev, pager, next"
              :page-size="pagenum"
              @current-change="changepage"
              :total="allpage*pagenum">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <popup  :alertobj="alertobj" @alterdetai="alterdetai($event)"></popup>
  </div>
</template>

<script>
  import topnav from '@/components/sannav/top'
  import leftnav from  '@/components/sannav/left'
  import popup from '@/components/sanpopup/sanpopup'
  export default {
    components: {leftnav,topnav,popup},
    data() {
      return {
        mincht:'',
        showpage:true,
        //表格数据
        //禁用弹框参数
        alertobj:{
          delalert:false,
          alertitle:'删除提示',
          content:'确定要删除这个商品吗？',
          btnarr:[{type:0,val:'确定'},{type:2,val:'取消'}]
        },
        // 禁用列表id
        selectid:'',
        tablearr:[],
        nowpage:1,
        pagenum:8,
        allpage:1,
        typeid:0,
        //新增
        navarr:[],
        serchval:'',
        checkall:'',
      }
    },
    props: {},
    methods: {
      oneclick(item){
        for(let i = 0;i<this.navarr.length;i++){
          if(item.FRegionId==this.navarr[i].FRegionId){
            this.navarr[i].active = !this.navarr[i].active
            if(!this.navarr[i].active){
              for(let j = 0;j<this.navarr[i].children.length;j++){
                this.navarr[i].children[j].active = false
              }
            }
          }
        }
      },
      twoclick(item){
        for(let i = 0;i<this.navarr.length;i++){
          for(let j = 0;j<this.navarr[i].children.length;j++){
            if(this.navarr[i].children[j].FRegionId==item.FRegionId){
              this.navarr[i].children[j].active = !this.navarr[i].children[j].active
            }
          }
        }
      },
      threeclick(item,item2,item3){
        this.tablearr = []
        var data = this.navarr
        for(let i = 0;i<data.length;i++){
          for(let j = 0;j<data[i].children.length;j++){
            for(let k = 0;k<data[i].children[j].children.length;k++){
              data[i].children[j].children[k].active = false
            }
          }
        }
        for(let i = 0;i<data.length;i++){
          this.navarr[i].active=  false
        }
        for(let i = 0;i<data.length;i++){
          for(let j = 0;j<data[i].children.length;j++){
            this.navarr[i].children[j].active=  false
          }
        }
        item.active = true
        item2.active = true
        item3.active = true
        this.typeid = item3.FRegionId
        this.getdata(this.typeid)
      },
      handleOpen(){},
      handleClose(){},
      changepage(index){
        this.nowpage = index
        this.getdata(this.typeid)
      }, // 分页
      alterdetai(e){
        this.alertobj.delalert = false
        console.log(e)
      },
      delfn(){
        this.alertobj.delalert = true
      },
      todetail(id){
        this.$router.push({path:'/goods_detail',query:{id:id}})
      },
      findfn(){},
      getdata(id){
        let _this = this
        var data = {
          params: {
            FCategoryId: id,
            fPageIndex: this.nowpage,
            fPageSize: this.pagenum,
          }
        }
        this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
        this.axios.get(this.apis+'/apix/Products/Products/ProductList',data).then((res)=>{
          console.log(res)
          if(res.data.statuscode==200){
            _this.tablearr = res.data.data
            _this.allpage = parseInt(res.data.message)
          }
        }).catch((res)=>{})
      },
      setnav(data){
        for(let i = 0;i<data.length;i++){
          data[i]['active'] = false
          for(let j = 0;j<data[i].children.length;j++){
            data[i].children[j]['active'] = false
            for(let k = 0;k<data[i].children[j].children.length;k++){
              data[i].children[j].children[k].active = false
            }
          }
        }
        this.navarr = data
      },
      getnav(){
        let _this = this
        var data = {
          params: {}
        }
        this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
        this.axios.get(this.apis+'/apix/Category/Category/MenuTree',data).then((res)=>{
          if(res.data.statuscode==200){
            _this.setnav(res.data.data[0].children)
          }
        }).catch((res)=>{
        })
      },
    },
    mounted(){
      this.mincht = (this.docheight )  +'px'
    },
    created() {
      if(!localStorage.getItem('token')){
        this.$router.push({path:'/login'})
        return false
      }
      document.title = '商品列表'
      this.getdata(this.typeid)
      this.getnav()
    },
  }
</script>

<style scoped lang="less">
  .container{
    display: flex;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    .rightbox{
      width: 87%;
      height: 100%;
      max-height: 100%;
      margin-left: 200px;
      display: flex;
      flex-direction: column;
      .topbox{
        width: 100%;
        height: 71px;
      }
      .content{
        flex: 1;
        overflow-y: auto;
        width: 100%;
        background-color: #f2f2f2;
        display: flex;
        flex-direction: row;
        .goodsnav{
          width: 14%;
          margin-left: 1%;
          margin-top: 20px;
          background-color: #fff;
          .onelist{
            width: 100%;
            transition: all 1s linear;
            .oneval{
              width: 100%;
              line-height: 30px;
              padding: 10px 10px;
              box-sizing: border-box;
              display: flex;
              flex-direction: row;
              justify-content: space-between;
            }
            .twolist{
              width: 100%;
              transition: all 1s linear;
              .twoval{
                line-height: 30px;
                width: 100%;
                padding: 10px 10px 10px 30px;
                box-sizing: border-box;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
              }
              .twoval:hover{
                background-color: rgb(236,245,255);
                cursor: pointer;
              }
              .threelist{
                width: 100%;
                transition: all 1s linear;
                .threeval{
                  line-height: 30px;
                  width: 100%;
                  padding: 10px 50px;
                  box-sizing: border-box;
                }
                .threeval:hover{
                  background-color: rgb(236,245,255);
                  cursor: pointer;
                }
              }
            }
            .oneval:hover{
              background-color: rgb(236,245,255);
              cursor: pointer;
            }
          }
        }
        .listbox{
          width: 82%;
          flex: 1;
          margin-top: 20px;
          margin-bottom: 30px;
          margin-left: 1.5%;
          margin-right: 1.5%;
          min-height: 500px;
          background-color: white;
          padding-bottom: 20px;
          .martial_table{
            width: 95.5%;
            margin-left: 2.5%;
            min-height: 300px;
            .table{
              border-collapse:collapse;
              .graythead{
                background-color: #f2f2f2;
              }
            }
            /*暂无数据*/
            .lodmore{
              padding: 20px 0;
              box-sizing: border-box;
              text-align: center;
              color: rgb(200,200,200);
              font-size: 14px;
            }
            .noimg{
              width: 100%;
              margin-bottom: 10px;
            }
            .noimg>img{
              width: 40px;
            }

            .imgdiv{
              display: flex;
            }
            .table_td{
              border-bottom: 1px solid #e6e6e6;
              td{
                padding-left: 9px;
              }
            }
            .sortEdit{
              line-height: 30px !important;
              padding: 5px 0;
              box-sizing: border-box;
              .btnbox{
                cursor: pointer;
              }
            }
            .sortEditimg{
              font-size: 0;padding: 5px 0;box-sizing: border-box
            }
            .table_td:hover{
              background-color: #f2f2f2;
            }
            .sortEdit>.imgdiv{
              display: flex;
            }
          }
          .pagenav{
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: center;
            margin-top: 20px;
          }
          .listbox_title{
            padding: 15px 30px;
            font-size: 12px;
            border-bottom: 1px solid #e4e4e4;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            box-sizing: border-box;
            .serchcont{
              display: flex;
              .inputbox{
                margin-right: 15px;
              }
            }
          }
          .listbox_do{
            /* display: flex;*/
            margin-top: 30px;
            min-height: 30px;
            margin-bottom: 30px;
            .list_inputs{
              width:auto;
              float: right;
              margin-right: 2%;
              .topinput{
                width: auto;
              }
            }
            .addbox{
              width: 30%;
              float: left;
              margin-left:2.5%;
              .shownum{
                font-size: 14px;
                color: #333333;
              }
            }
          }
        }
      }
    }
  }
  .sortEdit>.imgdiv{
    display: flex;
  }
</style>
