<template>
  <div style="background-color: #f7f8fa">
<!--    navbar-->
    <div>

    </div>
    <div id="content">
      <router-view />
    </div>
<!--    tabbar-->
    <TabBar />

  </div>
</template>

<script setup lang="ts">
import TabBar from "../components/TabBar.vue";</script>

<style scoped>

</style>
