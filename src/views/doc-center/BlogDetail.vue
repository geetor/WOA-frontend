<template>
  <div>

    <!-- content -->
    <b-row>
      <b-col class="offset-2" cols="8">
        <div class="blog-detail-wrapper">
          <b-row>
            <!-- blogs -->
            <b-col cols="12">
              <b-card
                  :img-src="docDetail.img"
                  img-top
                  img-alt="Blog Detail Pic"
                  :title="docDetail.title"
              >
                <b-media no-body>
                  <b-media-aside
                      vertical-align="center"
                      class="mr-50"
                  >
                    <b-avatar
                        href="javascript:void(0)"
                        size="24"
                        :src="docDetail.avatar"
                    />
                  </b-media-aside>
                  <b-media-body>
                    <small class="text-muted mr-50">by</small>
                    <small>
                      <b-link class="text-body">{{ docDetail.userFullName}}</b-link>
                    </small>
                    <span class="text-muted ml-75 mr-50">|</span>
                    <small class="text-muted">{{ getFormattedDate }}</small>

                  </b-media-body>
                </b-media>
                <!-- eslint-disable vue/no-v-html -->
                <div
                    class="blog-content"
                    v-html="docDetail.content"
                />


                <!-- eslint-enable -->
                <hr class="my-2">

                <div class="d-flex align-items-center justify-content-between">


                  <!-- dropdown -->
                  <div class="blog-detail-share" v-if="false">
                    <b-dropdown
                        variant="link"
                        toggle-class="p-0"
                        no-caret
                        right
                    >
                      <template #button-content>
                        <feather-icon
                            size="21"
                            icon="Share2Icon"
                            class="text-body"
                        />
                      </template>
                      <b-dropdown-item
                          v-for="icon in socialShareIcons"
                          :key="icon"
                          href="#"
                      >
                        <feather-icon
                            :icon="icon"
                            size="18"
                        />
                      </b-dropdown-item>
                    </b-dropdown>
                  </div>
                  <!--/ dropdown -->
                </div>
              </b-card>
            </b-col>
            <!--/ blogs -->

            <!-- blog comment -->
            <b-col
                id="blogComment"
                cols="12"
                class="mt-2"
            >
              <h6 class="section-label">
                Comment
              </h6>
              <b-card
                  v-for="(comment,index) in docDetail.UserComment"
                  :key="index"
              >
                <b-media no-body>
                  <b-media-aside class="mr-75">
                    <b-avatar
                        :src="comment.avatar"
                        size="38"
                    />
                  </b-media-aside>
                  <b-media-body>
                    <h6 class="font-weight-bolder mb-25">
                      {{ comment.fullName }}
                    </h6>
                    <b-card-text>{{ comment.commentedAt }}</b-card-text>
                    <b-card-text>
                      {{ comment.comment }}
                    </b-card-text>
                    <b-link>
                      <div class="d-inline-flex align-items-center">
                        <feather-icon
                            icon="CornerUpLeftIcon"
                            size="18"
                            class="mr-50"
                        />
                        <span>Reply</span>
                      </div>
                    </b-link>
                  </b-media-body>
                </b-media>
              </b-card>
            </b-col>
            <!--/ blog comment -->
          </b-row>
        </div>
      </b-col>
    </b-row>
    <!--/ blogs -->
  </div>
  <!--/ content -->
<!--  </div>-->
</template>

<script>
import {
  BFormInput, BMedia, BAvatar, BMediaAside, BMediaBody, BImg, BLink, BFormGroup, BInputGroup, BInputGroupAppend,
  BCard, BRow, BCol, BBadge, BCardText, BDropdown, BDropdownItem, BForm, BFormTextarea, BFormCheckbox, BButton,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { kFormatter } from '@core/utils/filter'
import ContentWithSidebar from '@core/layouts/components/content-with-sidebar/ContentWithSidebar.vue'

export default {
  components: {
    BFormInput,
    BMedia,
    BAvatar,
    BMediaAside,
    BMediaBody,
    BLink,
    BCard,
    BRow,
    BCol,
    BFormGroup,
    BInputGroup,
    BInputGroupAppend,
    BImg,
    BBadge,
    BCardText,
    BDropdown,
    BForm,
    BDropdownItem,
    BFormTextarea,
    BFormCheckbox,
    BButton,
    ContentWithSidebar,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      search_query: '',
      commentCheckmark: '',
      docDetail: {},
      docList:[],
      blogSidebar: {},
      socialShareIcons: [
        'GithubIcon',
        'GitlabIcon',
        'FacebookIcon',
        'TwitterIcon',
        'LinkedinIcon',
      ],
    }
  },
  created() {
    this.$http.get('/blog/list/data/detail')
        .then(res => {
          this.docList = res.data
          this.docDetail = this.docList[0]
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

.doc-title {
  text-align: center;
  font-weight: bolder;
  color: black;
}

.blog-content p {
  color: #333;
  padding: 5px 20px;
}


</style>
