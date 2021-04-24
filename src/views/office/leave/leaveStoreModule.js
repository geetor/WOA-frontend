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
        .get('/office/leave/departments')
        .then(response => resolve(response))
        .catch(error => reject(error))
      })
    },
    fetchLeaves (ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
        .get('/office/leave/leaves', { params: queryParams })
        .then(response => resolve(response))
        .catch(error => reject(error))
      })
    },
    approveLeave (ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
        .get('/office/leave/approveLeave', { params: queryParams })
        .then(response => resolve(response))
        .catch(error => reject(error))
      })
    },
    rejectLeave (ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
        .get('/office/leave/rejectLeave', { params: queryParams })
        .then(response => resolve(response))
        .catch(error => reject(error))
      })
    },
    fetchUser (ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
        .get(`/office/leave/users/${id}`)
        .then(response => resolve(response))
        .catch(error => reject(error))
      })
    }
  }
}
