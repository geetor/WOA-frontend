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

// ------------------------------------------------
// GET: Return Departments
// ------------------------------------------------
mock.onGet('/manage/user/getAllUsers')
.reply(config => {
  return fetchData()
  .then(data => {
    const { users, total } = data
    const {
      department = '所有部门',
      q = '',
      perPage = 10,
      page = 1,
      sortBy = '等级',
      sortDesc = false,
      rank
    } = config.params

    const filteredData = users.filter(
      user =>
        (rank ? user.userRank === Number(rank) : true)
    )

    const sortKeys = [
      {
        name: '等级',
        key: 'userRank'
      },
      {
        name: 'userId',
        key: 'userId'
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
