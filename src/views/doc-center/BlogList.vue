<template>
  <content-with-sidebar class="blog-wrapper">




  <div slot class="container">

<!--    <b-container>-->
      <!-- blogs -->


      <b-row class="blog-list-wrapper">

        <b-col class="col-5 offset-1 blog-list" >
          <div class="news-title">
            <span>公共文档</span>
            <b-link class="query-more" :to="'/doc-center/category/public'">更多+</b-link>
          </div>


          <!--document list-->
          <ul v-if="publicShowList.length > 0 ">
            <li v-for="(blog,index) in publicShowList" :key="index" class="doc-item">
              <b-link :to="'/doc-center/detail/'+blog.documentId">
                >>> {{ blog.documentTitle }}
              </b-link>
              <span class="news-date">{{blog.issuingTime || blog.modifiedTime}}</span>
            </li>
          </ul>
          <div v-else>
            <h2>暂无公告</h2>
<!--            <div style="min-height: 336px"></div>-->
          </div>
          <!--/document list-->

        </b-col>

        <b-col cols class="r-side blog-list col-5">
          <div class="news-title">
            <span>部门文档</span>
            <b-link class="query-more" :to="'/doc-center/category/department'">更多+</b-link>
            <div id="dept-select">
              <v-select label="deptName" class="select-dept" v-model="selectedDept" :options="departments" placeholder="请选择要查询的部门" ></v-select>
            </div>
          </div>
          <ul v-if="departmentShowList.length > 0">
            <li v-for="(blog,index) in departmentShowList" :key="index" class="doc-item">
              <b-link :to="'/doc-center/detail/'+blog.documentId">
                >>> {{ blog.documentTitle }}
              </b-link>
              <span class="news-date">{{blog.issuingTime || blog.modifiedTime}}</span>
            </li>
          </ul>
          <h2 v-else>{{ warningState }}</h2>
        </b-col>

      </b-row>
<!--    </b-container>-->
    <!--/ blogs -->


  </div>
    <div
        slot="sidebar"
        class="blog-sidebar"
    >
      <div class="btn-sidebar py-2 py-lg-4 px-lg-5">
        <b-button class="btn-info" :to="{ name:'doc-center-edit' }">发布新公告</b-button>
      </div>

      <div class="classification-sidebar">
        <b-list-group id="subject-select">
          <b-list-group-item
              class="rounded-0"
              v-for="(c_class,index) in classifications"
              :key="c_class"
              :class="{'active-item':c_class==selectedClass}"
          >
            <feather-icon :icon="'AnchorIcon'" size="18" class="mr-75"/>
            <a @click="updateSelect(c_class)">{{c_class}}</a>
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
import vSelect from 'vue-select'
import { kFormatter } from '@core/utils/filter'
import ContentWithSidebar from '@core/layouts/components/content-with-sidebar/ContentWithSidebar.vue'
import axios from '@/libs/axios'
import { temp } from '@core/directives/animations'

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BFormInput,
    BCardText,
    BCardBody,
    BCardTitle,
    BMedia,
    BAvatar,
    BMediaAside,
    BMediaBody,
    BLink,
    BBadge,
    BFormGroup,
    BInputGroup,
    BInputGroupAppend,
    BImg,
    BPagination,
    ContentWithSidebar,
    BButton,
    BListGroup,
    BListGroupItem,
    vSelect
  },
  data() {
    return {
      search_query: '',
      publicList: [],
      departmentShowList:[],
      departmentList: [],
      departmentName:'',
      blogSidebar: {},
      newsList:[],
      userData:{},
      showItemNumber:7,
      classifications:['全部公告','校办','Test'],
      publicShowList:[],
      selectedClass:'全部公告',
      departments:[],
      selectedDept:'',
      warningState:'暂无公告',
    }
  },
  created() {
    this.userData = JSON.parse(localStorage.getItem('userData'))
    axios.get('/document/getPublicDocuments?userId='+this.userData.userId)
        .then(res=>{
          this.publicList = res.data.data
          this.publicShowList = [...this.publicList]
          this.publicShowList = this.cutToFixedNumber(this.publicShowList)
        })

    return new Promise(resolve => {
      axios.get('/user/getUserDepts?userId=' + this.userData.userId)
          .then(res => {
            this.departments = res.data.data
          })
    })



  },
  methods: {
    kFormatter,
    tagsColor(tag) {
      if (tag === 'Quote') return 'light-info'
      if (tag === 'Gaming') return 'light-danger'
      if (tag === 'Fashion') return 'light-primary'
      if (tag === 'Video') return 'light-warning'
      if (tag === 'Food') return 'light-success'
      return 'light-primary'
    },
    updateSelect(c_class){
      if(c_class == '全部公告'){ this.publicShowList = [...this.publicList];}
      else{
        this.publicShowList = []
        this.publicList.forEach((blog)=>{
           if(blog.documentSubject == c_class) this.publicShowList.push(blog)
        })
      }
      this.selectedClass = c_class
      this.publicShowList = this.cutToFixedNumber(this.publicShowList)
    },
    cutToFixedNumber(tempList){
      if(tempList.length>this.showItemNumber){
        tempList = tempList.slice(0,this.showItemNumber)
      }
      return tempList;
    }

  },
  computed: {
    getFormattedDate() {
      let myDate = new Date()
      return myDate.getFullYear() + '.' + myDate.getMonth() + '.' + myDate.getDate()
    }
  },
  watch:{
    selectedDept(val,oldVal){
      this.departmentList = []
      this.warningState = "正在查询"
      new Promise(resolve => {
        axios.get('/document/getDeptDocuments?userId='+this.userData.userId+"&deptId="+val.deptId)
            .then(res=>{
              this.departmentList = res.data.data
              if(this.departmentList == null || this.departmentList.length<1){
                this.departmentList = []
                this.warningState = "暂无公告"
              }
            })
      }).catch(reason => {
        this.warningState = "查询失败，请重试"
      })

    },
    departmentList(val,oldVal){
        this.departmentShowList = [...val];
        if(this.departmentShowList.length > this.showItemNumber){
          this.departmentShowList = this.departmentShowList.slice(0,this.showItemNumber)
      }
    },

  }
}
</script>

<style lang="scss">
//@import '@core/scss/vue/pages/page-blog.scss';
@import "css/keep-light.css";

.doc-item a,.news-list a{
  color: #333;
  font-weight: bold;
  size: 16px;
}

.doc-item{
  list-style: none;
  padding: 10px 0;
  border-bottom: solid 1px darkgray;
}

.doc-item:hover{
  background-color: #D3D3D3;
}

.r-side{
  border-left: #82868b 1px solid;
  padding-left: 20px;
}


.r-side ul{
  margin: 0;
  padding-left: 14px;
}



.news-title{
  color: #1b2337;
  font-weight: bold;
  font-size: 24px;
  border-left: 5px solid #ddd;
  padding: 2px 8px;
  margin:8px 0;
}

.news-date{
  font-family: 'sans-serif';
  display:block;
  text-align: right;
  padding-top: 5px;
}

.query-more{
  float: right;
  font-size: 16px;
  font-weight: normal;
  color:#999;
}

.blog-wrapper{
  background-color: #fff;
  padding: 50px 0;
  box-shadow:0 4px 24px 0 rgb(34 41 47 / 10%);
  min-height: 556px;
}

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

#dept-select .select-dept .vs__search::placeholder,
#dept-select .select-dept .vs__dropdown-toggle, {
  height: 40px;
  font-size: 16px;
}

#dept-select .select-dept .vs__dropdown-menu{
  font-size: 14px;
}
</style>
