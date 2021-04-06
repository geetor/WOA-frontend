import axios from '@axios'
import axiosIns from '@/libs/axios'


export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
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
