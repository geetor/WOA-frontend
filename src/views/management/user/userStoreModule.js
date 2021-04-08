import axios from '@axios'
import axiosIns from '@/libs/axios'


export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchDepartments () {
      return new Promise((resolve, reject) => {
        axios
        .get('/office/training/departments')
        .then(response => resolve(response))
        .catch(error => reject(error))
      })
    },
    fetchUsers(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axiosIns
          .get('/manage/user/getAllUsers', {
            params: queryParams
          })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    }
  },
}
