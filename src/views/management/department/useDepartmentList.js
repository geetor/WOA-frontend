import { ref, watch, computed } from '@vue/composition-api'
import store from '@/store'

// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default function useDepartmentList() {
  // Use toast
  const toast = useToast()

  const refInvoiceListTable = ref(null)

  // Table Handlers
  const tableColumns = [
    { key: 'deptId', label: '编号', sortable: true },
    { key: 'deptName', label: '名称', sortable: false },
    {key:'deptRank',label:'等级',sortable:true},
    {key:'deptUsers',label:'成员',sortable:false},
    {key:"actions",label:'操作'}
    
    // { key: 'total', sortable: true, formatter: val => `$${val}` },
  ]

  const perPage = ref(10)
  const totalInvoices = ref(0)
  const currentPage = ref(1)
  const perPageOptions = [10, 25, 50, 100]
  const searchQuery = ref('')
  const sortBy = ref('deptId')
  const isSortDirDesc = ref(true)
  const rankFilter = ref(null)
  const rankOptions = [
        '1级',
        '2级',
        '3级',
        '4级',
        '5级',
        '6级',
        '7级',
        '8级',
        '9级',
        '10级'
      ]
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

  const fetchDepartments = (ctx, callback) => {
    store
      .dispatch('manage-department/fetchDepartments', {
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
            title: "获取部门失败",
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
  
  return {
    fetchDepartments,
    tableColumns,
    perPage,
    currentPage,
    totalInvoices,
    dataMeta,
    perPageOptions,
    searchQuery,
    rankOptions,
    sortBy,
    isSortDirDesc,
    refInvoiceListTable,
    rankFilter,
    resolveRankColor,
    refetchData,
  }
}
