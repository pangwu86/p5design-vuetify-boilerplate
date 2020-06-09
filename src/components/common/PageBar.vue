<template>
  <v-row class="page-bar">
    <v-col cols="12" class="page-bar-toolbar">
      <v-toolbar flat dense>
        <v-toolbar-title
          ><span class="text--primary">{{ title }}</span></v-toolbar-title
        >
        <v-spacer></v-spacer>
        <template v-slot:extension v-if="crumbs && crumbs.length > 0">
          <v-breadcrumbs :items="crumbs" :divider="divider"></v-breadcrumbs>
        </template>
      </v-toolbar>
    </v-col>
  </v-row>
</template>

<script>
export default {
  components: {},
  props: {
    title: {
      default: "标题"
    },
    crumbs: {
      type: Array,
      default: () => {
        return [];
      }
    },
    divider: {
      default: ">"
    }
  }
};
</script>

<style lang="scss">
.page-bar {
  margin-top: -12px;

  .page-bar-toolbar {
    background-color: #fff;
    border-color: #fff;
    color: rgba(0, 0, 0, 0.87);
    padding-right: 8px !important;
    padding-left: 8px !important;
    box-shadow: 1px 0 5px rgba(0, 0, 0, 0.1);
  }

  .v-breadcrumbs {
    padding-left: 0;
  }
}
</style>
