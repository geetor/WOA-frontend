<template>

  <!-- Table Container Card -->
  <b-card
      no-body
      class="mb-0 rounded-0"
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
              class="per-page-selector d-inline-block ml-50 mr-1"
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
                class="d-inline-block mr-1"
                placeholder="搜索部门成员"
            />
            <v-select
                v-model="rankFilter"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="rankOptions"
                class="user-rank-select"
                placeholder="用户等级"
            >
              <template #selected-option="{ label }">
                <span class="text-truncate overflow-hidden">
                  {{ label }}
                </span>
              </template>
            </v-select>
          </div>
        </b-col>
      </b-row>

    </div>

    <b-table
        ref="refUserListTable"
        :items="fetchUsers"
        responsive
        hover
        :fields="tableColumns"
        :sort-by.sync="sortBy"
        show-empty
        empty-text="无对应成员"
        :sort-desc.sync="isSortDirDesc"
        class="position-relative"
    >

      <!-- Column: 用户 -->
      <template #cell(用户)="data">
        <b-media vertical-align="center">
          <template #aside>
            <b-avatar
                size="32"
                :text="avatarText(data.item.userName)"
                :variant="`light-${resolveRankColor(data.item.userRank)}`"
            />
          </template>
          <span class="font-weight-bold d-block text-nowrap">
            {{ data.item.userName }}
          </span>
          <small class="text-muted">{{ data.item.userPhone }}</small>
        </b-media>
      </template>

      <!-- Column: 等级 -->
      <template #cell(等级)="data">
        <span class="text-nowrap">
          {{ data.item.userRank }}
        </span>
      </template>

      <!-- Column: 训练小时数 -->
      <template #cell(训练小时数)="data">
        <span class="text-nowrap">
          {{ data.item.totalTrainingHours }}
        </span>
      </template>

      <!-- Column: 最近常练 -->
      <template #cell(最近常练)="data">
        <span class="text-nowrap">
          {{ data.item.mostTraining }}
        </span>
      </template>

      <!-- Column: 最近疏练 -->
      <template #cell(最近疏练)="data">
        <span class="text-nowrap">
          {{ data.item.leastTraining }}
        </span>
      </template>

      <!-- Column: 今日是否待训 -->
      <template #cell(今日是否待训)="data">
        <template v-if="data.item.hasTraining">
          <b-badge
              pill
              variant="light-success"
          >
            是
          </b-badge>
        </template>
        <template v-else>
          <b-badge
              pill
              variant="light-danger"
          >
            否
          </b-badge>
        </template>
      </template>

      <!-- Column: 操作 -->
      <template #cell(操作)="data">

        <div class="text-nowrap">

          <feather-icon
              :id="`training-row-${data.item.id}-add-icon`"
              icon="EditIcon"
              class="cursor-pointer"
              size="16"
              @click="$router.push({ name: 'office-training-calendar-user', params: { user: data.item.userId }})"
          />
          <b-tooltip
              title="发布训练"
              class="cursor-pointer"
              :target="`training-row-${data.item.id}-add-icon`"
          />

          <feather-icon
              :id="`training-row-${data.item.id}-calendar-icon`"
              icon="CalendarIcon"
              class="cursor-pointer mx-1"
              size="16"
              @click="$router.push({ name: 'office-training-calendar-user', params: { user: data.item.userId }})"
          />
          <b-tooltip
              title="训练安排"
              class="cursor-pointer"
              :target="`training-row-${data.item.id}-calendar-icon`"
          />

        </div>

      </template>

    </b-table>
    <div class="mx-2 mb-2">
      <b-row>

        <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-start"
        >
          <span class="text-muted">从 {{ dataMeta.from }} 到 {{ dataMeta.to }} , 共 {{ dataMeta.of }} 名成员</span>
        </b-col>
        <!-- Pagination -->
        <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-end"
        >

          <b-pagination
              v-model="currentPage"
              :total-rows="totalUsers"
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

</template>

<script>
import {
  BCard, BRow, BCol, BFormInput, BButton, BTable, BMedia, BAvatar, BLink,
  BBadge, BDropdown, BDropdownItem, BPagination, BTooltip
} from 'bootstrap-vue'
import { avatarText } from '@core/utils/filter'
import vSelect from 'vue-select'
import { computed, onUnmounted, ref, watch } from '@vue/composition-api'
import store from '@/store'

import trainingStoreModule from './trainingStoreModule'
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent'
import { useRouter } from '@core/utils/utils'

export default {
  components: {
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
    BTooltip,

    vSelect,
  },
  setup () {
    const TRAINING_STORE_MODULE_NAME = 'office-training-statistic'

    // Register module
    if (!store.hasModule(TRAINING_STORE_MODULE_NAME)) store.registerModule(TRAINING_STORE_MODULE_NAME, trainingStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(TRAINING_STORE_MODULE_NAME)) store.unregisterModule(TRAINING_STORE_MODULE_NAME)
    })

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

    const {
      route,
      router
    } = useRouter()

    // Route Params
    const routeParams = computed(() => route.value.params)

    const toast = useToast()
    const refUserListTable = ref(null)

    // Table Handlers
    const tableColumns = [
      {
        key: '用户',
        sortable: false
      },
      {
        key: '等级',
        sortable: true
      },
      {
        key: '训练小时数',
        sortable: true
      },
      {
        key: '最近常练',
        sortable: false
      },
      {
        key: '最近疏练',
        sortable: false
      },
      {
        key: '今日是否待训',
        sortable: false
      },
      {
        key: '操作',
        sortable: false
      }
    ]
    const perPage = ref(10)
    const totalUsers = ref(0)
    const currentPage = ref(1)
    const perPageOptions = [10, 25, 50, 100]
    const searchQuery = ref('')
    const sortBy = ref('等级')
    const isSortDirDesc = ref(true)
    const rankFilter = ref(null)

    const dataMeta = computed(() => {
      const localItemsCount = refUserListTable.value ? refUserListTable.value.localItems.length : 0
      return {
        from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
        to: perPage.value * (currentPage.value - 1) + localItemsCount,
        of: totalUsers.value,
      }
    })

    const refetchData = () => {
      refUserListTable.value.refresh()
    }

    watch([routeParams, currentPage, perPage, searchQuery, rankFilter], () => {
      refetchData()
    })

    const fetchUsers = (ctx, callback) => {
      store
      .dispatch('office-training-statistic/fetchUsers', {
        department: router.currentRoute.params.department || '所有部门',
        q: searchQuery.value,
        perPage: perPage.value,
        page: currentPage.value,
        sortBy: sortBy.value,
        sortDesc: isSortDirDesc.value,
        rank: rankFilter.value ? rankFilter.value.match(/(\S*)级/)[1] : null
      })
      .then(response => {
        const {
          users,
          total
        } = response.data

        callback(users)
        totalUsers.value = total
      })
      .catch(error => {
        toast({
              component: ToastificationContent,
              props: {
                title: '错误',
                icon: 'AlertTriangleIcon',
                variant: 'danger',
              },
            },
            { position: 'bottom-right' })
      })
    }

    const resolveRankColor = rank => {
      if (rank === 5) return 'secondary'
      if (rank === 4) return 'primary'
      if (rank === 3) return 'warning'
      if (rank === 2) return 'danger'
      if (rank === 1) return 'info'
      return 'success'
    }

    return {
      fetchUsers,
      tableColumns,
      perPage,
      currentPage,
      totalUsers,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refUserListTable,

      rankFilter,

      refetchData,

      rankOptions,

      avatarText,
      resolveRankColor
    }
  }
}
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}

.user-rank-select {
  min-width: 190px;

  ::v-deep .vs__selected-options {
    flex-wrap: nowrap;
  }

  ::v-deep .vs__selected {
    width: 100px;
  }
}
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
