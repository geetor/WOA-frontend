<template>
  <content-with-sidebar class="blog-wrapper">

<!--    <b-container>-->
      <!-- blogs -->
      <b-row class="blog-list-wrapper">

        <b-col class="col-9">
          <!--document list-->
          <ul>
            <li v-for="(blog,index) in blogList" :key="index" class="doc-item">
              <b-link :to="'/doc-center/detail/'+index">
                >>> {{ blog.title }}
              </b-link>
            </li>
          </ul>
          <!--/document list-->

          <!-- pagination -->
          <div class="my-2">
            <b-pagination
                v-model="currentPage"
                align="center"
                :total-rows="rows"
                first-number
                last-number
                prev-class="prev-item"
                next-class="next-item"
            >
              <template #prev-text>
                <feather-icon
                    icon="ChevronLeftIcon"
                    size="18"
                />
              </template>
              <template #next-text>
                <feather-icon
                    icon="ChevronRightIcon"
                    size="18"
                />
              </template>
            </b-pagination>
            <!--/ pagination -->
          </div>
        </b-col>

        <b-col cols class="r-side">
          <h2>近期动态</h2>
          <ol>
            <li v-for="news in newsList">
              <a :href="news.link">{{news.title}}</a>
            </li>
          </ol>
        </b-col>

      </b-row>
<!--    </b-container>-->
    <!--/ blogs -->

  </content-with-sidebar>
</template>

<script>
import {
  BRow, BCol, BCard, BFormInput, BCardText, BCardTitle, BMedia, BAvatar, BMediaAside, BMediaBody, BImg, BCardBody, BLink, BBadge, BFormGroup, BInputGroup, BInputGroupAppend, BPagination,
} from 'bootstrap-vue'
import { kFormatter } from '@core/utils/filter'
import ContentWithSidebar from '@core/layouts/components/content-with-sidebar/ContentWithSidebar.vue'

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
    }
  },
  created() {
    this.$http.get('/blog/list/data').then(res => { this.blogList = res.data })
    this.$http.get('/blog/list/data/sidebar').then(res => { this.blogSidebar = res.data })
    this.$http.get('/blog/list/data/news').then(res=>{this.newsList = res.data; this.rows = this.newsList.length})
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
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-blog.scss';

a{
  color: #1b2337;
  font-weight: bold;
  size: 16px;
}

.doc-item{
  list-style: none;
  //background-color: lightpink;
  padding: 10px 0;
}

.doc-item:hover{
  background-color: #d0d2d6;
}

.r-side{
  border-left: #82868b 1px solid;
}

.r-side h2{
  border-left: 5px solid #ddd;
  padding: 2px 8px;
  margin:8px 0;
}

.r-side ol{
  margin: 0;
  padding-left: 14px;
}

.r-side ol>li{
  padding: 5px 0;
}

</style>
