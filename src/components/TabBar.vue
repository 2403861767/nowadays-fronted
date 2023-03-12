<template>
  <div>
    <var-bottom-navigation
        class="bottom-navigation-example"
        v-model:active="active"
        fixed
        border
        @fab-click="toAdd"
        @change="handleChange"
    >
      <var-bottom-navigation-item name="index" @click="toRouteIndex" label="首页" icon="home"/>
      <var-bottom-navigation-item name="user" @click="toRouteUser" label="个人" icon="account-circle"/>
      <template #fab>
        <var-icon name="heart"/>
      </template>
    </var-bottom-navigation>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";

const router = useRouter()
const route = useRoute()
const active = ref('')

function handleChange(v) {
  router.push(v)
}

const currentPath = ref('')
onMounted(() => {
  currentPath.value = route.path
  const newActive = currentPath.value.replace('/', '')
  active.value = newActive
})
const toAdd = () => {
  console.log('toAdd')
}
</script>

<style scoped>
.bottom-navigation-example {
  margin-top: 40px;
}
</style>
