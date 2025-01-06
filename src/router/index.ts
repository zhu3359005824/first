
import {  createRouter, createWebHashHistory } from 'vue-router'

import HomeView from "../view/Main.vue"
import LoginView from '../view/LoginView.vue'
import UserView from "../view/user/index.vue"




const routes = [
  { path: '/',
     component: HomeView ,
     children:[
      {
        path:"/home",
        name:"热门图片",
        id:1,
        icon:'Platform',
        component:()=>import ("../view/controllerboard/index.vue")
   
      },
      {
        path:'/upload',
        name:"上传图片",
        id:2,
        icon:'Platform',
        component:()=>import ("../view/EditorAndLoad/index.vue")

      },
      {
        path:'/user',
        name:"用户管理",
        id:3,
        icon:'Platform',
        component:UserView
        
      },/*  {
        path:'/system',
        name:'个人信息',
        id:4,
        icon:'Platform',
        component:()=>import ("../view/user/myPhoto.vue")

      } */
     ]
  
  },{
    path:'/login',
    component: LoginView
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
export default router