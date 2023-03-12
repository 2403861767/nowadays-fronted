<template>
  <div style="background-color: #f7f8fa">
    <!--  NavBar-->
    <div>
      <NavBar :hasBackButton="true" :titleName="titleName"/>
    </div>
    <div>
      <van-form @submit="onSubmit">
        <!--        电话-->
        <van-field
            v-if="editUser.editKey === 'phone'"
            v-model="editUser.currentValue"
            :name="editUser.editKey"
            :label="editUser.editName"
            :placeholder="`请输入${editUser.editName}`"
            :rules="[{validator: phoneValidator}]"
        />
        <!--        邮箱-->
        <van-field
            v-if="editUser.editKey === 'email'"
            v-model="editUser.currentValue"
            :name="editUser.editKey"
            :label="editUser.editName"
            :placeholder="`请输入${editUser.editName}`"
            :rules="[{validator: emailValidator}]"
        />
        <!--        用户名-->
        <van-field
            v-if="editUser.editKey === 'userName'"
            v-model="editUser.currentValue"
            :name="editUser.editKey"
            :label="editUser.editName"
            :placeholder="`请输入${editUser.editName}`"
            :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <!--        性别-->
        <van-field
            v-if="editUser.editKey === 'gender'"
            :name="editUser.editKey"
            :label="editUser.editName"
            :rules="[{ required: true, message: '请选择性别' }]"
        >
          <template #input>
            <van-radio-group v-model="editUser.currentValue" direction="horizontal">
              <van-radio name="0">男</van-radio>
              <van-radio name="1">女</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <!--        头像-->
        <!--      TODO 只能上传图片-->
        <van-field
            v-if="editUser.editKey === 'avatarUrl'"
            :name="editUser.editKey"
            :label="editUser.editName"
        >
          <template #input>
            <van-uploader :max-count="1" v-model="newAvatarUrl"/>
          </template>
        </van-field>


        <div style="margin: 16px;">
          <van-button round block type="primary" native-type="submit">
            确认修改
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from "../../components/NavBar.vue";
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import {getCurrentUser} from "../../services/user";
import {Snackbar} from "@varlet/ui";
import myAxios from "../../plugins/myAxios";

const route = useRoute()
const router = useRouter()
const editUser = ref({
  editKey: route.query.editKey,
  editName: route.query.editName,
  currentValue: route.query.currentValue,
})
const titleName = ref('修改' + editUser.value.editName)
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
const newAvatarUrl = ref([{url: editUser.value.currentValue}])
const onSubmit = async () => {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    Snackbar.error('用户未登录')
    router.replace('/login')
    return
  }
  if (editUser.value.editKey === 'avatarUrl'){
    console.log(newAvatarUrl.value)
    const imgRes = await myAxios.post('/oss/upload',newAvatarUrl.value[0], {
      headers: {"Content-Type": "multipart/form-data"}
    })
    console.log("imgRes.data",imgRes.data)
    editUser.value.currentValue = imgRes.data
  }

  const res = await myAxios.put('/user/update', {
    'id': currentUser.id,
    // js的动态语法
    [editUser.value.editKey as string]: editUser.value.currentValue
  })
  if (res.code === 0 && res.data > 0) {
    Snackbar.success('修改成功!')
    await router.replace('/user/detail');
  } else {
    Snackbar.error('修改失败！')
  }
};
</script>

<style scoped>

</style>
