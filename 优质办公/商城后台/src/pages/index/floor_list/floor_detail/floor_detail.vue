<template>
  <div class="container"   :style="'min-height:'+ mincht">
    <leftnav></leftnav>
    <div class="rightbox">
      <div class="topbox">
        <topnav></topnav>
      </div>
      <!--首页内容-->
      <div v-if="!serching" class="content">
        <div class="listbox">
          <div class="listbox_title">
            楼层详情<el-button size="small" class="return_list" @click="returnback()" >返回列表</el-button>
          </div>
          <div class="show_table">
             <!--展示-->
            <div class="detailcont">
              <div class="itembox">
                <div class="itemname iteminput">楼层名称</div>
                <div class="itemval inputvalbox">
                  <el-input v-model="floorobj.FFloorName" placeholder="请输入楼层名称"></el-input>
                </div>
              </div>
              <div class="itembox">
                <div class="itemname iteminput">楼层轮播图(一)</div>
                <div class="itemval">
                  <div class="upimgbox">
                    <input class="upimage" type="file" @change="handleChange1" accept="image/jpg,image/jpeg,image/png,image/gif">
                    <img :src="imgapis+pic1">
                  </div>
                </div>
              </div>
              <div class="itembox">
                <div class="itemname iteminput">链接(一)</div>
                <div class="itemval inputvalbox">
                  <el-input v-model="url1" placeholder="请输入链接"></el-input>
                </div>
              </div>
              <div class="itembox">
                <div class="itemname iteminput">楼层轮播图(二)</div>
                <div class="itemval">
                  <div class="upimgbox">
                    <input class="upimage" type="file" @change="handleChange2" accept="image/jpg,image/jpeg,image/png,image/gif">
                    <img :src="imgapis+pic2">
                  </div>
                </div>
              </div>
              <div class="itembox">
                <div class="itemname iteminput">链接(二)</div>
                <div class="itemval inputvalbox">
                  <el-input v-model="url2" placeholder="请输入链接"></el-input>
                </div>
              </div>
              <div class="itembox">
                <div class="itemname iteminput">楼层轮播图(三)</div>
                <div class="itemval">
                  <div class="upimgbox">
                    <input class="upimage" type="file" @change="handleChange3" accept="image/jpg,image/jpeg,image/png,image/gif">
                    <img :src="imgapis+pic3">
                  </div>
                </div>
              </div>
              <div class="itembox">
                <div class="itemname iteminput">链接(三)</div>
                <div class="itemval inputvalbox">
                  <el-input v-model="url3" placeholder="请输入链接"></el-input>
                </div>
              </div>
              <div class="itembox" v-if="false">
                <div class="itemname iteminput">楼层分类</div>
                <div class="itemval inputvalbox">
                  <el-select v-model="typesval" placeholder="请选择">
                    <el-option
                      v-for="item in typesarr"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="itembox">
                <div class="itemname iteminput">商品分类</div>
                <div class="itemval inputvalbox">
                  <el-select v-model="navtypeval1" placeholder="请选择" @change="setselct(1)">
                    <el-option
                      v-for="item in navtype"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <el-select v-model="navtypeval2" placeholder="请选择" @change="setselct(2)" style="margin: 0 10px">
                    <el-option
                      v-for="item in navtype2"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <el-select v-model="navtypeval3" @change="setselct" placeholder="请选择">
                    <el-option
                      v-for="item in navtype3"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div style="width: 100%;text-align: center;padding: 10px 0;font-size: 16px;color: rgb(100,100,100)">该楼层下的6个展示商品</div>
              <el-table
                ref="multipleTable"
                :data="productarr"
                tooltip-effect="dark"
                style="width: 80%;margin-left: 10%"
              >
                <el-table-column
                  prop="FMaterialId"
                  label="货号">
                </el-table-column>
                <el-table-column
                  prop="FName"
                  label="商品名称"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="FL1Name"
                  label="一级分类"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="FL2Name"
                  label="二级分类"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="FL3Name"
                  label="三级分类"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  label="操作"
                width="200px">
                  <template slot-scope="scope">
                    <el-button size="small" v-if="scope.row.FMaterialId!=''" type="warning" @click="editefn(scope.row)">修改</el-button>
                    <el-button size="small" v-if="scope.row.FMaterialId!=''" type="danger" @click="delfn(scope.row)">删除</el-button>
                    <el-button size="small" v-if="scope.row.FMaterialId==''" type="primary" @click="addfn">新增</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="btnbox">
              <el-button type="primary" @click="editfloor">保存</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="content" v-if="serching">
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
            楼层详情
          </div>
          <div style="display: flex;flex-direction: row;justify-content: space-between">
            <div></div>
            <div class="serchcont">
              <div class="inputbox">
                <el-input v-model="serchval" placeholder="请输入内容"></el-input>
              </div>
              <el-button size="small" type="primary" @click="serchfn">搜索</el-button>
            </div>
          </div>
          <div class="martial_table">
            <div class="tablebox" >
              <table class="table table-hover" style="margin-top: 20px;border: 1px solid #ddd;font-size: 12px;width: 100%">
                <thead class="graythead">
                <tr class='grayTr'>
                  <td style="padding: 15px 0;text-indent: 9px" width="5%">货号</td>
                  <td style="padding: 15px 0;text-indent: 9px" width="20%">商品名称</td>
                  <td style="padding: 15px 0;text-indent: 9px" width="10%">一级分类名</td>
                  <td style="padding: 15px 0;text-indent: 9px" width="10%">二级分类名</td>
                  <td style="padding: 15px 0;text-indent: 9px" width="10%">三级分类名</td>
                  <td style="padding: 15px 0;text-indent: 9px" width="10%">商品图片</td>
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
                  <td class="sortEdit">
                    <el-button type="primary" @click="surefn(item)">确定</el-button>
                  </td>
                </tr>
                </tbody>
              </table>
              <div v-if="false" class="lodmore" style="width: 100%;height:auto">
                <div class="noimg"><img src="/static/img/nodata.png" alt=""></div>
                <div>暂无相关信息</div>
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
      </div>
    </div>
  </div>
</template>

<script>
  import topnav from '@/components/sannav/top'
  import leftnav from  '@/components/sannav/left'
  export default {
    components: {topnav,leftnav},
    data() {
      return {
        mincht:'',
        name:'',
        floorid:'',
        floorobj:'',
        typesarr:[],
        typesval:'',
        pic1:'/static/img/senadd.jpg',
        pic2:'/static/img/senadd.jpg',
        pic3:'/static/img/senadd.jpg',
        url1:'',
        url2:'',
        url3:'',
//新增需求
        productarr: [],
        goodstype1:[],
        goodsval1:'',
        goodstype2:[],
        goodsval2:'',
        goodstype3:[],
        goodsval3:'',

        navarr:[],
        tablearr:[],
        serchval:'',
        checkall:'',
        serching:false,
        nowpage:1,
        pagenum:8,
        allpage:1,
        navtype:[],
        navtype2:[],
        navtype3:[],
        navtypeval1:'',
        navtypeval2:'',
        navtypeval3:'',
        isadd:false,
        editfid:'',
        editfindex:'',
        editgoodsid:'',
        typeid:0,
      }
    },
    props: {},
    methods: {
      serchfn(){
        if(this.serchval==''){
          return false
        }
        var arr = this.serchval.split(' ')
        var newarr = []
        for(let i = 0;i<arr.length;i++){
          var obj = {
            SearchKey:arr[i]
          }
          newarr.push(obj)
        }
        console.log(newarr)
        let _this = this
        var data = {
            search: newarr,
            FPageIndex: this.nowpage,
            FPageSize: this.pagenum,
        }
        this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
        this.axios.post(this.apis+'/apix/Products/Products/BackSearchProducts',data).then((res)=>{
          if(res.data.statuscode==200){
            _this.tablearr = res.data.data
            _this.allpage = parseInt(res.data.message)
          }
        }).catch((res)=>{})
      },
      addfn(){
        this.isadd = true
        this.serching = true
      },
      delfn(item){
        console.log(item)
        var haveadd = false
        for(let i = 0;i<this.productarr.length;i++){
          if(item.FIndex==this.productarr[i].FIndex){
            this.productarr.splice(i,1)
          }
        }
        for(let i = 0;i<this.productarr.length;i++){
          if(this.productarr[i].FMaterialId==''){
            haveadd = true
          }
        }
        if(!haveadd){
          var obj = {
            FID:'',
            FIndex:'',
            FMaterialId:'',
            FName:'',
            FL1Name:'',
            FL2Name:'',
            FL3Name:'',
          }
          this.productarr.push(obj)
        }
      },
      editefn(item){
        this.isadd = false
        this.serching = true
        console.log(item)
        this.editfid = item.FID
        this.editgoodsid = item.FMaterialId
        this.editfindex = item.FIndex
      },
      surefn(item){
        for(let i = 0;i<this.productarr.length;i++){
          if(item.FMaterialId==this.productarr[i].FMaterialId){
            this.$message('列表已有相同商品')
            return false
          }
        }
        var objitem = {
          FID:this.floorid,
          FIndex:this.productarr.length+1,
          FMaterialId:item.FMaterialId,
          FName:item.FName,
          FL1Name:item.FL1Name,
          FL2Name:item.FL2Name,
          FL3Name:item.FL3Name,
        }
        if(this.isadd){
          this.productarr[this.productarr.length-1] = objitem
          if(this.productarr.length<6){
            var obj = {
              FID:'',
              FIndex:'',
              FMaterialId:'',
              FName:'',
              FL1Name:'',
              FL2Name:'',
              FL3Name:'',
            }
            this.productarr.push(obj)
          }
        }else {
          for(let i = 0;i<this.productarr.length;i++){
            if(this.productarr[i].FMaterialId==this.editgoodsid){
              this.productarr[i] = objitem
            }
          }
        }
        this.serching = false
      },
      changepage(index){
        this.nowpage = index
        this.getproduct(this.typeid)
      },
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
        this.getproduct(this.typeid)
      },

      handleChange1(e){
        let _this = this
        var f = e.target.files
        if(e.length==0){
          return false
        }
        var reads= new FileReader();
        reads.readAsDataURL(f[0]);
        reads.onload=function (event) {
          _this.pic1 = event.target.result
        };
      },
      handleChange2(e){
        let _this = this
        var f = e.target.files
        if(e.length==0){
          return false
        }
        var reads= new FileReader();
        reads.readAsDataURL(f[0]);
        reads.onload=function (event) {
          _this.pic2 = event.target.result
        };
      },
      handleChange3(e){
        let _this = this
        var f = e.target.files
        if(e.length==0){
          return false
        }
        var reads= new FileReader();
        reads.readAsDataURL(f[0]);
        reads.onload=function (event) {
          _this.pic3 = event.target.result
        };
      },
      editfloor(){
        let _this = this
        var arr = this.floorobj.Rotations
        for(let i = 0;i<arr.length;i++){
          if(i==0){
            if(this.pic1=='/static/img/senadd.jpg'||''){
              arr[i].FUrl = ''
            }else {
              arr[i].FUrl = this.pic1
            }
            arr[i].FGetUrl = this.url1
          }else if(i==1){
            if(this.pic2=='/static/img/senadd.jpg'||''){
              arr[i].FUrl = ''
            }else {
              arr[i].FUrl = this.pic2
            }
            arr[i].FUrl = this.pic2
            arr[i].FGetUrl = this.url2
          }else if(i==2){
            if(this.pic3=='/static/img/senadd.jpg'||''){
              arr[i].FUrl = ''
            }else {
              arr[i].FUrl = this.pic3
            }
            arr[i].FUrl = this.pic3
            arr[i].FGetUrl = this.url3
          }
        }

        var product =this.productarr
        for(let i = 0;i<product.length;i++){
          for(let j = 0;j<product.length;j++){
            if(i!=j&&product[i].FMaterialId==product[j].FMaterialId){
              _this.$message('列表中商品不能有重复')
              return false
            }
          }
        }
        for(let i = 0;i<product.length;i++){
          if(product[i].FMaterialId==''){
            product.splice(i,1)
          }
        }
        for(let i = 0;i<product.length;i++){
          product[i].FIndex = i+1
        }
        var FCategoryID = this.navtypeval1
        if(this.navtypeval3!=''){
          FCategoryID = this.navtypeval3
        }else if(this.navtypeval2!=''){
          FCategoryID = this.navtypeval2
        }
        var data = {
          FID: this.floorid,
          FFloorName:this.floorobj.FFloorName,
          FCategoryID:FCategoryID,
          rotations:arr,
          ProcuctLists:product,
        }
        this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
        this.axios.post(this.apis+'/apix/Products/Products/EditFloor',data).then((res)=>{
          console.log(res)
          if(res.data.statuscode==200){
            _this.$message({
              message: '操作成功',
              type: 'success'
            });
            _this.$router.push({path:'/floor_list'})
          }else {
            _this.$message(res.data.message)
          }
        }).catch((res)=>{})
      },
      returnback(){
        this.$router.go(-1)
      },

      setselct(type){
        if(type==1){
          this.navtypeval2 = ''
          this.navtypeval3 = ''
        }else if(type==2){
          this.navtypeval3 = ''
        }
        this.navtype2 = []
        this.navtype3 = []
        for(let i = 0;i<this.navtype.length;i++){
          if(this.navtype[i].FRegionId==this.navtypeval1){
            this.navtype2 = this.navtype[i].children
            for(let j = 0;j<this.navtype[i].children.length;j++){
              if(this.navtype[i].children[j].FRegionId==this.navtypeval2){
                console.log(this.navtype[i].children[j].children)
                this.navtype3 = this.navtype[i].children[j].children
              }
            }
          }
        }
      },
      setdata(data){
        for(let i = 0;i<data.length;i++){
          if(data[i].FID==this.floorid){
            this.floorobj = data[i]
            this.typesval = data[i].FCategoryID
          }
          data[i]['label'] = data[i].FFloorName
          data[i]['value'] = data[i].FCategoryID
        }
        this.typesarr = data
        for(let i = 0;i<this.floorobj.Rotations.length;i++){
          if(i==0){
            this.pic1 = this.floorobj.Rotations[i].FUrl
            this.url1 = this.floorobj.Rotations[i].FGetUrl
          }else if(i==1){
            this.pic2 = this.floorobj.Rotations[i].FUrl
            this.url2 = this.floorobj.Rotations[i].FGetUrl
          }else if(i==2){
            this.pic3 = this.floorobj.Rotations[i].FUrl
            this.url3 = this.floorobj.Rotations[i].FGetUrl
          }
        }

        var arr = [
          {val:"需要展示的物料",children:[{
              val:"生活用品",children:[{
                val:"手机",children:[{
                  val:"华为",children:[]
                }]
              }],
            }]}
        ]
        var arr2 = [
          {
            val:"生活用品",children:[{
              val:"手机",children:[{
                val:"华为",children:[]
              }]
            }],
          }
        ]
        //设置商品分类
        this.navtype = data[0].FCategoryTree
        for(let i = 0;i<this.navtype.length;i++){
          if(this.navtype[i].FRegionId==data[0].FCategoryID){
            this.navtypeval1 = this.navtype[i].FRegionId
          }
          this.navtype[i]['value'] = this.navtype[i].FRegionId
          this.navtype[i]['label'] = this.navtype[i].FNameRegion
          for(let j = 0;j<this.navtype[i].children.length;j++){
            if(this.navtype[i].children[j].FRegionId==data[0].FCategoryID){
              this.navtypeval1 = this.navtype[i].FRegionId
              this.navtypeval2 = this.navtype[i].children[j].FRegionId
            }
            this.navtype[i].children[j]['value'] = this.navtype[i].children[j].FRegionId
            this.navtype[i].children[j]['label'] = this.navtype[i].children[j].FNameRegion
            for(let k = 0;k<this.navtype[i].children[j].children.length;k++){
              if(this.navtype[i].children[j].children[k].FRegionId==data[0].FCategoryID){
                this.navtypeval1 = this.navtype[i].FRegionId
                this.navtypeval2 = this.navtype[i].children[j].FRegionId
                this.navtypeval3 = this.navtype[i].children[j].children[k].FRegionId
              }
              this.navtype[i].children[j].children[k]['value'] = this.navtype[i].children[j].children[k].FRegionId
              this.navtype[i].children[j].children[k]['label'] = this.navtype[i].children[j].children[k].FNameRegion
            }
          }
        }
        this.productarr = data[0].FProctList
        if(this.productarr.length<6){
          var obj = {
            FID:'',
            FIndex:'',
            FMaterialId:'',
            FName:'',
            FL1Name:'',
            FL2Name:'',
            FL3Name:'',
          }
          this.productarr.push(obj)
        }
        this.setselct()
      },
      getdata(){
        let _this = this
        var data = {
          params: {
            FID:this.floorid,
          }
        }
        this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
        this.axios.get(this.apis+'/apix/Products/Products/BackFloorDetails',data).then((res)=>{
          console.log(res)
          if(res.data.statuscode==200){
            _this.setdata(res.data.data)
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
      getproduct(id){
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
    },
    mounted(){
      this.mincht = (this.docheight )  +'px'
    },
    created() {
      if(!localStorage.getItem('token')){
        this.$router.push({path:'/login'})
        return false
      }
      this.floorid = this.$route.query.id
      document.title = '楼层详情'
      this.getdata()
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
          }
          .serchcont{
            display: flex;
            margin-top: 20px;
            margin-right: 20px;
            .inputbox{
              margin-right: 15px;
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
          .show_table{
            width: 100%;
            padding: 30px 25px;
            box-sizing: border-box;
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
                }
              }
            }
            .btnbox{
              width: 80%;
              margin-left: 20%;
              padding: 10px 30px;
              box-sizing: border-box;
              margin-top: 20px;
            }
          }
        }
      }
    }
  }
</style>
<style>
  .inputvalbox .el-select{
    width: 100%;
  }
</style>
