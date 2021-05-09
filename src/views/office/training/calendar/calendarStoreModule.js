import axios from '@axios'

export default {
  namespaced: true,
  state: {
    statusOptions: [
      {
        color: 'danger',
        label: '待训'
      },
      {
        color: 'success',
        label: '在训'
      },
      {
        color: 'warning',
        label: '结束'
      }
    ],
    selectedStatuses: ['待训', '在训', '结束']
  },
  getters: {},
  mutations: {
    SET_SELECTED_STATUSES (state, val) {
      state.selectedStatuses = val
    },
  },
  actions: {
    fetchDeptsTrainings (ctx, {
      department,
      startDateStr,
      endDateStr,
      statuses
    }) {
      return new Promise((resolve, reject) => {
        axios
        .get('/office/training/deptsTrainings', {
          params: {
            department: department,
            startDateStr: startDateStr,
            endDateStr: endDateStr,
            statuses: statuses.join(',')
          },
        })
        .then(response => resolve(response))
        .catch(error => reject(error))
      })
    },
    fetchUserTrainings (ctx, {
      user,
      startDateStr,
      endDateStr,
      statuses
    }) {
      return new Promise((resolve, reject) => {
        axios
        .get('/office/training/userTrainings', {
          params: {
            user: user,
            startDateStr: startDateStr,
            endDateStr: endDateStr,
            statuses: statuses.join(','),
          },
        })
        .then(response => resolve(response))
        .catch(error => reject(error))
      })
    },
    addTraining (ctx, { training }) {
      return new Promise((resolve, reject) => {
        axios
        .post('/office/training/addTraining', { training })
        .then(response => resolve(response))
        .catch(error => reject(error))
      })
    },
    editTraining (ctx, { training }) {
      return new Promise((resolve, reject) => {
        axios
        .post('/office/training/editTraining', { training })
        .then(response => resolve(response))
        .catch(error => reject(error))
      })
    },
    delTraining (ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
        .delete(`/office/training/delTraining/${id}`)
        .then(response => resolve(response))
        .catch(error => reject(error))
      })
    },
    fetchLowerUsers () {
      return new Promise((resolve, reject) => {
        axios
        .get('/office/training/lowerUsers')
        .then(response => resolve(response))
        .catch(error => reject(error))
      })
    }
  }
}
