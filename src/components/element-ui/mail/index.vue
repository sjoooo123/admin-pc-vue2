<template>
  <el-dialog v-dialogDrag :title="oldemail ? '更改邮箱':'绑定邮箱'" :visible.sync="visible" width="1200px" class="add-dialog">
    <el-form :model="dynamicValidateForm" :rules="rules" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
      <el-form-item prop="email" label="电子邮箱">
        <el-input v-model="dynamicValidateForm.email" class="email"></el-input>
      </el-form-item>
      <el-form-item prop="emailcode" label="邮箱验证码">
        <el-input v-model="dynamicValidateForm.emailcode" class="emailcode"></el-input>
        <el-button type="primary" plain size="small" @click="sendcode" class="emailbtn" :disabled="disabled_btn">{{font_btn}}</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('dynamicValidateForm')" size="small">保存</el-button>
        <el-button @click="resetForm('dynamicValidateForm')" size="small">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  data() {
    var emailPass = (rule, value, callback) => {
      var reg = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (value === null || value === "") {
        callback(new Error("请输入邮箱"));
        this.disabled_btn = true;
        this.flag_btn = "0";
      } else if (value == this.oldemail && value !== "") {
        callback(new Error("已绑定邮箱不可获取验证码"));
        this.disabled_btn = true;
        this.flag_btn = "0";
      } else if (reg.test(value)) {
        callback();
        this.disabled_btn = false;
        this.flag_btn = "1";
      } else {
        callback(new Error("邮箱格式输入有误，请重新输入"));
        this.disabled_btn = true;
        this.flag_btn = "0";
      }
    };
    var emailcodePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else {
        callback();
      }
    };
    return {
      visible: false,
      disabled_btn: true,
      font_btn: "获取邮箱验证码",
      time_btn: "60",
      flag_btn: "0",
      random_num: "",
      oldemail: "",
      dynamicValidateForm: {
        email: "",
        emailcode: ""
      },
      rules: {
        email: [
          { required: true, validator: emailPass, trigger: ["blur", "change"] }
        ],
        emailcode: [
          {
            required: true,
            validator: emailcodePass,
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  methods: {
    //显示弹窗
    switchShow(flag, email) {
      this.visible = flag;
      this.oldemail = email; //判断是否存在原邮箱
      this.dynamicValidateForm.email = email; //绑定原邮箱的值
      this.dynamicValidateForm.emailcode = ""; //清空验证码
    },
    //提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.random(); //生成随机码
          this.contact(); //调取接口方法
          this.$refs[formName].resetFields(); //对表单进行重置
        } else {
          return false;
        }
      });
    },
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //生成任意5位字符串
    random() {
      var chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var maxPos = chars.length;
      var pwd = "";
      for (var i = 0; i < 5; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos));
      }
      this.random_num = pwd;
    },
    //点击获取邮箱验证码按钮
    sendcode() {
      this.disabled_btn = true; //对按钮进行禁用
      this.random(); //生成随机码
      this.validatecode(); //调取接口方法
      //对点击后的按钮进行操作
      this.font_btn = "(" + this.time_btn + "s" + ")" + "后重新发送";
      let clock = window.setInterval(() => {
        this.time_btn--;
        this.font_btn = "(" + this.time_btn + "s" + ")" + "后重新发送";
        if (this.time_btn < 0) {
          window.clearInterval(clock);
          this.time_btn = 60;
          if (this.flag_btn == "0") {
            this.font_btn = "获取邮箱验证码";
            this.disabled_btn = true;
          } else {
            this.font_btn = "重新发送验证码";
            this.disabled_btn = false;
          }
        }
      }, 1000);
    },
    //获取验证码 调取接口
    async validatecode() {
      let para = {
        functionId: "1",
        type: "1",
        contact: this.dynamicValidateForm.email,
        extraCode: this.random_num
      };
      let res = await this.$svc.validatecode(para);
      if(!res) return; // res为undefined，出错中止
      this.$message.success("发送成功，请注意查收");
    },
    //绑定联系方式 调取接口
    async contact() {
      let para = {
        functionId: "1",
        type: "1",
        contact: this.dynamicValidateForm.email,
        validateCode: this.dynamicValidateForm.emailcode,
        extraCode: this.random_num
      };
      let { err } = await svc.contact(para);
      if (err) {
        err.showAlert();
        return;
      }
      this.$message.success("保存成功");
      this.visible = false;
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
.add-dialog {
  /deep/ .el-dialog {
    width: 500px !important;
  }
  /deep/ .el-dialog__body {
    border-top: 1px solid #ebebeb;
  }
  /deep/ .el-input input {
    border: 1px solid #d9d9d9;
  }
  .email {
    width: 300px;
  }
  .emailcode {
    width: 160px;
  }
  .emailbtn {
    margin-left: 20px;
  }
}
</style>
