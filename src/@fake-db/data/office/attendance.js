import axiosIns from '@/libs/axios'
import mock from '@/@fake-db/mock'
import { paginateArray, sortCompare } from '@/@fake-db/utils'

const fetchData = async () => {
  const data = {}

  return await axiosIns.get('/attendance/getLowerUsersAttendance', {
    params: {
      userId: JSON.parse(localStorage.getItem('userData')).userId
    }
  })
  .then(response => {
    if (response.data.status.code === '0000') {
      const vo = response.data.data

      const departments = ['所有部门']
      let users = []

      vo.forEach(departmentAttendance => {
        const departmentName = departmentAttendance.deptName
        const userAttendances = departmentAttendance.userAttendances
        departments.push(departmentName)
        userAttendances.forEach(userAttendance => {
            users.push(userAttendance)
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
mock.onGet('/office/attendance/departments')
.reply(config => {
  return fetchData()
  .then(data => {
      let departments = []
      data.departments.forEach(department => {
        const departmentRoute = {
          name: department,
          route: {
            name: 'office-attendance-department',
            params: {
              department: department
            }
          }
        }
        departments.push(departmentRoute)
      })
      departments[0].route = {
        name: 'office-attendance'
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
    }
  )
})

// ------------------------------------------------
// GET: Return Users
// ------------------------------------------------
mock.onGet('/office/attendance/users')
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
        name: '出勤次数',
        key: 'countOfAttendance'
      },
      {
        name: '异常次数',
        key: 'countOfAbnormal'
      },
      {
        name: '病假次数',
        key: 'countOfSick'
      },
      {
        name: '事假次数',
        key: 'countOfUnpaid'
      },
      {
        name: '年假次数',
        key: 'countOfAnnual'
      },
      {
        name: '调休次数',
        key: 'countOfAdjustment'
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
