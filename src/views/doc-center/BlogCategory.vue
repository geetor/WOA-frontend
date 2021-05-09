<template>
  <content-with-sidebar class="blog-wrapper">
    <div slot class="container">
      <b-row>

      </b-row>
    </div>



<!--  sidebar  -->
    <div
        slot="sidebar"
        class="blog-sidebar"
    >
      <div class="btn-sidebar py-2 py-lg-4 px-lg-5">
        <b-button class="btn-info" :to="{ name:'doc-center-edit' }">发布新公告</b-button>
      </div>

      <div class="classification-sidebar" v-if="type == 'department'">
        <b-list-group>
          <b-list-group-item class="rounded-0" v-for="dept in departments">{{dept}}</b-list-group-item>
        </b-list-group>
      </div>

    </div>
  </content-with-sidebar>
</template>

<script>

import {
  BRow, BCol, BCard, BFormInput, BCardText, BCardTitle, BMedia, BAvatar, BMediaAside, BMediaBody, BImg, BCardBody,
  BLink, BBadge, BFormGroup, BInputGroup, BInputGroupAppend, BPagination,BButton,BListGroup,BListGroupItem
} from 'bootstrap-vue'
import ContentWithSidebar from '@core/layouts/components/content-with-sidebar/ContentWithSidebar.vue'
import axios from '@/libs/axios'

export default {
  name: 'BlogCategory',
  components: { ContentWithSidebar,
    BRow, BCol, BCard, BFormInput, BCardText, BCardTitle, BMedia, BAvatar, BMediaAside, BMediaBody, BImg, BCardBody,
    BLink, BBadge, BFormGroup, BInputGroup, BInputGroupAppend, BPagination,BButton,BListGroup,BListGroupItem},
  data(){
    return{
      dataList:[],
      type:'',
      userData:'',
      departments:['教育部','行政部','劳动部'],
      docType:'部门文档',
    }
  },
  created() {
    this.userData = JSON.parse(localStorage.getItem('userData'))
    this.type = this.$route.params.category;
    if(type=='public'){
      this.docType = '公共文档'
    }
    let url = '/document/' + (this.type == "public" ? 'getPublicDocuments' : 'getDeptDocuments') +"?userId=" +this.userData.userId;
    axios.get(url)
      .then(res=>{
        this.dataList = res.data.data
        console.log(this.dataList)
      })

  }
}
</script>

<style scoped>
.blog-sidebar{
  border-left: 1px solid lightgrey;
}

.btn-sidebar{
  border-bottom:1px solid lightgrey ;
}

.active-item{
  font-weight: bolder;
  color: #7ab8cc;
  border-left: 3px solid #7ab8cc;
  border-radius: 0;
}

.blog-wrapper{
  background-color: #fff;
  padding: 50px 0;
  box-shadow:0 4px 24px 0 rgb(34 41 47 / 10%);
  min-height: 556px;
}

</style>
