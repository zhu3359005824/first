import { defineStore } from "pinia";

interface MenuItem {
  id: number;
  name: string;
  path: string;
  icon:string,
  // 其他可能的属性
}

export const useMenuStore = defineStore('menuStore', {
  state: () => ({
    isOpen: true,
    selectMenu: [] as MenuItem[],
  }),
  actions: {
    AddSingleMenu(item: MenuItem) {
        // 检查 selectMenu 是否已经包含具有相同 id 的菜单项
        const existingItem = this.selectMenu.find(menu => menu.id === item.id);
        if (!existingItem) {
          this.selectMenu.push(item);
        }
      },
    DeleteMenu(item:MenuItem){
      const existingItem = this.selectMenu.find(menu => menu.id === item.id);
      if(existingItem){
        this.selectMenu.splice(item.id);
      }
    }
  
  },
});