import mock from '@/@fake-db/mock'
import axiosIns from '@/libs/axios'

const fetchDeptsTrainings = async (startDateStr, endDateStr) => {
  return await axiosIns.get('training/getDeptsTrainings', {
    params: {
      userId: JSON.parse(localStorage.getItem('userData')).userId,
      startDateStr: startDateStr,
      endDateStr: endDateStr
    }
  })
  .then(response => {
    if (response.data.status.code === '0000') {
      const vo = response.data.data

      let departmentTrainings = []

      vo.forEach(departmentTraining => {
        const department = departmentTraining.deptName
        let trainings = []
        departmentTraining.deptTrainings.forEach(training => {
          const calendarItem = {
            id: training.trainingId,
            title: training.trainingContent,
            start: training.trainingStartTime,
            end: training.trainingEndTime,
            extendedProps: {
              type: training.trainingType,
              place: training.trainingPlace,
              status: training.trainingStatus,
              heads: training.trainingHeads,
              members: training.trainingMembers
            }
          }
          trainings.push(calendarItem)
        })
        departmentTrainings.push({
          department,
          trainings
        })
      })

      return departmentTrainings
    }
  })
}

const fetchUserTrainings = async (user, startDateStr, endDateStr) => {
  return await axiosIns.get('training/getTraining', {
    params: {
      requestUserId: JSON.parse(localStorage.getItem('userData')).userId,
      userId: user,
      startDateStr: startDateStr,
      endDateStr: endDateStr
    }
  })
  .then(response => {
    if (response.data.status.code === '0000') {
      const vo = response.data.data

      let trainings = []

      vo.forEach(training => {
        const calendarItem = {
          id: training.trainingId,
          title: training.trainingContent,
          start: training.trainingStartTime,
          end: training.trainingEndTime,
          extendedProps: {
            type: training.trainingType,
            place: training.trainingPlace,
            status: training.trainingStatus,
            heads: training.trainingHeads,
            members: training.trainingMembers
          }
        }
        trainings.push(calendarItem)
      })

      return trainings
    }
  })
}

const fetchLowerUsers = async () => {
  return await axiosIns.get('user/getLowerUsers', {
    params: {
      userId: JSON.parse(localStorage.getItem('userData')).userId
    }
  })
  .then(response => {
    if (response.data.status.code === '0000') {
      const vo = response.data.data

      let lowerUsers = []

      vo.forEach(department => {
        department.simpleUserVOS.forEach(user => {
          const userItem = {
            userId: user.userId,
            userName: user.userName
          }
          lowerUsers.push(userItem)
        })
      })

      // 去重
      let hash = {}
      lowerUsers = lowerUsers.reduce(function (item, next) {
        hash[next.userId] ? '' : hash[next.userId] = true && item.push({ ...next })
        return item
      }, [])

      return lowerUsers
    }
  })
}

const addTraining = async (trainingData) => {
  const date = new Date()
  return await axiosIns.post('training/addTraining', {
    trainingType: trainingData.extendedProps.type,
    trainingStartTime: new Date(Date.parse(trainingData.start) - (date.getTimezoneOffset() * 60000)).toJSON()
    .substr(0, 19)
    .replace('T', ' '),
    trainingEndTime: new Date(Date.parse(trainingData.end) - (date.getTimezoneOffset() * 60000)).toJSON()
    .substr(0, 19)
    .replace('T', ' '),
    trainingPlace: trainingData.extendedProps.place,
    trainingContent: trainingData.title,
    trainingHeads: trainingData.extendedProps.heads.map(head => head.userId),
    trainingMembers: trainingData.extendedProps.members.map(member => member.userId)
  })
}

const editTraining = async (trainingData) => {
  const date = new Date()
  return await axiosIns.post('training/editTraining', {
    trainingId: Number(trainingData.id),
    trainingType: trainingData.extendedProps.type,
    trainingStartTime: new Date(Date.parse(trainingData.start) - (date.getTimezoneOffset() * 60000)).toJSON()
    .substr(0, 19)
    .replace('T', ' '),
    trainingEndTime: new Date(Date.parse(trainingData.end) - (date.getTimezoneOffset() * 60000)).toJSON()
    .substr(0, 19)
    .replace('T', ' '),
    trainingPlace: trainingData.extendedProps.place,
    trainingContent: trainingData.title,
    trainingHeads: trainingData.extendedProps.heads.map(head => head.userId),
    trainingMembers: trainingData.extendedProps.members.map(member => member.userId),
    trainingStatus: trainingData.extendedProps.status
  })
}

const delTraining = async (trainingId) => {
  return await axiosIns.get('training/delTraining', {
    params: {
      trainingId: trainingId
    }
  })
}

// ------------------------------------------------
// GET: Return Trainings of Department(s)
// ------------------------------------------------
mock.onGet('/office/training/deptsTrainings')
.reply(config => {

  let {
    department,
    startDateStr,
    endDateStr,
    statuses
  } = config.params
  statuses = statuses.split(',')

  return fetchDeptsTrainings(startDateStr, endDateStr)
  .then(departmentTrainings => {

    let trainings = []

    if (department === '所有部门') {
      departmentTrainings.forEach(departmentTraining => {
        trainings = trainings.concat(departmentTraining.trainings)
      })

      // 去重
      let hash = {}
      trainings = trainings.reduce(function (item, next) {
        hash[next.id] ? '' : hash[next.id] = true && item.push({ ...next })
        return item
      }, [])
    } else {
      const departmentTraining = departmentTrainings.find(departmentTraining => departmentTraining.department === department)
      trainings = trainings.concat(departmentTraining.trainings)
    }

    return [200, trainings.filter(training => statuses.includes(training.extendedProps.status))]
  })

})

// ------------------------------------------------
// GET: Return Trainings of User
// ------------------------------------------------
mock.onGet('/office/training/userTrainings')
.reply(config => {

  let {
    user,
    startDateStr,
    endDateStr,
    statuses
  } = config.params
  statuses = statuses.split(',')

  return fetchUserTrainings(user, startDateStr, endDateStr)
  .then(trainings => {
    return [200, trainings.filter(training => statuses.includes(training.extendedProps.status))]
  })

})

// ------------------------------------------------
// GET: Return Lower Rank Users
// ------------------------------------------------
mock.onGet('/office/training/lowerUsers')
.reply(config => {

  return fetchLowerUsers()
  .then(lowerUsers => {
    return [200, lowerUsers]
  })

})

// ------------------------------------------------
// POST: Add Training
// ------------------------------------------------
mock.onPost('/office/training/addTraining')
.reply(config => {

  const { training } = JSON.parse(config.data)

  return addTraining(training)
  .then(() => {
      return [200, { training }]
    }
  )

})

// ------------------------------------------------
// POST: Edit Training
// ------------------------------------------------
mock.onPost('/office/training/editTraining')
.reply(config => {

  const { training } = JSON.parse(config.data)

  return editTraining(training)
  .then(() => {
      return [200, { training }]
    }
  )

})

// ------------------------------------------------
// DELETE: Remove Event
// ------------------------------------------------
mock.onDelete(/\/office\/training\/delTraining\/\d+/)
.reply(config => {

  let trainingId = Number(config.url.substring(config.url.lastIndexOf('/') + 1))

  return delTraining(trainingId)
  .then(() => {
      return [200]
    }
  )

})
