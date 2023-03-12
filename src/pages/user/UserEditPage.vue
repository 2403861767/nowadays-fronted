<template>
  <div style="background-color: #f7f8fa">
<!--  NavBar-->
    <div><NavBar :hasBackButton="true" :titleName="titleName"/></div>
    <div>
      <van-form @submit="onSubmit">
        <van-field
            v-model="editUser.currentValue"
            :name="editUser.editKey"
            :label="editUser.editName"
            :placeholder="`请输入${editUser.editName}`"
        />
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
  currentValue: route.query.currentValue
})
const titleName = ref('修改'+editUser.value.editName)
const onSubmit = async () => {
  const currentUser = await getCurrentUser()
  if (!currentUser){
    Snackbar.error('用户未登录')
    router.replace('/login')
    return
  }
  const res = await myAxios.put('/user/update', {
    'id': currentUser.id,
    // js的动态语法
    [editUser.value.editKey as string]: editUser.value.currentValue
  })
  if (res.code === 0 && res.data >0 ){
    Snackbar.success('修改成功!')
    router.back();
  }else {
    Snackbar.error('修改失败！')
  }
};
</script>

<style scoped>

</style>
