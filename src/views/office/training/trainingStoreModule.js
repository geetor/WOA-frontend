import axios from '@axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchDepartments () {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          axios
          .get('/office/training/departments')
          .then(response => resolve(response))
          .catch(error => reject(error))
        }, 7000)
      })
    },
    fetchUsers (ctx, queryParams) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          axios
          .get('/office/training/users', { params: queryParams })
          .then(response => resolve(response))
          .catch(error => reject(error))
        }, 7000)
      })
    }
  },
}
