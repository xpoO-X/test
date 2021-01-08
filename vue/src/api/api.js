import axios from 'axios';

// let base = 'http://59.110.29.195:8091/mfcxfk/';
var qs=require('qs');
var instance = axios.create({
    headers: {'content-type': 'application/x-www-form-urlencoded'}
});

// instance.interceptors.response.use(function (response) {
//   console.log(response,5555555555)
//   // token 已过期，重定向到登录页面
//   if (response.data.data.code == 9999){
//     localStorage.clear()
//     router.replace({
//       path: '/signin'
//     })
//   }
//   return response
// }, function (error) {
//   // Do something with response error
//   return Promise.reject(error)
// })

let bsse = ''
// 用于设置跨域请求代理


//用户登录
export const Login = params => { return instance.post(`login`, qs.stringify(params)).then(res => res.data);};
export const Date = params => { return instance.post(`http://rap2api.taobao.org/app/mock/21686/data`, qs.stringify(params)).then(res => res.data);};
export const List = params => { return instance.post(`http://list.ydui.org/getdata.php?type=backposition`, qs.stringify(params)).then(res => res.data);};
export const Dates ='http://rap2api.taobao.org/app/mock/21686/data';
export const Ajax = params => { return instance.post(`http://rap2api.taobao.org/app/mock/4862/GET/example/1234`, qs.stringify(params)).then(res => res.data);};
export const Da = params => { return instance.post(`http://rap2api.taobao.org/app/mock/21686/data`, qs.stringify(params)).then(res => res.data);};
export const di = params => { return instance.post(`http://192.168.1.19:19011/address/getAddress.do`, qs.stringify(params)).then(res => res);};
