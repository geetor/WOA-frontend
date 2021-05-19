<template>
  <div>
    <b-sidebar
        id="sidebar-add-handler"
        sidebar-class="sidebar-lg"
        :visible="isUserAddSidebarActive"
        bg-variant="white"
        shadow
        backdrop
        no-header
        right
        @change="(val) => $emit('update:is-user-add-sidebar-active', val)"
        @hidden="clearForm"
    >
      <template #default="{ hide }">
        <!-- Header -->
        <div
            class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1"
        >
          <h5 class="mb-0">{{ addLocal.isEdit ? '修改人员' : '新增人员' }}</h5>
          <div>
            <feather-icon
                class="ml-1 cursor-pointer"
                icon="XIcon"
                size="16"
                @click="hide"
            />
          </div>
        </div>

        <!-- Body -->
        <validation-observer #default="{ handleSubmit }" ref="refFormObserver">
          <!-- Form -->
          <b-form
              class="p-2"
              @submit.prevent="handleSubmit(onSubmit)"
              @reset.prevent="resetForm"
          >
            <!-- 姓名 -->
            <b-form-group label="姓名">
              <b-form-input
                  v-model="addLocal.userName"
                  placeholder="请输入姓名"
              >
              </b-form-input>
            </b-form-group>
            <!-- 管理员 -->
            <b-form-group label="管理员" label-for="user-admin">
              <v-select
                  v-model="addLocal.admin"
                  :options="adminTypes"
                  :reduce="(option) => option.value"
                  input-id="admin-type"
              />
            </b-form-group>
            <!-- 等级 -->
            <b-form-group label="等级" label-for="user-rank">
              <v-select
                  v-model="addLocal.userRank"
                  :options="rankTypes"
                  :reduce="(option) => option.value"
                  input-id="rank-type"
              />
            </b-form-group>
            <!-- 性别 -->
            <b-form-group label="性别" label-for="user-gender">
              <v-select
                  v-model="addLocal.userGender"
                  :options="genderTypes"
                  :reduce="(option) => option.value"
                  input-id="gender-type"
              />
            </b-form-group>
            <!-- 电话 -->
            <b-form-group label="电话">
              <b-form-input
                  v-model="addLocal.userPhone"
                  placeholder="请输入电话"
              >
              </b-form-input>
            </b-form-group>

            <!-- 邮箱 -->
            <b-form-group label="邮箱">
              <b-form-input
                  v-model="addLocal.userEmail"
                  placeholder="请输入邮箱"
              >
              </b-form-input>
            </b-form-group>

            <!-- 状态 -->
            <b-form-group label="状态" label-for="user-status">
              <v-select
                  v-model="addLocal.userStatus"
                  :options="statusTypes"
                  :reduce="(option) => option.value"
                  input-id="status-type"
              />
            </b-form-group>

            <!-- 密码 -->
            <b-form-group label="密码">
              <b-form-input
                  v-model="addLocal.userPassword"
                  placeholder="请输入密码"
              >
              </b-form-input>
            </b-form-group>
            <!-- 部门 -->
            <b-form-group label="部门" label-for="user-depts">
              <b-form-checkbox-group
                  id="checkbox-group-1"
                  v-model="addLocal.userDepts"
                  :options="deptTypes"
                  input-id="dept-type"
              />
            </b-form-group>

            <!-- 表单操作 -->
            <div class="d-flex mt-2">
              <b-button
                  v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                  variant="primary"
                  class="mr-2"
                  type="submit"
              >
                {{ addLocal.isEdit ? '修改' : '新增' }}
              </b-button>
              <b-button
                  v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                  type="reset"
                  variant="outline-secondary"
                  v-if="addLocal.isEdit"
                  @click="
                  $emit('update:is-user-add-sidebar-active', false)
                "
              >
                取消
              </b-button>
              <b-button
                  v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                  type="reset"
                  variant="outline-secondary"
                  v-if="!addLocal.isEdit"
              >
                重置
              </b-button>
            </div>
          </b-form>
        </validation-observer>
      </template>
    </b-sidebar>
  </div>
</template>

<script>
import {
  BSidebar, BForm, BFormGroup, BFormInput, BAvatar, BButton, BFormInvalidFeedback, BFormCheckboxGroup, BFormCheckbox
} from 'bootstrap-vue'

import vSelect from 'vue-select'
import flatPickr from 'vue-flatpickr-component'
import { Mandarin } from 'flatpickr/dist/l10n/zh.js'
import Ripple from 'vue-ripple-directive'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { required } from '@validations'
import { avatarText } from '@core/utils/filter'
import formValidation from '@core/comp-functions/forms/form-validation'
import { toRefs } from '@vue/composition-api'
import { quillEditor } from 'vue-quill-editor'
import useUserAdd from './useUserAdd'

export default {
  components: {
    // BSV
    BButton,
    BSidebar,
    BForm,
    BFormGroup,
    BFormInput,
    BAvatar,
    BFormInvalidFeedback,
    BFormCheckbox,
    BFormCheckboxGroup,
    // 3rd party packages
    vSelect,
    flatPickr,
    quillEditor,

    // Form Validation
    ValidationProvider,
    ValidationObserver
  },
  directives: {
    Ripple
  },
  model: {
    prop: 'isUserAddSidebarActive',
    event: 'update:is-user-add-sidebar-active'
  },
  props: {
    isUserAddSidebarActive: {
      type: Boolean,
      required: true
    },
    add: {
      type: Object,
      required: true
    },
    clearAddData: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      required
    }
  },
  setup (props, { emit }) {
    const {
      addLocal,
      resetAddLocal,
      // UI
      genderTypes,
      statusTypes,
      rankTypes,
      deptTypes,
      adminTypes,
      onSubmit
    } = useUserAdd(toRefs(props), emit)

    const {
      refFormObserver,
      getValidationState,
      resetForm,
      clearForm,
    } = formValidation(resetAddLocal, props.clearAddData)

    const editorOption = {
      modules: {
        toolbar: '#quill-toolbar'
      },
      placeholder: '请输入请假原因'
    }

    return {
      // Add New
      addLocal,
      onSubmit,
      genderTypes,
      statusTypes,
      adminTypes,
      rankTypes,
      deptTypes,
      // Form Validation
      resetForm,
      clearForm,
      refFormObserver,
      getValidationState,

      // UI
      editorOption,

      // Filter/Formatter
      avatarText,
      Mandarin
    }
  }
}
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
@import "@core/scss/vue/libs/vue-flatpicker.scss";
@import "@core/scss/vue/libs/quill.scss";
</style>

<style lang="scss" scoped>
@import "~@core/scss/base/bootstrap-extended/include";

.add-type-selector {
  ::v-deep .vs__dropdown-toggle {
    padding-left: 0;
  }
}

#quil-content ::v-deep {
  > .ql-container {
    border-bottom: 0;
  }

  + #quill-toolbar {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-left-radius: $border-radius;
    border-bottom-right-radius: $border-radius;
  }
}
</style>


