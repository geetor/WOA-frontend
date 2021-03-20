<template>
  <div class="container-fluid">

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
            <li v-for="(blog,index) in blogList" :key="index" class="doc-item">
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
            <li v-for="(blog,index) in blogList" :key="index" class="doc-item">
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

  </div>
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
      blogList: [],
      blogSidebar: {},
      currentPage: 1,
      perPage: 1,
      rows: 21,
      newsList:[],
      userData:{},
      showItemNumber:7,
    }
  },
  created() {
    this.$http.get('/blog/list/data').then(res => { this.blogList = res.data })
    this.$http.get('/blog/list/data/sidebar').then(res => { this.blogSidebar = res.data })
    this.$http.get('/blog/list/data/news').then(res=>{this.newsList = res.data; this.rows = this.newsList.length})
    this.userData = JSON.parse(localStorage.getItem('userData'))
    axios.get('/document/getPublicDocuments?userId='+this.userData.userId)
        .then(res=>{
          this.blogList = res.data.data
          if(this.blogList.length > this.showItemNumber){
            this.blogList = this.blogList.slice(0,this.showItemNumber);
          }
          console.log(this.blogList)
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

</style>
