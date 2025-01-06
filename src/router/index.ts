
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
    /*     component:()=>import ("../view/controllerboard/test.vue") */
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
        
      }, {
        path:'/system',
        name:'系统管理',
        id:4,
        icon:'Platform',
        children:[
          {
            path:'/system/user',
            name:'添加',
            id:41,
            icon:'Platform',
            component:()=>import ("../view/EditorAndLoad/index.vue")

            
          },{
            path:'/system/comment',
            name:'评论',
            id:42,
            icon:'Platform',
            component:()=>import ("../view/user/deleteuser.vue")
          }
        ]

      }
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