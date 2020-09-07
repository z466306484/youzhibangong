<template>
  <div class="orderatleft">
    <el-row class="tac">
      <el-col :span="24">
        <el-menu
          :default-active="this.$route.path"
          :unique-opened="true"
          :collapse-transition="false"
          router
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          color="#c0c4cc"
          background-color="white"
          text-color="black"
          active-text-color="red">
          <div class="left_logo">
          </div>
          <el-submenu index="1">
            <template slot="title">
              <i class="iconfont iconshouye"></i>
              <span>订单中心</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/order">我的订单</el-menu-item>
              <el-menu-item index="/order_shenpi">审核订单</el-menu-item>
              <el-menu-item index="/tuihuo">退货订单</el-menu-item>
              <el-menu-item index="/mysave">我的收藏</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="iconfont iconziliao"></i>
              <span>账户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/myadress">收货地址</el-menu-item>
              <el-menu-item index="/userinfo">个人资料</el-menu-item>
              <el-menu-item index="/pwd">密码管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="iconfont iconziliao"></i>
              <span>预算管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/yusuan">采购预算</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="iconfont iconziliao"></i>
              <span>报表管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/baobiao">采购报表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
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
      handleOpen(){},
      handleClose(){},
    },
    mounted(){
    },
    created() {
      this.mincht = (this.docheight )+'px'
    },
  }
</script>

<style scoped lang="less">
  .orderatleft{
    width: 20%;
    position: absolute;
    left: -22%;
    top: 0px;
    background-color: #fff;
    box-sizing: border-box;
  }
</style>
<style>
  .el-submenu .el-menu-item{
    min-width: 34px!important;
  }
</style>
