import axiosIns from '@/libs/axios'
import mock from '@/@fake-db/mock'
import { paginateArray, sortCompare } from '@/@fake-db/utils'

const fetchData = async () => {
  const data = {}

  return await axiosIns.get('/training/getLowerUsersTraining', {
    params: {
      userId: JSON.parse(localStorage.getItem('userData')).userId
    }
  })
  .then(response => {
    const statusCode = response.data.status.code

    if (statusCode === '0000') {
      const vo = response.data.data
      const departments = ['所有部门']
      let users = []

      vo.forEach(departmentTraining => {
        const departmentName = departmentTraining.deptName
        const userTrainings = departmentTraining.userTrainings
        departments.push(departmentName)
        userTrainings.forEach(userTraining => {
            users.push(userTraining)
            users[users.length - 1].department = departmentName
          }
        )
      })

      // 去重
      let hash = {}
      const distinctUsers = users.reduce(function (item, next) {
        hash[next.userName] ? '' : hash[next.userName] = true && item.push({ ...next })
        return item
      }, [])
      distinctUsers.forEach(user => user.department = '所有部门')
      users = users.concat(distinctUsers)

      data.users = users
      data.departments = departments

      return data
    }
  })
}

// ------------------------------------------------
// GET: Return Departments
// ------------------------------------------------
mock.onGet('/office/training/departments')
.reply(config => {
  return fetchData()
  .then(data => {
    let departments = []
    data.departments.forEach(department => {
      const departmentRoute = {
        name: department,
        route: {
          name: 'office-training-list-department',
          params: {
            department: department
          }
        }
      }
      departments.push(departmentRoute)
    })
    departments[0].route = {
      name: 'office-training-list'
    }

    const usersMeta = {}
    data.departments.forEach(department => {
      usersMeta[department] = data.users.filter(user => user.department === department).length
    })

    return [
      200,
      {
        departments,
        usersMeta
      },
    ]
  })
})

// ------------------------------------------------
// GET: Return Users
// ------------------------------------------------
mock.onGet('/office/training/users')
.reply(config => {
  return fetchData()
  .then(data => {
    const {
      department = '所有部门',
      q = '',
      perPage = 10,
      page = 1,
      sortBy = '等级',
      sortDesc = false,
      rank
    } = config.params

    const filteredData = data.users.filter(
      user =>
        (user.department === department) &&
        (user.userPhone.includes(q) || user.userName.includes(q)) &&
        (rank ? user.userRank === Number(rank) : true),
    )

    const sortKeys = [
      {
        name: '等级',
        key: 'userRank'
      },
      {
        name: '训练小时数',
        key: 'totalTrainingHours'
      }
    ]
    const sortedData = filteredData.sort(sortCompare(sortKeys.find(sortKey => sortKey.name === sortBy).key))
    if (sortDesc) sortedData.reverse()

    return [
      200,
      {
        users: paginateArray(sortedData, perPage, page),
        total: filteredData.length,
      },
    ]
  })
})
