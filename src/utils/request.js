import axios from "axios";

const http= axios.create({
    //后端接口
    baseURL: 'http://192.168.235.150:12123',
    timeout: 10000,
    
  });


  //添加拦截器
  //在请求或响应被 then 或 catch 处理前拦截它们。

// 添加请求拦截器
http.interceptors.request.use(function (config) {
   /*  // 在发送请求之前做些什么---token添加
    const token=localStorage.getItem('login_token')

    //不需要token的白名单
    const whileUrl=['/get/code','/login']//获取验证码，登录

    if(token&&whileUrl.includes(config.url)){
        config.headers['X-token']=token
    } */
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
http.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  });

  export default http