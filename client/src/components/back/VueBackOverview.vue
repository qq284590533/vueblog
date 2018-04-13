<template>
  <div>
    <VueBackUserSet></VueBackUserSet>
    <VueBackArticleOverView></VueBackArticleOverView>
    <VueBackStatistics></VueBackStatistics>
  </div>
</template>

<script>
import VueBackUserSet from './VueBackUserSet'
import VueBackArticleOverView from './VueBackArticleOverView'
import VueBackStatistics from './VueBackStatistics'

export default {
  components:{
    VueBackUserSet,
    VueBackArticleOverView,
    VueBackStatistics
  }
}
</script>



