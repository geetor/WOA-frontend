<template>

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
                class="d-inline-block mr-1"
                :data="searchQuery"
                placeholder="搜索部门成员"
                @input="updateRouteQuery"
            />
            <v-select
                v-model="rankFilter"
                @input="updateRankQuery"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="rankOptions"
                class="invoice-filter-select"
                placeholder="用户等级"
            >
              <template #selected-option="{ label }">
                <span
                    class="text-truncate overflow-hidden"
                >
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
        :items="users"
        responsive
        hover
        :fields="tableColumns"
        :sort-by.sync="sortBy"
        show-empty
        empty-text="无对应用户"
        :sort-desc.sync="isSortDirDesc"
        class="position-relative"
    >

      <!-- Column: 用户 -->
      <template #cell(用户)="data">
        <b-media vertical-align="center">
          <template #aside>
            <b-avatar
                size="32"
                :src="data.item.userPhoto"
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

      <!-- Column: 	出勤次数 -->
      <template #cell(出勤次数)="data">
        <span class="text-nowrap">
          {{ data.item.countOfAttendance }}
        </span>
      </template>

      <!-- Column: 异常次数 -->
      <template #cell(异常次数)="data">
        <span class="text-nowrap">
          {{ data.item.countOfAbnormal }}
        </span>
      </template>

      <!-- Column: 病假次数 -->
      <template #cell(病假次数)="data">
        <span class="text-nowrap">
          {{ data.item.countOfSick }}
        </span>
      </template>

      <!-- Column: 事假次数 -->
      <template #cell(事假次数)="data">
        <span class="text-nowrap">
          {{ data.item.countOfUnpaid }}
        </span>
      </template>

      <!-- Column: 年假次数 -->
      <template #cell(年假次数)="data">
        <span class="text-nowrap">
          {{ data.item.countOfAnnual }}
        </span>
      </template>

      <!-- Column: 调休次数 -->
      <template #cell(调休次数)="data">
        <span class="text-nowrap">
          {{ data.item.countOfAdjustment }}
        </span>
      </template>

      <!-- Column: 操作 -->
      <template #cell(操作)="data">

        <div class="text-nowrap">
          <feather-icon
              :id="`attendance-row-${data.item.id}-calendar-icon`"
              icon="CalendarIcon"
              class="cursor-pointer"
              size="16"
              @click="$router.push({ name: 'office-attendance-calendar', params: { userId: data.item.userId }})"
          />
          <b-tooltip
              title="考勤日历"
              class="cursor-pointer"
              :target="`attendance-row-${data.item.id}-calendar-icon`"
          />

          <feather-icon
              :id="`invoice-row-${data.item.id}-edit-icon`"
              icon="AlertOctagonIcon"
              size="16"
              class="mx-1"
              @click="$router.push({ name: 'apps-invoice-edit', params: { id: data.item.id }})"
          />
          <b-tooltip
              title="请假信息"
              :target="`invoice-row-${data.item.id}-edit-icon`"
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
        </b-col>

        <!-- Pagination -->
        <b-col
            cols="24"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-end"
        >

          <b-pagination
              v-model="currentPage"
              :total-rows="totalInvoices"
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
  BBadge, BDropdown, BDropdownItem, BPagination, BTooltip,
} from 'bootstrap-vue'
import { avatarText } from '@core/utils/filter'
import vSelect from 'vue-select'
import { computed, onUnmounted, ref, watch } from '@vue/composition-api'
import useUserList from './useUserList'
import { useRouter } from '@core/utils/utils'
import axiosIns from '@/libs/axios'

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
  props: {
    departments: {
      type: Array,
      required: true
    },
    users: {
      type: Array,
      required: true
    }
  },
  setup () {
    const {
      route,
      router
    } = useRouter()

    const ranks = [
      {
        title: '1级',
        color: 'info',
        route: {
          name: 'office-attendance-rank',
          params: { rank: 1 }
        }
      },
      {
        title: '2级',
        color: 'danger',
        route: {
          name: 'office-attendance-rank',
          params: { rank: 2 }
        }
      },
      {
        title: '3级',
        color: 'warning',
        route: {
          name: 'office-attendance-rank',
          params: { rank: 3 }
        }
      },
      {
        title: '4级',
        color: 'primary',
        route: {
          name: 'office-attendance-rank',
          params: { rank: 4 }
        }
      },
      {
        title: '5级',
        color: 'secondary',
        route: {
          name: 'office-attendance-rank',
          params: { rank: 5 }
        }
      },
      {
        title: '6级+',
        color: 'success',
        route: {
          name: 'office-attendance-rank',
          params: { rank: 6 }
        }
      }
    ]
    const rankOptions = [
      '1级',
      '2级',
      '3级',
      '4级',
      '5级',
      '6级+'
    ]
    const sortBy = ref('userRank')
    const isSortDirDesc = ref(true)

    const rankFilter = ref('')
    const updateRankQuery = () => {
      const to = ranks.find(rank => rank.title === rankFilter.value)
      router.replace({
        name: to.route.name,
        params: to.route.params
      })
    }

    // Search Query
    const routeQuery = computed(() => route.value.query.q)
    const searchQuery = ref(routeQuery.value)
    watch(routeQuery, val => {
      searchQuery.value = val
    })
    const updateRouteQuery = val => {
      const currentRouteQuery = JSON.parse(JSON.stringify(route.value.query))

      if (val) {
        currentRouteQuery.q = val
      } else {
        delete currentRouteQuery.q
      }

      router.replace({
        name: route.name,
        query: currentRouteQuery
      })
    }

    const {
      fetchInvoices,
      tableColumns,
      perPage,
      currentPage,
      totalInvoices,
      dataMeta,
      perPageOptions,
      // sortBy,
      // isSortDirDesc,
      refUserListTable,

      refetchData,

      resolveRankColor,
    } = useUserList()

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

      refetchData,

      // Search Query
      searchQuery,
      updateRouteQuery,

      // Rank
      rankOptions,
      rankFilter,
      updateRankQuery,

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

.invoice-filter-select {
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
