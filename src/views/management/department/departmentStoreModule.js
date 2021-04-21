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
        axios
        .get('/manage/department/getAllUsers')
        .then(response => resolve(response))
        .catch(error => reject(error))
      })
    },
    fetchDepartments(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axiosIns
          .get('/manage/department/getAllDepts', {
            params: queryParams
          })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    askForAdd (ctx, addData) {
      return new Promise((resolve, reject) => {
        axios
        .post('manage/department/askForAdd', { add: addData })
        .then(response => resolve(response))
        .catch(error => reject(error))
      })
    },
    askForEdit(ctx, editData) {
      return new Promise((resolve, reject) => {
        axios
        .post('manage/department/askForEdit', { edit: editData })
        .then(response => resolve(response))
        .catch(error => reject(error))
      })
    },
    askForDel(ctx, delData) {
      return new Promise((resolve, reject) => {
        axios
        .get('manage/department/askForDel', { params: {
          deptId: delData.deptId
        } })
        .then(response => resolve(response))
        .catch(error => reject(error))
      })
    }
    
  },
}
