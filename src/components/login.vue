<template>
  <div class="main">
    <!-- <nav>人工智能算法实验室请假系统</nav> -->

    <!-- 登录 -->
    <div class="login_box">
      <!-- 登录表单区域 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        label-width="0px"
        class="login_form"
      >
        <!--        用户名-->
        <h3 style="text-align: center">学 生 登 录</h3>
        <el-form-item prop="stucount">
          <span style="color: white">账号： </span>
          <el-input
            placeholder="请输入学号"
            v-model="loginForm.stucount"
            prefix-icon="el-icon-user"
            :maxlength="11"
            ref="msg"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <span style="color: white"> 密码： </span>
          <el-input
            placeholder="请输入密码"
            v-model="loginForm.password"
            prefix-icon="el-icon-key"
            type="password"
            :maxlength="10"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <p @click="register()" style="float: left">没账号?先注册</p>
          <p @click="forget()" style="float: right">忘记密码</p></el-form-item
        >
        <el-form-item class="btn">
          <el-button type="primary" @click="onSubmit()">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "loginform",
  data() {
    return {
      // 数据绑定对象
      loginForm: {
        stucount: "",
        password: "",
      },
      // 验证规则对象
      loginFormRules: {
        //验证用户
        stucount: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 10, message: "密码应为6~10位", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    forget() {
      this.$router.push("/forget");
    },
    register() {
      this.$router.push("/register");
    },
    apply() {
      this.$router.push("/apply");
    },

    // 接口调用
    async onSubmit() {
      var number = this.loginForm.stucount;
      var newpass = this.loginForm.password;
      if (!number || !newpass) {
        alert("请完善信息！");
        return false;
      }
      const { data: res } = await this.$http({
        method: "post",
        url: "api/stu_login",
        data: this.$qs.stringify({
          //这里是发送给后台的数据
          stucount: number,
          password: newpass,
        }),
      });
      if (res.code !== 200) {
        alert("账号或密码错误！");
        return;
      }
      // console.log(res.data);
      // console.log(res.data.original.access_token);
      // console.log(this.loginForm.stucount);
      // token 存储
      window.sessionStorage.setItem("token", res.data.original.access_token);
      //存储学号
      sessionStorage.setItem("OutData", this.loginForm.stucount);
      alert("登陆成功！");
      this.$router.push("/apply");
    },
  },
};
</script>

<!--加上scoped是将样式应用于此组件，不加是全局-->
<style scoped>
.main {
  width: calc(100vw);
  height: calc(100vh);
  background: linear-gradient(#afede7, #7d89ce);
  min-width: calc(100vw);
  min-height: calc(100-vh);
}
nav {
  /* padding-top: 15px; */
  height: 46px;
  text-align: center;
  font-size: 32px;
  color: white;
  padding-top: 25px;
  /* background-color: transparent; */
}
.login_box {
  width: 450px;
  height: 418.44px;
  border-radius: 3px;
  /*容器内居中*/
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -40%);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1) !important;
  z-index: 100;
  background-color: rgba(255, 255, 255, 0.068);
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  /* box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); */
  /* border: 2px solid rgba(0, 0, 0, 0.233); */
}
.btn {
  position: relative;
  left: 43%;
}
p {
  color: rgba(255, 255, 255, 0.795);
}
.el-card__body {
  background-color: transparent !important;
}

@media all and (max-width: 610px) {
  .main {
    text-align: center;
  }
  .el-form {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1) !important;
    z-index: 0;
    width: 90vw;
    height: 100%;
  }
  .login_box {
    width: 90vw;
  }
  .btn {
    position: relative;
    left: 0%;
  }
}
</style>
