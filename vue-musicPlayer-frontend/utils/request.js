import axios from 'axios'
// import Vue from 'vue'

const request = axios.create({
  // baseURL: 'localhost'
  // baseURL: process.env.VUE_APP_BASE_API_URL
})

request.interceptors.request.use(config => {
  return config
}, error => {
  // Vue.prototype.$rmTomast()
  return Promise.reject(error)
})

request.interceptors.response.use(response => {
  return Promise.resolve(response)
}, error => {
  return Promise.reject(error)
})

export default request
