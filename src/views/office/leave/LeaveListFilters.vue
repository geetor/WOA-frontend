<template>
  <b-card no-body>
    <b-card-header class="pb-50">
      <h5>
        筛选
      </h5>
    </b-card-header>
    <b-card-body>
      <b-row>
        <b-col
            cols="12"
            md="4"
            class="mb-md-0 mb-2"
        >
          <label>所属部门</label>
          <v-select
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :value="departmentFilter"
              :options="departments"
              class="w-100"
              :reduce="val => val.value"
              @input="(val) => $emit('update:departmentFilter', val)"
          />
        </b-col>
        <b-col
            cols="12"
            md="4"
            class="mb-md-0 mb-2"
        >
          <label>请假类型</label>
          <v-select
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :value="typeFilter"
              :options="leaveTypes"
              class="w-100"
              :reduce="val => val.value"
              @input="(val) => $emit('update:typeFilter', val)"
          />
        </b-col>
        <b-col
            cols="12"
            md="4"
            class="mb-md-0 mb-2"
        >
          <label>审核状态</label>
          <v-select
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :value="statusFilter"
              :options="leaveStatuses"
              class="w-100"
              :reduce="val => val.value"
              @input="(val) => $emit('update:statusFilter', val)"
          />
        </b-col>
      </b-row>
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard, BCardHeader, BCardBody, BRow, BCol,
} from 'bootstrap-vue'
import vSelect from 'vue-select'

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BCardHeader,
    BCardBody,
    vSelect
  },
  props: {
    departmentFilter: {
      type: [String, null],
      default: null
    },
    typeFilter: {
      type: [String, null],
      default: null
    },
    statusFilter: {
      type: [String, null],
      default: null
    },
    departments: {
      type: Array,
      required: true
    },
    leaveTypes: {
      type: Array,
      required: true
    },
    leaveStatuses: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
