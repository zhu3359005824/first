import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import "./assets/main.css"
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia'
import { useLoginStore } from './store/login'

const app = createApp(App)
const pinia=createPinia()
app.use(pinia)

const loginStore=useLoginStore()
app.use(router)
router.push('/login')
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
//路由守卫
router.beforeEach((to)=>{
  const token=loginStore.isLogin
 
  
  if(!token&&to.path!=='/login'){
    return '/login'
  }else if(token&&to.path==='/login'){
    return '/'
  }else{
    return true
  }
})


app.mount('#app')