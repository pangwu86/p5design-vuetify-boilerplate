<template>
  <v-content class="page">
    <v-container fluid>
      <pageBar :title="pageBarConf.title" :crumbs="pageBarConf.crumbs"></pageBar>
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
        title: "项目",
        crumbs: [
          {
            text: "项目信息",
            disabled: true
          },
          {
            text: "年计划",
            disabled: true
          }
        ]
      }
    };
  },
  methods: {},
  mounted() {}
};
</script>

<style lang="scss"></style>
