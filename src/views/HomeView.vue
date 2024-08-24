<template>
  <div class="home-page">
    <h1>歡迎來到線上投票系統</h1>
    <nav>
      <router-link to="/vote">進入投票</router-link> |
      <router-link to="/admin">管理面板</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'HomePage'
}
</script>

<style scoped>
.home-page {
  text-align: center;
  padding: 20px;
}
nav {
  margin-top: 20px;
}
a {
  margin: 0 10px;
  text-decoration: none;
  color: #42b983;
}
</style>