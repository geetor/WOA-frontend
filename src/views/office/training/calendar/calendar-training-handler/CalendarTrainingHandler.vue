<template>
  <div>
    <b-sidebar
        id="sidebar-add-new-training"
        sidebar-class="sidebar-lg"
        :visible="isTrainingHandlerSidebarActive"
        bg-variant="white"
        shadow
        backdrop
        no-header
        right
        @change="(val) => $emit('update:is-training-handler-sidebar-active', val)"
    >
      <template #default="{ hide }">
        <!-- Header -->
        <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
          <h5 class="mb-0">
            {{ trainingLocal.id ? '修改' : '发布' }}训练任务
          </h5>
          <div>
            <feather-icon
                v-if="trainingLocal.id"
                icon="TrashIcon"
                class="cursor-pointer"
                @click="$emit('del-training'); hide();"
            />
            <feather-icon
                class="ml-1 cursor-pointer"
                icon="XIcon"
                size="16"
                @click="hide"
            />
          </div>
        </div>

        <!-- Body -->
        <validation-observer
            #default="{ handleSubmit }"
            ref="refFormObserver"
        >

          <!-- Form -->
          <b-form
              class="p-2"
              @submit.prevent="handleSubmit(onSubmit)"
              @reset.prevent="resetForm"
          >

            <!-- 训练类型 -->
            <b-form-group
                label="训练类型"
                label-for="training-type"
            >
              <b-form-input
                  id="training-type"
                  v-model="trainingLocal.extendedProps.type"
                  autofocus
                  trim
              />
            </b-form-group>

            <!-- 训练场地 -->
            <b-form-group
                label="训练场地"
                label-for="training-place"
            >
              <b-form-input
                  id="training-place"
                  v-model="trainingLocal.extendedProps.place"
                  autofocus
                  trim
              />
            </b-form-group>

            <!-- 训练内容 -->
            <b-form-group
                label="训练内容"
                label-for="training-content"
            >
              <b-form-input
                  id="training-content"
                  v-model="trainingLocal.title"
                  trim
              />
            </b-form-group>

            <!-- 开始时间 -->
            <validation-provider
                #default="validationContext"
                name="Start Time"
                rules="required"
            >

              <b-form-group
                  label="开始时间"
                  label-for="start-time"
                  :state="getValidationState(validationContext)"
              >
                <flat-pickr
                    v-model="trainingLocal.start"
                    class="form-control"
                    :config="{ enableTime: true, dateFormat: 'Y-m-d H:i', time_24hr: true, locale: Mandarin}"
                />
                <b-form-invalid-feedback :state="getValidationState(validationContext)">
                  开始时间格式错误
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>

            <!-- 结束时间 -->
            <validation-provider
                #default="validationContext"
                name="End Time"
                rules="required"
            >

              <b-form-group
                  label="结束时间"
                  label-for="end-time"
                  :state="getValidationState(validationContext)"
              >
                <flat-pickr
                    v-model="trainingLocal.end"
                    class="form-control"
                    :config="{ enableTime: true, dateFormat: 'Y-m-d H:i', time_24hr: true, locale: Mandarin}"
                />
                <b-form-invalid-feedback :state="getValidationState(validationContext)">
                  结束时间格式错误
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>

            <!-- 训练负责人 -->
            <b-form-group
                label="负责人"
                label-for="add-heads"
            >
              <v-select
                  v-model="trainingLocal.extendedProps.heads"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  multiple
                  :close-on-select="false"
                  :options="lowerUsers"
                  label="userName"
                  input-id="add-heads"
              >

                <template #option="{ userName }">
                  <b-avatar
                      size="sm"
                      :text="avatarText(userName)"
                  />
                  <span class="ml-50 align-middle"> {{ userName }}</span>
                </template>

                <template #selected-option="{ userName }">
                  <b-avatar
                      size="sm"
                      class="border"
                      :text="avatarText(userName)"
                  />
                  <span class="ml-50 align-middle"> {{ userName }}</span>
                </template>
              </v-select>
            </b-form-group>

            <!-- 参训人员 -->
            <b-form-group
                label="参训人员"
                label-for="add-members"
            >
              <v-select
                  v-model="trainingLocal.extendedProps.members"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  multiple
                  :close-on-select="false"
                  :options="lowerUsers"
                  label="userName"
                  input-id="add-members"
              >

                <template #option="{ userName }">
                  <b-avatar
                      size="sm"
                      :text="avatarText(userName)"
                  />
                  <span class="ml-50 align-middle"> {{ userName }}</span>
                </template>

                <template #selected-option="{ userName }">
                  <b-avatar
                      size="sm"
                      class="border"
                      :text="avatarText(userName)"
                  />
                  <span class="ml-50 align-middle"> {{ userName }}</span>
                </template>
              </v-select>
            </b-form-group>

            <!-- 训练状态 -->
            <validation-provider
                #default="validationContext"
                name="Status"
                rules="required"
            >

              <b-form-group
                  v-if="trainingLocal.id"
                  label="训练状态"
                  label-for="training-status"
                  :state="getValidationState(validationContext)"
              >
                <v-select
                    v-model="trainingLocal.extendedProps.status"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    :options="statusOptions"
                    label="label"
                    :reduce="type => type.label"
                    input-id="training-status"
                >

                  <template #option="{ color, label }">
                    <div
                        class="rounded-circle d-inline-block mr-50"
                        :class="`bg-${color}`"
                        style="height:10px;width:10px"
                    />
                    <span> {{ label }}</span>
                  </template>

                  <template #selected-option="{ color, label }">
                    <div
                        class="rounded-circle d-inline-block mr-50"
                        :class="`bg-${color}`"
                        style="height:10px;width:10px"
                    />
                    <span> {{ label }}</span>
                  </template>
                </v-select>

                <b-form-invalid-feedback :state="getValidationState(validationContext)">
                  请输入正确格式的训练状态
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>

            <!-- Form Actions -->
            <div class="d-flex mt-3">
              <b-button
                  v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                  variant="primary"
                  class="mr-2"
                  type="submit"
              >
                {{ trainingLocal.id ? '修改' : '发布' }}
              </b-button>
              <b-button
                  v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                  type="reset"
                  variant="outline-secondary"
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
  BSidebar, BForm, BFormGroup, BFormInput, BFormCheckbox, BAvatar, BFormTextarea, BButton, BFormInvalidFeedback,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import flatPickr from 'vue-flatpickr-component'
import { Mandarin } from 'flatpickr/dist/l10n/zh.js'
import Ripple from 'vue-ripple-directive'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { required } from '@validations'
import formValidation from '@core/comp-functions/forms/form-validation'
import { ref, toRefs } from '@vue/composition-api'
import useCalendarTrainingHandler from './useCalendarTrainingHandler'
import { avatarText } from '@core/utils/filter'

export default {
  components: {
    BButton,
    BSidebar,
    BForm,
    BFormGroup,
    BFormInput,
    BFormCheckbox,
    BFormTextarea,
    BAvatar,
    vSelect,
    flatPickr,
    ValidationProvider,
    BFormInvalidFeedback,
    ValidationObserver
  },
  directives: {
    Ripple
  },
  model: {
    prop: 'isTrainingHandlerSidebarActive',
    event: 'update:is-training-handler-sidebar-active'
  },
  props: {
    isTrainingHandlerSidebarActive: {
      type: Boolean,
      required: true
    },
    training: {
      type: Object,
      required: true
    },
    clearTrainingData: {
      type: Function,
      required: true
    },
    lowerUsers: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      required
    }
  },
  setup (props, { emit }) {
    const clearFormData = ref(null)

    const {
      trainingLocal,
      resetTrainingLocal,
      statusOptions,

      // UI
      onSubmit
    } = useCalendarTrainingHandler(toRefs(props), clearFormData, emit)

    const {
      refFormObserver,
      getValidationState,
      resetForm,
      clearForm
    } = formValidation(resetTrainingLocal, props.clearTrainingData)

    clearFormData.value = clearForm

    return {
      // Add New Training
      trainingLocal,
      statusOptions,
      onSubmit,

      // Form Validation
      resetForm,
      refFormObserver,
      getValidationState,

      avatarText,
      Mandarin
    }
  }
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
