<template>
    <div style="height: inherit">
      <div class="training-list">
        <vue-perfect-scrollbar
                :settings="perfectScrollbarSettings"
                class="training-user-list scroll-area"
        >
          <b-list-group>
            <b-list-group-item class="flex-column align-items-start"
                               v-for="bulletin in bulletinList"
                               :key="bulletin.bulletinId">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">
                  {{bulletin.bulletinTitle}}
                </h5>
                <small class="text-secondary">{{bulletin.issuingTime}}</small>
              </div>
              <b-card-text class="mb-1">
                {{bulletin.simpleInfo}}
              </b-card-text>
              <b-row>
                <b-col>
                  <small class="text-secondary">Donec id elit non mi porta.</small>
                </b-col>
                <b-col align="right">
                  <feather-icon
                          v-if="canViewHorizontalNavMenuLink(item)"
                          :id="`bulletin-row-${bulletin.id}-edit-icon`"
                          icon="EditIcon"
                          size="16"
                          class="mx-1"
                          @click="editBulletin(bulletin)"
                  />
                  <feather-icon
                          v-if="canViewHorizontalNavMenuLink(item)"
                          :id="`bulletin-row-${bulletin.id}-trash-icon`"
                          icon="TrashIcon"
                          size="16"
                          class="mx-1"
                          @click="trashBulletin(bulletin)"
                  />
                  <feather-icon
                          :id="`bulletin-row-${bulletin.id}-preview-icon`"
                          icon="EyeIcon"
                          size="16"
                          class="mx-1"
                          @click="previewBulletin(bulletin)"
                  />
                </b-col>
              </b-row>
            </b-list-group-item>
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
                  新增{{selectedClass}}
                </b-button>
              </div>
              <vue-perfect-scrollbar
                      :settings="perfectScrollbarSettings"
                      class="sidebar-training-list scroll-area"
              >
                <b-list-group>
                  <b-list-group-item class="rounded-0" v-for="(c_class,index) in classifications" :key="c_class" :class="{'active-item':c_class==selectedClass}">
                    <feather-icon :icon="'AnchorIcon'" size="18" class="mr-75"/>
                    <a @click="updateSelect(c_class)">{{c_class}}</a>
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
  BCardText,
  BButton,
  BCol,
  BRow,
} from 'bootstrap-vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import store from '@/store'
import trainingStoreModule from '@/views/office/training/trainingStoreModule'
import axiosIns from "../../../libs/axios";

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

    // 3rd Party
    VuePerfectScrollbar,

    // App SFC
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

    // Email View
    const showEmailDetails = ref(false)

    // Compose
    const shallShowTrainingComposeModal = ref(false)

    // Left Sidebar Responsiveness
    const { mqShallShowLeftSidebar } = useResponsiveAppLeftSidebarVisibility()

    const canViewHorizontalNavMenuLink = item => {
      let canView = false

      const userData = JSON.parse(localStorage.getItem('userData'))
      if (userData.userRole === '管理员') {
        canView = true
      }

      return canView
    }

    return {
      // UI
      perfectScrollbarSettings,

      // Departments & UsersMeta
      // departments,
      // usersMeta,

      // Compose
      shallShowTrainingComposeModal,

      // Left Sidebar Responsiveness
      mqShallShowLeftSidebar,

      canViewHorizontalNavMenuLink
    }
  },
  data(){
    return{
      classifications: ['相关新闻', '通知公告', '规章制度', '活动安排'],
      selectedClass: '',
      showBulletinDetails: false,
      bulletinList: [],
      bulletinViewData: {},
    }
  },
  created(){
    this.selectedClass = this.$route.query.selectedClass
    const that = this
    axiosIns.get('/bulletin/getSimpleBulletinsByType',
            {params: {bulletinType: that.selectedClass}})
            .then(response => {
              that.bulletinList = response.data.data})
  },
  methods:{
    updateSelect(c_class){
      const that = this
      axiosIns.get('/bulletin/getSimpleBulletinsByType',
              {params: {bulletinType: c_class}})
              .then(response => {
                that.bulletinList = response.data.data
                that.selectedClass = c_class})
    },
    // handleClickBulletin(bulletin){
    //   console.log(bulletin);
    // },
    editBulletin(bulletin){
      this.$router.push({name:"bulletin-edit",query:{bulletinId: bulletin.bulletinId}})
    },
    trashBulletin(bulletin){
      axiosIns.get('/bulletin/delBulletin',
              {params: {bulletinId: bulletin.bulletinId}})
              .then(response => {
                if(response.data.status.code='0000'){
                  alert('删除成功！')
                  this.updateSelect(this.selectedClass)
                }
                })
    },
    addBulletin(){
      this.$router.push({name:"bulletin-edit",query:{bulletinId: -1}})
    },
    previewBulletin(bulletin){
      console.log(bulletin)
      this.$router.push({name:"bulletin-preview",query:{bulletinId: bulletin.bulletinId}})
    },
  }
}
</script>

<style lang="scss" scoped>

</style>

<style lang="scss">
@import "~@core/scss/base/pages/office-training.scss";
@import "~@core/scss/base/pages/app-email.scss";
</style>
