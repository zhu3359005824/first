<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import {type User} from '../../type/user.ts'
import { getUsers,deleteByUsername,updateByUsername } from '../../api/index.js'
import { ElMessage } from 'element-plus'



const selectedUserId = ref();
const dialogFormVisible = ref(false);
const deleteUser = ref(false);
const testData = ref<User[]>([]);

const newnickname = ref<string>(''); // 新的昵称
const newpassword = ref<string>(''); // 新的密码


async  function loadUserList(){


    try {
      const response =  await getUsers();

        if(response.data){
          response.data.forEach((value:any)=>{

            testData.value.push({id:value.id,nickname:value.nickname,username:value.username})

          })
        }
          
        
      } catch (error) {
        console.error(error);
        
      }
}

async  function UpdateUserById(username:any) {
  console.log(selectedUserId.value)
  // 找到用户索引
  const index = testData.value.findIndex(user => user.username === username);
  if (index !== -1) {

    const formData = new FormData();
      formData.append('nickname', newnickname.value);
      formData.append('password', newpassword.value);
      formData.append('username', selectedUserId.value);
    const response=await updateByUsername(formData)
  

    if(response.data.message==="修改信息成功"){
      
    testData.value[index].nickname=newnickname.value
    dialogFormVisible.value = false; 
    
    }

    
    dialogFormVisible.value = false; 
    ElMessage.success('用户信息修改成功');
  } else {
    ElMessage.error('用户不存在');
  }
}

async  function deleteUserById(username:any) {
  console.log(selectedUserId.value)
  // 找到要删除的用户索引
  const index = testData.value.findIndex(user => user.username === username);
  if (index !== -1) {
    
    const response=await deleteByUsername(username)
    console.log(response.data)

    if(response.data.message==="删除成功"){
      
    testData.value.splice(index, 1); // 删除用户
    deleteUser.value = false; // 关闭删除对话框
    
    }
    
    ElMessage.success('用户删除成功');
  } else {
    ElMessage.error('用户不存在');
  }
}

// 提交更新
async function submitUpdate() {
  
  
    const formData = new FormData();
      formData.append('nickname', newnickname.value);
      formData.append('password', newpassword.value);
      formData.append('username', selectedUserId.value);
  
     
    try {
    const response = await updateByUsername(formData);

    console.log(response)
    if (response.data && response.data.message === '修改信息成功') {
      ElMessage.success('用户信息更新成功');
      // 关闭对话框
      dialogFormVisible.value = false;
      // 更新用户列表
      loadUserList();
    } else {
      ElMessage.error('更新失败');
    }
  } catch (error) {
    console.error('更新用户信息失败', error);
    ElMessage.error('更新失败');
  }
  
  
  
}

onMounted(() => {
  loadUserList()
});


</script>

<template>
  <el-table :data="testData" style="width: 100%">
    <el-table-column prop="id" label="id" width="180" />
    <el-table-column prop="nickname" label="昵称" width="180" />
    <el-table-column prop="username" label="手机号" width="180" />

    <el-table-column label="操作">
      <template #default="scope">
        <el-button type="primary" @click="dialogFormVisible = true,selectedUserId = scope.row.username">修改信息</el-button>
        <el-button type="danger" @click="deleteUser = true; selectedUserId = scope.row.username">删除用户</el-button>
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
        <el-button type="primary" @click="UpdateUserById(selectedUserId)">
          提交
        </el-button>
      </div>
    </template>
    </el-dialog>
</template>



    
