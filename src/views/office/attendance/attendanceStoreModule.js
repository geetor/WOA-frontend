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
          .get('/office/attendance/departments')
          .then(response => resolve(response))
          .catch(error => reject(error))
        }, 650)
      })
    },
    fetchUsers (ctx, queryParams) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          axios
          .get('/office/attendance/users', { params: queryParams })
          .then(response => resolve(response))
          .catch(error => reject(error))
        }, 650)
      })
    }
  },
}
