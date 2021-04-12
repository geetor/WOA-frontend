<template>
  <content-with-sidebar class="blog-wrapper">




  <div slot class="container">

<!--    <b-container>-->
      <!-- blogs -->


      <b-row class="blog-list-wrapper">

        <b-col class="col-5 offset-1 blog-list" >
          <div class="news-title">
            <span>公共文档</span>
            <a class="query-more">更多+</a>
          </div>


          <!--document list-->
          <ul v-if="showList.length > 0 ">
            <li v-for="(blog,index) in showList" :key="index" class="doc-item">
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
            <a class="query-more">更多+</a>
          </div>
          <ul v-if="showList.length > 0">
            <li v-for="(blog,index) in showList" :key="index" class="doc-item">
              <b-link :to="'/doc-center/detail/'+blog.documentId">
                >>> {{ blog.documentTitle }}
              </b-link>
              <span class="news-date">{{blog.issuingTime || blog.modifiedTime}}</span>
            </li>
          </ul>
          <h2 v-else>暂无公告</h2>
        </b-col>

      </b-row>
<!--    </b-container>-->
    <!--/ blogs -->
    <!-- sidebar -->

    <!--/ sidebar -->


  </div>
    <div
        slot="sidebar"
        class="blog-sidebar"
    >
      <div class="btn-sidebar py-2 py-lg-4 px-lg-5">
        <b-button class="btn-info" @click="publishNewBlog">发布新公告</b-button>
      </div>

      <div class="classification-sidebar">
        <b-list-group>
          <b-list-group-item v-for="(c_class,index) in classifications" :key="c_class">
            <feather-icon :icon="AnchorIcon"/>
            <a @click="updateSelect(c_class)">{{c_class}}</a>
            <b-badge class="float-right">11</b-badge>
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
import { kFormatter } from '@core/utils/filter'
import ContentWithSidebar from '@core/layouts/components/content-with-sidebar/ContentWithSidebar.vue'
import axios from '@/libs/axios'

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
    BListGroupItem
  },
  data() {
    return {
      search_query: '',
      publicList: [],
      departmentList: [],
      blogSidebar: {},
      newsList:[],
      userData:{},
      showItemNumber:7,
      classifications:['全部公告','校办','Test'],
      showList:[]
    }
  },
  created() {
    this.userData = JSON.parse(localStorage.getItem('userData'))
    axios.get('/document/getPublicDocuments?userId='+this.userData.userId)
        .then(res=>{
          this.publicList = res.data.data
          console.log(this.publicList)
          if(this.publicList.length > this.showItemNumber){
            this.publicList = this.publicList.slice(0,this.showItemNumber);
          }
        })
    // axios.get('/user/getUserDepts?userId='+this.userData.userId)
    //   .then(res=>{
    //     console.log(res.data)
    // })
    // axios.get('/document/getDeptDocuments?userId='+this.userData.userId)
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
    publishNewBlog(){
      this.$router.push('/doc-center/edit')
    },
    updateSelect(c_class){
      if(c_class == '全部公告'){ this.showList = [...this.publicList]}
      else{
        this.showList = []
        this.publicList.forEach((blog)=>{
           if(blog.documentSubject == c_class) this.showList.push(blog)
        })
      }
    }

  },
  computed: {
    getFormattedDate() {
      let myDate = new Date()
      return myDate.getFullYear() + '.' + myDate.getMonth() + '.' + myDate.getDate()
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-blog.scss';


.doc-item a,.news-list a{
  color: #333;
  font-weight: bold;
  size: 16px;
}

.doc-item{
  list-style: none;
  //background-color: lightpink;
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

</style>
