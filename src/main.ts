import Vue from 'vue';
import App from '@/views/App.vue';
import router  from '@/plugins/router';
import vuetify from '@/plugins/vuetify';
import dateFilter  from '@/filters/date';
import authorFio from '@/filters/authorFio';
import complaintNumber from '@/filters/complaintNumber';

import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css';

Vue.config.productionTip = false;

Vue.filter('date', dateFilter);
Vue.filter('authorFio', authorFio);
Vue.filter('complaintNumber', complaintNumber);

new Vue({
  router,
  vuetify,
  render: (h) => h(App)
}).$mount('#app');
