<template>
  <div class="container"   :style="'min-height:'+ mincht">
    <leftnav></leftnav>
    <div class="rightbox">
      <div class="topbox">
        <topnav></topnav>
      </div>
      <!--首页内容-->
      <div class="content">
        <div class="listbox">
          <div class="listbox_title">
            商品详情<el-button size="small" class="return_list" @click="returnback()" >返回列表</el-button>
          </div>
          <div class="show_table">
             <!--展示-->
            <div class="detailcont">
              <div class="itembox">
                <div class="itemname iteminput">商品名称</div>
                <div class="itemval inputvalbox">
                  <el-input :disabled="true" v-model="goodsdetail.FName" placeholder="请输入商品名称"></el-input>
                </div>
              </div>
              <div class="itembox">
                <div class="itemname iteminput">商品编号</div>
                <div class="itemval inputvalbox">
                  <el-input :disabled="true" v-model="goodsdetail.FMaterialNumber" placeholder="请输入商品编号"></el-input>
                </div>
              </div>
              <div class="itembox" v-if="false">
                <div class="itemname iteminput">商品分类</div>
                <div class="itemval inputvalbox">
                  <el-select v-model="typesval" placeholder="请选择">
                    <el-option
                      v-for="item in typesarr"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <!--<el-input v-model="name" placeholder="请输入商品名称"></el-input>-->
                </div>
              </div>
              <div class="itembox">
                <div class="itemname">商品说明</div>
                <div class="itemval inputvalbox">
                  <el-input
                    type="textarea"
                    :rows="3"
                    placeholder="请输入商品介绍文"
                    v-model="goodsdetail.FInfo">
                  </el-input>
                </div>
              </div>
              <div class="itembox">
                <div class="itemname">商品详情</div>
                <div class="itemval inputvalbox" style="display: flex;flex-direction: column">
                  <div class="edit_container">
                    <quill-editor
                      v-model="content"
                      ref="myQuillEditor"
                      :options="editorOption"
                      @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                      @change="onEditorChange($event)">
                    </quill-editor>
                  </div>
                </div>
              </div>
              <div class="itembox">
                <div class="itemname">商品图片</div>
                <div class="itemval">
                  <div class="upimgbox">
                    <input class="upimage" type="file" @change="handleChange" accept="image/jpg,image/jpeg,image/png,image/gif">
                    <img id="imgDom" :src="suoluetu">
                  </div>
                </div>
              </div>
              <div class="itembox">
                <div class="itemname">商品图片</div>
                <div class="itemval">
                  <div class="upimgbox">
                    <input class="upimage" type="file" @change="handleChange1" accept="image/jpg,image/jpeg,image/png,image/gif">
                    <img id="imgDom1" :src="pic1">
                  </div>
                  <div class="upimgbox">
                    <input class="upimage" type="file" @change="handleChange2" accept="image/jpg,image/jpeg,image/png,image/gif">
                    <img id="imgDom2" :src="pic2">
                  </div>
                  <div class="upimgbox">
                    <input class="upimage" type="file" @change="handleChange3" accept="image/jpg,image/jpeg,image/png,image/gif">
                    <img id="imgDom3" :src="pic3">
                  </div>
                </div>
              </div>
              <div class="itembox">
                <div class="itemname">标签</div>
                <div class="itemval">
                  <div class="tagitem">
                    <div class="tagname">上架:</div>
                    <div class="tagval">
                      <el-switch
                        v-model="tag1">
                      </el-switch>
                    </div>
                  </div>
                  <div class="tagitem">
                    <div class="tagname">新品:</div>
                    <div class="tagval">
                      <el-switch
                        v-model="tag2">
                      </el-switch>
                    </div>
                  </div>
                  <div class="tagitem">
                    <div class="tagname">推荐:</div>
                    <div class="tagval">
                      <el-switch
                        v-model="tag3">
                      </el-switch>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="btnbox">
              <!--<el-button type="primary">新增</el-button>-->
              <el-button type="primary" @click="submits">保存</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import topnav from '@/components/sannav/top'
  import leftnav from '@/components/sannav/left'
  import { quillEditor } from "vue-quill-editor"; //调用编辑器
  import 'quill/dist/quill.core.css';
  import 'quill/dist/quill.snow.css';
  import 'quill/dist/quill.bubble.css';
  export default {
    components: {topnav,leftnav,quillEditor},
    data() {
      return {
        mincht:'',
        name:'',
        FMaterialId:'',
        tag1:false,
        tag2:false,
        tag3:false,
        typesarr:[{
          value: 'shenghuo',
          label: '生活用品'
        }, {
          value: 'qiche',
          label: '汽车用品'
        }, {
          value: 'dianzi',
          label: '电子产品'
        }, {
          value: 'tuijian',
          label: '推荐产品'
        }],
        typesval:'',
        goodsdetail:'',
        miaoshu:'',
        //ue
        content:'',
        editorOption: {
          modules:{
            toolbar:[
              ['bold', 'italic', 'underline', 'strike'], //加粗，斜体，下划线，删除线
              [{ 'header': 1 }, { 'header': 2 }],  // 标题，键值对的形式；1、2表示字体大小
              [{ 'indent': '-1'}, { 'indent': '+1' }],  // 缩进
              [{ 'direction': 'rtl' }],    // 文本方向
              [{ 'size': ['small', false, 'large', 'huge'] }], // 字体大小
              [{ 'align': [] }], //对齐方式
              ['clean'], //清除字体样式
              ['image','video'] //上传图片、上传视频
            ]
          }
        },
        suoluetu:'/static/img/senadd.jpg',
        pic1:'/static/img/senadd.jpg',
        pic2:'/static/img/senadd.jpg',
        pic3:'/static/img/senadd.jpg',
      }
    },
    props: {},
    methods: {
      submits(){
        let _this = this
        console.log(this.pic1)
        console.log(this.pic2)
        console.log(this.pic3)
        this.goodsdetail.FImages = []
        this.goodsdetail.FImages.push({FmaterialId:this.FMaterialId,FIndex:1,FUrl:this.pic1=='/static/img/senadd.jpg'?' ':this.pic1})
        this.goodsdetail.FImages.push({FmaterialId:this.FMaterialId,FIndex:2,FUrl:this.pic2=='/static/img/senadd.jpg'?' ':this.pic2})
        this.goodsdetail.FImages.push({FmaterialId:this.FMaterialId,FIndex:3,FUrl:this.pic3=='/static/img/senadd.jpg'?' ':this.pic3})
        var data = {
            FUrl:this.suoluetu=='/static/img/senadd.jpg'?'':this.suoluetu,
            FMaterialId:this.FMaterialId,
            FDetail:this.content,
            FInfo:this.goodsdetail.FInfo,
            Pictures:this.goodsdetail.FImages,
            FIsMarketable:this.tag1?1:0,
            FIsNew:this.tag2?1:0,
            FIsRecommand:this.tag3?1:0,
        }
        this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
        this.axios.post(this.apis+'/apix/Products/Products/NewProduct',data).then((res)=>{
          if(res.data.statuscode==200){
            _this.$message({
              message: '操作成功',
              type: 'success'
            });
            _this.$router.push({path:'/goods_list'})
          }else {
            _this.$message(res.data.message)
          }
        }).catch((res)=>{
        })
      },
      // 编辑器
      onEditorReady(editor) { // 准备编辑器
      },
      onEditorBlur(){}, // 失去焦点事件
      onEditorFocus(){
      }, // 获得焦点事件
      onEditorChange(){}, // 内容改变事件
      handleChange(e){
        let _this = this
        var imgFile = e.target.files[0]; // 获取图片文件
        if(e.length==0){
          return false
        }
        var fr = new FileReader();       // 读取文件
        fr.readAsDataURL(imgFile);
        fr.onload = function () {        // 图片读取完成后
          _this.suoluetu = fr.result;			// 读取到的图片路径是Base64的
          // var img =  document.getElementById('imgDom');    // 获取图片DOM
          // setTimeout(function(){                           // 因为获取数据会出现一点数据顺序问题  所以要做一下延迟
          //   var w = img.naturalWidth;    // 获取Base64图片的原始图片大小
          //   var h = img.naturalHeight;
          //   //生成canvas
          //   var canvas = document.createElement('canvas');
          //   var ctx = canvas.getContext('2d');    // 创建属性节点
          //   var anw = document.createAttribute("width");
          //   anw.nodeValue = w;
          //   var anh = document.createAttribute("height");
          //   anh.nodeValue = h;
          //   canvas.setAttributeNode(anw);
          //   canvas.setAttributeNode(anh);
          //   ctx.drawImage(img, 0, 0, w, h);
          //   // .7值越小，所绘制出的图像越模糊
          //   _this.suoluetu = canvas.toDataURL('image/jpeg',.4);
          // },100);
        }
      },
      handleChange1(e){
        let _this = this
        var imgFile = e.target.files[0]; // 获取图片文件
        if(e.length==0){
          return false
        }
        var fr = new FileReader();       // 读取文件
        fr.readAsDataURL(imgFile);
        fr.onload = function () {        // 图片读取完成后
          _this.pic1 = fr.result;			// 读取到的图片路径是Base64的
        }
      },
      handleChange2(e){
        let _this = this
        var imgFile = e.target.files[0]; // 获取图片文件
        if(e.length==0){
          return false
        }
        var fr = new FileReader();       // 读取文件
        fr.readAsDataURL(imgFile);
        fr.onload = function () {        // 图片读取完成后
          _this.pic2 = fr.result;			// 读取到的图片路径是Base64的
        }
      },
      handleChange3(e){
        let _this = this
        var imgFile = e.target.files[0]; // 获取图片文件
        if(e.length==0){
          return false
        }
        var fr = new FileReader();       // 读取文件
        fr.readAsDataURL(imgFile);
        fr.onload = function () {        // 图片读取完成后
          _this.pic3 = fr.result;			//
        }
      },
      returnback(){
        this.$router.go(-1)
      },
      setdata(data){
        if(data.FImages.length>0){
          for(let i =0;i<data.FImages.length;i++){
            if(i==0){
              this.pic1 = this.imgapis+data.FImages[i].FUrl
            }else if(i==1){
              this.pic2 = this.imgapis+data.FImages[i].FUrl
            }else if(i==2){
              this.pic3= this.imgapis+data.FImages[i].FUrl
            }
          }
        }
        if(data.FIsMarketable==1){
            this.tag1 = true
        }
        if(data.FIsNew==1){
          this.tag2 = true
        }
        if(data.FIsRecommand==1){
          this.tag3 = true
        }
        this.suoluetu = this.imgapis+data.FUrl
        this.goodsdetail = data
      },
      getdata(){
        let _this = this
        var data = {
          params: {
            FMaterialId:this.FMaterialId,
          }
        }
        this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
        this.axios.get(this.apis+'/apix/Products/Products/BackProductDetail',data).then((res)=>{
          if(res.data.statuscode==200){
            _this.content = res.data.data.FDetail
            _this.setdata(res.data.data)
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
      this.FMaterialId = this.$route.query.id
      this.getdata()
      document.title = '商品详情'
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
        .listbox{
          width: 97%;
          margin-top: 20px;
          margin-bottom: 30px;
          margin-left: 1.5%;
          min-height: 400px;
          background-color: white;
          .listbox_title{
            padding: 15px 0px 15px 30px;
            font-size: 12px;
            border-bottom: 1px solid #e4e4e4;
            .return_list{
              margin-left:85%;
              text-decoration:none;
              color: #666666;
              display: inline-block;
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
                  .uesave{
                    width: 120px;
                    height: 40px;
                    line-height: 40px;
                    text-align: center;
                    background-color: deepskyblue;
                    color: white;
                    cursor: pointer;
                    margin-top: 15px;
                  }
                  .uesave:hover{
                    background-color: rgb(0,150,255);
                  }
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
