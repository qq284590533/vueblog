<template>
  <div class="aside-bar">
    <VueBackNav></VueBackNav>
  </div>
</template>
<script>
import VueBackNav from "./VueBackNav";
export default {
  components: {
    VueBackNav,
  },
  data() {
    return {};
  }
};
</script>

<style>
.aside-bar{
  position: fixed;
  height: 100%;
  z-index: 2;
  overflow: hidden;
}
</style>


