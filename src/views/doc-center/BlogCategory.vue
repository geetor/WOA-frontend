<template>
  <content-with-sidebar class="blog-wrapper">
    <div slot class="container">
        <b-row>
          <b-col md="1" >
            <h2 v-if="false" align="center" class="text-dark">{{ docType }}</h2>
          </b-col>


          <b-col md="10">


            <h2 class="doc-type-title">{{docType}}</h2>

            <div class="pub-btn" v-if="false">
              <b-link to="/doc-center/edit">
                <feather-icon
                    :icon="'EditIcon'"
                    size="24"
                    class="mr-75"
                />
                发布新公告
              </b-link>

            </div>

            <b-row class="blog-list-col">

              <b-col>
                <doc-list :show-list="leftSideList"></doc-list>
              </b-col>
            </b-row>
          </b-col>

      </b-row>

    </div>


    <b-pagination
        id="doc-pagination"
        v-model="currentPage"
        first-number
        last-number
        :per-page="eachColItemNumber*2"
        :total-rows="dataList.length"
        :align="'center'"
    >
    </b-pagination>

<!--  sidebar  -->
    <div
        slot="sidebar"
        class="blog-sidebar"
    >
      <div class="btn-sidebar py-2 py-lg-4 px-lg-5">
        <b-button class="btn-info" :to="{ name:'doc-center-edit' }">发布新公告</b-button>
      </div>

      <div class="classification-sidebar" v-if="type == 'department'" id="subject-select">
        <b-list-group>
          <b-list-group-item class="rounded-0" v-for="dept in departments" :key="dept.deptId" :class="{'active-item':selectedId==dept.deptId}">
            <feather-icon :icon="'AnchorIcon'" size="18" class="mr-75"/>
            <a @click="updateSelect(dept.deptId)">{{dept.deptName}}</a>
          </b-list-group-item>
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
import DocList from './components/DocList'


export default {
  name: 'BlogCategory',
  components: { ContentWithSidebar,
    BRow, BCol, BCard, BFormInput, BCardText, BCardTitle, BMedia, BAvatar, BMediaAside, BMediaBody, BImg, BCardBody,
    BLink, BBadge, BFormGroup, BInputGroup, BInputGroupAppend, BPagination,BButton,BListGroup,BListGroupItem,DocList},
  data(){
    return{
      dataList:[],
      type:'',
      userData:'',
      departments:[],
      docType:'部门文档',
      showList:[],
      leftSideList:[],
      rightSideList:[],
      eachColItemNumber:7,
      currentPage:1,
      selectedId:0,
    }
  },
  created() {
    this.userData = JSON.parse(localStorage.getItem('userData'))
    this.type = this.$route.params.category;
    if(this.type=='public'){
      this.docType = '公共文档'
    }

    new Promise(resolve => {
      axios.get('/user/getUserDepts?userId='+this.userData.userId)
          .then(res=>{
            this.departments = res.data.data
            resolve()
          })
    }).then(res=>{
      let url = '/document/' + (this.type == "public" ? 'getPublicDocuments' : 'getDeptDocuments') +"?userId=" +this.userData.userId;
      if(this.type!='public'){
        url = url + "&deptId="+this.departments[0].deptId;
        this.selectedId = this.departments[0].deptId;
      }
      axios.get(url)
          .then(res=>{
            this.dataList = res.data.data.slice()
            this.pageInit();
          })
    })

  },
  watch:{
    showList:{
      handler(newVal,oldVal){
        if(newVal.length<this.eachColItemNumber){
          this.leftSideList = newVal.slice();
          this.rightSideList = []
        }
        else{
          this.leftSideList = newVal.slice(0,this.eachColItemNumber);
          this.rightSideList = newVal.slice(this.eachColItemNumber)
        }
      },
      immediate:true,
    },
    currentPage(newVal,oldVal){
      //eachColItemNumber 乘2之后才是一个页面展示的数量
      let start = (newVal - 1) * this.eachColItemNumber * 2;
      let end = (start + 2 * this.eachColItemNumber) >= this.dataList.length ? this.dataList.length : (2 * this.eachColItemNumber + start);
      console.log(end)
    }
  },
  methods:{
    pageInit(){
      if(this.dataList.length <= 2 * this.eachColItemNumber){
        this.showList = [...this.dataList]
      }
      else{
        this.showList = this.dataList.slice(0,2 * this.eachColItemNumber)
      }
    },
    updateSelect(id){
      this.selectedId = id
      new Promise(resolve => {
        axios.get('/document/getDeptDocuments?userId='+this.userData.userId+"&deptId="+id)
          .then(res=>{
            this.dataList = res.data.data;
            resolve();
          })
      }).then(res=>{
        this.pageInit();
      })
    }
  }
}
</script>

<style scoped>
@import "./css/keep-light.css";
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
  position: relative;
}

.blog-list-col{
  margin-top: 50px;
}

.pub-btn{
  margin-left: 40px;
}

.doc-type-title{
  padding-left: 40px;
}

</style>
