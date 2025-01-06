<script lang="ts" setup>
import {   ref } from 'vue';
import { ElMessage } from 'element-plus'
import {loginSystem,registerCode} from '../api/index.js'
import { useRouter } from 'vue-router';
import { useLoginStore } from '../store/login.js';





const loginStore=useLoginStore()
const router=useRouter()
//当前界面显示
const isLogin=ref(true)
const isRegister=ref(false)

const loginMessage=ref({
  username:'',
  password:''
})
const registerMessage=ref({
  nickname:'',
  username:'',
  password:'',
 /*  code:'' */
})
/* const verificationMessage=ref({
  verificationText:'获取验证码',
  time:10
})
//获取验证码是否点击
let flag=false */


const phone=/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/



function register() {
  isLogin.value = false; // 隐藏登录表单
  isRegister.value = true; // 显示注册表单
  // 手机号验证
  if (!registerMessage.value.username || !phone.test(registerMessage.value.username)) {
    return ElMessage({
      message: '请输入正确的手机号',
      type: 'warning',
    });
  } else {
    if(registerMessage.value.nickname&&registerMessage.value.password&&registerMessage.value.username){
              const response = registerCode(registerMessage.value).catch((error: any) => {
              ElMessage.error('注册失败');
              console.error(error);
              return Promise.reject(error);
            });
         
          
            response.then((data: { data: { message: any;  code:any }; }) => {

              if (data && data.data.message==="注册成功") {
                isLogin.value = true; // 显示登录表单
                isRegister.value = false; //隐藏注册表单
                registerMessage.value.nickname=""
                registerMessage.value.username=""
                registerMessage.value.password=""

              } else {
                ElMessage.error('注册信息不正确');
              }
            });
    }
   
  }
}

function login() {
   /* loginStore.isLogin=true
        router.push('/home'); */ 

  if (loginMessage.value) {
    const response = loginSystem(loginMessage.value).catch((error: any) => {
      ElMessage.error('登录失败');
      console.error(error);
      return Promise.reject(error);
    });

   
    response.then((data: { data: { message: any; username: any; code:any;nickname:any ;data:any }; }) => {
     
      if (data && data.data && data.data.message==="登录成功") {
        loginStore.username=data.data.data.username
        loginStore.nickname=data.data.data.nickname
     
        
        loginStore.isLogin=true
        router.push('/home');
      } else {
        ElMessage.error('登录信息不正确');
      }
    });
  }



}


/* function change(){

  if(flag) return

 
  
  const id=  setInterval(()=>{

    if(verificationMessage.value.time<=1){
      clearInterval(id)
      verificationMessage.value.time=10
      verificationMessage.value.verificationText='获取验证码'
      flag=false
 
    }else{
    verificationMessage.value.time-=1
    verificationMessage.value.verificationText=`剩余${verificationMessage.value.time}秒`
    }
  },1000)
  flag=true

} */

</script>



<template>
  <div class="login">
    <el-form
  
    style="max-width: 600px"
    model:loginMessage
    status-icon
   
    label-width="auto"
    class="demo-ruleForm">



    <el-form-item label="手机号" prop="username" v-if="isLogin">
  <el-input v-model="loginMessage.username" placeholder="请输入手机号" prefix-icon="user" />
  </el-form-item>
<el-form-item label="密码" prop="password" v-if="isLogin">
  <el-input type="password" v-model="loginMessage.password" placeholder="请输入密码" prefix-icon="lock" />
</el-form-item>


   
    
<el-form-item label="昵称" prop="nicknamw" v-if="!isLogin">
  <el-input v-model="registerMessage.nickname" placeholder="请输入昵称" prefix-icon="user" />
</el-form-item>
    <el-form-item label="手机号" prop="username" v-if="!isLogin">
  <el-input v-model="registerMessage.username" placeholder="请输入手机号" prefix-icon="user" />
</el-form-item>
<el-form-item label="密码" prop="password" v-if="!isLogin">
  <el-input type="password" v-model="registerMessage.password" placeholder="请输入密码" prefix-icon="lock" />
</el-form-item>

    <el-form-item>
      <el-button type="primary" @click="login"  v-if="!isRegister" >
        登录
      </el-button>
      <el-button :type="isRegister ? 'primary' : ''"    @click="register">注册</el-button>
    </el-form-item>
  </el-form>
  </div>

</template>


<style scoped>

.login {

  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 使容器高度占满整个视口高度 */
  background-color: beige; /* 背景色 */
}

.demo-ruleForm {
  border-radius: 10px; /* 设置圆角 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
  padding: 20px; /* 内边距 */
  background: white; /* 背景色 */
  
  max-width: 600px; /* 最大宽度 */
}
</style>

