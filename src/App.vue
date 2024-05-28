<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  // 在这里可以添加一些全局的逻辑和数据

  created() {
    // 例如：在应用初始化时执行一些逻辑
    console.log('App initialized');
  }
}
</script>

<style>
/* 这里可以放置一些全局的样式 */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}
#app {
  width: 100%;
  height: 100%;
}
</style>