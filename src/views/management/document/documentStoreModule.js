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
        .get('/manage/document/getAllUsers')
        .then(response => resolve(response))
        .catch(error => reject(error))
      })
    },
    fetchDepartments () {
      return new Promise((resolve, reject) => {
        axios
        .get('/office/training/departments')
        .then(response => resolve(response))
        .catch(error => reject(error))
      })
    },
    fetchDocuments(ctx, queryParams) {

      return new Promise((resolve, reject) => {
        axiosIns
          .get('/manage/document/getAllDocuments', {
            params: queryParams
          })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    askForAdd (ctx, addData) {
      return new Promise((resolve, reject) => {
        axios
        .post('manage/document/askForAdd', { add: addData })
        .then(response => resolve(response))
        .catch(error => reject(error))
      })
    },
    askForEdit(ctx, editData) {
      return new Promise((resolve, reject) => {
        axios
        .post('manage/document/askForEdit', { edit: editData })
        .then(response => resolve(response))
        .catch(error => reject(error))
      })
    },
    askForDel(ctx, delData) {
      return new Promise((resolve, reject) => {
        axios
        .get('manage/document/askForDel', { params: {
          documentId: delData.documentId
        } })
        .then(response => resolve(response))
        .catch(error => reject(error))
      })
    }

  },
}
