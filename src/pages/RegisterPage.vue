<template>
  <div>
    <div><p class="title">注册</p></div>
    <van-form style="margin-top: 20px;" @submit="doRegister">
<!--      TODO 只能上传图片-->
      <van-field name="value" label="上传头像">
        <template #input>
          <van-uploader :max-count="1" v-model="value"/>
        </template>
      </van-field>
      <van-cell-group>
        <van-field
            v-model="registerForm.userAccount"
            name="userAccount"
            label="账号"
            placeholder="请输入账号"
            :rules="[{ validator: userAccountAsyncValidator}]"
        />
        <van-field
            v-model="registerForm.userName"
            name="userName"
            label="用户名"
            placeholder="请输入用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
            v-model="registerForm.userPassword"
            type="password"
            name="userPassword"
            label="密码"
            placeholder="请输入密码"
            :rules="[{ validator: userPasswordAsyncValidator }]"
        />
        <van-field
            v-model="registerForm.checkPassword"
            name="checkPassword"
            type="password"
            label="确认密码"
            placeholder="请再次输入密码"
            :rules="[{validator: checkPasswordValidator}]"
        />
        <van-field name="gender" label="性别"
                   :rules="[{ required: true, message: '请选择性别' }]"
        >
          <template #input>
            <van-radio-group v-model="registerForm.gender" direction="horizontal">
              <van-radio name="0">男</van-radio>
              <van-radio name="1">女</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
            v-model="registerForm.phone"
            name="phone"
            label="手机号"
            placeholder="请输入手机号"
            :rules="[{validator: phoneValidator}]"
        />
        <van-field
            v-model="registerForm.email"
            name="email"
            label="邮箱"
            placeholder="请输入邮箱"
            :rules="[{validator: emailValidator}]"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button style="background-color: #17C5B4;color: #fff;border: 0px;" round block type="info"
                    native-type="submit">注册
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import myAxios from "../plugins/myAxios";
import {Snackbar} from "@varlet/ui";
import {useRouter} from "vue-router";

const router = useRouter()
const value = ref([])
const registerForm = reactive({
  userAccount: '',
  userName: '',
  userPassword: '',
  checkPassword: '',
  gender: 0,
  avatarUrl: '',
  phone: '',
  email: '',
})
// 注册用户
const doRegister = async (val) => {
  // console.log(val.value[0].content)
  // console.log(registerForm)\
  if (val.value) {
    const re = await myAxios.post('/oss/upload', val.value[0], {
      headers: {"Content-Type": "multipart/form-data"}
    })
    // console.log("suc:"+re)
   if (re.code === 0){
     registerForm.avatarUrl = re.data
     // console.log(registerForm)
   }
  }
  const res = await myAxios.post('/user/register', registerForm)
  if (res.code === 0) {
    Snackbar['success']("注册成功")
    await router.replace('/login')
  } else {
    Snackbar['error'](res.description)
    registerForm.userAccount = ''
    registerForm.userPassword = ''
    registerForm.checkPassword = ''
    registerForm.userName = ''
    registerForm.email = ''
    registerForm.phone = ''
    registerForm.avatarUrl = ''
  }
}


// 校验表单
const userAccountAsyncValidator = (val) => {
  if (val.length == 0) {
    return "账号不能为空"
  }
  if (val.length < 4) {
    return '账号不小于4位'
  }
  let userNamePattern = /^[a-zA-Z0-9_-]{4,16}$/;
  if (userNamePattern.test(val)) {
    return true
  } else {
    return "您的账号格式有误"
  }
}
const userPasswordAsyncValidator = (val) => {
  if (val.length == 0) {
    return "密码不能为空"
  }
  if (val.length < 8) {
    return '密码不小于8位'
  }
}
const checkPasswordValidator = (val) => {
  if (val.length == 0) {
    return "校验密码不能为空"
  }
  if (val.length < 8) {
    return '校验密码不小于8位'
  }
  if (val !== registerForm.userPassword) {
    return '两次密码输入不一致'
  }
}
const phoneValidator = (val) => {
  if (val.length === 0) {
    return "手机号不能为空"
  }
  var mobilePattern = /^((13[0-9])|(14[0-9])|(15([0-9]))|(18[0-9]))\d{8}$/;
  if (mobilePattern.test(val)) {
    return true
  } else {
    return "您输入的手机号格式不正确"
  }
}
const emailValidator = (val) => {
  if (val.length === 0) {
    return "邮箱不能为空"
  }
  var emailPattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  if (emailPattern.test(val)) {
    return true
  } else {
    return "您输入的邮箱格式有误";
  }
}
</script>

<style scoped>
.title {
  /* border-radius: 15px; */
  size: 1px;
  height: 50px;
  line-height: 50px;
  background-color: #41A191;
  color: #fff;
  text-align: center;
  display: block;
}
</style>
