<template>
  <div>
    <b-sidebar
      id="sidebar-add-handler"
      sidebar-class="sidebar-lg"
      :visible="isDocumentAddSidebarActive"
      bg-variant="white"
      shadow
      backdrop
      no-header
      right
      @change="(val) => $emit('update:is-document-add-sidebar-active', val)"
      @hidden="clearForm"
    >
      <template #default="{ hide }">
        <!-- Header -->
        <div
          class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1"
        >
          <h5 class="mb-0">文档</h5>
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
            <!-- 标题 -->
            <b-form-group label="标题">
              <b-form-input
                v-model="addLocal.documentTitle"
                placeholder="请输入标题"
              >
              </b-form-input>
            </b-form-group>
            <!-- 是否开放 -->
            <b-form-group label="是否开放" label-for="document-open">
              <v-select
                v-model="addLocal.open"
                :options="openTypes"
                :reduce="(option) => option.value"
                input-id="open-type"
              />
            </b-form-group>
            <!-- 等级 -->
            <b-form-group label="等级" label-for="document-rank">
              <v-select
                v-model="addLocal.documentRank"
                :options="rankTypes"
                :reduce="(option) => option.value"
                input-id="rank-type"
              />
            </b-form-group>
            <!-- 类型 -->
            <b-form-group label="类型" label-for="document-type">
              <v-select
                v-model="addLocal.documentType"
                :options="typeOptions"
                :reduce="(option) => option.value"
                input-id="type-type"
              />
            </b-form-group>
            <!-- 作者 -->
            <b-form-group label="作者" label-for="authors">
              <b-form-checkbox-group
                id="checkbox-group-1"
                v-model="addLocal.authors"
                :options="allUsers"
                input-id="depts-type"
              />
            </b-form-group>
            <!-- 部门 -->
            <b-form-group label="部门" label-for="document-depts">
              <b-form-checkbox-group
                id="checkbox-group-2"
                v-model="addLocal.depts"
                :options="allDepts"
                input-id="depts-type"
              />
            </b-form-group>

            <!-- 主题 -->
            <b-form-group label="邮箱">
              <b-form-input
                v-model="addLocal.documentSubject"
                placeholder="请输入主题"
              >
              </b-form-input>
            </b-form-group>

            <!-- 表单操作 -->
            <div class="d-flex mt-2">
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="primary"
                class="mr-2"
                type="submit"
              >
                {{ addLocal.isEdit ? "修改" : "新增" }}
              </b-button>
              <b-button
                v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                type="reset"
                variant="outline-secondary"
                v-if="addLocal.isEdit"
                @click="$emit('update:is-document-add-sidebar-active', false)"
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
import useDocumentAdd from './useDocumentAdd'

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
    ValidationObserver,
  },
  directives: {
    Ripple,
  },
  model: {
    prop: 'isDocumentAddSidebarActive',
    event: 'update:is-document-add-sidebar-active',
  },
  props: {
    isDocumentAddSidebarActive: {
      type: Boolean,
      required: true,
    },
    add: {
      type: Object,
      required: true,
    },
    clearAddData: {
      type: Function,
      required: true,
    },
    allUsers: {
      required: true,
    },
    allDepts: {
      required: true,
    }
  },
  data() {
    return {
      required
    }
  },
  setup(props, { emit }) {
    const {
      addLocal,
      resetAddLocal,
      // UI
      typeTypes,
      openTypes,
      typeOptions,
      statusTypes,
      rankTypes,
      deptsTypes,
      adminTypes,
      onSubmit,

    } = useDocumentAdd(toRefs(props), emit)

    const {
      refFormObserver,
      getValidationState,
      resetForm,
      clearForm,
    } = formValidation(resetAddLocal, props.clearAddData)

    return {
      // Add New
      addLocal,
      onSubmit,
      typeTypes,
      openTypes,
      typeOptions,
      statusTypes,
      adminTypes,
      rankTypes,
      deptsTypes,
      // Form Validation
      resetForm,
      clearForm,
      refFormObserver,
      getValidationState,

      // UI
      // Filter/Formatter
      avatarText,
      Mandarin
    }
  },
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


