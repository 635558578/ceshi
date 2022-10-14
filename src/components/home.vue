<template>
  <div class="container">
    <el-container class="home-container">
      <!-- 头部导航栏 -->
      <el-header>
         请假
         <el-button class="off_login" type="primary" @click="loginout">退出登录</el-button>

      </el-header>
      <!-- 侧边栏 -->
    <el-container>
        <el-aside  width="25%">
          <el-menu :router="true">
            <!-- 菜单选项 -->
            <el-menu-item index="/apply">
              <template slot="title">
                <span>请假申请</span>
              </template>
            </el-menu-item>

             <el-menu-item index="/state">
              <template slot="title">
                <span>申请状态</span>
              </template>
            </el-menu-item>

            <el-menu-item index="/information">
              <template slot="title">
                <span>个人信息管理</span>
              </template>
            </el-menu-item>
             <el-menu-item index="/sign">
              <template slot="title">
                <span>签到</span>
              </template>
            </el-menu-item>

          </el-menu>
        </el-aside>
        <!-- 主体区域 -->
        <el-main>
          <router-view>
          </router-view>
          <!-- <div class="pp1">欢迎登陆</div> -->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data(){
    return{
      tableHeight:window.innerWidth
    }
  },
  methods: {
    loginout() {
      this.$router.push("/login");
    },
  },
};
</script>

<style  scoped>
.container {
  height: 100%;
  background: linear-gradient(#7d89ce, #ffffff);
}
.home-container {
  height: 100%;
  width: 100%;
}
.el-header {
  height: 46px;
    width: 100%;
    text-align: center;
    font-size: 22px;
    color: white;
    padding-top: 8px;
    background: linear-gradient(#afede7, #7d89ce);
}

.off_login{
  height: 30px;
  width: 70px;
  background-color: rgba(253, 253, 253, 0.2);
  padding: 0;
  position: absolute;
  top: 15px;
  right: 15px;
}

.header img {
  width: 180px;
}


.el-menu-item {
 background-color: rgba(215, 215, 215, 0.2);
}

.el-aside .el-menu {
  border-right: none;
}

.header span {
  color: #fff;
  font-size: 20px;
  margin-left: 49px;
}
.pp1{
  font-size: 33px;

}
 @media all and (max-width: 610px) {
    *{
      font-size: 8px;
    }
    .el-aside{
      width: 30vw;
      padding:0;
      margin: 0px;
    }
    aside {
      width: 100px;
    }
    ul{
      width: 30vw;
      padding:0;
      margin-right:  0px;
    }
    .el-main{
      padding: 0;
      width: 400px;
    }

     .el-card__body {
    padding: 0px;
    }
    .off_login{
      font-size: 10px;
      padding: 0px;
    }
}
</style>
