<template>
  <div class="login_page fillcontain">
    <div class="login_box">
      <div class="manage_tip">
        <h3>后台管理系统</h3>
      </div>
      <el-form :model="loginForm" :rules="rules" ref="loginForm" class="logonForm">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="用户名"><span>dsfsf</span></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登陆</el-button>
          </el-form-item>
      </el-form>
      <div class="tips">
        <p>温馨提示</p>
        <p>未登录过的新用户，自动注册</p>
        <p>注册过的用户可凭账号密码登录</p>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  export default {
    data () {
      return {
        showLogin: true,
        loginForm: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            {required: true, message: '用户名不能为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      submitForm () {
        if (confirm('是否要登录主页？')) {
          this.$router.push('manage')
        }
      }
    }
  }
</script>
<style lang="less">
  .login_page{
    width:100%;
    height:100%;
    background-color: #324057;
    color: #fff;
    position:relative;
    .login_box{
      width:320px;
      height:210px;
      position:absolute;
      left: 50%;
      top:50%;
      margin-top: -105px;
      margin-left: -160px;
      background-color:#fff;
      border-radius:8px;
      padding:30px;
      .manage_tip{
        width:100%;
        position:absolute;
        top:-80px;
        left:0;
        text-align:center;
        font-size:30px;
      }
      .submit_btn{
        width: 100%;
      }
      .tips{
        color:red;
        &>p{
          font-size:12px;
        }
      }
    }

  }
</style>
