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
                @click="$emit('remove-training'); hide();"
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
                    :config="{ enableTime: true, dateFormat: 'Y-m-d H:i'}"
                />
                <b-form-invalid-feedback :state="getValidationState(validationContext)">
                  开始时间无效
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
                    :config="{ enableTime: true, dateFormat: 'Y-m-d H:i'}"
                />
                <b-form-invalid-feedback :state="getValidationState(validationContext)">
                  结束时间无效
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
                  :options="headsOptions"
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

            <!-- 训练状态 -->
            <validation-provider
                #default="validationContext"
                name="Status"
                rules="required"
            >

              <b-form-group
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
                  {{ validationContext.errors[0] }}
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
import Ripple from 'vue-ripple-directive'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { required, email } from '@validations'
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
    ValidationObserver,
  },
  directives: {
    Ripple,
  },
  model: {
    prop: 'isTrainingHandlerSidebarActive',
    training: 'update:is-training-handler-sidebar-active',
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
    }
  },
  data () {
    return {
      required,
      email
    }
  },
  setup (props, { emit }) {
    /*
     ? This is handled quite differently in SFC due to deadlock of `useFormValidation` and this composition function.
     ? If we don't handle it the way it is being handled then either of two composition function used by this SFC get undefined as one of it's argument.
     * The Trick:

     * We created reactive property `clearFormData` and set to null so we can get `resetTrainingLocal` from `useCalendarTrainingHandler` composition function.
     * Once we get `resetTrainingLocal` function which is required by `useFormValidation` we will pass it to `useFormValidation` and in return we will get `clearForm` function which shall be original value of `clearFormData`.
     * Later we just assign `clearForm` to `clearFormData` and can resolve the deadlock. 😎

     ? Behind The Scene
     ? When we passed it to `useCalendarTrainingHandler` for first time it will be null but right after it we are getting correct value (which is `clearForm`) and assigning that correct value.
     ? As `clearFormData` is reactive it is being changed from `null` to corrent value and thanks to reactivity it is also update in `useCalendarTrainingHandler` composition function and it is getting correct value in second time and can work w/o any issues.
    */
    const clearFormData = ref(null)

    const {
      trainingLocal,
      resetTrainingLocal,
      statusOptions,

      // UI
      onSubmit,
      headsOptions
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
      headsOptions,

      // Form Validation
      resetForm,
      refFormObserver,
      getValidationState,

      avatarText
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
