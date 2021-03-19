import { ref, watch, computed } from '@vue/composition-api'
import store from '@/store'

// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default function useInvoicesList() {
  // Use toast
  const toast = useToast()

  const refUserListTable = ref(null)

  // Table Handlers
  const tableColumns = [
    { key: '用户', sortable: true },
    { key: '等级', sortable: true },
    { key: '出勤次数', sortable: true },
    { key: '异常次数', sortable: true },
    { key: '病假次数', sortable: true },
    { key: '事假次数', sortable: true },
    { key: '年假次数', sortable: true },
    { key: '调休次数', sortable: true },
    { key: '操作' },
  ]
  const perPage = ref(10)
  const totalInvoices = ref(0)
  const currentPage = ref(1)
  const perPageOptions = [10, 25, 50, 100]
  const sortBy = ref('id')
  const isSortDirDesc = ref(true)

  const dataMeta = computed(() => {
    const localItemsCount = refUserListTable.value ? refUserListTable.value.localItems.length : 0
    return {
      from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
      to: perPage.value * (currentPage.value - 1) + localItemsCount,
      of: totalInvoices.value,
    }
  })

  const refetchData = () => {
    refUserListTable.value.refresh()
  }

  watch([currentPage, perPage], () => {
    refetchData()
  })

  const fetchInvoices = (ctx, callback) => {
    store
      .dispatch('app-invoice/fetchInvoices', {
        perPage: perPage.value,
        page: currentPage.value,
        sortBy: sortBy.value,
        sortDesc: isSortDirDesc.value,
        status: statusFilter.value,
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
            title: "Error fetching invoices' list",
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
    fetchInvoices,
    tableColumns,
    perPage,
    currentPage,
    totalInvoices,
    dataMeta,
    perPageOptions,
    sortBy,
    isSortDirDesc,
    refUserListTable,

    resolveRankColor,

    refetchData,
  }
}
