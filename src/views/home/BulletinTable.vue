<template>
  <b-card
    v-if="tableData"
    no-body
  >
    <b-card-header>
      <div>
        <b-card-title style="font-weight: bolder" >{{cardTitle}}</b-card-title>
      </div>
      <feather-icon
        icon="MoreVerticalIcon"
        size="18"
        class="cursor-pointer"
        @click="moreBulletinInfo(cardTitle)"
      />
    </b-card-header>
    <b-table id="bulletin-info-table"
            :items="tableData"
            :fields="fields"
            :show-overflow-tooltip="true"
            thead-tr-class ="d-none"
            @row-clicked="bulletinClick"
            class="mb-0"
            hover
            borderless
            responsive
    >
    </b-table>
  </b-card>
</template>

<script>
  import {
    BCard, BTable, BAvatar, BImg, BCardHeader, BCardTitle, BButton,BDropdown, BDropdownItem,
  } from 'bootstrap-vue'
import { formatDate } from '@/@core/utils/date.js';

  export default {
    components: {
      BCard,
      BTable,
      BAvatar,
      BImg,
      BCardHeader,
      BCardTitle,
      BButton,
      BDropdown,
      BDropdownItem,
      formatDate
    },
    props: {
      tableData: {
        type: Array,
        default: () => [],
      },
      cardTitle: {
        type: String,
        default: () => "",
      },
    },

    data() {
      return {
        fields: [
          { key: 'bulletinTitle', label: '标题', formatter: function (value) {
              if(value.length>20) return value.substr(0,20)+'...'
              return value
            }},
          { key: 'issuingTime', label: '时间', align: "right"},
        ],
      }
    },
    methods:{
      bulletinClick(row){
        this.$router.push({name:"bulletin-preview",query:{bulletinId:row.bulletinId}})
      },
      moreBulletinInfo(bulletinType){
        this.$router.push({name:"bulletin-page",query:{selectedClass:bulletinType}})
      },
    }
  }

</script>

<style lang="scss" scoped>
  @import '~@core/scss/base/bootstrap-extended/include';
  @import '~@core/scss/base/components/variables-dark';

  .card-company-table ::v-deep td .b-avatar.badge-light-company {
    .dark-layout & {
      background: $theme-dark-body-bg !important;
    }
  }

  ::v-deep tr:focus {
    outline: none !important;
  }

  ::v-deep tr td:last-child {
    font-family: sans-serif !important;
    width: 200px;
  }


</style>
