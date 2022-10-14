<template>
 <!-- 个人信息管理 -->
  <div class="box-card">
    <el-table
      :data="form"
      style="width: 100%">
        <el-table-column
        prop="stuname"
        label="姓名"
        width="80">
      </el-table-column>
        <el-table-column
        prop="stucount"
        label="学号"
        width="120">
      </el-table-column>
        <el-table-column
        prop="stuphone"
        label="手机号"
        width="120">
      </el-table-column>
        <el-table-column
        prop="major"
        label="专业"
        width="100">
      </el-table-column>
        <el-table-column
        prop="class"
        label="班级"
        width="150">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180"
        >
      </el-table-column>
      <el-table-column
        prop="teacher"
        label="辅导员">
      </el-table-column>
    </el-table>
    <br><br>
    <el-button type="primary" @click="drawer = true">修改信息</el-button>
<!-- 个人信息修改表单 -->
    <el-drawer
      title="个人信息修改"
      :visible.sync="drawer"
      size="50%">
        <div class="gai_box">
            <el-form ref="gaiFormRef" :model="gaiForm" :rules="gaiFormRules" label-width="80px">
          <!-- 姓名 -->
          <el-form-item prop="st1" label="姓名">
            <el-input
              v-model="gaiForm.st1"
              oninput="value=value.replace(/[\d]/g,'')"
              maxlength="4"></el-input>
          </el-form-item>
          <!-- 原有学号 -->
           <el-form-item prop="st0" label="学号">
            <el-input
              v-model="gaiForm.st0"
              maxlength="11"
              oninput="value=value.replace(/\D/g,'')" disabled>
            </el-input>
          </el-form-item>

          <el-form-item prop="st3" label="电话">
            <el-input
              v-model="gaiForm.st3"
              maxlength="11"
              oninput="value=value.replace(/\D/g,'')" ></el-input>
          </el-form-item>
            <!-- 专业 -->
          <el-form-item prop="st4" label="专业">
            <el-select v-model="gaiForm.st4" placeholder="请选择专业" >
              <el-option label="计算机类" value="计算机类"></el-option>
              <el-option label="信息工程" value="信息工程"></el-option>
              <el-option label="人工智能" value="人工智能"></el-option>
              <el-option label="软件工程" value="软件工程"></el-option>
              <el-option label="大数据" value="大数据"></el-option>
            </el-select>
          </el-form-item>
            <!-- 班级 -->
          <el-form-item prop="st5" label="班级">
            <el-input
              v-model="gaiForm.st5" maxlength="15"
              placeholder="如：信息工程20201班" ></el-input>
          </el-form-item>
            <!-- 辅导员 -->
          <el-form-item prop="st6" label="辅导员">
            <el-input
              v-model="gaiForm.st6"
              oninput="value=value.replace(/[\d]/g,'')"
              maxlength="4" ></el-input>
          </el-form-item>
            <!-- 邮箱 -->
          <el-form-item prop="st7" label="邮箱">
            <el-input
              v-model="gaiForm.st7"
              maxlength="20" class="spc"></el-input>
              <el-button class="yan" size="mini" round @click="sendMsg()" style="float:right;">发送验证码</el-button>
          </el-form-item>
            <!-- 验证码 -->
          <el-form-item prop="st8" label="验证码">
            <el-input v-model="gaiForm.st8" ></el-input>
          </el-form-item>
            <!-- 密码 -->
          <el-form-item prop="password1" label="密码">
            <el-input
              type="password"
              v-model="gaiForm.password1"
              maxlength="10"
              placeholder="6~10位" ></el-input>
          </el-form-item>
          <el-form-item >
            <el-button @click="xiugai()" type="primary">修改</el-button>
          </el-form-item>
          </el-form>
      </div>
    </el-drawer>

  </div>
</template>
<script>
export default {
  created:function() {
       this.zqacount(),
       this.aaaa()
  },
  name:"form",
  name:"gaiForm",
    data() {
      return {
        drawer: false,
        innerDrawer: false,
        form:[],
        gaiForm:{
          st1:'',
          st3:'',
          st4:'',
          st5:'',
          st6:'',
          st7:'',
          st8:'',
          st0:'',
          password1:''
        },
        YanZheng:'',
        // 验证规则对象
        gaiFormRules: {
          //验证用户
          st1: [
            {required: true, message: '请输入姓名', trigger: 'blur'},
            {min: 2, max: 4, message: ' ', trigger: 'blur'}
          ],
          st3: [
            {required: true, message: '请输入电话', trigger: 'blur'},
            {min: 11, max: 11, message: ' ', trigger: 'blur'}
          ],
          st4: [
            {required: true, message: '请选择专业', trigger: 'blur'}
          ],
          st5: [
            {required: true, message: '请输入班级', trigger: 'blur'},
            {min: 3, max: 15, message: ' ', trigger: 'blur'}
          ],
          st6: [
            {required: true, message: '请输入辅导员', trigger: 'blur'},
            {min: 2, max: 4, message: ' ', trigger: 'blur'}
          ],
          st7: [
            {required: true, message: '请输入邮箱', trigger: 'blur'}
          ],
          st8: [
            {required: true, message: '请输入验证码', trigger: 'blur'},
            {min: 6, max: 10, message: '密码长度应为6~10位', trigger: 'blur'}
          ]
        }
      }
    },
    methods:{
      // 接收登陆页面传的信息
      zqacount() {
        this.gaiForm.st0 = sessionStorage.getItem("OutData");
      },

    // 发送验证码接口(正常)
      async sendMsg() {
          var email = this.gaiForm.st7;
          //邮箱格式验证
          var reg = /^\w{6,12}@\w{2,4}\.com$/;
          if (!reg.test(email)) {
            alert("请输入正确邮箱！")
            return false
          }

          const { data: res } = await this.$http.get(`/api/send?email=${email}`)
            this.YanZheng = res.data;
            if( res.code !== 200 ) {
              alert("发送失败")
              return;
            }
            alert("验证码已发送，请注意查收！");
      },

        // 渲染接口，将用户信息渲染到页面上
        async aaaa() {
        var account = sessionStorage.getItem("OutData");
        var token = sessionStorage.getItem("token");
           const { data: res } = await this.$http({
                method:'post',
                url:'/api/home/showstudent',
                data:this.$qs.stringify({    //这里是发送给后台的数据
                      account:account,
                      token:token
                })
            })
      // console.log(token);
            if( res.code !== 200 ) {
              return;
            }
              var Person =new Object();
              Person.class=res.data.class;
              Person.email=res.data.email;
              Person.major=res.data.major;
              Person.stucount=res.data.stucount;
              Person.stuname=res.data.stuname;
              Person.stuphone=res.data.stuphone;
              Person.teacher=res.data.teacher;
              this.gaiForm.st7=res.data.email;
              this.form.push(Person);

      },


      // 修改接口调用(正常)
      async xiugai() {
         var account = sessionStorage.getItem("OutData")
        var s1 = this.gaiForm.st1
        var s3 = this.gaiForm.st3
        var s4 = this.gaiForm.st4
        var s5 = this.gaiForm.st5
        var s6 = this.gaiForm.st6
        var s7 = this.gaiForm.st7
        var s8 = this.gaiForm.st8
        var password1 = this.gaiForm.password1
          //判空
         if (!s1||!s3||!s4||!s5||!s6||!s7||!s8||!password1) {
            alert('请完善信息!')
            return false
          }
      // 验证手机号
        let filtered =/^1[3-9][0-9]{9}$/;
        if( !filtered.test(s3)){
          alert("请输入正确手机号！")
          return false
        }
        // 验证输入是否为汉字
        var hanzi =/^[\u4e00-\u9fa5]+$/;
        if(!hanzi.test(s1)){
          alert("请输入正确姓名")
          return false
        }
        if(!hanzi.test(s6)){
          alert("请输入辅导员正确姓名")
          return false



        }
        if(this.gaiForm.st8 != this.YanZheng) {
          alert("验证码错误！");
          return false
        }


        const { data: res } = await this.$http({
            method:'post',
            url:'/api/home/update',
            data:this.$qs.stringify({    //这里是发送给后台的数据
                  account:account,
                  stuname:s1,
                  stuphone:s3,
                  major:s4,
                  class:s5,
                  teacher:s6,
                  email:s7,
                  password:password1
            })
        })
        if(res.code === 1){
          alert("邮箱已被他人注册！")
        }
        if( res.code !== 200 ) {
          return;
        }
        alert("修改成功！");
        this.$router.push('/apply');
      },



      }
}
</script>
<style scoped>
.box-card{
  margin: 30px;
  text-align: center;
}
.el-form{
  text-align: center;
}
.el-form-item{
  padding-left: 30px;
  width:300px;
}
.el-input{
  float: right;
}
.gai_box {
    padding: 20px;
    width: 100%;
    height: calc(90%);
    border-radius:10px;
    overflow-y: scroll;
    background-color: rgba(119, 107, 141, 0.411);
  }
    @media all and (max-width: 610px) {
      .el-form{
        margin: 0px;
        font-size: 10px;
      }
      .gai_box{
        margin-left: 0px;
        padding: 0px;
      }
    .el-form-item{
        padding-left: 0px;
        width:100%;
    }
    .yan{
      width: 50px;
    }
}
</style>
