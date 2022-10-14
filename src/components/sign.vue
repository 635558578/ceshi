<template>
<el-card>
  <el-button class="looksign">签到情况</el-button>
  <div class="unsign">

    签到未开始或已结束<br><br><br>
    <img src="./OGC.gif" alt="" style="width:200px;">
  </div>
  <div class="issign">
    <el-input placeholder="输入签到码"></el-input>
    <span class="sign">签到码</span>
    <br><br><br><br>
    <el-button class="signbtn">签到</el-button>

  </div>
  <!-- <button class="ccc">签到界面</button> -->

</el-card>
</template>
<style scoped>
.issign{
  display: none;
}
.unsign{
  padding-top: 100px;
  font-size: 30px;
  color: rgba(128, 128, 128, 0.767);
}
.el-card{
  height: 500px;
  text-align: center;
  /* display: none; */
}
.el-input{
  width: 100px;
  margin-top: 50px;
}
.sign{
  padding: 8.5px;
  margin-left: 10px;
  border-radius: 3px;
  background-color: gainsboro;
}
.signbtn{
  font-size: 24px;
  color: white;
  background-color: rgb(196, 196, 196);
  height: 100px;
  width: 100px;
  border-radius: 50px;
}
.looksign{
  padding: 2px;
  height: 30px;
  float: right;
  background-color: rgba(230, 230, 253, 0.808);
}
   @media all and (max-width: 610px) {
     .unsign{
       font-size: 24px;
}
   }
</style>
<script>
// export default {
//   data(){
//     return{

//     }
//   },
//   methods: {
//     loginout() {
//       this.$router.push("/login");
//     },
//   },
// };
</script>
