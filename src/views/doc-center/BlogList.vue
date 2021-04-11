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
          <ul>
            <li v-for="(blog,index) in publicList" :key="index" class="doc-item">
              <b-link :to="'/doc-center/detail/'+blog.documentId">
                >>> {{ blog.documentTitle }}
              </b-link>
              <span class="news-date">{{blog.issuingTime || blog.modifiedTime}}</span>
            </li>
          </ul>
          <!--/document list-->

          <!-- pagination -->
<!--          <div class="my-2">-->
<!--            <b-pagination-->
<!--                v-model="currentPage"-->
<!--                align="center"-->
<!--                :total-rows="rows"-->
<!--                first-number-->
<!--                last-number-->
<!--                prev-class="prev-item"-->
<!--                next-class="next-item"-->
<!--            >-->
<!--              <template #prev-text>-->
<!--                <feather-icon-->
<!--                    icon="ChevronLeftIcon"-->
<!--                    size="18"-->
<!--                />-->
<!--              </template>-->
<!--              <template #next-text>-->
<!--                <feather-icon-->
<!--                    icon="ChevronRightIcon"-->
<!--                    size="18"-->
<!--                />-->
<!--              </template>-->
<!--            </b-pagination>-->
<!--            &lt;!&ndash;/ pagination &ndash;&gt;-->
<!--          </div>-->
        </b-col>

        <b-col cols class="r-side blog-list col-5">
          <div class="news-title">
            <span>部门文档</span>
            <a class="query-more">更多+</a>
          </div>
          <ul>
            <li v-for="(blog,index) in publicList" :key="index" class="doc-item">
              <b-link :to="'/doc-center/detail/'+blog.documentId">
                >>> {{ blog.documentTitle }}
              </b-link>
              <span class="news-date">{{blog.issuingTime || blog.modifiedTime}}</span>
            </li>
          </ul>
        </b-col>

      </b-row>
<!--    </b-container>-->
    <!--/ blogs -->
    <!-- sidebar -->

    <!--/ sidebar -->


  </div>
    <div
        slot="sidebar"
        class="blog-sidebar py-2 py-lg-0"
    >
      aaa

    </div>



  </content-with-sidebar>

</template>

<script>
import {
  BRow, BCol, BCard, BFormInput, BCardText, BCardTitle, BMedia, BAvatar, BMediaAside, BMediaBody, BImg, BCardBody, BLink, BBadge, BFormGroup, BInputGroup, BInputGroupAppend, BPagination,
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
    }
  },
  created() {
    this.userData = JSON.parse(localStorage.getItem('userData'))
    axios.get('/document/getPublicDocuments?userId='+this.userData.userId)
        .then(res=>{
          this.publicList = res.data.data
          console.log(this.userData)
          if(this.publicList.length > this.showItemNumber){
            this.publicList = this.publicList.slice(0,this.showItemNumber);
          }
        })
    axios.get('/user/getUserDepts?userId='+this.userData.userId)
      .then(res=>{
        console.log(res.data)
    })
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
}

.blog-sidebar{
  border-left: 2px solid black ;
}

</style>
