import { defineStore } from "pinia";



export const useLoginStore = defineStore('loginStore', {
  state: () => ({
    isLogin:false ,
    username:String,
    nickname:String
  }),
  actions: {
   
  },
});