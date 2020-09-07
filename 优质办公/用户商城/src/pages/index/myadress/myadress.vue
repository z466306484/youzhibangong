<template>
  <div class="container">
    <top></top>
    <topnav></topnav>
    <div class="ordercont">
      <div class="topnavbox">
        <div class="topnavitem">收货地址</div>
        <div class="addadress" @click="showaddfn">新增地址</div>
      </div>
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
            <td style="padding: 15px 0;text-indent: 9px" width="10%">操作</td>
          </tr>
          </thead>
          <tbody >
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
            <td class="sortEdit caozuo" >
              <div class="caozuobtn" @click="upadress(item)">修改</div>
              <div class="caozuobtn" @click="deladress(item.FId)">删除</div>
              <div class="caozuobtn" @click="setmoren(item.FId)">设为默认</div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <order_left></order_left>
    </div>
    <baozheng></baozheng>
    <foot></foot>
    <confirm v-model="showadd"
             :title="adresstitle"
             :hide-on-blur="true"
             @on-confirm="onConfirm"
             @on-cancel="onCancel"
             @on-show="onShow"
             @on-hide="onHide"
    >
      <div class="detailcont">
        <div class="itembox">
          <div class="itemname iteminput"><span style="color: red">*</span>收货人:</div>
          <div class="itemval inputvalbox">
            <el-input v-model="addadrobj.FRecieveName" placeholder="请输入收货人"></el-input>
          </div>
        </div>
        <div class="itembox">
          <div class="itemname iteminput"><span style="color: red">*</span>选择地址:</div>
          <div class="itemval inputvalbox">
            <el-select v-model="addadrobj.FProvinceId" placeholder="请选择省" @change="changesheng">
              <el-option
                v-for="item in shengarr"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="addadrobj.FCityId" placeholder="请选择市" @change="changeshi">
              <el-option
                v-for="item in shiarr"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="addadrobj.FDistrictId" placeholder="请选择区">
              <el-option
                v-for="item in quarr"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="itembox">
          <div class="itemname iteminput"><span style="color: red">*</span>详细地址:</div>
          <div class="itemval inputvalbox">
            <el-input v-model="addadrobj.FAddress" placeholder="请输入详细地址"></el-input>
          </div>
        </div>
        <div class="itembox">
          <div class="itemname iteminput"><span style="color: red">*</span>手机号码:</div>
          <div class="itemval inputvalbox">
            <el-input v-model="addadrobj.FMobilePhone" placeholder="请输入手机号码"></el-input>
          </div>
        </div>
        <div class="itembox">
          <div class="itemname iteminput">固定电话:</div>
          <div class="itemval inputvalbox">
            <el-input v-model="addadrobj.FPhone" placeholder="请输入手机号码"></el-input>
          </div>
        </div>
      </div>
    </confirm>
  </div>
</template>

<script>
  import foot from '@/components/foot/foot'
  import baozheng from '@/components/foot/baozheng'
  import top from '@/components/top/top'
  import topnav from '@/components/top/topnav'
  import order_left from '@/components/order_left/order_left'
  import { Confirm } from 'vux'
  export default {
    components: {foot,baozheng,top,topnav,order_left,Confirm},
    data() {
      return {
        showadd:false,
        isadd:true,
        sheng:'',
        shi:'',
        qu:'',
        shengarr:[],
        shiarr:[],
        quarr:[],
        adresstitle:'新增收货地址',
        addadrobj:{
          FId: 0,
          FUid: 0,
          fRecieveName: "zhangsan",
          FProvinceId: 140000,
          FCityId: 140300,
          FDistrictId: 140302,
          FZipCode: 0,
          FPhone: "string",
          FMobilePhone: "string",
          FIsDefault: true,
          FAddress: "string"
        },
        adresslist:[],
        alladress:[],
        itemradio:-1,
      }
    },
    props: {},
    methods:{
      upadress(item){
        this.addadrobj = item
        this.isadd = false
        this.setupdzarr()
        this.adresstitle = '修改收货地址'
        this.showadd = true
      },
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
              message: '设置成功!'
            });
            _this.getdata()
          }else {
            _this.$message(res.data.message)
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
          console.log(data)
          _this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
          _this.axios.post(_this.apis+'/apix/User/User/DelUserAddr',data).then((res)=>{
            if(res.data.statuscode==200){
              _this.$message({
                type: 'success',
                message: '删除成功!'
              });
              _this.getdata()
            }else {
              _this.$message(res.data.message)
            }
          })
        }).catch(() => {
        });
      },
      showaddfn(){
        this.shiarr = []
        this.quarr = []
        this.addadrobj = {
          FId: '',
          FUid: '',
          FRecieveName: "",
          FProvinceId: '',
          FCityId: '',
          FDistrictId: '',
          FZipCode: '',
          FPhone: "",
          FMobilePhone: "",
          FIsDefault: false,
          FAddress: ""
        }
        this.adresstitle = '新增收货地址'
        this.isadd = true
        this.showadd = true
      },
      onConfirm(){
        let _this = this
        this.addadrobj.FUid = localStorage.getItem('FId')
        if(this.addadrobj.FRecieveName==''){
          this.$message('收货人姓名不能为空');
          return false
        }else if(this.addadrobj.FProvinceId==''){
          this.$message('请选择省');
          return false
        }else if(this.addadrobj.FCityId==''){
          this.$message('请选择市');
          return false
        }else if(this.addadrobj.FDistrictId==''){
          this.$message('请选择区');
          return false
        }else if(this.addadrobj.FAddress==''){
          this.$message('详细地址不能为空');
          return false
        }else if(this.addadrobj.FMobilePhone==''){
          this.$message('手机号不能为空');
          return false
        }
        var data = this.addadrobj
        var url = this.apis+'/api/User/EditUserAddr'
        if(this.isadd){
           url = this.apis+'/apix/User/User/AddUserAddr'
        }
        this.axios.post(url,data).then((res)=>{
          this.$message(res.data.message);
          if(res.data.statuscode==200){
            _this.getdata()
          }else {
          }
        }).catch((res)=>{
          this.$message(res.Message);
        })
      },
      onCancel(){},
      onShow(){},
      onHide(){},
      handleClick(e){
        if(e.name = 'first'){
        }else if(e.name = 'second'){
        }
      },
      getdata(){
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
          }else {
          }
        }).catch((res)=>{
        })
      },
      changeshi(type){
          this.addadrobj.FDistrictId = ''
          this.quarr = []

        for(let j = 0;j<this.shiarr.length;j++){
          if(this.addadrobj.FCityId==this.shiarr[j].value){
            for(let i = 0;i<this.shiarr[j].children.length;i++){
              this.shiarr[j].children[i].value = this.shiarr[j].children[i].FRegionId
              this.shiarr[j].children[i].label = this.shiarr[j].children[i].FNameRegion
            }
            this.quarr = this.shiarr[j].children
          }
        }
      },
      changesheng(type){
          this.addadrobj.FCityId = ''
          this.addadrobj.FDistrictId = ''
          this.shiarr = []
          this.quarr = []
          for(let j = 0;j<this.alladress.length;j++){
            if(this.addadrobj.FProvinceId==this.alladress[j].value){
              for(let i = 0;i<this.alladress[j].children.length;i++){
                this.alladress[j].children[i].value = this.alladress[j].children[i].FRegionId
                this.alladress[j].children[i].label = this.alladress[j].children[i].FNameRegion
              }
              this.shiarr = this.alladress[j].children
            }
          }
      },
      setupdzarr(){
        for(let j = 0;j<this.alladress.length;j++){
          if(this.addadrobj.FProvinceId==this.alladress[j].value){
            for(let i = 0;i<this.alladress[j].children.length;i++){
              this.alladress[j].children[i].value = this.alladress[j].children[i].FRegionId
              this.alladress[j].children[i].label = this.alladress[j].children[i].FNameRegion
            }
            this.shiarr = this.alladress[j].children
          }
        }
        for(let j = 0;j<this.shiarr.length;j++){
          if(this.addadrobj.FCityId==this.shiarr[j].value){
            for(let i = 0;i<this.shiarr[j].children.length;i++){
              this.shiarr[j].children[i].value = this.shiarr[j].children[i].FRegionId
              this.shiarr[j].children[i].label = this.shiarr[j].children[i].FNameRegion
            }
            this.quarr = this.shiarr[j].children
          }
        }
      },//设置点击修改地址时候的省市区
      setadress(data){
        for(let i = 0;i<data.length;i++){
          data[i].value = data[i].FRegionId
          data[i].label = data[i].FNameRegion
        }
        this.shengarr = data
      },
      getsheng(){
        let _this = this
        var data = {
          params: {}
        }
        this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
        this.axios.get(this.apis+'/apix/User/User/AllAddress',data).then((res)=>{
          if(res.data.statuscode==200){
            _this.alladress =res.data.data
            _this.setadress(res.data.data)
          }else {
          }
        }).catch((res)=>{
          this.$message(res.Message);
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
      this.getsheng()
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
        .topnavitem{
          line-height: 30px;
        }
        .topnavitem:hover{
          color: red;
          text-decoration: underline;
          cursor: pointer;
        }
        .addadress{
          cursor: pointer;
          width: 120px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          background-color: rgb(190,0,0);
          color: white;
        }
        .addadress:hover{
          background-color: rgb(150,0,0);
        }
      }
      .shouhuobox{
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
      }
    }
    .detailcont{
      width: 100%;
      .itembox{
        width: 100%;
        display: flex;
        padding: 15px 0;
        box-sizing: border-box;
        .itemname{
          width: 20%;
          text-align: right;
          margin-right: 30px;
        }
        .iteminput{
          line-height: 40px;
        }
        .itemval{
          display: flex;
          .upimgbox{
            width: 80px;
            height: 80px;
            position: relative;
            margin-right: 25px;
            .videobox{
              position: absolute;
              width: 100%;
              height: 100%;
              opacity: 0;
              z-index: 100;
              #videobtn{
                width: 80px;
                height: 80px;
              }
            }
            .upimage{
              position: absolute;
              width: 100%;
              height: 100%;
              opacity: 0;
              z-index: 100;
            }
            img{
              width: 100%;
              height: 100%;
            }
          }
          .tagitem{
            width: 100%;
            display: flex;
            margin-right: 30px;
            .tagname{
              margin-right: 10px;
            }
            .tagval{
              position: relative;
              top: -1px;
            }
          }
        }
        .inputvalbox{
          width: 400px;
          .biemingitem{
            display: flex;
            height: 30px;
            padding: 0 10px;
            line-height: 30px;
            box-sizing: border-box;
            border: 1px solid #eee;
            margin-top: 5px;
            margin-right: 15px;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>
<style>
  .weui-dialog{
    width: 60%!important;
    max-width: 1900px!important;
  }
  .weui-dialog__btn_primary{
    color: rgb(150,0,0)!important;
  }
  .el-select-dropdown,.el-popper{
    z-index: 20000!important;
  }
</style>
