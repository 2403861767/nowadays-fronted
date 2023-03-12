<template>
  <div style="background-color: #f7f8fa">
<!--    NavBar-->
    <NavBar :titleName="titleName" :hasMenuButton="true"/>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import NavBar from "../components/NavBar.vue";

const router = useRouter();
const user = ref()
const titleName = ref('主页')
onMounted(async () => {


})
</script>

<style scoped>

</style>
