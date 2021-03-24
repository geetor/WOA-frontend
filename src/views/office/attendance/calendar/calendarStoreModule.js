import axios from '@axios'

export default {
  namespaced: true,
  state: {
    attendanceTypes: [
      {
        color: 'danger',
        label: '签到'
      },
      {
        color: 'info',
        label: '迟到'
      },
      {
        color: 'danger',
        label: '签退'
      },
      {
        color: 'success',
        label: '早退'
      },
      {
        color: 'warning',
        label: '请假'
      }
    ],
    selectedTypes: ['签到', '迟到', '签退', '早退', '请假']
  },
  getters: {},
  mutations: {
    SET_SELECTED_TYPES(state, val) {
      state.selectedTypes = val
    },
  },
  actions: {
    fetchAttendances(ctx, { userId, types }) {
      return new Promise((resolve, reject) => {
        axios
          .get('/office/attendance/attendances', {
            params: {
              userId: userId,
              types: types.join(','),
            },
          })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    }
  },
}
