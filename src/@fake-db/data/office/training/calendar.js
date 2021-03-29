import mock from '@/@fake-db/mock'
import axiosIns from '@/libs/axios'

const date = new Date()

const fetchUserTrainings = async (userId, year, month) => {
  return await axiosIns.get('training/getTraining', {
    params: {
      requestUserId: JSON.parse(localStorage.getItem('userData')).userId,
      userId: userId,
      year: year,
      month: month
    }
  })
  .then(response => {
    if (response.data.status.code === '0000') {
      const vo = response.data.data

      let trainings = []

      vo.forEach(training => {
        const calendarItem = {
          title: training.trainingContent,
          start: training.trainingStartTime,
          end: training.trainingEndTime,
          allDay: false,
          extendedProps: {
            type: training.trainingType,
            place: training.trainingPlace,
            status: training.trainingStatus,
            heads: training.trainingHeads
          }
        }
        trainings.push(calendarItem)
      })

      return trainings
    }
  })
}

// ------------------------------------------------
// GET: Return attendances
// ------------------------------------------------
mock.onGet('/office/training/userTrainings')
.reply(config => {
  let {
    userId,
    year = date.getFullYear(),
    month = date.getMonth() + 1,
    statuses
  } = config.params
  statuses = statuses.split(',')

  return fetchUserTrainings(userId, year, month)
  .then(trainings => {
    return [200, trainings.filter(training => statuses.includes(training.extendedProps.status))]
  })
})
