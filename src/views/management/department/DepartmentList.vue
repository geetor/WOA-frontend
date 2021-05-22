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
              placeholder="搜索部门成员"
            />
            <v-select
              v-model="rankFilter"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="rankOptions"
              class="department-rank-select mr-2"
              placeholder="部门等级"
            >
              <template #selected-option="{ label }">
                <span class="text-truncate overflow-hidden">
                  {{ label }}
                </span>
              </template>
            </v-select>

            <b-button
                variant="primary"
                @click="$emit('update:is-department-add-sidebar-active', true);"
            >
              <span class="text-nowrap">新增</span>
            </b-button>
          </div>
        </b-col>
      </b-row>
    </div>

    <b-table
      ref="refInvoiceListTable"
      :items="fetchDepartments"
      responsive
      hover
      :fields="tableColumns"
      primary-key="deptId"
      :sort-by.sync="sortBy"
      show-empty
      empty-text="无对应部门"
      :sort-desc.sync="isSortDirDesc"
      class="position-relative"
    >

      <template #cell(deptName)="data">
        <b-media vertical-align="center">
          <template #aside>
            <b-avatar
              size="32"
              :text="avatarText(data.item.deptName)"
              :variant="`light-${resolveRankColor(data.item.deptRank)}`"
            />
          </template>
          <span class="font-weight-bold d-block text-nowrap">
            {{ data.item.deptName }}
          </span>
        </b-media>
      </template>
      <template #cell(deptUsers)="data">
        <template v-for="user in data.item.deptUsers">
          <b-badge pill :variant="`light-${'primary'}`">
            {{ user.userName }}
          </b-badge>
        </template>
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
                $emit('edit-department', data.item);
              "
            >
              <feather-icon icon="EditIcon" />
              <span class="align-middle ml-50">编辑</span>
            </b-dropdown-item>
            <b-dropdown-item @click="confirmDel(data.item)">
              <feather-icon icon="TrashIcon" />
              <span class="align-middle ml-50">删除</span>
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
          >从 {{ dataMeta.from }} 到 {{ dataMeta.to }} , 共
            {{ dataMeta.of }} 个部门</span
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
  BBadge, BDropdown, BDropdownItem, BPagination, BTooltip
} from 'bootstrap-vue'
import { avatarText } from '@core/utils/filter'
import vSelect from 'vue-select'
import { onUnmounted } from '@vue/composition-api'
import store from '@/store'
import useDepartmentList from './useDepartmentList'
import departmentStoreModule from './departmentStoreModule'

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
    const DEPARTMENT_MANAGE_SIDEBAR_STORE_MODULE_NAME = 'manage-department'

    // Register module
    if (!store.hasModule(DEPARTMENT_MANAGE_SIDEBAR_STORE_MODULE_NAME)) store.registerModule(DEPARTMENT_MANAGE_SIDEBAR_STORE_MODULE_NAME, departmentStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(DEPARTMENT_MANAGE_SIDEBAR_STORE_MODULE_NAME)) store.unregisterModule(DEPARTMENT_MANAGE_SIDEBAR_STORE_MODULE_NAME)
    })

    const statusOptions = [
      'Downloaded',
      'Draft',
      'Paid',
      'Partial Payment',
      'Past Due',
    ]
    const {
      fetchDepartments,
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
      rankOptions,
      refetchData,
      //rank
      resolveRankColor,


    } = useDepartmentList()

    return {
      fetchDepartments,
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
      refetchData,
      avatarText,
      rankOptions,
      rankFilter,
      //rank
      resolveRankColor,

    }
  },
  methods: {
    confirmDel(val) {
      this.$swal({
        title: '确认删除此部门?',
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
          this.$emit('del-department', val)
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

.department-rank-select {
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
