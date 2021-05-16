<template>
  <b-card
    v-if="Object.keys(blogEdit).length"
    class="blog-edit-wrapper"
  >
    <!-- media -->
    <b-media
      no-body
      vertical-align="center"
    >
      <b-media-aside class="mr-75">
        <b-avatar
          size="38"
          :src="blogEdit.avatar"
        />
      </b-media-aside>
      <b-media-body>
        <h6 class="mb-25">
          {{ userData.userName }}
        </h6>
        <b-card-text>{{ getCurrentTime }}</b-card-text>
      </b-media-body>
    </b-media>
    <!--/ media -->

    <!-- form -->
    <b-form class="mt-2 my-b-form">
      <b-row>
        <b-col md="6">
          <b-form-group
            label="标题"
            label-for="blog-edit-title"
            class="mb-2"
          >
            <b-form-input
              id="blog-edit-title"
              v-model="blogEdit.blogTitle"
            />
          </b-form-group>
        </b-col>

        <b-col md="6">
          <b-form-group
            label="设置查看权限"
            label-for="blog-edit-category"
            class="mb-2"
          >
            <v-select
              id="blog-edit-category"
              v-model="blogEdit.rank"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="rankOption"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6">
          <b-form-group label="文档类型" label-for="blog-edit-type" class="mb-2">
            <v-select
                id="blog-edit-type"
                v-model="blogEdit.blogType"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="typeOption"
            />
          </b-form-group>
        </b-col>

        <b-col md="6">
          <b-form-group label="文档主题" label-for="blog-edit-subject" class="mb-2">
            <v-select
                id="blog-edit-subject"
                v-model="blogEdit.blogSubject"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="subjectOption"
            />
          </b-form-group>

        </b-col>
      </b-row>

      <b-row>
        <b-col md="6">
          <b-form-group label="发布部门" label-for="blog-edit-dept" class="mb-2">
            <v-select
                id="blog-edit-dept"
                label="deptName"
                v-model="blogEdit.blogDept"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="deptOption"
            />
          </b-form-group>

        </b-col>
      </b-row>

      <b-row>
        <b-col cols="12">
          <b-form-group
            label="Content"
            label-for="blog-content"
            class="mb-2"
          >
            <quill-editor
              id="blog-content"
              v-model="blogEdit.excerpt"
              :options="snowOption"
            />
          </b-form-group>
        </b-col>

        <b-col
          cols="12"
          class="mt-50"
        >
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            class="mr-1 sub-btn"
            @click="publishBlog($event)"
          >
            发布
          </b-button>
<!--          <b-button-->
<!--            v-ripple.400="'rgba(186, 191, 199, 0.15)'"-->
<!--            variant="outline-secondary"-->
<!--          >-->
<!--            取消-->
<!--          </b-button>-->
        </b-col>
      </b-row>
    </b-form>
    <!--/ form -->
  </b-card>

</template>

<script>
import {
  BCard, BMedia, BAvatar, BCardText, BMediaAside, BMediaBody, BForm, BRow, BCol, BFormGroup, BFormInput, BImg, BFormFile, BLink, BButton,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { quillEditor } from 'vue-quill-editor'
import Ripple from 'vue-ripple-directive'
import { useInputImageRenderer } from '@core/comp-functions/forms/form-utils'
import { ref } from '@vue/composition-api'
import axios from '@/libs/axios'

export default {
  components: {
    BCard,
    BMedia,
    BAvatar,
    BCardText,
    BMediaAside,
    BMediaBody,
    BForm,
    BLink,
    BImg,
    BRow,
    BCol,
    BButton,
    BFormGroup,
    BFormInput,
    BFormFile,
    vSelect,
    quillEditor,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      blogEdit: {},
      blogFile: null,
      categoryOption: ['同志', 'Food', 'Gaming', 'Quote', 'Video'],
      rankOption: [6,5,4,3,2,1],
      snowOption: {
        theme: 'snow',
      },
      userData:{},
      typeOption:['决议','其他'],
      subjectOption:['校办','Test'],
      deptOption:[],
    }
  },
  created() {
    this.blogEdit = {
      avatar:null,
      blogTitle:'',
      rank:0,
      blogType:'',
      blogSubject:'',
      blogDept:'',
      excerpt:'',
    }
    this.userData = JSON.parse(localStorage.getItem('userData'))
    axios.get('/user/getUserDepts?userId='+this.userData.userId)
    .then(res=>{
      this.deptOption = res.data.data
    })
  },
  setup() {
    const refInputEl = ref(null)
    const refPreviewEl = ref(null)

    const { inputImageRenderer } = useInputImageRenderer(refInputEl, base64 => { refPreviewEl.value.src = base64 })

    return {
      refInputEl,
      refPreviewEl,
      inputImageRenderer,
    }
  },
  methods:{
    publishBlog(){
      let richText = this.blogEdit.excerpt;
      let my_depts = [];
      my_depts.push(this.blogEdit.blogDept.deptId);
      let my_id = [];
      my_id.push(this.userData.userId)
      let postBody = {
        open:true,
        documentType:this.blogEdit.blogType,
        documentRank:this.blogEdit.rank,
        documentSubject:this.blogEdit.blogSubject,
        documentTitle:this.blogEdit.blogTitle,
        issuingTime:this.getCurrentTime,
        modifiedTime:this.getCurrentTime,
        documentContent:richText,
        authors:my_id,
        depts: my_depts,
      };
      axios.post('/document/addDocument', postBody)
      .then(res=>{
        if(res.data.status.code='0000'){
          alert('发布成功！');
          this.$router.push('/doc-center/list')
        }
      })
    },

  },
  computed:{
    getCurrentTime(){
      let myDate = new Date();
      let year = myDate.getFullYear();
      let month = myDate.getMonth()+1;
      let day = myDate.getDate();
      let Hour = myDate.getHours();
      let Minute = myDate.getMinutes();
      let Second = myDate.getSeconds();
      return year+"-"+month+"-"+day+" "+Hour+":"+Minute+":"+Second;

    }
  }
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/quill.scss';
@import '@core/scss/vue/pages/page-blog.scss';

.sub-btn{
  float: right;
}


.ql-blank{
  min-height:150px
}
</style>
