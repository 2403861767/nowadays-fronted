<template>
  <div>
    <div>
      <span>计划类型选择</span>
    </div>
    <div>
      <el-radio-group v-model="tagName" size="large">
        <el-check-tag style="margin-right: 5px;margin-bottom: 5px;" v-for="tag in tagsList" :key="tag.id" :checked="checkedList[tag.id-1]" @change="onChange(tag.id,tag.tagName)">{{ tag.tagName }}</el-check-tag>
      </el-radio-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineEmits, onMounted, ref} from 'vue';
import myAxios from "../plugins/myAxios.ts";

const toFather = defineEmits(['getTagName'])
const tagName=ref('')
toFather('getTagName',tagName)
// todo 待优化
const checkedList = ref([])
const onChange = (id,name) => {
  console.log(id)
  for (let i = 0; i <tagsList.value.length; i++) {
    checkedList.value[i] = false;
  }
  checkedList.value[id-1] = true
  tagName.value = name
  console.log(tagName)
}
  const tagsList = ref([])
// 此处传入的值会替代 Field 组件内部的 value
  onMounted(async () => {
    const res = await myAxios.get("/tag/list")
    if (res.code === 0) {
      tagsList.value = res.data
      console.log(tagsList.value)
    }
    for (let i = 0; i <tagsList.value.length; i++) {
      checkedList.value[i] = false;
    }
    console.log(checkedList.value)
  })
const check = ref(true)

</script>

<style scoped>
.choseStyle {
}
</style>
