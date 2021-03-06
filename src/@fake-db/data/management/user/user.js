import axiosIns from '@/libs/axios'
import mock from '@/@fake-db/mock'
import { paginateArray, sortCompare } from '@/@fake-db/utils'

const fetchData = async () => {
  const data = {}

  return await axiosIns.get('/user/getAllUsers', {
    params: {
      userId: JSON.parse(localStorage.getItem('userData')).userId
    }
  })
  .then(response => {
    const statusCode = response.data.status.code

    if (statusCode === '0000') {
      const vo = response.data.data

      return {
        users: vo,
        total: vo.length
      }
    }
  })
}
const askForAdd = async (addData) => {
  return await axiosIns.post('/user/addUser', {
    userName: addData.userName,
    admin: addData.admin,
    userRank: addData.userRank,
    userGender: addData.userGender,
    userPhone: addData.userPhone,
    userEmail: addData.userEmail,
    userStatus: addData.userStatus,
    userPassword: addData.userPassword,
    userDepts: addData.userDepts
  })
}

const askForEdit = async (editData) => {
  return await axiosIns.post('/user/editUser', {
    userId: editData.userId,
    userName: editData.userName,
    admin: editData.admin,
    userRank: editData.userRank,
    userGender: editData.userGender,
    userPhone: editData.userPhone,
    userEmail: editData.userEmail,
    userStatus: editData.userStatus,
    userPassword: editData.userPassword,
    userDepts: editData.userDepts
  })
}

const askForDel = async (params) => {
  return await axiosIns.get('/user/delUser?userId=' + params.userId)
}

// ------------------------------------------------
// GET: Return Users
// ------------------------------------------------
mock.onGet('/manage/user/getAllUsers')
.reply(config => {

  return fetchData()
  .then(data => {
    const {
      users,
      total
    } = data
    const {
      q = '',
      perPage = 10,
      page = 1,
      sortBy = 'userRank',
      sortDesc = false,
      rank
    } = config.params

    const filteredData = users.filter(
      user =>
        (user.userDepts.some((item) => {
            return item.deptName.includes(q)
          }) ||
          (user.userPhone.includes(q) || user.userName.includes(q) || user.userEmail.includes(q))) &&
        (rank ? user.userRank === Number(rank) : true)
    )

    const sortedData = filteredData.sort(sortCompare(sortBy))
    if (sortDesc) sortedData.reverse()
    return [
      200,
      {
        invoices: paginateArray(sortedData, perPage, page),
        total: filteredData.length
      }
    ]
  })

})

// ------------------------------------------------
// POST: Add User
// ------------------------------------------------
mock.onPost('manage/user/askForAdd')
.reply(config => {

  const { add } = JSON.parse(config.data)

  return askForAdd(add)
  .then(() => {
      return [201, { add }]
    }
  )

})

// ------------------------------------------------
// POST: Edit User
// ------------------------------------------------
mock.onPost('manage/user/askForEdit')
.reply(config => {

  const { edit } = JSON.parse(config.data)

  return askForEdit(edit)
  .then(() => {
      return [201, { edit }]
    }
  )

})

// ------------------------------------------------
// GET: Del User
// ------------------------------------------------
mock.onGet('manage/user/askForDel')
.reply(config => {

  const params = config.params

  return askForDel(params)
  .then(() => {
      return [201, { params }]
    }
  )

})
