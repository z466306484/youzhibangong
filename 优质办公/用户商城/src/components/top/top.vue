<template>
  <div class="topbox">
    <div class="topcont">
      <div class="logobox">
        <img src="/static/img/u84.png">
      </div>
      <div class="serbox">
        <div class="inputbox">
          <input v-model="serchval" @keydown="keydownfn($event)" placeholder="请输入商品信息......" />
        </div>
        <div class="serchbtn" @click="toserch">搜索</div>
      </div>
      <div class="topuser">
        <div class="username">
          <span class="username2" @click="touserinfo">欢迎,{{username}}</span>
          <span class="outlogin" style="margin-left: 10px" @click="outfn">退出</span>
        </div>
        <div class="myshop" @click="tosave">收藏夹</div>
        <div class="mycard" @click="tocard">
          <span class="iconfont icon-qicheqianlian-"></span>
          <span>购物车</span>
        </div>
      </div>
    </div>
    <div class="kefubox">
      <div class="kefiitem" @click="kefu(1)">
        <div class="qqicon iconfont icon-icon"></div>
        <div>1号客服</div>
      </div>
      <div class="kefiitem" @click="kefu(2)">
        <div class="qqicon iconfont icon-icon"></div>
        <div>2号客服</div>
      </div>
      <div class="kefiitem" @click="kefu(3)">
        <div class="qqicon iconfont icon-icon"></div>
        <div>3号客服</div>
      </div>
    </div>
    <iframe style="display:none;" class="qq_iframe" src=""></iframe>
    <div class="totopbox iconfont icon-zhidingtop" @click="totop()"></div>
  </div>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
        mincht:'',
        serchval:'',
        username:'',
      }
    },
    props: {},
    methods: {
      keydownfn(e){
        console.log(e)
        if(e.keyCode==13){
          this.toserch()
        }
      },
      totop(){
        $('html, body').animate({scrollTop: $('.container').offset().top}, 1000)
      },
      outfn(){
        this.$router.push({path:'/login'})
      },
      kefu(id){
        var qq = ''
        if(id==1){
          qq = 2638997660
        }else if(id==2){
          qq = 2324515946
        }else if(id==3){
          qq = 1812778799
        }
        var src = "tencent://message/?uin="+qq+"&Site=&menu=yes";
        $('.qq_iframe').attr('src',src);
      },
      touserinfo(){
        this.$router.push({path:'/userinfo'})
      },
      tosave(){
        this.$router.push({path:'/mysave'})
      },
      tocard(){
        this.$router.push({path:'/card'})
        this.$emit('tocardfn')
      },
      getuser(){
        let _this = this
        var data = {
          params: {
            FUId:localStorage.getItem('FId'),
          }
        }
        this.axios.defaults.headers.common["token"] = localStorage.getItem('token');
        this.axios.get(this.apis+'/apix/User/User/UserInfo',data).then((res)=>{
          if(res.data.statuscode==200){
          }else {
          }
        }).catch((res)=>{
          console.log(res)
        })
      },
      toserch(){
        console.log(this.$route.path)
        if(this.$route.path=='/goods_list'){
          this.$emit('serchfn',{serchval:this.serchval})
        }else {
          this.$router.push({path:'/goods_list',query:{id:0,serchval:this.serchval}})
        }
      },
    },
    mounted(){
    },
    created() {
      this.mincht = (this.docheight )+'px'
      this.username = localStorage.getItem('FLoginName')
      if(!localStorage.getItem('token')){
        this.$router.push({path:'/login'})
        return false
      }
      this.getuser()
    },
  }
</script>

<style scoped lang="less">
  .topbox{
    width: 100%;
    background-color: #fff;
    .topcont{
      width: 100%;
      padding: 10px 0;
      height: 60px;
      overflow: hidden;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      .logobox{
        width: 100px;
        height: 40px;
        margin: 10px;
        background-color: #fff;
        text-align: center;
        line-height: 40px;
        img{
          height: 100%;
        }
      }
      .serbox{
        margin-top: 10px;
        background-color: #fff;
        border: 3px solid red;
        display: flex;
        justify-content: flex-start;
        flex-direction: row;
        height: 40px;
        .inputbox{
          height: 40px;
          width: 600px;
          input{
            width: 100%;
            height: 36px;
            border: none;
            outline: none;
            text-indent: 15px;
          }
        }
        .serchbtn{
          width: 101px;
          height: 41px;
          background-color: red;
          color: white;
          line-height: 40px;
          text-align: center;
          cursor: pointer;
        }
      }
      .topuser{
        width: 300px;
        height: 40px;
        line-height: 40px;
        margin-top: 15px;
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        .username,.myshop,.mycard{
          cursor: pointer;
          position: relative;

          .outlogin{
            width: 100px;
            z-index: 2000000;
            box-sizing: border-box;
            background-color: #fff;
            text-align: center;
            top: 20px;
            left: -10px;
          }
          .outlogin:hover,.username2:hover{
            color: red;
            text-decoration: underline;
          }
        }
        .myshop:hover,.mycard:hover{
          text-decoration: underline;
          color: red;
        }
      }
    }
    .kefubox{
      position: fixed;
      width: 70px;
      text-align: center;
      bottom: 50px;
      right: 50px;
      z-index: 200000;
      .kefiitem{
        background-color: rgba(0,0,0,0.7);
        margin-top: 15px;
        width: 100%;
        color: rgba(200,200,200);
        cursor: pointer;
        height: 70px;
        .qqicon{
          height: 50px;
          font-size: 45px;
          line-height: 50px;
        }
      }
      .kefiitem:hover{
        color: white;
      }
    }
    .totopbox{
      width: 70px;
      height: 70px;
      color: rgb(190,0,0);
      z-index: 200000;
      position: fixed;
      right: 50px;
      bottom: 320px;
      font-size: 50px;
      text-align: center;
      line-height: 70px;
    }
    .totopbox:hover{
      color: rgb(150,0,0);
      cursor: pointer;
    }
  }
</style>
