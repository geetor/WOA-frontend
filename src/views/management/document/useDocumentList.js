import { ref, watch, computed } from '@vue/composition-api'
import store from '@/store'

// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default function useDocumentList() {
  // Use toast
  const toast = useToast()

  const refInvoiceListTable = ref(null)

  // Table Handlers
  const tableColumns = [
    { key: 'documentId', label: '编号', sortable: true },
    { key: 'documentName', label: '标题', sortable: false },
    { key: 'documentType', label: '类型', sortable: false },
    { key:'documentRank',label:'等级',sortable:true},
    { key:'authors',label:'作者',sortable:false},
    {key:'documentSubject',label:'主题',sortable:false},
    {key:'open',label:'是否开放',sortable:false},
    {key:'modifiedTime',label:'修改时间',sortable:false},
    {key:'issuingTime',label:'发布时间',sortable:false},
    {key:'depts',label:'所属部门',sortable:false},
    {key:"actions",label:'操作'}
    
    // { key: 'total', sortable: true, formatter: val => `$${val}` },
  ]

  const perPage = ref(10)
  const totalInvoices = ref(0)
  const currentPage = ref(1)
  const perPageOptions = [10, 25, 50, 100]
  const searchQuery = ref('')
  const sortBy = ref('documentId')
  const isSortDirDesc = ref(true)
  const rankFilter = ref(null)

  const dataMeta = computed(() => {
    const localItemsCount = refInvoiceListTable.value ? refInvoiceListTable.value.localItems.length : 0
    return {
      from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
      to: perPage.value * (currentPage.value - 1) + localItemsCount,
      of: totalInvoices.value,
    }
  })

  const refetchData = () => {
    refInvoiceListTable.value.refresh()
  }

  watch([currentPage, perPage, searchQuery, rankFilter], () => {
    refetchData()
  })

  const fetchInvoices = (ctx, callback) => {
    store
      .dispatch('manage-document/fetchDocuments', {
        q: searchQuery.value,
        perPage: perPage.value,
        page: currentPage.value,
        sortBy: sortBy.value,
        sortDesc: isSortDirDesc.value,
        rank: rankFilter.value ? rankFilter.value.match(/(\S*)级/)[1] : null,
      })
      .then(response => {
    
        const { invoices, total } = response.data
        callback(invoices)
        totalInvoices.value = total
      })
      .catch(() => {
      
        toast({
          component: ToastificationContent,
          props: {
            title: "获取文档失败",
            icon: 'AlertTriangleIcon',
            variant: 'danger',
          },
        })
      })
  }

  // *===============================================---*
  // *--------- UI ---------------------------------------*
  // *===============================================---*

  const resolveRankColor = rank => {
    if (rank === 5) return 'secondary'
    if (rank === 4) return 'primary'
    if (rank === 3) return 'warning'
    if (rank === 2) return 'danger'
    if (rank === 1) return 'info'
    return 'success'
  }

  const resolveDept = dept => {
    if (dept === 1) return '人事'
    if (dept === 2) return '驾驶'
    if (dept === 3) return '后勤'
    if (dept === 4) return '武装'
    if (dept === 5) return '管理'
    return ''
  }

  const resolveDeptColor = dept => {
    if (dept === 1) return 'warning'
    if (dept === 2) return 'primary'
    if (dept === 3) return 'info'
    if (dept === 4) return 'danger'
    if (dept === 5) return 'success'
    return 'success'
  }
  const resolveOpen = open => {
    if (open === false) return '否'
    if (open === true) return '是'
    return ''
  }

  const resolveOpenColor = open => {
    if (open === true) return 'primary'
    if (open === false) return 'danger'
    return 'success'
  }

 const resolveStatus = status => {
    if (status === '退役') return '退役'
    if (status === '现役') return '现役'
    return ''
  }

  const resolveStatusColor = status => {
    if (status === '现役') return 'success'
    if (status === '退役') return 'secondary'
    return 'success'
  }


  return {
    fetchInvoices,
    tableColumns,
    perPage,
    currentPage,
    totalInvoices,
    dataMeta,
    perPageOptions,
    searchQuery,
    sortBy,
    isSortDirDesc,
    refInvoiceListTable,
    rankFilter,
    resolveRankColor,
    refetchData,
    resolveDept,
    resolveDeptColor, 
    resolveOpen,
    resolveOpenColor, 
    resolveStatus,
    resolveStatusColor,
  }
}