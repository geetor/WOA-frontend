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
    fetchUsers (ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axiosIns
        .get('/manage/user/getAllUsers', {
          params: queryParams
        })
        .then(response => resolve(response))
        .catch(error => reject(error))
      })
    },
    askForAdd (ctx, addData) {
      return new Promise((resolve, reject) => {
        axios
        .post('manage/user/askForAdd', { add: addData })
        .then(response => resolve(response))
        .catch(error => reject(error))
      })
    },
    askForEdit (ctx, editData) {
      return new Promise((resolve, reject) => {
        axios
        .post('manage/user/askForEdit', { edit: editData })
        .then(response => resolve(response))
        .catch(error => reject(error))
      })
    },
    askForDel (ctx, delData) {
      return new Promise((resolve, reject) => {
        axios
        .get('manage/user/askForDel', {
          params: {
            userId: delData.userId
          }
        })
        .then(response => resolve(response))
        .catch(error => reject(error))
      })
    }
  }
}
