<template>
  <var-app-bar :title="titleName">
    <template v-if="hasBackButton" #left>
      <var-button
          color="transparent"
          text-color="#fff"
          round
          text
          @click="backRoute"
      >
        <var-icon name="chevron-left" :size="24" />
      </var-button>
    </template>

    <template v-if="hasMenuButton" #right>
      <var-menu>
        <var-button
            color="transparent"
            text-color="#fff"
            round
            text
        >
          <var-icon name="menu" :size="24" />
        </var-button>

        <template  #menu>
          <var-cell ripple>选项卡</var-cell>
          <var-cell ripple>选项卡</var-cell>
          <var-cell ripple>选项卡</var-cell>
        </template>
      </var-menu>
    </template>
  </var-app-bar>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";

const router = useRouter()
const backRoute = () => {
  router.back()
}
interface NavBarProps {
  hasBackButton:boolean,
  hasMenuButton: boolean,
  titleName: '',

}
const props =withDefaults(defineProps<NavBarProps>(),{
  // @ts-ignore
  hasBackButton: false,
  hasMenuButton: false,
  // @ts-ignore
  titleName: '标题',
})


</script>

<style scoped>

</style>
