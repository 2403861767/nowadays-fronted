<template>
  <div style="background-color: #f7f8fa;height: 100vh;">
    <!--  navbar-->
    <NavBar :hasBackButton="true" :titleName="titleName"/>
    <!--    edit 处-->
    <div style="margin-top: 3rem;">
      <van-cell-group inset>
        <van-cell title="昵称" is-link @click="toEdit('userName','昵称',currentUser.userName)" :value="currentUser.userName"/>
        <van-cell title="账号" :value="currentUser.userAccount"/>
        <van-cell title="头像" is-link to="/user/edit" @click="toEdit('avatarUrl','头像',avatarUrl)">
          <img style="height: 48px;" :src="avatarUrl">
        </van-cell>
        <van-cell title="性别" @click="toEdit('gender','性别', currentUser.gender)" is-link to="/user/edit" :value="gender"/>
        <van-cell title="电话" @click="toEdit('phone','电话', currentUser.phone)" is-link to="/user/edit" :value="currentUser.phone"/>
        <van-cell title="邮箱" @click="toEdit('email','邮箱', currentUser.email)" is-link to="/user/edit" :value="currentUser.email"/>
        <van-cell title="注册时间" :value="currentUser.createTime"/>
      </van-cell-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from "../../components/NavBar.vue";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import {getCurrentUser} from "../../services/user";

const router = useRouter();
const titleName = ref('个人信息')
const user = sessionStorage.getItem('user');
const currentUser = ref({})
const avatarUrl = ref('')
const gender = ref('')
onMounted(async () => {
  currentUser.value = await getCurrentUser()
  console.log(currentUser.value)
  avatarUrl.value = currentUser.value.avatarUrl
  if (currentUser.value.gender === 0){
    gender.value = '男'
  }else {
    gender.value = '女'
  }
  sessionStorage.setItem('user',JSON.stringify(currentUser.value))
})
const toEdit = (editKey: string, editName: string, currentValue: string) => {
  router.push({
    path: '/user/edit',
    query: {
      editKey,
      editName,
      currentValue,
    }
  })
}

const onSubmit = async () => {

}


</script>

<style scoped>

</style>
