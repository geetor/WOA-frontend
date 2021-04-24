<template>
  <!-- Table Container Card -->
  <b-card no-body class="mb-0 rounded-0">
    <div class="m-2">
      <!-- Table Top -->
      <b-row>
        <!-- Per Page -->
        <b-col
          cols="12"
          md="6"
          class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
        >
          <label>Entries</label>
          <v-select
            v-model="perPage"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :options="perPageOptions"
            :clearable="false"
            class="per-page-selector d-inline-block ml-50 mr-1"
          />
        </b-col>

        <!-- Search -->
        <b-col cols="12" md="6">
          <div class="d-flex align-items-center justify-content-end">
            <b-form-input
              v-model="searchQuery"
              class="d-inline-block mr-1"
              placeholder="搜索成员"
            />
            <v-select
              v-model="rankFilter"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="rankOptions"
              class="invoice-filter-select"
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
      ref="refInvoiceListTable"
      :items="fetchInvoices"
      responsive
      hover
      :fields="tableColumns"
      primary-key="id"
      :sort-by.sync="sortBy"
      show-empty
      empty-text="无对应成员"
      :sort-desc.sync="isSortDirDesc"
      class="position-relative"
    >
      <!-- Column: 用户 -->

      <template #cell(userName)="data">
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
      <!-- 部门 -->
      <template #cell(userDepts)="data">
        <template v-for="dept in data.item.userDepts">
          <b-badge pill :variant="`light-${'primary'}`" :key="dept">
            {{ dept.deptName }}
          </b-badge>
        </template>
      </template>
      <!-- 状态 -->
      <template #cell(userStatus)="data">
        <b-badge
          pill
          :variant="`light-${resolveStatusColor(data.item.userStatus)}`"
        >
          {{ resolveStatus(data.item.userStatus) }}
        </b-badge>
      </template>
      <!-- 管理员 -->
      <template #cell(admin)="data">
        <b-badge pill :variant="`light-${resolveAdminColor(data.item.admin)}`">
          {{ resolveAdmin(data.item.admin) }}
        </b-badge>
      </template>
      <!-- 操作 -->
      <template #cell(actions)="data">
        <div class="text-nowrap">
          <!-- Dropdown -->
          <b-dropdown
            variant="link"
            toggle-class="p-0"
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
            <b-dropdown-item
              @click="
                $emit('close-left-sidebar');
                $emit('edit-user', data.item);
              "
            >
              <feather-icon icon="EditIcon" />
              <span class="align-middle ml-50">Edit</span>
            </b-dropdown-item>
            <b-dropdown-item @click="confirmDel(data.item)">
              <feather-icon icon="TrashIcon" />
              <span class="align-middle ml-50">Delete</span>
            </b-dropdown-item>
          </b-dropdown>
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
          <span class="text-muted"
            >Showing {{ dataMeta.from }} to {{ dataMeta.to }} of
            {{ dataMeta.of }} entries</span
          >
        </b-col>
        <!-- Pagination -->
        <b-col
          cols="12"
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
              <feather-icon icon="ChevronLeftIcon" size="18" />
            </template>
            <template #next-text>
              <feather-icon icon="ChevronRightIcon" size="18" />
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
import { onUnmounted } from '@vue/composition-api'
import store from '@/store'
import useUserList from './useUserList'
import useStoreModule from './userStoreModule'

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
  setup() {
    const USER_MANAGE_SIDEBAR_STORE_MODULE_NAME = 'manage-user'

    // Register module
    if (!store.hasModule(USER_MANAGE_SIDEBAR_STORE_MODULE_NAME)) store.registerModule(USER_MANAGE_SIDEBAR_STORE_MODULE_NAME, useStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(USER_MANAGE_SIDEBAR_STORE_MODULE_NAME)) store.unregisterModule(USER_MANAGE_SIDEBAR_STORE_MODULE_NAME)
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
      refetchData,
      resolveAdmin,
      resolveAdminColor,
      resolveStatus,
      resolveStatusColor,
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
      searchQuery,
      sortBy,
      isSortDirDesc,
      refInvoiceListTable,
      rankFilter,
      refetchData,
      rankOptions,
      avatarText,
      //rank
      resolveRankColor,
      //user

      resolveAdmin,
      resolveAdminColor,
      resolveStatus,
      resolveStatusColor,
    }
  },
  methods: {
    confirmDel(val) {
      this.$swal({
        title: '确认删除用户?',
        text: "此操作无法撤销",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          this.$emit('del-user', val)
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
@import "@core/scss/vue/libs/vue-select.scss";
</style>