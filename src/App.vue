<template>
<div>
  <img alt="Vue logo" src="./assets/logo.png">
  <Login></Login>
</div>

</template>

<script>
import Login from './components/Login'

export default {
  name: 'App',
  components: {
    Login,
  }
}
</script>

<style>
#app {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
