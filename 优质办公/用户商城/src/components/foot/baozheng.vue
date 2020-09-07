<template>
  <div class="baozhengbox">
    <div class="bztop">
      <div class="bztop_item">
        <img src="/static/img/u357.png">
        <div class="bzval">100%保证</div>
      </div>
      <div class="bztop_item">
        <img src="/static/img/u360.png">
        <div class="bzval">双重质检</div>
      </div>
      <div class="bztop_item">
        <img src="/static/img/u363.png">
        <div class="bzval">全球化采购</div>
      </div>
      <div class="bztop_item">
        <img src="/static/img/u367.png">
        <div class="bzval">专属价格</div>
      </div>
      <div class="bztop_item">
        <img src="/static/img/u370.png">
        <div class="bzval">万千口碑</div>
      </div>
    </div>
    <div class="bzunder">
      <div class="baunderitem" @click="tocaigou">采购说明</div>
      <div class="baunderitem" @click="togoodslist(4)">最新商品</div>
      <div class="baunderitem" @click="togoodslist(2)">热门促销</div>
    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
        //动态列表回复弹框参数
        answeralertobj:{
          answeralert:false,
          alertitle:'提示',
          content:'',
          btnarr:[{type:0,val:'确定'},{type:2,val:'取消'}]
        },
        username:'',
        userpwd:'',
        mincht:'',
        img:'http://dongwu.siantest.com/san/Login/capcha',
        showforget:false,
      }
    },
    props: {},
    methods: {
      tocaigou(){
        this.$router.push({path:'/caigousm'})
      },
      togoodslist(id){
        this.$router.push({path:'/goods_list',query:{id:id}})
        this.$emit('navfn',{id:id})
      },
    },
    mounted(){
    },
    created() {
      this.mincht = (this.docheight )+'px'
    },
  }
</script>

<style scoped lang="less">
  .baozhengbox{
    padding: 60px 10%;
    box-sizing: border-box;
    border-top: 1px solid rgb(245,245,245);
    margin-top: 30px;
    background-color: #fff;
    margin-bottom: 20px;
    .bztop{
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      font-size: 0;
      padding-bottom: 20px;
      box-sizing: border-box;
      text-align: center;
      border-bottom: 1px solid #eee;
      .bztop_item{
        width: 20%;
        text-align: center;
        .bzval{
          font-size: 0.9rem;
          margin-top: 10px;
        }
      }
    }
    .bzunder{
      width: 100%;
      margin-top: 20px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      .baunderitem{
        width: 20%;
        text-align: center;
        color: rgb(100,100,100);
        cursor: pointer;
      }
      .baunderitem:hover{
        color: red;
        text-decoration: underline;
      }
    }
  }
</style>
