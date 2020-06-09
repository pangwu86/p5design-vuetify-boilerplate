<template>
  <div id="app">
    <!-- 提示 -->
    <common-alert :title="globalAlert.title" :content="globalAlert.content" :show="globalAlert.show" :cancel-txt="globalAlert.cancelTxt" :on-confirm="globalAlert.onConfirm"></common-alert>
    <!-- 确认 -->
    <common-confirm :title="globalConfirm.title" :content="globalConfirm.content" :show="globalConfirm.show" :on-confirm="globalConfirm.onConfirm" :on-cancel="globalConfirm.onCancel"></common-confirm>
    <!-- 页面内容 -->
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from "vue";
import { setSite } from "@/utils/auth";
export default {
  name: "App",
  data() {
    return {
      globalAlert: {
        title: "提示",
        content: "",
        show: false,
        cancelTxt: "",
        onConfirm: null
      },
      globalConfirm: {
        title: "提示",
        content: "",
        show: false,
        cancelTxt: "",
        onCancel: null,
        onConfirm: null
      }
    };
  },
  methods: {
    getSite() {
      this.$api.authSite().then(data => {
        let siteId = data.id;
        setSite(siteId);
      });
    }
  },
  beforeMount() {
    this.getSite();
  },
  mounted() {
    let self = this;

    let $dialog = {};
    Vue.prototype.$dialog = $dialog;
    window.$dialog = $dialog;

    // // 默认Alert
    $dialog.alert = function(content) {
      let promise = new Promise(resolve => {
        self.globalAlert.content = content;
        self.globalAlert.onConfirm = function() {
          self.globalAlert.show = false;
          resolve();
        };
        self.globalAlert.show = true;
      });
      return promise;
    };

    // 默认confirm
    $dialog.confirm = function(content) {
      let promise = new Promise((resolve, reject) => {
        self.globalAlert.content = content;
        self.globalAlert.onConfirm = function() {
          self.globalAlert.show = false;
          resolve();
        };
        self.globalAlert.onCancel = function() {
          self.globalAlert.show = false;
          reject();
        };
        self.globalAlert.show = true;
      });
      return promise;
    };

    // 退出当前用户
    window.$logout = function() {
      self.$gset("token", null);
      self.$gset("token_expi", null);
      self.$gset("user_info", null);
      self.$gset("user_id", null);
      self.$router.push("/");
    };
  }
};
</script>

<style lang="scss">
.page {
  height: 100%;
  background: #eef5f9;
}
.page-content {
  height: 100%;
  background: #eef5f9;
  display: flex;
}
.loading-data,
.no-data {
  text-align: center;
  font-weight: lighter;
  padding: 0.75rem 0 1.8rem 0;
  font-size: 1rem;
}
.footer-placeholder {
  height: 40px;
}

.user-avatar {
  background: #eee;
}

.search-input {
  .v-text-field__details {
    display: none;
  }
}

.modal-card {
  width: 95vw;
  height: 90vh;
  position: relative;
  padding-top: 64px;
  .v-card__title {
    position: absolute;
    top: 0;
    width: 100%;
    background: #fff;
  }
  .v-card__text {
    overflow: auto;
    height: 100%;
  }
}

.no-padding-x {
  padding-left: 0 !important;
  padding-right: 0 !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fab-btn {
  position: relative;
}
.fab-btn-tip {
  position: absolute;
  right: 50px;
  color: #fff;
  background: rgba(0, 0, 0, 0.75);
  padding: 4px 10px;
  border-radius: 10px;
}

// .v-menu__content {
//   min-width: auto !important;
// }
</style>
