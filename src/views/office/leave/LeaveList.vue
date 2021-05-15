<template>

  <div>

    <!-- Filters -->
    <leave-list-filters
        :department-filter.sync="departmentFilter"
        :type-filter.sync="typeFilter"
        :status-filter.sync="statusFilter"
        :departments="departments"
        :leave-types="leaveTypes"
        :leave-statuses="leaveStatuses"
    />

    <!-- Table Container Card -->
    <b-card
        no-body
        class="mb-0"
    >

      <div class="m-2">

        <!-- Table Top -->
        <b-row>

          <!-- Per Page -->
          <b-col
              cols="12"
              md="6"
              class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
          >
            <v-select
                v-model="perPage"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="perPageOptions"
                :clearable="false"
                class="per-page-selector d-inline-block mr-50"
            />
          </b-col>

          <!-- Search -->
          <b-col
              cols="12"
              md="6"
          >
            <div class="d-flex align-items-center justify-content-end">
              <b-form-input
                  v-model="searchQuery"
                  class="text-truncate d-inline-block mr-1"
                  placeholder="根据姓名或手机搜索成员"
              />
            </div>
          </b-col>
        </b-row>

      </div>

      <b-table
          ref="refLeaveListTable"
          class="position-relative"
          :items="fetchLeaves"
          responsive
          hover
          :fields="tableColumns"
          primary-key="leaveId"
          :sort-by.sync="sortBy"
          show-empty
          empty-text="无对应条目"
          :sort-desc.sync="isSortDirDesc"
      >

        <!-- Column: 用户 -->
        <template #cell(用户)="data">
          <b-media vertical-align="center">
            <template #aside>
              <b-avatar
                  size="32"
                  :text="avatarText(data.item.userName)"
                  :variant="`light-primary`"
                  :to="{ name: 'office-attendance-calendar', params: { userId: data.item.userId } }"
              />
            </template>
            <b-link
                :to="{ name: 'office-attendance-calendar', params: { userId: data.item.userId } }"
                class="font-weight-bold d-block text-nowrap"
            >
              {{ data.item.userName }}
            </b-link>
            <small class="text-muted">{{ data.item.userPhone }}</small>
          </b-media>
        </template>

        <!-- Column: 请假类型 -->
        <template #cell(请假类型)="data">
          <div class="text-nowrap">
            <feather-icon
                :icon="resolveLeaveTypeIcon(data.item.leaveType)"
                size="18"
                class="mr-50"
                :class="`text-${resolveLeaveTypeVariant(data.item.leaveType)}`"
            />
            <span class="align-text-top text-capitalize">{{ data.item.leaveType }}</span>
          </div>
        </template>

        <!-- Column: 离队时间 -->
        <template #cell(离队时间)="data">
          <div class="text-nowrap">
            <span class="align-text-top">{{ data.item.leaveStartTime }}</span>
          </div>
        </template>

        <!-- Column: 归队时间 -->
        <template #cell(归队时间)="data">
          <div class="text-nowrap">
            <span class="align-text-top">{{ data.item.leaveEndTime }}</span>
          </div>
        </template>

        <!-- Column: 请假原因 -->
        <template #cell(请假原因)="data">
          <div class="text-nowrap">
            <span class="align-text-top">{{ data.item.leaveReason }}</span>
          </div>
        </template>

        <!-- Column: 状态 -->
        <template #cell(状态)="data">
          <b-badge
              pill
              :variant="`light-${resolveLeaveStatusVariant(data.item.leaveStatus)}`"
              class="text-capitalize"
          >
            {{ data.item.leaveStatus }}
          </b-badge>
        </template>

        <!-- Column: 操作 -->
        <template #cell(操作)="data">
          <b-dropdown
              variant="link"
              no-caret
              :right="$store.state.appConfig.isRTL"
          >

            <template #button-content>
              <feather-icon
                  icon="MoreVerticalIcon"
                  size="16"
                  class="align-middle text-body"
              />
            </template>

            <b-dropdown-item @click="confirmApproveLeave(data.item)">
              <feather-icon icon="CheckIcon"/>
              <span class="align-middle ml-50">批准</span>
            </b-dropdown-item>

            <b-dropdown-item @click="confirmRejectLeave(data.item)">
              <feather-icon icon="XIcon"/>
              <span class="align-middle ml-50">退回</span>
            </b-dropdown-item>
          </b-dropdown>
        </template>

      </b-table>
      <div class="mx-2 mb-2">
        <b-row>

          <b-col
              cols="12"
              sm="6"
              class="d-flex align-items-center justify-content-center justify-content-sm-start"
          >
            <span class="text-muted">从 {{ dataMeta.from }} 到 {{ dataMeta.to }} , 共 {{ dataMeta.of }} 条审批单</span>
          </b-col>
          <!-- Pagination -->
          <b-col
              cols="12"
              sm="6"
              class="d-flex align-items-center justify-content-center justify-content-sm-end"
          >

            <b-pagination
                v-model="currentPage"
                :total-rows="totalLeaves"
                :per-page="perPage"
                first-number
                last-number
                class="mb-0 mt-1 mt-sm-0"
                prev-class="prev-item"
                next-class="next-item"
            >
              <template #prev-text>
                <feather-icon
                    icon="ChevronLeftIcon"
                    size="18"
                />
              </template>
              <template #next-text>
                <feather-icon
                    icon="ChevronRightIcon"
                    size="18"
                />
              </template>
            </b-pagination>

          </b-col>

        </b-row>
      </div>
    </b-card>
  </div>
</template>

<script>
import {
  BCard, BRow, BCol, BFormInput, BButton, BTable, BMedia, BAvatar, BLink,
  BBadge, BDropdown, BDropdownItem, BPagination,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import store from '@/store'
import { ref, onUnmounted } from '@vue/composition-api'
import { avatarText } from '@core/utils/filter'
import LeaveListFilters from './LeaveListFilters.vue'
import useLeaveList from './useLeaveList'
import leaveStoreModule from './leaveStoreModule'

export default {
  components: {
    LeaveListFilters,

    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BLink,
    BBadge,
    BDropdown,
    BDropdownItem,
    BPagination,

    vSelect
  },
  setup () {
    const LEAVE_LIST_STORE_MODULE_NAME = 'office-leave'

    // Register module
    if (!store.hasModule(LEAVE_LIST_STORE_MODULE_NAME)) store.registerModule(LEAVE_LIST_STORE_MODULE_NAME, leaveStoreModule)

    // UnRegister on Leave
    onUnmounted(() => {
      if (store.hasModule(LEAVE_LIST_STORE_MODULE_NAME)) store.unregisterModule(LEAVE_LIST_STORE_MODULE_NAME)
    })

    const leaveTypes = [
      {
        label: '病假',
        value: '病假'
      },
      {
        label: '事假',
        value: '事假'
      },
      {
        label: '年假',
        value: '年假'
      },
      {
        label: '调休',
        value: '调休'
      }
    ]

    const departments = ref([])

    const leaveStatuses = [
      {
        label: '待审批',
        value: '待审批'
      },
      {
        label: '批准',
        value: '批准'
      },
      {
        label: '退回',
        value: '退回'
      }
    ]

    const fetchDepartments = () => {
      store.dispatch('office-leave/fetchDepartments')
      .then(response => {
        departments.value = response.data.map(item => ({
          label: item.deptName,
          value: item.deptName
        }))
      })
    }
    fetchDepartments()

    const {
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
      refetchData,

      // UI
      resolveLeaveTypeVariant,
      resolveLeaveTypeIcon,
      resolveLeaveStatusVariant,

      // Extra Filters
      typeFilter,
      departmentFilter,
      statusFilter
    } = useLeaveList()

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
      refetchData,

      // Filter
      avatarText,

      // UI
      resolveLeaveTypeVariant,
      resolveLeaveTypeIcon,
      resolveLeaveStatusVariant,

      departments,
      leaveTypes,
      leaveStatuses,

      // Extra Filters
      departmentFilter,
      typeFilter,
      statusFilter
    }
  },
  methods: {
    confirmApproveLeave (leaveInfo) {
      const that = this
      that.$swal({
        title: '批准该申请?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1'
        },
        buttonsStyling: false
      })
      .then(result => {
        if (result.value) {
          that.approveLeave(leaveInfo)
        }
      })
    },
    confirmRejectLeave (leaveInfo) {
      const that = this
      that.$swal({
        title: '退回该申请?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1'
        },
        buttonsStyling: false
      })
      .then(result => {
        if (result.value) {
          that.rejectLeave(leaveInfo)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-sweetalert.scss';
</style>
