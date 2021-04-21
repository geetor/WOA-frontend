import axios from '@axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchUsers (ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
        .get('/office/leave/users', { params: queryParams })
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
    },
    addUser (ctx, userData) {
      return new Promise((resolve, reject) => {
        axios
        .post('/office/leave/users', { user: userData })
        .then(response => resolve(response))
        .catch(error => reject(error))
      })
    }
  }
}
