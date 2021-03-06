import axios from '@axios'

export default {
  namespaced: true,
  state: {
    attendanceTypes: [
      {
        color: 'success',
        label: '签到'
      },
      {
        color: 'danger',
        label: '迟到'
      },
      {
        color: 'success',
        label: '签退'
      },
      {
        color: 'danger',
        label: '早退'
      },
      {
        color: 'info',
        label: '请假'
      }
    ],
    selectedTypes: ['签到', '迟到', '签退', '早退', '请假']
  },
  getters: {},
  mutations: {
    SET_SELECTED_TYPES (state, val) {
      state.selectedTypes = val
    },
  },
  actions: {
    fetchAttendances (ctx, {
      userId,
      startDateStr,
      endDateStr,
      types
    }) {
      return new Promise((resolve, reject) => {
        axios
        .get('/office/attendance/attendances', {
          params: {
            userId: userId,
            startDateStr: startDateStr,
            endDateStr: endDateStr,
            types: types.join(',')
          },
        })
        .then(response => resolve(response))
        .catch(error => reject(error))
      })
    }
  }
}
