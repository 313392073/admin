<template>
  <div class="manage_page fillcontain">
    <el-row class="left-bar">
      <el-col :span="4" class="left_insidebar">
        <el-menu :router="triggerShow" default-active="manage" mode="vertical" theme="dark" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
          <el-menu-item index="manage"><i class="el-icon-menu"></i>首页</el-menu-item>
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-document"></i>数据管理</template>
              <el-menu-item index="userList">用户列表</el-menu-item>
              <el-menu-item index="shopList">商家列表</el-menu-item>
              <el-menu-item index="foodList">食品列表</el-menu-item>
              <el-menu-item index="orderList">订单列表</el-menu-item>
              <el-menu-item index="adminList">管理员列表</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-plus"></i>添加数据</template>
              <el-menu-item index="addShop">添加商铺</el-menu-item>
              <el-menu-item index="addGoods">添加商品</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-star-on"></i>图表</template>
              <el-menu-item index="1-1">用户分布</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"><i class="el-icon-edit"></i>编辑</template>
              <el-menu-item index="1-1">文本编辑</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title"><i class="el-icon-setting"></i>设置</template>
              <el-menu-item index="1-1">管理员设置</el-menu-item>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title"><i class="el-icon-warning"></i>说明</template>
              <el-menu-item index="1-1">说明</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="20" class="right-bar">
        <div class="main">
          <head-top></head-top>
          <router-view></router-view>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script type="text/javascript">
  import headTop from '../components/headTop.vue'
  export default {
    data () {
      return {
        triggerShow: true
      }
    },
    computed: {
      defaultActive: function () {
        return this.$route.path.replace('/', '')
      }
    },
    methods: {
      handleOpen (key, keyPath) {
        console.log(key)
      },
      handleClose (key, keyPath) {
        console.log(key)
      }
    },
    components: {
      headTop
    }
  }
</script>
<style scoped lang="less">
  .manage_page{
    .left-bar{
      height:100%;
      .left_insidebar{
        height:100%;
        background-color:#324057;
      }
    }
    .right-bar{
      height: 100%;
      overflown: hidden;
    }
  }
</style>
