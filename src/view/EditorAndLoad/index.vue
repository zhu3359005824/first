<template>
  <div class="image-share-platform">
    <div class="header">
    请输入标题： <el-input
    v-model="title"
    style="width: 240px"
    maxlength="10"
    placeholder="标题"
    show-word-limit
    type="text"
    class="title"  
  />
    </div>
    <div class="upload-area">
      <input type="file" ref="fileInput" @change="handleFileChange" />
    <!--   <button @click="uploadFile">上传</button> -->
      <img v-if="file" :src="fileSrc" alt="预览图" class="preview-image" />
    </div>
    <div class="comment-area">
      <textarea placeholder="用户输入文字，发表对图片看法" v-model="comment"></textarea>
      <button @click="sendComment">发布按钮</button>
    </div>
  </div>
</template>









<script>
import axios from 'axios';
import { ElMessage } from 'element-plus'
import { upLoadFile } from '../../api/index.js'

export default {
  data() {
    return {
      file: null,
      fileSrc: '', // 用于存储图片预览的URL
      uploading: false,
      uploadSuccess: false,
      uploadError: null,
      title:'',
      comment: ''
    };
  },
  methods: {
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.file = file;
        this.fileSrc = URL.createObjectURL(file); // 创建一个本地URL用于预览
      }
    },

  

  async  sendComment() {
    if (this.title.trim() === '') {
        ElMessage.error('请输入标题内容');
        return;
      }
      if (this.comment.trim() === '') {
        ElMessage.error('请输入评论内容');
        return;
      }

      if (!this.file) {
        ElMessage.error('请选择一个文件');
        return;
      }
      const formData = new FormData();
      formData.append('file', this.file);
      formData.append('issue', this.title);
      formData.append('view', this.comment);

      this.uploading = true;
      this.uploadSuccess = false;
      this.uploadError = null;

      try {
        const response = await upLoadFile(formData)

        if (response.data.message==="文件上传成功") {
          this.uploadSuccess = true;
          ElMessage.success('评论已发送');
          this.comment = '';
        } else {
          this.uploadError = '上传失败';
        }
      } catch (error) {
        console.error(error);
        this.uploadError = '上传请求失败';
      } finally {
        this.uploading = false;
      }
      // 发送评论的逻辑
     
    
    }
  },
};
</script>

<style lang="less" scoped>
.image-share-platform {
  background-color: #f9f9f9; /* 背景色为浅灰色 */
  border: 1px solid #ddd; /* 较淡的边框 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
  padding: 20px;
  width: 80%;
  border-radius: 10px; /* 圆角 */
  margin: 20px auto; /* 居中 */
}

.header {
  display: flex;
  align-items: center; /* 垂直居中 */
  justify-content: space-between; /* 两端对齐 */
  border-bottom: 2px solid #4CAF50; /* 标题下方用绿色线条 */
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.header .title {
  flex-grow: 1; /* 使标题输入框占用剩余空间 */
  margin-right: 10px; /* 右边距 */
}

.upload-area {
  border: 2px solid #4CAF50; /* 使用虚线边框 */
  border-radius: 10px; /* 圆角 */
  padding: 20px;
  margin-bottom: 20px;
  text-align: center; /* 使内容居中 */
}

.preview-image {
  max-width: 100%;
  max-height: 200px;
  border-radius: 10px; /* 圆角 */
  margin-top: 10px;
  object-fit: cover; /* 保持图片比例 */
}

.comment-area {
  border: 1px solid #ddd; /* 较淡的边框 */
  border-radius: 10px; /* 圆角 */
  padding: 20px; /* 增加内边距 */
  background-color: #fff; /* 背景色为白色 */
}

textarea {
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
  border: 1px solid #ddd; /* 较淡的边框 */
  border-radius: 5px; /* 圆角 */
  padding: 10px; /* 增加内边距 */
  resize: none; /* 禁用调整大小 */
  font-size: 14px; /* 字体大小 */
}

button {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px; /* 圆角 */
  background-color: #4CAF50; /* 绿色背景 */
  color: white; /* 白色字体 */
  font-size: 16px; /* 字体大小 */
  cursor: pointer;
  transition: background-color 0.3s; /* 添加过渡效果 */
}

button:hover {
  background-color: #45a049; /* 悬停时的颜色变化 */
}

button:disabled {
  background-color: #ccc; /* 禁用状态的背景色 */
  cursor: not-allowed; /* 禁用状态的光标 */
}
</style>