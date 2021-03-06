import axiosIns from '@/libs/axios'
import mock from '@/@fake-db/mock'
import { paginateArray, sortCompare } from '@/@fake-db/utils'

const fetchData = async () => {
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
    documentTitle: addData.documentTitle,
    open: addData.open,
    documentRank: addData.documentRank,
    documentSubject: addData.documentSubject,
    documentType: addData.documentType,
    documentContent: addData.documentContent,
    issuingTime: addData.issuingTime,
    modifiedTime: addData.modifiedTime,
    authors: addData.authors,
    depts: addData.depts
  })
}

const askForEdit = async (editData) => {
  return await axiosIns.post('/document/editDocument', {
    documentId: editData.documentId,
    documentTitle: editData.documentTitle,
    open: editData.open,
    documentRank: editData.documentRank,
    documentSubject: editData.documentSubject,
    documentType: editData.documentType,
    documentContent: editData.documentContent,
    issuingTime: editData.issuingTime,
    modifiedTime: editData.modifiedTime,
    authors: editData.authors,
    depts: editData.depts
  })
}

const askForDel = async (params) => {
  return await axiosIns.get('/document/delDocument?documentId=' + params.documentId)
}

const getAllUsers = async (params) => {
  return await axiosIns.get(
    '/user/getAllUsers',
    {
      params: {
        userId: JSON.parse(localStorage.getItem('userData')).userId
      }
    })
  .then(response => {
    const statusCode = response.data.status.code

    if (statusCode === '0000') {
      const vo = response.data.data

      return {
        users: vo.map(item => {
          return {
            userId: item.userId,
            userName: item.userName
          }
        })
      }
    }
  })
}

mock.onGet('/manage/document/getAllUsers')
.reply(config => {

  return getAllUsers(config)
  .then(data => {
    const users = data
    return [
      200, { data: users }
    ]
  })

})

const getAllDepts = async () => {
  return await axiosIns.get(
    '/dept/getAllDepts',
    {
      params: {
        userId: JSON.parse(localStorage.getItem('userData')).userId
      }
    })
  .then(response => {
    const statusCode = response.data.status.code

    if (statusCode === '0000') {
      const vo = response.data.data

      return {
        depts: vo.map(item => {
          return {
            deptId: item.deptId,
            deptName: item.deptName
          }
        })
      }
    }
  })
}

mock.onGet('/manage/document/getAllDepts')
.reply(config => {

  return getAllDepts(config)
  .then(data => {
    const depts = data
    return [
      200, { data: depts }
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
    const {
      documents,
      total
    } = data
    const {
      q = '',
      perPage = 10,
      page = 1,
      sortBy = 'documentRank',
      sortDesc = false,
      rank
    } = config.params

    const filteredData = documents.filter(
      document =>
        (document.authors.some((item) => {
            return item.userName.includes(q)
          }) || document.depts.some((item) => {
            return item.deptName.includes(q)
          })
          || document.documentTitle.includes(q) || document.documentTitle.includes(q) || document.documentSubject.includes(q)
        ) &&
        (rank ? document.documentRank === Number(rank) : true),
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
