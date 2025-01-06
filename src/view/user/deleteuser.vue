<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import {type User} from '../../type/user.ts'
import { getUsers,deleteByUsername } from '../../api/index.js'
import { ElMessage } from 'element-plus'



const selectedUserId = ref();
const dialogFormVisible = ref(false);
const deleteUser = ref(false);
const testData = ref<User[]>([]);




async  function loadUserList(){


    try {
      const response =  await getUsers();

        if(response.data){
          response.data.forEach((value:any)=>{

            testData.value.push({id:value.id,name:value.nickname,phone:value.username})

          })
        }
          
        
      } catch (error) {
        console.error(error);
        
      }
}

async  function UpdateUserById(userId:any) {
  console.log(selectedUserId.value)
  // 找到要删除的用户索引
  const index = testData.value.findIndex(user => user.phone === userId);
  if (index !== -1) {
    const response=await deleteByUsername(userId)
    console.log(response.data)

    if(response.data.message==="删除成功"){
      
    testData.value.splice(index, 1); // 删除用户
    deleteUser.value = false; // 关闭删除对话框
    
    }

    testData.value.splice(index, 1); // 删除用户
    deleteUser.value = false; // 关闭删除对话框
    ElMessage.success('用户删除成功');
  } else {
    ElMessage.error('用户不存在');
  }
}

async  function deleteUserById(userId:any) {
  console.log(selectedUserId.value)
  // 找到要删除的用户索引
  const index = testData.value.findIndex(user => user.phone === userId);
  if (index !== -1) {
    const response=await deleteByUsername(userId)
    console.log(response.data)

    if(response.data.message==="删除成功"){
      
    testData.value.splice(index, 1); // 删除用户
    deleteUser.value = false; // 关闭删除对话框
    
    }

    testData.value.splice(index, 1); // 删除用户
    deleteUser.value = false; // 关闭删除对话框
    ElMessage.success('用户删除成功');
  } else {
    ElMessage.error('用户不存在');
  }
}
onMounted(() => {
  loadUserList()
});


</script>

<template>
  <el-table :data="testData" style="width: 100%">
    <el-table-column prop="id" label="id" width="180" />
    <el-table-column prop="name" label="昵称" width="180" />
    <el-table-column prop="phone" label="手机号" width="180" />

    <el-table-column label="操作">
      <template #default="scope">
        <el-button type="primary" @click="dialogFormVisible = true,selectedUserId = scope.row.phone">修改信息</el-button>
        <el-button type="danger" @click="deleteUser = true; selectedUserId = scope.row.phone">删除用户</el-button>
      </template>
    </el-table-column>
  </el-table>

  <!-- 删除对话框 -->
  <el-dialog
    v-model="deleteUser"
    title="Tips"
    width="500"
  >
    <span>确认删除用户吗?</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="deleteUser = false">取消</el-button>
        <el-button type="danger" @click="deleteUserById(selectedUserId)">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>



    <!-- 修改 -->
    <el-dialog v-model="dialogFormVisible" title="编辑用户信息" width="500">
    <el-form >
      <el-form-item label="请输入新的昵称" >
        <el-input v-model="newnickname" style="width: 240px" placeholder="Please input" />
      </el-form-item>
      <el-form-item label="请输入新的密码" >
        <el-input v-model="newpassword" style="width: 240px" placeholder="Please input" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible = false">
          提交
        </el-button>
      </div>
    </template>
    </el-dialog>
</template>



    
