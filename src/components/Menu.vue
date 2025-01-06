<script setup>
import { it } from 'element-plus/es/locales.mjs';
import { useRouter } from 'vue-router';
import { useMenuStore } from '../store/menu';

const menuStore=useMenuStore()

const prop = defineProps(["menuData"]);
const router = useRouter();

function handleClick(item) {

    router.push(item.path);
    menuStore.AddSingleMenu(item)
  
}


</script>

<template>
<div v-for="item in prop.menuData" :key="item.id">
    <el-menu-item @click="handleClick(item)" v-if="!item.children || item.children.length === 0" :index="item.id">
        <el-icon size="20">
        <component :is="item.icon"></component>
      </el-icon>
        <span>{{ item.name }}</span>
    </el-menu-item>

    <el-sub-menu  v-else :index="item.id">
        <template #title>
            <el-icon size="20">
        <component :is="item.icon"></component>
      </el-icon>
            <span>{{ item.name }}</span>
        </template>
        <el-menu-item @click="handleClick(m)" v-for="m in item.children" :key="m.id" :index="m.id">
            <el-icon size="20">
        <component :is="item.icon"></component>
      </el-icon>
            <span>{{ m.name }}</span>
        </el-menu-item>

    </el-sub-menu>
</div>
</template>