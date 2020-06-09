<template>
  <v-app id="inspire">
    <v-content class="primary">
      <v-container class="fill-height" fluid>
        <!-- 模拟登录部分 -->
        <div class="mock-login-btn" @click="tryMockLogin"></div>
        <common-prompt
          title="模拟登录"
          content="请输入用户ID"
          :show="mockLoginWin"
          :on-confirm="doMockLogin"
          :on-cancel="
            () => {
              mockLoginWin = false;
            }
          "
        ></common-prompt>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="5" lg="4">
            <v-card class="elevation-12 py-4 px-4">
              <div class="company-logo">
                <img class="logo-img" :src="imgLogo" />
                <!-- <div class="tip-txt">公司人员登陆入口</div> -->
              </div>
              <v-card-text>
                <v-form v-if="!showUser" ref="form" v-model="valid" lazy-validation>
                  <v-text-field label="登录名" v-model="loginForm.name" type="text" :rules="vaildRules.notEmpty" outlined clearable></v-text-field>
                  <v-text-field label="密码" v-model="loginForm.passwd" type="password" :rules="vaildRules.notEmpty" outlined clearable></v-text-field>
                  <v-btn color="primary" block x-large :loading="ingLogin" @click="loginByPasswd">登录</v-btn>
                </v-form>
                <v-row align="center" justify="center" v-if="showUser">
                  <v-col cols="12" align="center" justify="center">
                    <v-avatar size="90" color="#e9e9e9">
                      <img :src="$api.avatarMy(avatar)" alt />
                    </v-avatar>
                  </v-col>
                  <v-col cols="12" align="center" justify="center">
                    <div class="title font-weight-bold">{{ name }}</div>
                  </v-col>
                  <v-col class="subtitle-1 text-center" cols="12">
                    {{ initTip }}
                  </v-col>
                  <v-col cols="6">
                    <v-progress-linear color="primary accent-4" indeterminate rounded height="4"></v-progress-linear>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import imgLogo from "@/assets/logo_login.png";
import { vaildRules } from "@/utils/validate";
import { initRouter } from "@/permission";
import { mapGetters } from "vuex";
let isDebug = process.env.NODE_ENV === "development";

export default {
  components: {},
  data() {
    return {
      imgLogo: imgLogo,
      ingLogin: false,
      loginForm: {
        name: "",
        passwd: ""
      },
      valid: true,
      vaildRules: vaildRules,
      showUser: false,
      initTip: "登录中...",
      initDu: 250,
      // 模拟登陆
      tryNum: 1,
      mockLoginWin: false
    };
  },
  computed: {
    ...mapGetters(["avatar", "name", "role"])
  },
  watch: {
    showUser(val) {
      if (val) {
        this.initApp();
      }
    }
  },
  methods: {
    // 模拟登陆
    tryMockLogin() {
      if (this.tryNum < window._mock_try_) {
        this.tryNum++;
      } else {
        this.mockLoginWin = true;
      }
    },
    doMockLogin(uid) {
      this.mockLoginWin = false;
      this.loginByUid(uid);
    },
    loginByUid(uid) {
      this.ingLogin = true;
      uid = uid || window._mock_uid_;
      this.$store.dispatch("user/loginByUserId", uid).then(data => {
        this.ingLogin = false;
        if (data.token) {
          this.showUser = true;
        }
      });
    },
    // 密码登陆
    loginByPasswd() {
      if (this.$refs.form.validate()) {
        this.ingLogin = true;
        this.$store.dispatch("user/loginByPasswd", this.loginForm).then(data => {
          this.ingLogin = false;
          if (data.token) {
            this.showUser = true;
          }
        });
      }
    },
    // 系统初始化
    async initApp() {
      let initDu = this.initDu;

      this.initTip = "加载系统配置...";
      await this.$store.dispatch("sys/loadSetup");
      await this.$timeout(initDu);

      this.initTip = "加载用户信息...";
      await this.$store.dispatch("sys/loadAccounts");
      await this.$timeout(initDu);

      console.log("load-role");

      this.initTip = "加载角色信息...";
      await this.$store.dispatch("sys/loadRoles");
      await this.$timeout(10);
      let roleConf = await this.$store.dispatch("sys/getRole", this.role);
      await this.$store.dispatch("user/setUserRole", roleConf);
      await this.$timeout(initDu);

      this.initTip = "加载用户侧边栏...";
      let sidemenu = await this.$store.dispatch("sys/getSidemenu", roleConf.actions);
      await this.$store.dispatch("user/setSidemenu", sidemenu);
      await this.$timeout(initDu);

      this.initTip = "初始化路由...";
      await initRouter();
      await this.$timeout(initDu);

      this.initTip = "跳转主界面...";
      this.$router.push("/dashboard/index");
    }
  },
  mounted() {
    let uid = this.$route.query.uid || "";
    if (uid) {
      this.loginByUid(uid);
    } else {
      // debug环境，自动填写用户名密码
      if (isDebug) {
        this.loginForm.name = "zhangsan@anju.com";
        this.loginForm.passwd = "123456";
      }
    }
  }
};
</script>

<style lang="scss">
.mock-login-btn {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100px;
}

.login-btn {
  height: 90px !important;
  width: 90px !important;
}

.company-logo {
  width: 300px;
  margin: 0px auto;
  padding: 20px 0 30px;
  box-sizing: content-box;

  .logo-img {
    display: block;
  }

  .tip-txt {
    text-align: center;
    margin-top: 10px;
    font-size: 18px;
    font-weight: 600;
  }
}
</style>
