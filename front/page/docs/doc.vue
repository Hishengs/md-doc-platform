<!-- 文档查看页面 -->
<template>
  <div id="doc">
    <iframe :src="config.serverUrl + '/static/docs/' + doc.name" v-if="doc.name" width="100%" height="100%" frameborder="0"></iframe>
  </div>
</template>

<script>
  export default {
    name: 'doc',
    data (){
      return {
        doc: {
          name: '',
        },
      };
    },
    activated (){
      this.doc.name = this.$route.params.docName;
    },
  };
</script>

<style lang= "less" scoped>
  #doc {
    height: 100%;
  }
</style>