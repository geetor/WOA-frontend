<template>
  <ul v-if="showList.length > 0 ">
    <li v-for="(blog,index) in showList" :key="index" class="doc-item">
      <b-link :to="'/doc-center/detail/'+blog.documentId">
        >>> {{ blog.documentTitle }}
      </b-link>
      <span class="news-date">{{blog.issuingTime || blog.modifiedTime}}</span>
    </li>
  </ul>
</template>

<script>

import {
  BRow, BCol, BCard, BFormInput, BCardText, BCardTitle, BMedia, BAvatar, BMediaAside, BMediaBody, BImg, BCardBody,
  BLink, BBadge, BFormGroup, BInputGroup, BInputGroupAppend, BPagination,BButton,BListGroup,BListGroupItem
} from 'bootstrap-vue'

export default {
  name: 'docList',
  components:{
    BRow, BCol, BCard, BFormInput, BCardText, BCardTitle, BMedia, BAvatar, BMediaAside, BMediaBody, BImg, BCardBody,
    BLink, BBadge, BFormGroup, BInputGroup, BInputGroupAppend, BPagination,BButton,BListGroup,BListGroupItem
  },
  props:{
    showList:Array
  },
}
</script>

<style scoped>
.news-date{
  font-family: 'sans-serif';
  display:block;
  text-align: right;
  padding-top: 5px;
}

.doc-item{
  list-style: none;
//background-color: lightpink;
  padding: 10px 0;
  border-bottom: solid 1px darkgray;
}

.doc-item a,.news-list a{
  color: #333;
  font-weight: bold;
  size: 16px;
}
</style>
