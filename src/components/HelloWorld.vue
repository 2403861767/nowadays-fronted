<script setup lang="ts">
import {ref} from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <div>
    <div>Vant 组件</div>
    <div>
      <van-button type="primary">主要按钮</van-button>
      <van-button type="success">成功按钮</van-button>
      <van-button type="default">默认按钮</van-button>
      <van-button type="warning">警告按钮</van-button>
      <van-button type="danger">危险按钮</van-button>
    </div>
    <div>varlet 组件</div>
    <div>
      <var-space :size="[10, 10]">
        <var-button loading type="primary">
          加载状态
        </var-button>
        <var-button loading type="info" loading-type="rect">
          加载状态
        </var-button>
        <var-button loading type="success" loading-type="disappear">
          加载状态
        </var-button>
        <var-button loading type="danger" loading-type="cube">
          加载状态
        </var-button>
        <var-button loading type="warning" loading-type="wave">
          加载状态
        </var-button>
      </var-space>
    </div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
