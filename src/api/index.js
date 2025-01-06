import request from "../utils/request"




//获取用户列表

export const getUserList=()=>{
    return request.post("/user/login")
    
}


export const loginSystem=(data)=>{
    return request.post("/user/login",data)
}


export const registerCode=(data)=>{
    return request.post("/user/register",data)
}

export const upLoadFile=(formData)=>{
  return request.post("/file/upload",formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true 
  })

}



export const sendComment=(imageName)=>{
  return request.post("/comment/send",imageName)
}

export const getComments=(imageName)=>{
  return request.get("/comment/get/"+imageName)
}


export const getUsers=()=>{
  return request.get("/user/getAllUser")
}

export const deleteByUsername=(username)=>{
  return request.get("/user/deleteUsername/"+username)
}

export const updateByUsername=(fromData)=>{
  return request.post("/user/update",fromData)
}


