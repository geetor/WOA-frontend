import mock from '@/@fake-db/mock'
import { paginateArray, sortCompare } from '@/@fake-db/utils'
import axiosIns from '@/libs/axios'

const fetchChargedDepartments = async () => {
  return await axiosIns.get('/user/getChargeDepts', {
    params: {
      userId: JSON.parse(localStorage.getItem('userData')).userId
    }
  })
  .then(response => {
    if (response.data.status.code === '0000') {
      return response.data.data
    }
  })
}

const fetchLeaves = async () => {
  return await axiosIns.get('/attendance/getChargeDeptLeaves', {
    params: {
      userId: JSON.parse(localStorage.getItem('userData')).userId
    }
  })
  .then(response => {
    if (response.data.status.code === '0000') {
      return response.data.data
    }
  })
}

const approveLeave = async (userId, leaveId) => {
  return await axiosIns.get('/attendance/approveLeave', {
    params: {
      approveUserId: JSON.parse(localStorage.getItem('userData')).userId,
      userId: userId,
      leaveId: leaveId
    }
  })
}

const rejectLeave = async (userId, leaveId) => {
  return await axiosIns.get('/attendance/rejectLeave', {
    params: {
      rejectUserId: JSON.parse(localStorage.getItem('userData')).userId,
      userId: userId,
      leaveId: leaveId
    }
  })
}

// ------------------------------------------------
// GET: Return Charged Departments
// ------------------------------------------------
mock.onGet('/office/leave/departments')
.reply(config => {

  return fetchChargedDepartments()
  .then(departments => {
    return [200, departments]
  })

})

// ------------------------------------------------
// GET: Return Leaves
// ------------------------------------------------
mock.onGet('/office/leave/leaves')
.reply(config => {

  const {
    q = '',
    perPage = 10,
    page = 1,
    sortBy = '离队时间',
    sortDesc = false,
    leaveType = null,
    department = null,
    leaveStatus = null,
  } = config.params

  const sortKeys = [
    {
      name: '离队时间',
      key: 'leaveStartTime'
    },
    {
      name: '归队时间',
      key: 'leaveEndTime'
    }
  ]

  return fetchLeaves()
  .then(deptLeaves => {
      const filteredData = deptLeaves.filter(
        leave =>
          (leave.userName.includes(q) || leave.userPhone.includes(q)) &&
          leave.leaveType === (leaveType || leave.leaveType) &&
          (department ? leave.depts.includes(department) : true) &&
          leave.leaveStatus === (leaveStatus || leave.leaveStatus)
      )

      const sortedData = filteredData.sort(sortCompare(sortKeys.find(sortKey => sortKey.name === sortBy).key))
      if (sortDesc) sortedData.reverse()

      return [
        200,
        {
          users: paginateArray(sortedData, perPage, page),
          total: filteredData.length
        }
      ]
    }
  )

})

// ------------------------------------------------
// GET: Approve Leave
// ------------------------------------------------
mock.onGet('/office/leave/approveLeave')
.reply(config => {

  const {
    userId,
    leaveId
  } = config.params

  return approveLeave(userId, leaveId)
  .then(() => {
    return [200]
  })

})

// ------------------------------------------------
// GET: Reject Leave
// ------------------------------------------------
mock.onGet('/office/leave/rejectLeave')
.reply(config => {

  const {
    userId,
    leaveId
  } = config.params

  return rejectLeave(userId, leaveId)
  .then(() => {
    return [200]
  })

})
