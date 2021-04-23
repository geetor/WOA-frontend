import { ref, watch, computed } from '@vue/composition-api'
import store from '@/store'

// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default function useUserList() {
  // Use toast
  const toast = useToast()

  const refInvoiceListTable = ref(null)

  // Table Handlers
  const tableColumns = [
    { key: 'userId', label: '编号', sortable: true },
    { key: 'userName', label: '姓名', sortable: false },
    { key: 'userGender', label: '性别', sortable: false },
    {key:'userRank',label:'等级',sortable:true},
    {key:'userEmail',label:'电子邮箱',sortable:false},
    {key:'admin',label:'管理员',sortable:false},
    {key:'userStatus',label:'状态',sortable:false},
    {key:'userDepts',label:'所属部门',sortable:false},
    {key:"actions",label:'操作'}
    
    // { key: 'total', sortable: true, formatter: val => `$${val}` },
  ]

  const perPage = ref(10)
  const totalInvoices = ref(0)
  const currentPage = ref(1)
  const perPageOptions = [10, 25, 50, 100]
  const searchQuery = ref('')
  const sortBy = ref('userId')
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
      .dispatch('manage-user/fetchUsers', {
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
            title: "获取用户失败",
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

  
  const resolveAdmin = admin => {
    if (admin === false) return '否'
    if (admin === true) return '是'
    return ''
  }

  const resolveAdminColor = admin => {
    if (admin === true) return 'primary'
    if (admin === false) return 'danger'
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
    resolveAdmin,
    resolveAdminColor, 
    resolveStatus,
    resolveStatusColor,
  }
}