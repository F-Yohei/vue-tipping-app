<template>
<div>
  <img alt="Vue logo" src="./assets/logo.png">
  <router-view></router-view>
</div>

</template>

<script>
import router from "./router";

export default {
  name: 'App',
  router
}
</script>

<style>
#app {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
