import { ref, watch, computed } from '@vue/composition-api'
import store from '@/store'

// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default function useLeaveList () {
  // Use toast
  const toast = useToast()

  const refLeaveListTable = ref(null)

  // Table Handlers
  const tableColumns = [
    {
      key: '用户'
    },
    {
      key: '请假类型'
    },
    {
      key: '离队时间',
      sortable: true
    },
    {
      key: '归队时间',
      sortable: true
    },
    {
      key: '状态'
    },
    { key: '操作' }
  ]
  const perPage = ref(10)
  const totalLeaves = ref(0)
  const currentPage = ref(1)
  const perPageOptions = [10, 25, 50, 100]
  const searchQuery = ref('')
  const sortBy = ref('离队时间')
  const isSortDirDesc = ref(true)
  const typeFilter = ref(null)
  const departmentFilter = ref(null)
  const statusFilter = ref(null)

  const dataMeta = computed(() => {
    const localItemsCount = refLeaveListTable.value ? refLeaveListTable.value.localItems.length : 0
    return {
      from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
      to: perPage.value * (currentPage.value - 1) + localItemsCount,
      of: totalLeaves.value,
    }
  })

  const refetchData = () => {
    refLeaveListTable.value.refresh()
  }

  watch([currentPage, perPage, searchQuery, typeFilter, departmentFilter, statusFilter], () => {
    refetchData()
  })

  const fetchLeaves = (ctx, callback) => {
    store
    .dispatch('office-leave/fetchLeaves', {
      q: searchQuery.value,
      perPage: perPage.value,
      page: currentPage.value,
      sortBy: sortBy.value,
      sortDesc: isSortDirDesc.value,
      leaveType: typeFilter.value,
      department: departmentFilter.value,
      leaveStatus: statusFilter.value
    })
    .then(response => {
      const {
        users,
        total
      } = response.data

      callback(users)
      totalLeaves.value = total
    })
    .catch(() => {
      toast({
        component: ToastificationContent,
        props: {
          title: '错误',
          icon: 'AlertTriangleIcon',
          variant: 'danger'
        }
      })
    })
  }

  const approveLeave = (ctx) => {
    store
    .dispatch('office-leave/approveLeave', {
      userId: ctx.userId,
      leaveId: ctx.leaveId
    })
    .then(() => {
      refetchData()
    })
    .catch(() => {
      toast({
        component: ToastificationContent,
        props: {
          title: '错误',
          icon: 'AlertTriangleIcon',
          variant: 'danger'
        }
      })
    })
  }

  const rejectLeave = (ctx) => {
    store
    .dispatch('office-leave/rejectLeave', {
      userId: ctx.userId,
      leaveId: ctx.leaveId
    })
    .then(() => {
      refetchData()
    })
    .catch(() => {
      toast({
        component: ToastificationContent,
        props: {
          title: '错误',
          icon: 'AlertTriangleIcon',
          variant: 'danger'
        }
      })
    })
  }

  // *===============================================---*
  // *--------- UI ---------------------------------------*
  // *===============================================---*

  const resolveLeaveTypeVariant = leaveType => {
    if (leaveType === '病假') return 'primary'
    if (leaveType === '事假') return 'warning'
    if (leaveType === '年假') return 'success'
    if (leaveType === '调休') return 'info'
    return 'primary'
  }

  const resolveLeaveTypeIcon = leaveType => {
    if (leaveType === '病假') return 'FrownIcon'
    if (leaveType === '事假') return 'SlashIcon'
    if (leaveType === '年假') return 'TrelloIcon'
    if (leaveType === '调休') return 'BatteryChargingIcon'
    return 'UserIcon'
  }

  const resolveLeaveStatusVariant = leaveStatus => {
    if (leaveStatus === '待审批') return 'warning'
    if (leaveStatus === '批准') return 'success'
    if (leaveStatus === '退回') return 'secondary'
    return 'primary'
  }

  const resolveUserRankVariant = userRank => {
    if (Number(userRank) > 5) return 'warning'
    return 'primary'
  }

  return {
    fetchLeaves,
    approveLeave,
    rejectLeave,
    tableColumns,
    perPage,
    currentPage,
    totalLeaves,
    dataMeta,
    perPageOptions,
    searchQuery,
    sortBy,
    isSortDirDesc,
    refLeaveListTable,

    resolveLeaveTypeVariant,
    resolveLeaveTypeIcon,
    resolveLeaveStatusVariant,
    resolveUserRankVariant,
    refetchData,

    // Extra Filters
    typeFilter,
    departmentFilter,
    statusFilter
  }
}
