<template>
  <div style="height: inherit">
    <div class="training-list">
      <vue-perfect-scrollbar
          :settings="perfectScrollbarSettings"
          class="training-user-list scroll-area"
      >
        <b-list-group id="bulletin-list-group">
          <b-list-group-item
              v-for="bulletin in showList"
              :key="bulletin.bulletinId"
          >
            <div class="d-flex w-100 justify-content-between">
              <b-col align="left">
                <h5 id="bulletin-title-text">
                  {{ bulletin.bulletinTitle }}
                </h5>
              </b-col>
              <b-col align="right"
                     lg="2"
                     md="6"
              >
                <small class="text-secondary" style="text-align: right; font-family: sans-serif">{{
                    bulletin.issuingTime
                  }}</small>
              </b-col>
              <b-col id="operation-icons" class="justify-content-end" lg="auto" md="auto">
                <feather-icon
                    v-if="canViewHorizontalNavMenuLink()"
                    :id="`bulletin-row-${bulletin.id}-edit-icon`"
                    icon="EditIcon"
                    size="14"
                    @click="editBulletin(bulletin)"
                />
                <feather-icon
                    :id="`bulletin-row-${bulletin.id}-preview-icon`"
                    icon="EyeIcon"
                    size="14"
                    class="mx-1"
                    @click="previewBulletin(bulletin)"
                />
                <feather-icon
                    v-if="canViewHorizontalNavMenuLink()"
                    :id="`bulletin-row-${bulletin.id}-trash-icon`"
                    icon="TrashIcon"
                    size="14"
                    @click="trashBulletin(bulletin)"
                />
              </b-col>
            </div>
          </b-list-group-item>

          <div class="mx-2 mb-2 mt-1">
            <b-row>
              <b-col
                  cols="12"
                  sm="6"
                  class="d-flex align-items-center justify-content-center justify-content-sm-start"
              >
          <span class="text-muted"
          >从 {{ from }} 到 {{ to }} , 共
            {{ bulletinList.length }} 条公告</span
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
                    first-number
                    last-number
                    hide-goto-end-buttons
                    :per-page="perPage"
                    :total-rows="bulletinList.length"
                    :align="'center'"
                    class="mb-0 mt-1 mt-sm-0"
                    prev-class="prev-item"
                    next-class="next-item"
                >
                  <template #prev-text>
                    <feather-icon icon="ChevronLeftIcon" size="18"/>
                  </template>
                  <template #next-text>
                    <feather-icon icon="ChevronRightIcon" size="18"/>
                  </template>
                </b-pagination>
              </b-col>
            </b-row>
          </div>

        </b-list-group>
      </vue-perfect-scrollbar>
    </div>

    <!-- Sidebar -->
    <portal to="content-renderer-sidebar-left">
      <div class="sidebar-left">
        <div class="sidebar">
          <div class="sidebar-content training-sidebar">
            <div class="training-menu">
              <div class="form-group-compose text-center compose-btn">
                <b-button
                    v-if="canViewHorizontalNavMenuLink(item)"
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    variant="primary"
                    block
                    class="my-1"
                    @click="addBulletin"
                >
                  发布公告
                </b-button>
              </div>
              <vue-perfect-scrollbar
                  :settings="perfectScrollbarSettings"
                  class="sidebar-training-list scroll-area"
              >
                <b-list-group id="bulletin-sidebar">
                  <b-list-group-item class="rounded-0"
                                     v-for="(c_class,index) in classifications"
                                     :key="c_class"
                                     :class="{'active-item':c_class===selectedClass}"
                                     @click="updateSelect(c_class)"
                  >
                    <feather-icon :icon="'AnchorIcon'" size="18" class="mr-75"/>
                    <a>{{ c_class }}</a>
                  </b-list-group-item>
                </b-list-group>
              </vue-perfect-scrollbar>
            </div>
          </div>
        </div>
      </div>
    </portal>


  </div>
</template>

<script>
import { onUnmounted, ref } from '@vue/composition-api'
import { useResponsiveAppLeftSidebarVisibility } from '@core/comp-functions/ui/app'
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import {
  BDropdown,
  BDropdownItem,
  BFormCheckbox,
  BFormInput,
  BInputGroup,
  BInputGroupPrepend,
  BMedia,
  BMediaAside,
  BMediaBody,
  BBadge,
  BAvatar,
  BListGroup,
  BListGroupItem,
  BCard,
  BCardText,
  BButton,
  BCol,
  BRow,
  BPagination,
} from 'bootstrap-vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import store from '@/store'
import trainingStoreModule from '@/views/office/training/trainingStoreModule'
import axiosIns from '../../../libs/axios'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BFormInput,
    BInputGroup,
    BInputGroupPrepend,
    BDropdown,
    BDropdownItem,
    BFormCheckbox,
    BMedia,
    BMediaAside,
    BMediaBody,
    BBadge,
    BAvatar,
    BListGroup,
    BListGroupItem,
    BCardText,
    BButton,
    BCol,
    BRow,
    BPagination,

    // 3rd Party
    VuePerfectScrollbar
  },
  directives: {
    Ripple
  },
  setup () {
    const TRAINING_STORE_MODULE_NAME = 'office-training-statistic'

    // Register module
    if (!store.hasModule(TRAINING_STORE_MODULE_NAME)) store.registerModule(TRAINING_STORE_MODULE_NAME, trainingStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(TRAINING_STORE_MODULE_NAME)) store.unregisterModule(TRAINING_STORE_MODULE_NAME)
    })

    const perfectScrollbarSettings = {
      maxScrollbarLength: 150
    }

    // Compose
    const shallShowTrainingComposeModal = ref(false)

    // Left Sidebar Responsiveness
    const { mqShallShowLeftSidebar } = useResponsiveAppLeftSidebarVisibility()
    const item = ref()

    const canViewHorizontalNavMenuLink = () => {
      let canView = false

      const userData = JSON.parse(localStorage.getItem('userData'))
      if (userData.userRole === '管理员') {
        canView = true
      }

      return canView
    }

    const toast = useToast()

    return {
      // UI
      perfectScrollbarSettings,

      // Compose
      shallShowTrainingComposeModal,

      // Left Sidebar Responsiveness
      mqShallShowLeftSidebar,

      canViewHorizontalNavMenuLink,
      item,
      toast
    }
  },
  data () {
    return {
      classifications: ['相关新闻', '通知公告', '规章制度', '活动安排'],
      selectedClass: '相关新闻',
      showBulletinDetails: false,
      bulletinList: [],
      showList: [],
      bulletinViewData: {},
      currentPage: 1,
      perPage: 20,
      from: 0,
      to: 0,
    }
  },
  created () {
    this.selectedClass = this.$route.query.selectedClass
    const that = this
    axiosIns.get('/bulletin/getSimpleBulletinsByType',
        {
          params: {
            bulletinNum: 10000000,
            bulletinType: that.selectedClass
          }
        })
    .then(response => {
      that.bulletinList = response.data.data
      that.showList = that.bulletinList.slice(0, that.perPage)
      this.showList.sort(sortBulletins)
      this.from = (this.currentPage - 1) * this.perPage + 1
      this.to = this.from + this.perPage < this.bulletinList.length ? this.from + this.perPage - 1 : this.bulletinList.length
    })

    function sortBulletins (a, b) {
      if (a.top == true) {
        return -1
      } else if (b.top == true) {
        return 1
      }
      return 0
    }
  },
  watch: {
    currentPage: {
      handler (newVal) {
        let tempIndex = this.perPage * (newVal - 1)
        this.showList = this.bulletinList.slice(tempIndex, this.perPage + tempIndex)
        this.showList.sort(this.sortBulletins)
        this.from = (this.currentPage - 1) * this.perPage + 1
        this.to = this.from + this.perPage < this.bulletinList.length ? this.from + this.perPage - 1 : this.bulletinList.length
      },
      immediate: true,
    },
  },
  methods: {
    updateSelect (c_class) {
      const that = this
      axiosIns.get('/bulletin/getSimpleBulletinsByType',
          { params: { bulletinType: c_class } })
      .then(response => {
        that.bulletinList = response.data.data
        that.selectedClass = c_class
        this.showList.sort(this.sortBulletins)
        that.showList = that.bulletinList.slice(0, that.perPage)
        this.from = (this.currentPage - 1) * this.perPage + 1
        this.to = this.from + this.perPage < this.bulletinList.length ? this.from + this.perPage - 1 : this.bulletinList.length
      })
    },
    editBulletin (bulletin) {
      this.$router.push({
        name: 'bulletin-edit',
        query: { bulletinId: bulletin.bulletinId }
      })
    },
    trashBulletin (bulletin) {
      this.$swal({
        title: '确认删除该门户信息?',
        text: '此操作无法撤销',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      })
      .then(result => {
        if (result.value) {
          axiosIns.get('/bulletin/delBulletin',
              { params: { bulletinId: bulletin.bulletinId } })
          .then(response => {
            if (response.data.status.code = '0000') {
              this.$toast({
                component: ToastificationContent,
                position: 'bottom-right',
                props: {
                  title: '门户信息已删除',
                  icon: 'TrashIcon',
                  variant: 'danger',
                }
              })
              this.updateSelect(this.selectedClass)
            }
          })
        }
      })
    }
    ,
    addBulletin () {
      this.$router.push({
        name: 'bulletin-edit',
        query: { bulletinId: -1 }
      })
    },
    previewBulletin (bulletin) {
      this.$router.push({
        name: 'bulletin-preview',
        query: { bulletinId: bulletin.bulletinId }
      })
    },
    sortBulletins (a, b) {
      if (a.top == true) {
        return -1
      } else if (b.top == true) {
        return 1
      }
      return 0
    }
  }
}
</script>

<style lang="scss">
@import "~@core/scss/base/pages/office-training.scss";
@import "~@core/scss/base/pages/app-email.scss";
@import '~@core/scss/vue/libs/vue-sweetalert.scss';

.active-item {
  font-weight: bolder;
  color: #7ab8cc;
  border-left: 2px solid #7ab8cc !important;
  border-radius: 0;
}

.list-group-item {
  border-radius: 0;
  border-top: none;
  border-right: none;
  border-left: none;
  padding: 1rem 0.25rem;
}

#bulletin-sidebar .list-group-item .col {
  width: 200px !important;
}

.list-group-item:last-child {
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.list-group-item:first-child {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

#bulletin-title-text {
  margin-bottom: 0.25rem !important;
  margin-top: 0.25rem !important;
}
</style>
