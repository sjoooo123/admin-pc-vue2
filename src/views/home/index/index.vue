<template>
  <div class="home">
    <el-row :gutter="20">
      <el-col :span="8">
        <router-link class="card1" :to="{ path: '/talk/booking' }">
          <img class="chair chair1" :src="chairUrl" />
          <img class="chair chair2" :src="chairUrl" />
          <img class="chair chair3" :src="chairUrl" />
          <img class="chair chair4" :src="chairUrl" />
          <span>
            <img :src="homeUrl1" /><br/>今日待办
          </span>
        </router-link>
      </el-col>
      <el-col :span="8">
        <router-link class="card1" :to="{ path: '/talk/book' }">
          <img class="chair chair1" :src="chairUrl" />
          <img class="chair chair2" :src="chairUrl" />
          <img class="chair chair3" :src="chairUrl" />
          <img class="chair chair4" :src="chairUrl" />
          <span>
            <img :src="homeUrl2" /><br/>谈话室预约
          </span>
        </router-link>
      </el-col>
      <el-col :span="8">
        <router-link class="card1" :to="{ path: '/talk/history' }">
          <img class="chair chair1" :src="chairUrl" />
          <img class="chair chair2" :src="chairUrl" />
          <img class="chair chair3" :src="chairUrl" />
          <img class="chair chair4" :src="chairUrl" />
          <span>
            <img :src="homeUrl3" /><br/>谈话室使用记录
          </span>
        </router-link>
      </el-col>
      <el-col :span="16">
        <el-row :gutter="20" class="row1">
          <el-col :span="8">
            <router-link class="card2" :to="{ path: '/talk/apply' }">
              <img class="chair chair1" :src="chairUrl" />
              <img class="chair chair2" :src="chairUrl" />
              <img class="chair chair3" :src="chairUrl" />
              <img class="chair chair4" :src="chairUrl" />
              <span>
                <img :src="homeUrl4" /><br/>申请表单管理
              </span>
            </router-link>
          </el-col>
          <el-col :span="8">
            <router-link class="card2" :to="{ path: '/talk/room' }">
              <img class="chair chair1" :src="chairUrl" />
              <img class="chair chair2" :src="chairUrl" />
              <img class="chair chair3" :src="chairUrl" />
              <img class="chair chair4" :src="chairUrl" />
              <span>
                <img :src="homeUrl5" /><br/>谈话室维护
              </span>
            </router-link>
          </el-col>
          <el-col :span="8">
            <router-link class="card2" :to="{ path: '/inout/register' }">
              <img class="chair chair1" :src="chairUrl" />
              <img class="chair chair2" :src="chairUrl" />
              <img class="chair chair3" :src="chairUrl" />
              <img class="chair chair4" :src="chairUrl" />
              <span>
                <img :src="homeUrl6" /><br/>进出登记
              </span>
            </router-link>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row class="row2">
          <el-col :span="24">
            <router-link class="card3" :to="{ path: '/system/department' }">
              <img class="chair chair4" :src="chairUrl" />
              <span>
                <img :src="homeUrl7" /><em>人员管理</em>
              </span>
            </router-link>
          </el-col>
          <el-col :span="24">
            <router-link class="card3" :to="{ path: '/inout/history' }">
              <img class="chair chair4" :src="chairUrl" />
              <span>
                <img :src="homeUrl8" /><em>安保巡检</em>
              </span>
            </router-link>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import chairUrl from "@/assets/images/chair.png";
import homeUrl1 from "@/assets/images/home_1.png";
import homeUrl2 from "@/assets/images/home_2.png";
import homeUrl3 from "@/assets/images/home_3.png";
import homeUrl4 from "@/assets/images/home_4.png";
import homeUrl5 from "@/assets/images/home_5.png";
import homeUrl6 from "@/assets/images/home_6.png";
import homeUrl7 from "@/assets/images/home_7.png";
import homeUrl8 from "@/assets/images/home_8.png";
export default {
  name: 'index',
  data() {
    return {
      chairUrl: chairUrl,
      homeUrl1: homeUrl1,
      homeUrl2: homeUrl2,
      homeUrl3: homeUrl3,
      homeUrl4: homeUrl4,
      homeUrl5: homeUrl5,
      homeUrl6: homeUrl6,
      homeUrl7: homeUrl7,
      homeUrl8: homeUrl8,
    };
  },
  mounted(){
  }
};
</script>
<style lang="scss" scoped>
.home{
  margin: 4px;
  height: calc(100vh - 150px);
}
/deep/ .el-row{
  height: 100%;
  .el-col{
    margin-bottom: 20px;
    height: calc(45% - 10px);
    &:nth-child(4),&:nth-child(5){
      margin-bottom: 0;
      height: calc(55% - 10px);
    }
    a{
      position: relative;
      display: block;
      width: 100%;
      height: 100%;
      overflow: hidden;
      text-decoration: none;
      text-align: center;
      font-size: 22px;
      color: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, .6);
      cursor: pointer;
      transition: all .3s;
      .chair{
        position: absolute;
      }
      .chair1{
        left:-1.5%;
        top:-1.5%;
        height: 30%;
      }
      .chair2{
        right:0;
        top:0;
        height: 50%;
      }
      .chair3{
        left:0;
        bottom:0;
        height: 50%;
      }
      .chair4{
        right:-6%;
        bottom:-6%;
        height: 30%;
      }
      span{
        position: absolute;
        top: calc(50% - 20px);
        left: 50%;
        transform: translate(-50%, -50%);
        width: 80%;
        height: 50%;
        img{
          margin-bottom: 10px;
          height: 100%;
          position: relative;
          top: 0;
          transition: all .3s;
        }
      }
      &.card1{background: #0091ff;}
      &.card2{background: #31c5ff;}
      &.card3{background: #42d7b6;}
      &:hover{
        box-shadow: 1px 3px 20px rgba(0, 0, 0, .6);
        span{
          img{
            top: -10px;
          }
        }
      }
    }
    /* 第二行前三个 */
    .row1 .el-col{
      height: 100%;
      a{
        .chair1{
          left:-2.5%;
          top:-2.5%;
          height: 30%;
        }
        .chair2{
          right:-5%;
          top:2.5%;
          height: 25%;
        }
        .chair3{
          left:0;
          bottom:0;
          height: 40%;
        }
        .chair4{
          right:-10%;
          bottom:6%;
          height: 25%;
        }
        span{
          img{
            height: 81.8%;
          }
        }
      }
    }
    /* 第二行后两个 */
    .row2 .el-col{
      height: calc(50% - 10px);
      &:last-child{
        margin-bottom: 0;
      }
      a{
        .chair4{
          bottom:-5%;
          right:-5%;
          height: 90%;
        }
        span{
          top: 50%;
          text-align: left;
          img{
            margin-bottom: 0;
            margin-right: 20px;
            transform: translateY(-20%);
            height: 140%;
            vertical-align: middle;
          }
          em{
            position: relative;
            top: 10%;
            font-style: normal;
          }
        }
      }
    }
  }
}
</style>
