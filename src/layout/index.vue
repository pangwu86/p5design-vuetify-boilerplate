<template>
  <v-app>
    <!-- 顶部菜单 -->
    <v-app-bar color="primary" dark dense app>
      <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title
        ><v-img :src="imgNavLogo" width="30px" height="30px" v-if="imgNavLogo" class="title-logo"></v-img><span class="title-content">{{ pageTitle }}</span></v-toolbar-title
      >
      <v-spacer></v-spacer>
      <!-- 全屏 -->
      <v-btn icon @click="toggleScreenFull">
        <v-icon v-if="isFullscreen">mdi-fullscreen</v-icon>
        <v-icon v-else>mdi-fullscreen-exit</v-icon>
      </v-btn>
      <!-- 用户菜单 -->
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" icon>
            <v-avatar size="36">
              <img :src="$api.avatarMy(avatar)" :alt="name" />
            </v-avatar>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="menu in navMenu" :key="menu.text" @click="menu.onClick">
            <v-list-item-icon v-if="menu.icon" class="nav-menu-icon">
              <v-icon v-text="menu.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ menu.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <!-- sidebar -->
    <v-navigation-drawer app dense v-model="sidebar.opened">
      <!-- 用户信息 -->
      <v-row align="center" justify="start" class="user-bg py-8">
        <v-col cols="2" class="ml-4 mr-4" align="left" justify="center">
          <v-avatar size="50" color="#e9e9e9">
            <img :src="$api.avatarMy(avatar)" alt />
          </v-avatar>
        </v-col>
        <v-col align="left" justify="center">
          <div class="user-info">
            <div class="user-name title">{{ name }}</div>
            <div class="user-role subtitle-2">{{ roleText }}</div>
          </div>
        </v-col>
      </v-row>
      <!-- 分隔符 -->
      <v-divider></v-divider>

      <v-list>
        <div v-for="menu in sidemenu" :key="menu.text">
          <v-list-group :prepend-icon="menu.icon" no-action v-if="menu.children && menu.children.length > 0">
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title v-text="menu.text"></v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item v-for="subMenu in menu.children" :key="subMenu.text" :to="subMenu.to" v-show="subMenu.ok">
              <v-list-item-content>
                <v-list-item-title>{{ subMenu.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item v-else-if="menu.ok" :to="menu.to">
            <v-list-item-icon>
              <v-icon v-text="menu.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ menu.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-list>

      <!-- 相关按钮 -->
    </v-navigation-drawer>

    <!-- 中间内容 -->
    <router-view></router-view>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import screenfull from "screenfull";
import imgNavLogo from "@/assets/logo_navbar.jpg";

export default {
  data() {
    let self = this;
    return {
      imgNavLogo: imgNavLogo,
      pageTitle: "首页",
      isFullscreen: false,
      navMenu: [
        {
          text: "个人信息",
          icon: "mdi-account",
          onClick: self.toProfile
        },
        {
          text: "修改密码",
          icon: "mdi-onepassword",
          onClick: self.toResetpwd
        },
        {
          text: "退出",
          icon: "mdi-logout",
          onClick: self.toLogout
        }
      ],
      sideIdx: 1
    };
  },
  computed: {
    ...mapGetters(["avatar", "name", "roleText", "sidebar", "sidemenu"])
  },
  methods: {
    toggleScreenFull() {
      if (!screenfull.enabled) {
        this.$dialog.alert("抱歉，您的浏览器不支持该操作");
        return false;
      }
      screenfull.toggle();
    },
    toggleDrawer() {
      this.$store.dispatch("app/toggleSideBar");
    },
    toProfile() {},
    toLogout() {
      this.$store.dispatch("user/logout").then(() => {
        this.$router.replace("/");
      });
    },
    toResetpwd() {}
  },
  mounted() {
    let self = this;
    this.$bus.$on("pageTitle", function(title) {
      self.pageTitle = title;
    });
  },
  destroyed() {
    this.$bus.$off("pageTitle");
  }
};
</script>

<style lang="scss">
.user-bg {
  background-size: cover;
  background-image: url("../assets/user_bg.jpg");
}

.user-info {
  color: #fff;
}

.pwd-btn {
  font-size: 13px;
  text-align: center;
  text-decoration: underline;
}
</style>
