import Vue from 'vue'

// axios
import axios from 'axios'

const axiosIns = axios.create({
  baseURL: 'https://devhub.work/apis',
  timeout: 1000 * 10,
  headers: { 'X-Custom-Header': 'foobar' }
})

Vue.prototype.axiosIns = axiosIns

// 暂时开放
Vue.prototype.$http = axiosIns

export default axiosIns
