<template>
    <div class="common-layout">
      <el-container>
        <Aside></Aside>
        <el-container>
          
          <el-header ><Header/></el-header>
          <el-main style="background-color: cadetblue;">
            <router-view></router-view>

        </el-main>
        </el-container>
      </el-container>

      
    </div>
  </template>

  <script setup>
  import { RouterView } from "vue-router";
import Aside from "../components/Aside.vue";
import Header from "../components/Header.vue";





</script>
  
  <style scoped>
 .common-layout {
 
 height: 100vh;
 width: 100vw;
 .el-container {
   height: 100vh;
 }
}

  </style>
  