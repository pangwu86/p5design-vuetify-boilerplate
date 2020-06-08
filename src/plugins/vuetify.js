import Vue from "vue";
import Vuetify from "vuetify/lib";
// import zhHans from "vuetify/es5/locale/zh-Hans";

Vue.use(Vuetify);

import zhHans from "vuetify/es5/locale/zh-Hans";

export default new Vuetify({
  lang: {
    locales: { zhHans },
    current: "zhHans"
  },
  theme: {
    themes: {
      light: {
        primary: "#3c3a60",
        secondary: "#b0bec5",
        accent: "#8c9eff",
        error: "#b71c1c"
      }
    }
  }
});
