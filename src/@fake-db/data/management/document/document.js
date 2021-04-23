import axiosIns from '@/libs/axios'
import mock from '@/@fake-db/mock'
import { paginateArray, sortCompare } from '@/@fake-db/utils'

const fetchData = async () => {
  const data = {}

  return await axiosIns.get('/document/getAllDocuments', {
    params: {
      userId: JSON.parse(localStorage.getItem('userData')).userId
    }
  })
  .then(response => {
    const statusCode = response.data.status.code

    if (statusCode === '0000') {
      const vo = response.data.data

      return {
        documents: vo,
        total: vo.length
      }
    }
  })
}
const askForAdd = async (addData) => {
  return await axiosIns.post('/document/addDocument', {
    documentName:addData.documentName,
    admin:addData.admin,
    documentRank: addData.documentRank,
    documentGender:addData.documentGender,
    documentPhone:addData.documentPhone,
    documentEmail:addData.documentEmail,
    documentStatus:addData.documentStatus,
    documentPassword:addData.documentPassword,
    documentDepts:addData.documentDepts
  })
}

const askForEdit = async (editData) => {
  return await axiosIns.post('/document/editDocument', {
    documentId:editData.documentId,
    documentName:editData.documentName,
    isAdmin:editData.admin,
    documentRank: editData.documentRank,
    documentGender:editData.documentGender,
    documentPhone:editData.documentPhone,
    documentEmail:editData.documentEmail,
    documentStatus:editData.documentStatus,
    documentPassword:editData.documentPassword,
    documentDepts:editData.documentDepts
  })
}

const askForDel = async (params) => {
  return await axiosIns.get('/document/delDocument?documentId=' + params.documentId)
}

//user
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

mock.onGet('/manage/document/getAllUsers')
.reply(config => {
  return getAllUsers(config).then(data => {
    const users = data
    return [
      200, {data: users}
    ]
  })
})
//depts
const getAllDepts = async (params) => {
  return await axiosIns.get(
    '/dept/getAllDepts',
    {
      params: {
      userId: JSON.parse(localStorage.getItem('userData')).userId
      }
   }).then(response => {
    const statusCode = response.data.status.code

    if (statusCode === '0000') {
      const vo = response.data.data

      return {
        depts: vo.map(item => {return {deptId: item.deptId, deptName: item.deptName}})
      }
    }
   })
}

mock.onGet('/manage/document/getAllDepts')
.reply(config => {
  return getAllDepts(config).then(data => {
    const depts = data
    return [
      200, {data: depts}
    ]
  })
})
// ------------------------------------------------
// GET: Return Documents
// ------------------------------------------------
mock.onGet('/manage/document/getAllDocuments')
.reply(config => {
  return fetchData()
  .then(data => {
    const { documents, total } = data
    const {
      q = '',
      perPage = 10,
      page = 1,
      sortBy = '等级',
      sortDesc = false,
      rank
    } = config.params

    const filteredData = documents.filter(
      document =>
      (document.authors.some((item) => {
        return item.userName.includes(q)
      })||document.depts.some((item) => {
        return item.deptName.includes(q)
      })
      ||document.documentTitle.includes(q)||document.documentTitle.includes(q)||document.documentSubject.includes(q)
      )&&
      (rank ? document.documentRank === Number(rank) : true),
    )

    const sortKeys = [
      {
        name: '等级',
        key: 'documentRank'
      },
      {
        name: 'documentId',
        key: 'documentId'
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
// POST: Add new add task
// ------------------------------------------------
mock.onPost('manage/document/askForAdd')
.reply(config => {

  const { add } = JSON.parse(config.data)

  return askForAdd(add)
  .then(() => {
      return [201, { add }]
    }
  )

})

mock.onPost('manage/document/askForEdit')
.reply(config => {

  const { edit } = JSON.parse(config.data)

  return askForEdit(edit)
  .then(() => {
      return [201, { edit }]
    }
  )

})


mock.onGet('manage/document/askForDel')
.reply(config => {
  const params = config.params
  return askForDel(params)
  .then(() => {
      return [201, { params }]
    }
  )

})