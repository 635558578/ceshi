<template>
<!-- 审批状态 -->
<el-card>
  <h3>申请状态</h3>
  <el-table style="width: 100%" :data="stateForm">
    <el-table-column prop="name" label="姓名" width="80">
    </el-table-column>
    <el-table-column prop="account" label="学号"  width="150">
    </el-table-column>
    <el-table-column prop="apply_time" label="申请时间" width="180">
    </el-table-column>
    <el-table-column prop="type" label="请假类型">
    </el-table-column>
    <el-table-column prop="status1" label="审批结果" id="result">
    </el-table-column>
    <el-table-column prop="veto_reason" label="备注" width="200">
    </el-table-column>
  </el-table>

</el-card>
</template>



<script lang="">
  export default {
    created:function() {
       this.aaaa()
    },
     data() {
       return{
         stateForm: []
      }

    },
    methods: {

      // 渲染
      async aaaa() {
        var account = sessionStorage.getItem("OutData")
        var token = sessionStorage.getItem("token")
        // console.log(account);
        // console.log(token);
           const { data: res } = await this.$http({
                method:'post',
                url:'/api/home/show',
                data:this.$qs.stringify({    //这里是发送给后台的数据
                      account:account,
                      token:token
                })
            })
            if( res.code !== 200 ) {
              // console.log("失败！");
              return;
            }

          //根据传过来的数据进行一定的修正
          res.data.forEach(ele => {
            if (ele.type === 1) {
                ele.type = '事假'
            }else{
                ele.type = '病假'
            }
            if(ele.status1===0){
              ele.status1='审核中'
            }else if(ele.status1===1){
              ele.status1='已通过'
            }else{
              ele.status1='未通过'
            }
            if(ele.veto_reason===null)
            {
              ele.veto_reason='无'
            }else{
              ele.veto_reason=ele.veto_reason
            }
           })
            // 传值到页面上渲染
          for(let i=0;i<res.data.length;i++){
            // 传值
             this.stateForm.push(res.data[i]);
          }
          // console.log(res);
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
