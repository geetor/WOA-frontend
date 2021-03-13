import Vue from 'vue'

// axios
import axios from 'axios'

const axiosIns = axios.create({
  baseURL: 'http://49.235.232.63:3180',
  timeout: 3000,
  headers: { 'X-Custom-Header': 'foobar' },
})

Vue.prototype.$http = axiosIns

export default axiosIns
