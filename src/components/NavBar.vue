<template>
    <div class="nav-bar">
        <div class="title"></div>

        <v-btn variant="text" to="/">Dashboard</v-btn>
        <v-btn variant="text" to="/about">About</v-btn>
    </div>
</template>
  
<script setup>
</script>
  
<style scoped lang="less">
.nav-bar {
    display: flex;
    width: 100%;
    align-items: center;
    height: 90px;
    position: absolute;
    border-bottom: 1px #303030 solid;
}
.title {
    flex: 1;
}

.v-btn {
    margin-right: 52px
}
</style>
  