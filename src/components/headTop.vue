<template>
   <div>
      <h3>后台管理界面<el-button type="info" @click="handleout" style="float:right;margin-top:8px;">退出</el-button></h3>
      <p style="border:1px solid #ddd;padding:25px">
        <el-breadcrumb separator=">>">
          <el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item v-for="(item,index) in $route.meta" key="index" :to="{path: $route.path}">{{item}} </el-breadcrumb-item>
        </el-breadcrumb>
      </p>
   </div>
</template>
<script type="text/javascript">
  export default {
    methods: {
      handleout () {
        if (confirm('是否要退出登录？')) {
          return this.$router.push('/')
        }
      }
    }
  }
</script>
<style scoped lang="less">
  h3{
    line-height:50px;
    text-align:center;
    color:#324057;
    text-shadow:1px 2px #ccc;
    font-size:32px;
  }
</style>
