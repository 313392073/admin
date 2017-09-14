<template>
  <div class="data_section">
    <el-row :gutter="20">
      <el-col :span="12" :offset="6"><p class="title">{{title}}</p></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8"><div class="grid-content" style="background-color:#13CE66;">当日数据:</div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple">6571 API请求量</div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple">API请求量</div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple">API请求量</div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple">API请求量</div></el-col>
    </el-row>
    <el-row :gutter="20" style="margin-bottom: 50px;">
      <el-col :span="8"><div class="grid-content" style="background-color:#20A0FF;">总数据:</div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple">6571 API请求量</div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple">API请求量</div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple">API请求量</div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple">API请求量</div></el-col>
    </el-row>
    <tendency></tendency>
  </div>
</template>
<script type="text/javascript">
  import tendency from '../components/tendency.vue'
  export default {
    data () {
      return {
        title: '数据统计'
      }
    },
    components: {tendency}
  }
</script>
<style scoped lang="less">
  .data_section{
    padding:20px;
    .title{
      text-align: center;
      font-size: 26px;
      color: #222;
    }
    .el-row {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .el-col {
      border-radius: 4px;
    }
    .bg-purple-dark {
      background: #99a9bf;
    }
    .bg-purple {
      background: #d3dce6;
    }
    .bg-purple-light {
      background: #e5e9f2;
    }
    .grid-content {
      border-radius: 4px;
      min-height: 36px;
      line-height: 34px;
      text-align: center;
    }
    .row-bg {
      padding: 10px 0;
      background-color: #f9fafc;
    }
  }

</style>
