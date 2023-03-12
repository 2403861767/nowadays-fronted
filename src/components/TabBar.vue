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
      <var-bottom-navigation-item @click="toRouteIndex"  label="首页" icon="home" />
      <var-bottom-navigation-item @click="toRouteUser" label="个人"   icon="account-circle"  />
      <template #fab>
        <var-icon name="heart" />
      </template>
    </var-bottom-navigation>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter()
const active = ref(0)
function handleChange(v) {
  if (v === 0){
    router.push('/index')
  }
  if (v === 1){
    router.push('/user')
  }
  // Snackbar.info(`changed to ${v}`)
  // console.log(active.value)
}

const toAdd = () => {
  console.log('toAdd')
}
</script>

<style scoped>
.bottom-navigation-example {
  margin-top: 40px;
}
</style>
