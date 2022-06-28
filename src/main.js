import Vue from 'vue'
import App from './App.vue'
import vuetify from "@/plugins/vuetify";
import router from "./router";
import axios from 'axios';
import jsPDF from 'jspdf';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'


Vue.config.productionTip = false
//https://jalanjalansaja.com/ajr_api/api
Vue.prototype.$http = axios;
Vue.prototype.$api = 'https://jalanjalansaja.com/ajr_api/api';
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

new Vue({
  vuetify,
  router,
  jsPDF,
  render: h => h(App),
}).$mount('#app')
