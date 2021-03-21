import axios from '@axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchDepartments () {
      return new Promise((resolve, reject) => {
        axios
        .get('/office/attendance/departments')
        .then(response => resolve(response))
        .catch(error => reject(error))
      })
    },
    fetchUsers (ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
        .get('/office/attendance/users', { params: queryParams })
        .then(response => resolve(response))
        .catch(error => reject(error))
      })
    }
  },
}
