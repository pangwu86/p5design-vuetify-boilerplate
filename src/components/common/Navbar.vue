<template>
  <v-app-bar color="primary" dark dense app>
    <v-btn icon v-if="leftIcon" @click="onClickLeftIcon">
      <v-icon>{{ leftIcon }}</v-icon>
    </v-btn>
    <v-toolbar-title
      ><v-img :src="logo" width="30px" height="30px" v-if="logo" class="title-logo"></v-img><span class="title-content">{{ title }}</span></v-toolbar-title
    >
    <v-spacer></v-spacer>
    <template v-for="btn in navBtns">
      <v-btn :icon="btn.icon ? true : false" :text="btn.icon ? false : true" :key="btn.name" @click="btn.onClick" v-if="!btn.menu">
        <v-icon v-if="btn.icon">{{ btn.icon }}</v-icon>
        <span v-else>{{ btn.name }}</span>
      </v-btn>
      <v-menu offset-y v-else :key="btn.name">
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" icon>
            <v-icon>{{ btn.icon }}</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="mbtn in btn.menu" :key="mbtn.name" @click="mbtn.onClick">
            <v-list-item-icon v-if="mbtn.icon" class="nav-menu-icon">
              <v-icon v-text="mbtn.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ mbtn.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-app-bar>
</template>

<script>
export default {
  props: {
    title: {
      default: "页面标题"
    },
    logo: {
      default: ""
    },
    leftIcon: {
      default: "mdi-arrow-left"
    },
    onLeftIcon: {
      type: Function
    },
    navBtns: {
      type: Array
    }
  },
  methods: {
    onClickLeftIcon() {
      if (this.onLeftIcon) {
        this.onLeftIcon();
      } else {
        this.backPage();
      }
    },
    backPage() {
      if (window.history.length <= 1) {
        this.$router.push("/home");
      } else {
        this.$router.go(-1);
      }
    }
  }
};
</script>

<style lang="scss">
.title-logo {
  display: inline-block;
  vertical-align: top;
  border-radius: 50%;
  margin-right: 8px;
}
.title-content {
  vertical-align: top;
}
.nav-menu-icon {
  &.v-list-item__icon {
    margin-right: 16px !important;
  }
}
</style>
