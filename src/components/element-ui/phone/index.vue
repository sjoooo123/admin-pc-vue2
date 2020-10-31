<template>
  <el-dialog v-dialogDrag :title="oldphone ? '更改手机号码':'绑定手机号码'" :visible.sync="visible" width="1200px" class="add-dialog">
    <el-form :model="dynamicValidateForm" :rules="rules" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
      <el-form-item prop="phone" label="手机号码">
        <el-input v-model="dynamicValidateForm.phone" class="phone"></el-input>
      </el-form-item>
      <el-form-item prop="phonecode" label="短信验证码">
        <el-input v-model="dynamicValidateForm.phonecode" class="phonecode"></el-input>
        <el-button type="primary" plain size="small" @click="sendcode" class="phonebtn" :disabled="disabled_btn">{{font_btn}}</el-button>
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
    var phonePass = (rule, value, callback) => {
      var reg = /^1[3|4|5|6|7|8|9]\d{9}$/;
      if (value === null || value === "") {
        callback(new Error("请输入手机号码"));
        this.disabled_btn = true;
        this.flag_btn = "0";
      } else if (value == this.oldemail && value !== "") {
        callback(new Error("已绑定手机号码不可获取验证码"));
        this.disabled_btn = true;
        this.flag_btn = "0";
      } else if (reg.test(value)) {
        callback();
        this.disabled_btn = false;
        this.flag_btn = "1";
      } else {
        callback(new Error("手机号格式输入有误，请重新输入"));
        this.disabled_btn = true;
        this.flag_btn = "0";
      }
    };
    var phonecodePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else {
        callback();
      }
    };
    return {
      visible: false,
      disabled_btn: true,
      font_btn: "获取短信验证码",
      time_btn: "60",
      flag_btn: "0",
      random_num: "",
      oldphone: "",
      dynamicValidateForm: {
        phone: "",
        phonecode: ""
      },
      rules: {
        phone: [
          { required: true, validator: phonePass, trigger: ["blur", "change"] }
        ],
        phonecode: [
          {
            required: true,
            validator: phonecodePass,
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  methods: {
    //显示弹窗
    switchShow(flag, phone) {
      this.visible = flag;
      this.oldphone = phone; //判断是否存在原手机号码
      this.dynamicValidateForm.phone = phone; //绑定原手机号码的值
      this.dynamicValidateForm.phonecode = ""; //清空验证码
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
            this.font_btn = "获取短信验证码";
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
        type: "0",
        contact: this.dynamicValidateForm.phone,
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
        type: "0",
        contact: this.dynamicValidateForm.phone,
        validateCode: this.dynamicValidateForm.phonecode,
        extraCode: this.random_num
      };
      let res = await this.$svc.contact(para);
      if(!res) return; // res为undefined，出错中止
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
  .phone {
    width: 300px;
  }
  .phonecode {
    width: 160px;
  }
  .phonebtn {
    margin-left: 20px;
  }
}
</style>
