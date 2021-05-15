import Vue from 'vue'

// axios
import axios from 'axios'

const axiosIns = axios.create({
  baseURL: 'http://49.235.232.63:3180',
  timeout: 1000 * 10,
  headers: { 'X-Custom-Header': 'foobar' }
})

Vue.prototype.axiosIns = axiosIns

// 暂时开放
Vue.prototype.$http = axiosIns

export default axiosIns
