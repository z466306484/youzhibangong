<template>
  <div class="container">
    <top></top>
    <topnav></topnav>
    <div class="ordercont">
      <div class="topnavbox">
        <div class="topnavitem">
          <span :class="item.active?'navspan2':'navspan'" v-for="item in navarr" style="margin: 0 10px" @click="clicknav(item)">{{item.val}}</span>
        </div>
      </div>
      <div class="serchcont">
        <div class="block">
          <el-date-picker
            v-model="timeval"
            type="daterange"
            @change="changetime"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <el-button size="small" type="primary" style="margin-left: 10px" @click="serchfn">查询</el-button>
        <el-button size="small" type="primary" @click="daochufn">导出</el-button>
      </div>
      <div class="yusuanbox">
        <div class="three">
          <div class="tablebox">
            <el-table
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%"
            >
              <el-table-column
                label="序号">
                <template slot-scope="scope">
                  {{ scope.$index + (nowpage - 1) * pagenum + 1 }}
                </template>
              </el-table-column>
              <el-table-column
                prop="FMaterialNumber"
                label="商品编号">
              </el-table-column>
              <el-table-column
                prop="FMaterialName"
                label="商品名称"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="FPrice"
                label="单价"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="FUnitName"
                label="单位"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="FQty"
                label="数量"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="FAmount"
                label="总价"
                show-overflow-tooltip>
              </el-table-column>
            </el-table>
          </div>
          <div class="pagenav">
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
        timeval:'',
        pagenum:20,
        nowpage:1,
        allpage:1,
        navarr:[
          {val:'商品类别分布',active:false,id:0},
          {val:'部门费用走势',active:false,id:1},
          {val:'采购排行',active:true,id:2},
        ],
        tableData: [],
      }
    },
    props: {},
    methods:{
      serchfn(){
        this.getdata()
      },
      daochufn(){
        var starttime = new Date().toISOString().split('T')[0]
        var endtime = new Date((new Date()).valueOf()-1000*3600*24*365).toISOString().split('T')[0]
        var start2 = ''
        var end2 = ''
        if(this.timeval){
          start2 = new Date(this.timeval[0].valueOf()+1000*3600*24).toISOString().split('T')[0]
          end2 = new Date(this.timeval[1].valueOf()+1000*3600*24).toISOString().split('T')[0]
        }
        var data = {
          BeginDate:this.timeval?start2:starttime,
          EndDate:this.timeval?end2:endtime,
          FUserID:localStorage.getItem('FId'),
          // FUserID:'10110',
          FType:0,
        }
        window.location.href = this.apis+ '/apix/Export/Export/ExportPurRankToExcel?BeginDate='+data.BeginDate+'&EndDate='+data.EndDate+'&FUserID='+data.FUserID+'&FType='+data.FType
      },
      clicknav(item){
        if(item.id==0){
          this.$router.push({path:'/baobiao'})
        }else if(item.id==1){
          this.$router.push({path:'/baobiao1'})
        }
      },
      changetime(){},
      changepage(index){
        this.nowpage= index
        this.getdata()
      },
      getdata(){
        let _this = this
        var starttime = new Date().toISOString().split('T')[0]
        var endtime = new Date((new Date()).valueOf()-1000*3600*24*365).toISOString().split('T')[0]
        var start2 = ''
        var end2 = ''
        if(this.timeval){
          start2 = new Date(this.timeval[0].valueOf()+1000*3600*24).toISOString().split('T')[0]
          end2 = new Date(this.timeval[1].valueOf()+1000*3600*24).toISOString().split('T')[0]
        }
        var data = {
          BeginDate:this.timeval?start2:starttime,
          EndDate:this.timeval?end2:endtime,
          FUserID:localStorage.getItem('FId'),
          // BeginDate:'2019-03-01',
          // EndDate:'2020-03-01',
          // FUserID:'10146',
          FType:0,
          FPageIndex:this.nowpage,
          FPageSize:this.pagenum,
        }
        var url = '/apix/Export/Export/RptPurRank'
        this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
          this.axios.post(this.apis+url,data).then((res)=>{
            if(res.data.statuscode==200){
              _this.allpage = parseInt(res.data.message)
              _this.tableData = res.data.data
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
        .topnavitem{
          .navspan:hover{
            color: red;
            text-decoration: underline;
            cursor: pointer;
          }
          .navspan2{
            color: red;
          }
        }
      }
      .serchcont{
        width: 100%;
        display: flex;
        margin: 20px 0 10px;
      }
      .yusuanbox{
        width: 100%;
        .three{
          width: 100%;
          .tablebox{
            width: 90%;
            margin: 0px auto;
            margin-top: 30px;
            box-shadow: 0 0 5px rgb(150,150,150);
            padding: 10px;
            box-sizing: border-box;
          }
          .pagenav{
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: center;
            margin-top: 20px;
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
  .el-pager li.active:hover{
    color: white !important;
  }
  .echart>div{
    width: 100%!important;
  }
</style>
