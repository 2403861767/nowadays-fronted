<template>
  <div>
    <div><p class="title">登录</p></div>
    <div style="margin-top: 60px;display: flex;justify-content: center;align-items: center">
      <var-icon name="account-circle" color="#FF3A45" :size="50"
                style="width: 6px;height: 6px;border-radius: 10px;margin-bottom: 20px;"/>
    </div>
    <van-form style="margin-top: 60px;" @submit="doLogin">
      <van-field
          v-model="loginForm.userAccount"
          name="userAccount"
          label="账号"
          placeholder="请输入账号"
          :rules="[{ validator: userAccountAsyncValidator}]"
      />
      <van-field
          v-model="loginForm.userPassword"
          type="password"
          name="userPassword"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ validator: userPasswordAsyncValidator }]"
      />
      <div style="margin: 16px;">
        <van-button round block style="background-color: #17C5B4;color: #fff" native-type="submit">登录</van-button>
      </div>
      <div style="margin-top: 50px;display: flex;justify-content: center;align-items: center">
        <div class="toRegister" @click="toRegister">没有账号？立即注册</div>
      </div>
    </van-form>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {reactive} from "vue";
import myAxios from "../plugins/myAxios";
import {Snackbar} from '@varlet/ui'

const loginForm = reactive({
  userAccount: '',
  userPassword: '',
})
// 登录
const doLogin = async (values) => {
  const res = await myAxios.post("/user/login", loginForm)
  if (res.code === 0) {
    const user  = res.data
    sessionStorage.setItem('user',JSON.stringify(user))
    Snackbar['success']("登录成功")
    await router.replace('/')
  } else {
    Snackbar['error'](res.description)
    loginForm.userPassword = ''
  }
}


const router = useRouter()

const toRegister = () => {
  router.push("/register")
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

.toRegister {
  color: #888888;
  cursor: pointer;
}

.toRegister:hover {
  color: #646cff;
}

</style>
