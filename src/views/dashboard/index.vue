<template>
  <v-content class="page">
    <v-container fluid>
      <pageBar :title="pageBarConf.title"></pageBar>
    </v-container>
  </v-content>
</template>

<script>
import pageBar from "@/components/common/PageBar";
export default {
  components: {
    pageBar
  },
  data: () => {
    return {
      pageBarConf: {
        title: "首页"
      }
    };
  },
  methods: {},
  mounted() {}
};
</script>

<style lang="scss"></style>
