<template>
  <div :class="$style['layout-user']">
    <el-dropdown @command="dropdownMenuCommand">
      <a class="el-dropdown-link" href="#">
        <img :src="avatar" width="31px" height="31px" alt="头像" title="用户头像">
        <span>{{user.user_name}}</span>
        <i class="el-icon-arrow-down" />
      </a>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="admin_user_resPass_post">修改密码</el-dropdown-item>
        <el-dropdown-item command="admin_user_logout_get">注销退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <!--修改密码弹窗-->
		<el-dialog
      v-dialogDrag
			:visible.sync="dialogVisiblePass"
      :close-on-click-modal="false"
			title="修改密码"
		>
			<el-form ref="passForm" :model="passForm" :rules="rulesPass" label-width="120px" label-position="right">
				<el-form-item label="原密码" prop="password">
					<el-input type="password" v-model="passForm.password" autocomplete="off"/>
				</el-form-item>
        <el-form-item label="新密码" prop="new_password">
          <el-input type="password" v-model="passForm.new_password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="passForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
			</el-form>
			<div style="text-align:right;">
				<el-button type="danger" @click="dialogVisiblePass = false"
					>取消</el-button
				>
				<el-button type="primary" @click="resPass('passForm')"
					>确定</el-button
				>
			</div>
		</el-dialog>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import defaultImg from "@/assets/images/default-photo.png";
export default {
  name: "layout-user",
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.passForm.new_password !== '') {
          this.$refs.passForm.validateField('new_password');
        }
        callback();
      }
    };
    const validatePassNew = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'));
      } else {
        if(value === this.passForm.password) {
          callback(new Error('新密码不能与旧密码相同'));
        }
        if(value === "123456789") {
          callback(new Error('新密码不能与初始密码123456789相同'));
        }
        if (this.passForm.checkPass !== '') {
          this.$refs.passForm.validateField('checkPass');
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.passForm.new_password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      avatar: defaultImg,
      visible: false,
      user: {}, // 用户信息
      // 弹窗-密码修改
      dialogVisiblePass: false,
      passForm: {},
      // 验证规则
      rulesPass: {
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        new_password: [
          { validator: validatePassNew, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
      },
    };
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
  },
  methods: {
    ...mapMutations({
      clear_views: "tagsView/clear_views",
    }),
    dropdownMenuCommand(command) {
      // 修改密码
      if(command === "admin_user_resPass_post") {
        this.dialogVisiblePass = true;
      }
      // 退出
      if(command === "admin_user_logout_get"){
        this.logout();
      }
    },
    resPass(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.resPassCommit();
        } else {
          return false;
        }
      });
    },
    async resPassCommit(){
      const params = {
        password: this.passForm.password,
        new_password: this.passForm.new_password,
      };
      const res = await this.$svc.admin_user_resPass_post(params);
      if(!res) return; // res为undefined，出错中止
      this.$alert('密码修改成功，请重新登录！', '提示', {
        confirmButtonText: '确定',
        type: "success",
        callback: () => {
          // 清空状态
          localStorage.removeItem("token");
          this.$router.push({path: '/login'});
        }
      });
    },
    async logout(){
      // 清空状态
      this.clear_views();
      localStorage.removeItem("token");
      this.$router.push({path: '/login'});
    }
  }
};
</script>

<style lang="scss" module>
.layout-user {
  float: right;
  height: 60px;
  line-height: 60px;
  :global {
    .el-dropdown-link {
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: flex-end;
      color: #d8f4f4;
      text-decoration: none;
      img {
        margin-right: 10px;
      }
    }
    .version {
      position: relative;
      margin-left: 15px;
      font-size: 12px;
      .el-divider--vertical {
        margin: 0 4px;
      }
      & > span {
        display: inline-block;
        padding: 0 2px;
        border-radius: 5px;
        line-height: 20px;
        background-color: #f56c6c;
      }
      img {
        position: absolute;
        left: -6px;
        top: 16px;
        width: 14px;
        transform: rotateZ(-45deg);
      }
    }
  }
}
.layout-user-icon {
  display: flex;
  width: 145px;
  flex: 0;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  left: -15px;
  text-decoration: none;
  i {
    font-size: 18px;
    color: #fff;
    cursor: pointer;
  }
  :global {
    .el-badge__content {
      border: none;
    }
    .el-badge__content.is-fixed {
      top: 20px;
    }
  }
}
:global {
  .sysmsg-pop {
    padding: 0 !important;
  }
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
</style>
