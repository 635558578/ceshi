<template>
<div class="main">
   <nav>人工智能算法实验室请假系统
    <!-- <el-button type="primary" @click="login()" class="off_login">返回登录</el-button> -->
</nav>
 <!-- 注册 -->
  <div class="register_box">
            <el-form ref="registerFormRef" :model="registerForm" :rules="registerFormRules">
      <!-- 姓名 -->
      <el-form-item prop="stuname">
        姓&#12288;名：
        <el-input
          v-model="registerForm.stuname"
          oninput="value=value.replace(/[\d]/g,'')"
          maxlength="4" ></el-input>
      </el-form-item>
        <!-- 学号 -->
       <el-form-item prop="stucount">
        学&#12288;号：
        <el-input
          v-model="registerForm.stucount"
          maxlength="11"
          oninput="value=value.replace(/\D/g,'')" ></el-input>
      </el-form-item>
        <!-- 电话 -->
       <el-form-item prop="stuphone" >
        电&#12288;话：
        <el-input
          v-model="registerForm.stuphone"
          maxlength="11"
          oninput="value=value.replace(/\D/g,'')" ></el-input>
      </el-form-item>
        <!-- 专业 -->
       <el-form-item prop="major" >
        专&#12288;业：
        <el-select v-model="registerForm.major" placeholder="请选择专业" >
          <el-option label="计算机类" value="计算机类"></el-option>
          <el-option label="信息工程" value="信息工程"></el-option>
          <el-option label="人工智能" value="人工智能"></el-option>
          <el-option label="软件工程" value="软件工程"></el-option>
          <el-option label="大数据" value="大数据"></el-option>
        </el-select>
      </el-form-item>
        <!-- 班级 -->
       <el-form-item prop="class" >
        班&#12288;级：
        <el-input
          v-model="registerForm.class" maxlength="15"
          placeholder="如：信息工程20201班" ></el-input>
      </el-form-item>
        <!-- 辅导员 -->
       <el-form-item prop="teacher" >
        辅导员：
        <el-input
          v-model="registerForm.teacher"
          oninput="value=value.replace(/[\d]/g,'')"
          maxlength="4" ></el-input>
      </el-form-item>
        <!-- 邮箱 -->
      <el-form-item prop="email">
        邮&#12288;箱：
        <el-input
          v-model="registerForm.email"
          maxlength="20" class="spc"></el-input>
          <el-button class="yan" size="mini" round @click="sendMsg()">发送验证码</el-button>
      </el-form-item>
        <!-- 验证码 -->
       <el-form-item prop="yanzheng" >
        验证码：
        <el-input v-model="registerForm.yanzheng"
            oninput="value=value.replace(/\D/g,'')"
            maxlength="6"></el-input>

      </el-form-item>
        <!-- 密码 -->
       <el-form-item prop="password" >
        密&#12288;码：
        <el-input
          type="password"
          v-model="registerForm.password"
          maxlength="10"
          placeholder="6~10位"
          oninput="value=value.replace(/\D/g,'')"></el-input>
      </el-form-item>
      <el-form-item >
          <el-button type="primary" @click="onSubmit()" style="margin:0 auto;">注册</el-button>
      </el-form-item>
      </el-form>
    </div>
  <div class="zhuce">
    <h3>注册成功</h3>
     <el-button @click="login()" >返回登陆</el-button>
  </div>
</div>

</template>
import axios from 'axios';
<script>
export default {
  name:"registerform",
    data() {
      return {
        // 数据绑定对象
        registerForm: {
          stuname: '',
          stucount:'',
          stuphone:'',
          class:'',
          teacher:'',
          email:'',
          password:'',
          major: '',
          yanzheng:'',
        },
        YanZheng:'',


        registerFormRules: {
          //验证用户
          stuname: [
            {required: true, message: '请输入姓名', trigger: 'blur'},
            {min: 2, max: 4, message: ' ', trigger: 'blur'}
          ],
          stucount: [
            {required: true, message: '请输入学号', trigger: 'blur'},
            {min: 11, max: 11, message: ' ', trigger: 'blur'}
          ],
          stuphone: [
            {required: true, message: '请输入电话', trigger: 'blur'},
            {min: 11, max: 11, message: ' ', trigger: 'blur'}
          ],
          major: [
            {required: true, message: '请选择专业', trigger: 'blur'}
          ],
          class: [
            {required: true, message: '请输入班级', trigger: 'blur'},
            {min: 3, max: 15, message: ' ', trigger: 'blur'}
          ],
          teacher: [
            {required: true, message: '请输入辅导员', trigger: 'blur'},
            {min: 2, max: 4, message: ' ', trigger: 'blur'}
          ],
          yanzheng: [
            {required: true, message: '请输入验证码', trigger: 'blur'},
            {min: 6, max: 6, message: ' ', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 6, max: 10, message: '密码应为6~10位', trigger: 'blur'}
          ]
        }
      }
    },

    methods: {
      login(){
        this.$router.push('/login');
      },
      // 发送验证码接口
      async sendMsg() {
          var email = this.registerForm.email;
        //邮箱格式验证
          var reg = /^\w{6,12}@\w{2,4}\.com$/;
          if (!reg.test(email)) {
            alert("请输入正确邮箱！")
            return false
          }

        // console.log("99999");
          const { data: res } = await this.$http.get(`/api/send?email=${email}`)
          this.YanZheng = res.data;
            if( res.code !== 200 ) {
              alert("已有邮箱！")
              return;
            }
            alert("验证码已发送，请注意查收！");
      },

      // 注册接口
      async onSubmit() {
        var stuname = this.registerForm.stuname
        var stucount = this.registerForm.stucount
        var stuphone = this.registerForm.stuphone
        var major = this.registerForm.major
        var classes = this.registerForm.class
        var teacher = this.registerForm.teacher
        var email = this.registerForm.email
        var password = this.registerForm.password

         //  注册表格判空
        if (!stuname||!stucount||!stuphone||!major||!classes||!teacher||!email||!password) {
            alert('请填写完整!')
            return false
        }

        // 验证手机号
        let filtered =/^1[3-9][0-9]{9}$/;
        if( !filtered.test(stuphone)){
          alert("请输入正确手机号！")
          return false
        }

         //验证学号
        let xuehao =/^[1-2][0-9]{10}$/;
         if( !xuehao.test(stucount)){
          alert("请输入正确学号！")
          return false
        }
        // 验证输入是否为汉字
        var hanzi =/^[\u4e00-\u9fa5]+$/;
        if(!hanzi.test(stuname)){
          alert("请输入正确姓名")
          return false
        }
        if(!hanzi.test(teacher)){
          alert("请输入辅导员正确姓名")
          return false
        }

      var token =  window.sessionStorage.getItem("token");
      // 发送注册数据
           const { data: res } = await this.$http({
                method:'post',
                url:'api/register1',
                data:this.$qs.stringify({    //这里是发送给后台的数据
                      stuname:stuname,
                      stucount:stucount,
                      stuphone:stuphone,
                      major:major,
                      class:classes,
                      teacher:teacher,
                      email:email,
                      password:password
                })
            })
            if( res.code !== 200) {
              alert("注册失败！");
              return;
            }
            if(this.registerForm.yanzheng != this.YanZheng) {
              alert("验证码错误！");
              return;
            }
            alert("注册成功！");
            this.$router.push('/login');
      },

    }
}

</script>

<style  scoped>
  .main {
    width: calc(100vw);
    height: calc(100vh);
    background: linear-gradient(#afede7, #7d89ce);
  }
 nav{
    height: 46px;
    text-align: center;
    font-size: 28px;
    color: white;
    padding-top: 8px;
    background-color: rgba(202, 202, 202, 0.33);;
  }
  .btn{
    position: relative;
    left: 50%;
  }
  .yan{
    /* position: relative; */
    /* left: 70%; */
    margin-left: 5px;
  }
  .register_box {
    padding: 20px;
    width: 400px;
    height: calc(70%);
    border-radius:10px;
    overflow-y: scroll;
    /*容器内居中*/
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(213, 213, 213, 0.411);
  }
  .register_box::-webkit-scrollbar {
      /*隐藏滚轮*/
      display: none;
  }
  .register_form {
    padding: 0 20px;
    box-sizing: border-box;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

  }
  .zhuce{
    display: none;
  }
  .el-select,
  .el-input{
    height: 20px;
    width: 300px;
    padding: 0px;
    margin: 0px;
    margin-left: 20px;
  }

.off_login{
  float: right;
  height: 30px;
  width: 70px;
  background-color: rgba(253, 253, 253, 0.568);
  padding: 0;
  margin-right: 20px;
  /* position: absolute; */
  /* top: 33px; */
  /* right: 25px; */
  border: none;
  outline: none;
}
.main >>> .el-form-item__content {
  text-align: center;
}
.main >>> .spc {
  width:51%!important;
}
 @media all and (max-width: 610px) {
      .el-form{
        margin: 0px;
        font-size: 10px;
      }
      .register_box{
        width: 90vw;
        margin-left: 0px;
        padding: 0px;
      }
    .el-form-item{
        padding-left: 0px;
        width:100%;
    }
    .yan{
      float: right;
      width: 100px;
    }
     .register_form {
    padding: 0px;
    box-sizing: border-box;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

  }
  .main >>> .spc {
  width:100%!important;
}
}

</style>
