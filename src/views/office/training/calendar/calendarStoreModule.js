import axios from '@axios'

export default {
  namespaced: true,
  state: {
    statusOptions: [
      {
        color: 'danger',
        label: '待训',
      },
      {
        color: 'success',
        label: '在训',
      },
      {
        color: 'warning',
        label: '结束',
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
    fetchUserTrainings (ctx, {
      userId,
      statuses
    }) {
      return new Promise((resolve, reject) => {
        axios
        .get('/office/training/userTrainings', {
          params: {
            userId: userId,
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
        .post('/apps/calendar/trainings', { training })
        .then(response => resolve(response))
        .catch(error => reject(error))
      })
    },
    updateTraining (ctx, { training }) {
      return new Promise((resolve, reject) => {
        axios
        .post(`/apps/calendar/trainings/${training.id}`, { training })
        .then(response => resolve(response))
        .catch(error => reject(error))
      })
    },
    removeTraining (ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
        .delete(`/apps/calendar/trainings/${id}`)
        .then(response => resolve(response))
        .catch(error => reject(error))
      })
    }
  }
}
