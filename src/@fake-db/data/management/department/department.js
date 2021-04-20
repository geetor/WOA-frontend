import axiosIns from '@/libs/axios'
import mock from '@/@fake-db/mock'
import { paginateArray, sortCompare } from '@/@fake-db/utils'

const fetchData = async () => {
  const data = {}

  return await axiosIns.get('/dept/getAllDepts', {
    params: {
      userId: JSON.parse(localStorage.getItem('userData')).userId
    }
  })
  .then(response => {
    const statusCode = response.data.status.code

    if (statusCode === '0000') {
      const vo = response.data.data

      return {
        depts: vo,
        total: vo.length
      }
    }
  })
}
const askForAdd = async (addData) => {
  return await axiosIns.post('/dept/addDept', {
    deptName: addData.deptName,
    deptRank: addData.deptRank,
    deptUsers: addData.deptUsers,
  })
}

const askForEdit = async (editData) => {
  return await axiosIns.post('/dept/editDept', {
    deptId: editData.deptId,
    deptName: editData.deptName,
    deptRank: editData.deptRank,
    deptUsers: editData.deptUsers,
  })
}

const askForDel = async (params) => {
  return await axiosIns.get('/dept/delDept?deptId=' + params.deptId)
}

const getAllUsers = async (params) => {
  return await axiosIns.get(
    '/user/getAllUsers',
    {
      params: {
      userId: JSON.parse(localStorage.getItem('userData')).userId
      }
   }).then(response => {
    const statusCode = response.data.status.code

    if (statusCode === '0000') {
      const vo = response.data.data

      return {
        users: vo.map(item => {return {userId: item.userId, userName: item.userName}})
      }
    }
   })
}

mock.onGet('/manage/department/getAllUsers')
.reply(config => {
  return getAllUsers(config).then(data => {
    const users = data
    return [
      200, {data: users}
    ]
  })
})

// ------------------------------------------------
// GET: Return Departments
// ------------------------------------------------
mock.onGet('/manage/department/getAllDepts')
.reply(config => {
  return fetchData()
  .then(data => {
    const { depts, total } = data
    const {
      q = '',
      perPage = 10,
      page = 1,
      sortBy = '等级',
      sortDesc = false,
      rank
    } = config.params

    const filteredData = depts.filter(
      department =>
        (rank ? department.deptRank === Number(rank) : true)
    )

    const sortKeys = [
      {
        name: '等级',
        key: 'deptRank'
      },
      {
        name: 'deptId',
        key: 'deptId'
      }
    ]

    const sortedData = filteredData.sort(sortCompare(sortKeys.find(sortKey => sortKey.name === sortBy).key))
    if (sortDesc) sortedData.reverse()
    return [
      200,
      {
        invoices: paginateArray(sortedData, perPage, page),
        total: filteredData.length,
      },
    ]
    })
})
// ------------------------------------------------
// POST: Add task
// ------------------------------------------------
mock.onPost('manage/department/askForAdd')
.reply(config => {
  const { add } = JSON.parse(config.data)
  return askForAdd(add)
  .then(() => {
      return [201, { add }]
    }
  )
})
// ------------------------------------------------
// POST: Edit task
// ------------------------------------------------
mock.onPost('manage/department/askForEdit')
.reply(config => {
  const { edit } = JSON.parse(config.data)
  return askForEdit(edit)
  .then((response) => {
      const statusCode = response.data.status.code

      if (statusCode === '0000') {
        return [201, { edit }]
      }
      else {
        return [404, { edit }]
      }
    }
  )
})

// ------------------------------------------------
// POST: Del task
// ------------------------------------------------
mock.onGet('manage/department/askForDel')
.reply(config => {
  const params = config.params
  return askForDel(params)
  .then(() => {
      return [201, { params }]
    }
  )
})