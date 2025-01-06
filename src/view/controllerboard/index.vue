<template>
  <div>
    <!-- 图片展示界面 -->
    <div class="image-container" v-if="images.length > 0">
      <el-row :gutter="40">
        <div v-for="(img, index) in images" :key="index">
          <el-card class="photo-card" @click="openDialog(img)">
            <el-image :src="img.src" style="max-width: 800px; height: 300px;" :fit="contain" />
          </el-card>
        </div>
      </el-row>
    </div>
    <!-- 图片查看对话框 -->
    <el-dialog v-model="dialogVisible" width="70%" draggable  @close="handleClose">
      <el-card v-if="currentImage" class="photo-card">
        <el-image :src="currentImage.src" style="max-width: 500px; height: 200px;" :fit="contain" />
      </el-card>
      <!-- 评论区 -->
      <el-card class="box-card" header="评论区">
        <!-- 评论列表 -->
        <div v-for="(comment, index) in comments" :key="index" class="comment-item">
          <el-card class="comment-card">
            <div slot="header" class="clearfix">
              <span>{{ comment.author }}</span>
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
import {sendComment,getComments} from '../../api/index.js'
import { ElMessage } from 'element-plus'
export default {
  data() {
    return {
      imageName: '',
      images: [
        /* { src: '1.png',imageName:"1736041820333.jpg" },
        { src: '2.png' ,imageName:"1736041820333.jpg"},
        // 更多图片路径 */
      ],
      imagesByUsername:[
        
      ],
      currentImage: null,
      dialogVisible: false,
      comments: [
        
        // 可以添加更多预设评论
      ],
      newComment: {
        author: '',
        time: '',
        content: ''
      }
    };
  },
  methods: {
    async  openDialog(img) {
      this.currentImage = img;
      this.dialogVisible = true;
      try {
        
        const response= await getComments(this.currentImage.imageName)
        if (response && response.data ) {
          const commentsArray = response.data.data;
          // 遍历数组并处理每个评论
          commentsArray.forEach(comment => {
            this.comments.push({
              content: comment.content,
              time: new Date(comment.createdAt).toLocaleString(), // 格式化时间
              // 可以添加其他属性
              nickname:comment.nickname? comment.nickname:'匿名用户'
            });
          });

        } else {
          ElMessage.error('评论读取失败');
        }
      } catch (error) {
        console.error('发生错误:', error);
     
      }

    },
    //提交评论
    // 提交评论
    async submitComment() {
      if (this.newComment.content.trim() === '') {
        ElMessage.error('评论内容不能为空');
        return;
      }

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
    //关闭对话框时,清除评论区内容
    handleClose() {
      this.comments = []; // 清空评论区
      this.currentImage = null; // 清空当前图片
      this.newComment.content = ''; // 清空新评论输入框
    },
    //加载图片
    async loadImages() {
      try {
        const response = await fetch(`http://192.168.235.150:12123/file/image`);
        if (!response.ok) {
          console.error('获取图片失败');
          return;
        }

        // 获取表单数据
        const formData = await response.formData();
        const images = [];

        // 遍历表单数据中的每一部分
        formData.forEach((value) => {
           
            this.imageName=value.name
          if (value instanceof File) {
            // 将文件对象转换为图片URL
            const imgURL = URL.createObjectURL(value);
            images.push({ src: imgURL ,imageName:this.imageName});
          } else {
            console.error('非文件数据:', value);
          }
        });
      
        // 更新图片列表
        this.images = images;
        
      } catch (error) {
        console.error('加载图片时发生错误:', error);
      }
    },


    //按需加载图片
    async loadImagesByUsername(username) {
      try {
        const response = await fetch(`http://192.168.235.150:12123/file/image/${username}`);
        if (!response.ok) {
          console.error('获取图片失败');
          return;
        }

        // 获取表单数据
        const formData = await response.formData();
        const images = [];

        // 遍历表单数据中的每一部分
        formData.forEach((value) => {
           
            this.imageName=value.name
          if (value instanceof File) {
            // 将文件对象转换为图片URL
            const imgURL = URL.createObjectURL(value);
            images.push({ src: imgURL ,imageName:this.imageName});
          } else {
            console.error('非文件数据:', value);
          }
        });
      
        // 更新图片列表
        this.imagesByUsername = images;
        
      } catch (error) {
        console.error('加载图片时发生错误:', error);
      }
    },
  },
  mounted() {
    // 在组件挂载后立即加载图片
    this.loadImages();
  },
};
</script>

<style lang="less" scoped>
.image-container {
  display: flex;
  flex-wrap: wrap;
  gap: 40px; /* 使用 gap 来统一设置行间距和列间距 */
}

.photo-card {
  margin: 20px; /* 为上下左右都设置20px的外边距 */
  cursor: pointer;
  max-width: 480px;
 
  display: inline-block;
  vertical-align: top;
  transition: transform 0.3s, box-shadow 0.3s;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.photocard:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.el-image {
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.comment-item {
  margin-bottom: 10px;
}

.comment-card {
  background-color: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  padding: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.comment-card .clearfix {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.comment-card time {
  font-size: 12px;
  color: #888;
}

.el-form-item {
  margin: 10px 0;
}

.el-input {
  border-radius: 4px;
  border: 1px solid #dcdcdc;
}

.el-button {
  border-radius: 4px;
  background-color: #409EFF; /* Element Plus primary color */
  color: white;
}

.el-button:hover {
  background-color: #66b1ff;
}

/* Dialog customization */
.el-dialog {
  border-radius: 10px;
}

.el-card {
  border-radius: 8px;
  overflow: hidden;
}
</style>