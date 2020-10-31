<template>
  <div class="login_page" :style="'background:#182b58 url(' + bgUrl + ') no-repeat center center; background-size: cover;'">
    <div class="login-box">
      <div class="logo_box">
          <h3 id="bigtitle">{{title}}</h3>
          <img :src="picUrl" class="logo" alt="logo">
      </div>
      <el-form class="login_form" :model="loginForm" ref="loginForm" label-width="75px">
        <caption>
          <h3>登录</h3>
        </caption>
        <el-form-item label="用户名" prop="username" required>
          <el-input placeholder="请输入用户名" v-model="loginForm.username" :disabled="submitting" @keyup.enter.native="submitForm('loginForm')"></el-input>
        </el-form-item>
        <el-form-item label="密 码" prop="password" required>
          <el-input placeholder="请输入密码" type="password" v-model="loginForm.password" :disabled="submitting" @keyup.enter.native="submitForm('loginForm')"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="validateCode" required>
          <el-input placeholder="请输入验证码" v-model="loginForm.validateCode" :disabled="submitting" style="width:55%; vertical-align: top;" @keyup.enter.native="submitForm('loginForm')"></el-input>
          <img class="img_validateCode" :src="verifyImgSrc" alt="点击切换验证码" title="点击切换验证码" @click="validatecode" />
        </el-form-item>
        <el-form-item class="submitButton">
          <el-button type="primary" @click="submitForm('loginForm')" :loading="submitting">登录</el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <p class="copyright">sjoooo123</p>
  </div>
</template>
<script>
import picUrl from "@/assets/images/login_1.png";
import bgUrl from "@/assets/images/login_bg.png";
export default {
  data() {
    return {
      title: process.env.VUE_APP_TITLE,
      picUrl: picUrl,
      bgUrl: bgUrl,
      submitting: false,
      verifyImgSrc: "/images/verifyCode.png",
      code: 0,
      loginForm: {
        username: "",
        password: "",
        validateCode: "xxx"
      }
    };
  },
  methods: {
    validatecode() {
      // this.verifyImgSrc = "/user/validatecode?" + this.code++;
    },
    async login() {
      const params = {
        name: this.loginForm.username,
        password: this.loginForm.password
      };
      this.submitting = true;
      console.log(this)
      const res = await this.$svc.login_post(params);
      this.submitting = false;
      if(!res) return; // res为undefined，出错中止
      localStorage.setItem('token', res.data.data.token);
      // 获取初始化消息-比如菜单
      this.submitting = true;
      const res2 = await this.$svc.admin_user_self_get();
      this.submitting = false;
      if(!res2) return; // res为undefined，出错中止
      localStorage.setItem('menus', JSON.stringify(res2.data.data.menus));
      localStorage.setItem('user', JSON.stringify(res2.data.data.user));
      localStorage.setItem('role', JSON.stringify(res2.data.data.role));
      this.$router.push({path: "/"});
      
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.login();
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/element-variables.scss";
.login_page {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  .login-box{
    position: relative;
    width: 950px;
    height: 560px;
    background: linear-gradient(140deg, #55acff, #2042b8);
    border-radius: 4px;
    overflow: hidden;
    .logo_box{
      width: 535px;
      height: 100%;
      padding: 20px 40px;
      box-sizing: border-box;
      text-align: center;
      font-size: 28px;
      font-weight: bold;
      color: #edf2ff;
      letter-spacing: 1px;
      text-shadow: 5px 2px 2px #2042b8;
      #bigtitle{
        font-size: 32px;
        white-space: nowrap;
        position: relative;
        left: -25px;
      }
    }
    .login_form {
      caption {
        display: block;
      }
      position: absolute;
      right: 0;
      top: 0;
      width: 415px;
      height: 100%;
      padding: 100px 60px;
      box-sizing: border-box;
      background-color: #fff;
      .img_validateCode {
        position: relative;
        top: 0;
        left: 20px;
        max-width: calc(45% - 20px);
        height: 40px;
        border-radius: 4px;
        cursor: pointer;
      }
    }
  }
  .copyright{
    position: absolute;
    bottom: 4.5%;
    color: #fff;
  }
}
</style>
