<template>
  <div>
    <!-- 图片展示界面 -->
    <div class="image-container" v-if="images.length > 0">
      <el-row :gutter="20">
        <div v-for="(img, index) in images" :key="index">
          <el-card class="photo-card" @click="openDialog(img)">
            <el-image :src="img.src" style="max-width: 500px; height: 200px;" :fit="contain" />
          </el-card>
        </div>
      </el-row>
    </div>

    <!-- 图片查看对话框 -->
    <el-dialog v-model="dialogVisible" width="70%" draggable>
      <el-card v-if="currentImage" class="photo-card">
        <el-image :src="currentImage.src" style="max-width: 500px; height: 200px;" :fit="contain" />
      </el-card>
      <!-- 评论区 -->
      <el-card class="box-card" header="评论区">
        <!-- 评论列表 -->
        <div v-for="(comment, index) in comments" :key="index" class="comment-item">
          <el-card class="comment-card">
            <div slot="header" class="clearfix">
              <span>{{comment.nickname }}</span>
              <time>{{ comment.time }}</time>
            </div>
            <div>{{ comment.content }}</div>
          </el-card>
        </div>
        <!-- 新评论输入区域 -->
        <el-form>
          <el-form-item>
            <el-input
              type="textarea"
              placeholder="请输入内容"
              v-model="newComment.content"
              autosize
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitComment">发表评论</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-dialog>
  </div>
</template>

<script>
import {sendComment} from '../api/index.js'
import { ElMessage } from 'element-plus'
import { useLoginStore } from '../store/login';
export default {
  setup(){
    const loginStore=useLoginStore()
    return { loginStore };
  },
  data() {
    return {
      nickname:'',
      images: [
        { src: '1.png',imageName:"1736041820333.jpg" },
        { src: '2.png' ,imageName:"1736041820333.jpg"},
        // 更多图片路径
      ],
      currentImage: null,
      dialogVisible: false,
      comments: [
        { nickname: '用户A', time: '2024-06-05 10:00', content: '这是第一条评论' },
        // 可以添加更多预设评论
      ],
      newComment: {
        nickname: '',
        time: '',
        content: ''
      }
    };
  },
  methods: {
    openDialog(img) {
      this.currentImage = img;
      this.dialogVisible = true;
   
      this.loginStore.nickname="张三"
     
    },
    async submitComment() {
      if (this.newComment.content.trim() === '') {
        ElMessage.error('评论内容不能为空');
        return;
      }
      this.nickname=this.loginStore.nickname
      const formData = new FormData();
      formData.append("imageName", this.currentImage.imageName);
      formData.append("content", this.newComment.content);
      try {
        const response = await sendComment(formData); // 使用 await 获取响应

        if (response && response.data && response.data.message === "评论发送成功") {
          const timestamp = response.data.timestamp; // 假设这是一个 Unix 时间戳
          const date = new Date(timestamp); // 创建 Date 对象

          // 格式化日期（可以使用 toLocaleString() 或其他格式化方法）
          this.newComment.time = date.toLocaleString()
          this.newComment.nickname=this.loginStore.nickname
      console.log(this.newComment.nickname)
        
          this.comments.push({ ...this.newComment });
          this.newComment.content = ''; // 清空输入框
          ElMessage.success("评论发布成功");
        } else {
          ElMessage.error('评论发送失败');
        }
      } catch (error) {
        console.error('提交评论时发生错误:', error);
        ElMessage.error('提交评论时发生错误');
      }
    },
  }
};
</script>

<style scoped>
.photo-card {
  cursor: pointer;
  margin-bottom: 20px;
}
.comment-item {
  margin-bottom: 20px;
}
.comment-card {
  margin-bottom: 10px;
}
</style>