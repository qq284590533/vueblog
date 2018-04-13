<template>
  <div class="aside-bar">
    <VueNav></VueNav>
    <VueStage></VueStage>
  </div>
</template>
<script>
import VueNav from "./VueNav";
import VueStage from "./VueStage";
export default {
  components: {
    VueNav,
    VueStage
  },
  name: "asideBar",
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


