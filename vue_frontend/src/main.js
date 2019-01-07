import Vue from "vue";
import App from "./App.vue";

import BootstrapVue from "bootstrap-vue";
import VueSocketIO from "vue-socket.io";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);
Vue.use(
  new VueSocketIO({
    debug: true,
    connection: "http://localhost:9090"
  })
);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
