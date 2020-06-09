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
        title: "项目节点库",
        crumbs: [
          {
            text: "基本信息",
            disabled: true
          },
          {
            text: "项目节点库",
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
