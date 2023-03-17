<template>
  <div style="background-color: #f7f8fa;height: 100vh;">
    <div>
      <NavBar :titleName="titleName" :hasBackButton="true"/>
    </div>
    <div style="margin-top: 1.5rem;">
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
              v-model="addPlanData.planTitle"
              name="planTitle"
              label="计划名"
              placeholder="请输入计划名"
              :rules="[{ required: true, message: '计划名不能为空' }]"
          />
          <van-field
              v-model="addPlanData.description"
              name="description"
              label="计划描述"
              rows="4"
              autosize
              type="textarea"
              placeholder="请输入计划描述"
          />
          <van-field name="priority" label="优先级">
            <template #input>
              <van-radio-group v-model="addPlanData.priority" direction="horizontal">
                <van-radio name="0">正常</van-radio>
                <van-radio name="1">优先</van-radio>
                <van-radio name="2">紧急</van-radio>
              </van-radio-group>
            </template>
          </van-field>
        </van-cell-group>
        <van-cell-group style="margin-top: 1.2rem;" inset>
          <van-field name="tag">
            <template #input>
              <TagChose @getTagName="getTagName"/>
            </template>
          </van-field>
        </van-cell-group>
        <div style="margin: 16px;">
          <van-button round block type="primary" native-type="submit">
            确定
          </van-button>
        </div>
      </van-form>

    </div>

  </div>
</template>

<script setup lang="ts">
import NavBar from "../../components/NavBar.vue";
import {ref} from "vue";
import TagChose from "../../components/TagChose.vue";
import myAxios from "../../plugins/myAxios";
import {Snackbar} from "@varlet/ui";
import {useRouter} from "vue-router";

const router = useRouter()
const titleName = "新增计划"
const initFormData = {
  "planTitle": '',
  "description": '',
  "priority": 0,
  "tagName": "",
}
// 填写的数据
const addPlanData = ref({...initFormData})
const getTagName = (fromSonParam) => {
  addPlanData.value.tagName = fromSonParam
}
const onSubmit = async () => {
  console.log("addplandata", addPlanData.value)
  const res = await myAxios.post('/plan/add', addPlanData.value)
  if (res.code === 0) {
    Snackbar.success('添加成功')
    await router.push({
      path: '/index',
      replace: true
    })
  } else {
    Snackbar.error("新增失败")
  }

}
</script>

<style scoped>

</style>
