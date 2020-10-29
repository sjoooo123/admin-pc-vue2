<template>
  <div :class="$style['layout-user']">
    <el-link type="primary" :class="$style['layout-user-icon']" :href="helpLink" target="_blank" title="使用教程">
      <i class="el-icon-question" />
    </el-link>
    <!-- <span :class="$style['layout-user-icon']">
      <el-badge :value="1">
        <i class="el-icon-bell" v-popover:popover />
      </el-badge>
    </span> -->
    <el-dropdown>
      <a class="el-dropdown-link" href="#">
        <img :src="avatar" width="31px" height="31px" alt="头像" title="用户头像">
        <span>用户名</span>
        <i class="el-icon-arrow-down" />
      </a>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
          修改信息
        </el-dropdown-item>
        <el-dropdown-item>
          注销退出
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-popover ref="popover" popper-class="sysmsg-pop" placement="bottom" width="336" v-model="visible">
      <Popover />
    </el-popover>
    <span class="version">
      <span>
        <span>旗舰版</span>
        <el-divider direction="vertical"></el-divider>
        <span>剩332天</span>
        <img src="@/assets/images/crown.png" alt="crown">
      </span>
    </span>
  </div>
</template>

<script>
import defaultImg from "@/assets/images/default-avatar.png";
import Popover from "./popover.vue";
export default {
  name: "layout-user",
  components: {
    Popover
  },
  data() {
    return {
      avatar: defaultImg,
      visible: false
    };
  },
  computed: {
    helpLink() {
      return process.env.NODE_ENV === "production"
        ? "/help/0_index"
        : "#/help/0_index";
    }
  }
};
</script>

<style lang="scss" module>
.layout-user {
  display: flex;
  flex: 0;
  width: 300px;
  height: 60px;
  line-height: 60px;
  :global {
    .el-dropdown-link {
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: flex-end;
      color: #d8f4f4;
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
