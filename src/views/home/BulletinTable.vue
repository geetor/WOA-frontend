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
    <b-table
            :items="tableData"
            :fields="fields"
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
  import axiosIns from "../../libs/axios";

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
          { key: 'top', label: '置顶' },
          { key: 'bulletinTitle', label: '标题' },
          { key: 'issuingTime', label: '时间' },
          { key: 'simpleInfo', label: '摘要' },
        ],
      }
    },
    methods:{
      bulletinClick(row){
        this.$router.push({name:"bulletin-preview",query:{bulletinId:row.bulletinId}})
      },
      moreBulletinInfo(bulletinType){
        this.$router.push({name:"bulletin-page",query:{selectedClass:bulletinType}})
      }
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

</style>
