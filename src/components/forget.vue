<template>
  <div class="main">
    <nav>人工智能算法实验室请假系统</nav>
    <!-- 忘记密码，修改密码 -->
    <div class="forget_box">
      <el-form
        ref="forgetForm"
        :model="forgetForm"
        :rules="forgetFormRules"
        label-width="90px"
        class="forget_form"
      >
        <h3>修改密码</h3>
        <el-form-item prop="mail1" label=" 邮箱:">
          <el-input v-model="forgetForm.mail1"></el-input>
          <el-button class="yan" size="mini" @click="sendMsg()"
            >发送验证码</el-button
          >
        </el-form-item>

        <el-form-item prop="yanzheng" label="验证码:">
          <el-input
            v-model="forgetForm.yanzheng"
            maxlength="6"
            oninput="value=value.replace(/\D/g,'')"
          ></el-input>
        </el-form-item>
        <el-form-item prop="pass" label="修改密码:">
          <el-input
            v-model="forgetForm.pass"
            maxlength="10"
            oninput="value=value.replace(/\D/g,'')"
          ></el-input>
        </el-form-item>
        <el-form-item class="btn">
          <el-button type="primary" @click="revise()" style="margin-right: 85px"
            >修改密码</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
import axios from 'axios';
<script>
export default {
  name: "forgetForm",
  data() {
    // 二次确认密码

    return {
      drawer: false,
      innerDrawer: false,
      ruleForm: {},
      //数据绑定对象
      // 忘记密码
      forgetForm: {
        mail1: "",
        yanzheng: "",
        pass: "",
      },
      form:{
        password:'',
        email:''
      },
      YanZheng: "",

      // 忘记密码的输入框验证规则
      forgetFormRules: {
        mail1: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        yanzheng: [
          { required: true, message: "请输入验证码", trigger: "blur" },
        ],
        pass: [
          { required: true, message: "请输入要修改的密码", trigger: "blur" },
        ],
      },
    };
  },

  methods: {
    // 发送验证码接口(正常)
    async sendMsg() {
      var email = this.forgetForm.mail1;
      //邮箱格式验证
      var reg = /^\w{6,12}@\w{2,4}\.com$/;
      if (!reg.test(email)) {
        alert("请输入正确邮箱！");
        return false;
      }
      const { data: res } = await this.$http.get(`/api/send?email=${email}`);
      this.YanZheng = res.data;
      if (res.code !== 200) {
        // console.log("请求失败！");
        return false;
      }
      alert("验证码已发送，请注意查收！");
    },

    //提交修改密码
    async revise() {
      this.form.password = this.forgetForm.pass;
      this.form.email = this.forgetForm.mail1;
      const {data:res} = await this.$http.post('/api/updatepw',this.form)

      if (res.code !== 200) {
        alert("请求失败");
        return;
      }
      if (this.forgetForm.yanzheng != this.YanZheng) {
        alert("验证码错误！");
        return;
      }
      alert("修改成功！");
      this.$router.push("/login");
    },
  },
};
</script>

<style  scoped>
.main {
  width: calc(100vw);
  height: calc(100vh);
  background: linear-gradient(#afede7, #7d89ce);
  min-width: calc(100vw);
  min-height: calc(100-vh);
  /* margin: 30px; */
  text-align: center;
}
nav {
  /* padding-top: 15px; */
  height: 46px;
  text-align: center;
  font-size: 32px;
  color: white;
  padding-top: 25px;
}
.forget_box {
  width: 350px;
  height: 400px;
  border-radius: 3px;
  /* 容器内居中 */
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.forget_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.yan {
  position: relative;
  left: 25%;
  height: 22px;
  width: 90px;
  padding: 1px;
  border-radius: 11px;
  margin: 0;
}
 @media all and (max-width: 610px) {
    .main{
      text-align: center;
    }
    nav{
      font-size: 26px;
    }
      .el-form{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)!important;
      z-index: 0;
      width: 90vw;
      height: 100%;
    }
    .btn{
        position: relative;
        left:0%;
    }
}
</style>
