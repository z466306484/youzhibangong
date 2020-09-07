<template>
  <div class="topnavbox">
    <div class="navitem" v-if="showcaidan" style="padding: 20px 70px;" @mouseover="showtlistfn" @mouseleave="closelistfn">
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
</template>

<script>
  export default {
    components: {},
    data() {
      return {
        navarr:[
          {val:'首页',id:1,active:false},
          {val:'热卖',id:2,active:false},
          {val:'推荐',id:3,active:false},
          {val:'新品',id:4,active:false},
          {val:'最近购买',id:5,active:false},
        ],

        twolist:[],//二级菜单列表
        threelistnow:[],//三级菜单列表
        threebox:false,//显示三级菜单
        showlist:false,//显示二级菜单
      }
    },
    props: {
      showcaidan:{},
    },
    methods: {
      showtlistfn(){
        this.showlist = true
      },
      closelistfn(){
        this.showlist = false
      },
      tomore(id,val){
        this.$emit('tomore',{floorid:id,topnavval:val})
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
      closethree(){
        this.threebox = false
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

      navfn(id){
        if(id==1){
          this.$router.push({path:'/home'})
        }else{
          this.$router.push({path:'/goods_list',query:{id:id}})
        }
        this.$emit('navfn',{id:id})
      }
    },
    mounted(){
    },
    created() {
      if(this.showcaidan){
        this.getlist()
      }
      this.mincht = (this.docheight )+'px'
    },
  }
</script>

<style scoped lang="less">
  .topnavbox{
    width: 100%;
    background-color: rgb(226,52,52);
    color: white;
    padding: 0 30px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: center;
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
    .navitem:hover{
      background-color: rgb(196,0,0);
    }
  }
</style>
