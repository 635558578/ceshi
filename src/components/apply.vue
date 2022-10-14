<template>
<!-- 请假申请 -->
<el-card>
  <div class="apply_box">
    <el-form ref="applyFormRef" :model="applyForm" :rules="applyFormRules" class="apply_form">
      <div>
        <el-row>
          <!-- 姓名 -->
          <el-col :span="2.7" class="zi">
            姓名：
          </el-col>
          <el-col :span="8" prop="name">
            <div class="put">
              <el-input
                v-model="applyForm.name"
                oninput="value=value.replace(/[\d]/g,'')"
                :maxlength="4"
                disabled>
              </el-input></div>
          </el-col>
    </el-row><br><br>
    <el-row>
          <!-- 专业 -->
           <el-col :span="2.7" class="zi">
            专业：
          </el-col>
          <el-col :span="8" prop="major">
            <div class="put">
              <el-input
                v-model="applyForm.major"
                oninput="value=value.replace(/[\d]/g,'')"
                :maxlength="11"
                disabled>
              </el-input></div>
          </el-col>

        </el-row>
        <br><hr>
      </div>

      <!-- 请假原因 -->
      <h3>请假原因</h3>
      <el-form-item prop="type">
        <el-radio-group v-model="applyForm.type">
          <el-radio v-model="radio" label="1">  事假</el-radio><br>
          <el-radio v-model="radio" label="2">  病假</el-radio><br>
          <el-radio disabled v-model="radio" label="0"> 其他(请说明)</el-radio>
        </el-radio-group>
      </el-form-item>

      <!-- 请假日期 -->
      <el-form-item prop="time">
        <b>请假时间：</b>
        <el-input v-model="applyForm.time" placeholder="如：11/1/19：00-21：00"
        outinput="value=value.replace(/[^\w\.\/]/ig,'')" style="margin-left:5px;"
           maxlength="20"></el-input>
      </el-form-item>

        <!--请假理由  -->
      <el-form-item prop="reason">
        请假理由：
        <el-input
          type="textarea"
          v-model="applyForm.reason"
          placeholder="请写详细原因"
          oninput="value=value.replace(/[\d]/g,'')">
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit()">提交申请</el-button>
      </el-form-item>
  </el-form>

  </div>
  </el-card>
</template>

<script>

export default {
  created:function() {
       this.aaaa()
    },

  name:"applyForm",
  data() {
    return {
      // 数据绑定对象
      applyForm: {
        name: '',
        major: '',
        time:'',
        type:'',
        reason:''
      },
      radio:'1',
      radio2:'2',
      // 验证规则对象
      applyFormRules: {
        //验证用户
        name: [
          {required: true, message: '请输入姓名', trigger: 'blur'},
          {min: 2, max: 4, message: '长度在 2 到 4 个字', trigger: 'blur'}
        ],
        major: [
          {required: true, message: '请输入专业', trigger: 'blur'}
        ]
      }
    }
  },
  methods:{

      // 渲染接口，将用户信息渲染到页面上
        async aaaa() {
        var account = sessionStorage.getItem("OutData")
        var token =  window.sessionStorage.getItem("token")
           const { data: res } = await this.$http({
                method:'post',
                url:'/api/home/showstudent',
                data:this.$qs.stringify({    //这里是发送给后台的数据
                      account:account,
                      token:token
                })
            })
            // console.log(res.data);
            // console.log(token);
            // console.log(account);
           this.applyForm.name =res.data.stuname;
           this.applyForm.major=res.data.major;
            if( res.code !== 200 ) {
              return;
            }

      },


      // 提交申请接口调用
      async onSubmit() {
        var account = sessionStorage.getItem("OutData")
        var token =  window.sessionStorage.getItem("token")
        var item1 = this.applyForm.name
        var item2 = this.applyForm.major
        var item3 = this.applyForm.type
        var item4 = this.applyForm.time
        var item5 = this.applyForm.reason
        // console.log(item1);
        // console.log(item2);
        // console.log(item3);
        // console.log(item4);
        // console.log(item5);
        if(!item1||!item2||!item3||!item4||!item5){
          alert("请完善信息");
          return false
        }
             const { data: res } = await this.$http({
              method:'post',
              url:'/api/home/insert',
              data:this.$qs.stringify({  //这里是发送给后台的数据
                    account:account,
                    token:token,
                    name:item1,
                    class:item2,
                    type:item3,
                    apply_time:item4,
                    reason:item5
              })
          })
            if( res.code !== 200 ) {
              alert("提交失败！");
              return;
            }
            alert("提交成功！");
            this.$router.push('/state');
      },


  }
}
</script>

<style  scoped>
  .el-radio{
    height: 30px;
  }
  .apply_box {
    border-radius: 3px;
    box-shadow: 1px 0.5px 2px 0.5px rgb(0, 0, 0);
    padding: 30px;
    /* 容器内居中*/
  }
  .zi{
    padding-top: 10px;
  }

   @media all and (max-width: 610px) {
      .el-form{
        margin: 0px;
        font-size: 10px;
    }
    .put{
      margin-left: 0px;
    }
   .el-form-item{
     padding: 0px;
   }
}
</style>
