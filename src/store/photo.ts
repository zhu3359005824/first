
import { defineStore } from "pinia";
import type { PhotoItem } from "../type/photo";



export const usePhotoStore = defineStore('photoStore', {
  state: () => ({
    photoList:[] as PhotoItem[]  
  }),
  actions: {
    AddPhoto(item: PhotoItem) {
        // 检查 selectMenu 是否已经包含具有相同 id 的菜单项
        const existingItem = this.photoList.find(p => p.imageName=== item.imageName);
        if (!existingItem) {
          this.photoList.push(item);
        }
      },
      SelectPhoto(imageName:string){
        const existingItem = this.photoList.find(p => p.imageName=== imageName);
        if (existingItem) {
            return existingItem
          }
      }
   
  
  },
});