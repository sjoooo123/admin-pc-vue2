<template>
  <div class="login_page">
    <el-form :model="loginForm" ref="loginForm" class="login_form" label-width="75px">
      <caption>
        <h3>登录</h3>
      </caption>
      <el-form-item label="用户名" prop="username" required>
        <el-input size="small" placeholder="请输入用户名" v-model="loginForm.username" :disabled="submitting"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" required>
        <el-input size="small" placeholder="请输入密码" type="password" v-model="loginForm.password" :disabled="submitting"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="validateCode" required>
        <el-input size="small" placeholder="请输入验证码" v-model="loginForm.validateCode" :disabled="submitting" style="width:112px" @keyup.enter.native="submitForm('loginForm')"></el-input>
        <img class="img_validateCode" :src="verifyImgSrc" alt="点击切换验证码" title="点击切换验证码" @click="validatecode" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('loginForm')" :loading="submitting">登录</el-button>
        <el-button @click="resetForm('loginForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import svc from "@/service";
export default {
  data() {
    return {
      submitting: false,
      verifyImgSrc: "/user/validatecode",
      code: 0,
      loginForm: {
        username: "京品通",
        password: "sckr2002",
        validateCode: ""
      }
    };
  },
  methods: {
    validatecode() {
      this.verifyImgSrc = "/user/validatecode?" + this.code++;
    },
    login() {
      this.submitting = true;
      const formData = new FormData();
      formData.append("username", this.loginForm.username);
      formData.append("password", this.loginForm.password);
      formData.append("validateCode", this.loginForm.validateCode);
      const { data, err } = svc.login(formData);
      this.submitting = false;
      if (err) {
        err.showAlert();
        this.validatecode();
        return;
      }
      localStorage.setItem("username", this.loginForm.username);
      localStorage.setItem(
        "token",
        data.data.tokenType + " " + data.data.value
      );
      window.location.href = "/";
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
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: $--color-primary-light-9;
  .login_form {
    caption {
      display: block;
    }
    background-color: #fff;
    padding: 20px 40px;
    border-radius: 5px;
    box-shadow: 1px 0 5px rgba(0, 0, 0, 0.1);
    .img_validateCode {
      position: relative;
      top: 10px;
      left: 10px;
      height: 30px;
      cursor: pointer;
    }
  }
}
</style>
