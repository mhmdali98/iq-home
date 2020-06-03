import Vue from 'vue'
import './plugins'
import App from './App'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from 'axios'
import VCharts from 'v-charts';
Vue.use(VCharts)
Vue.config.productionTip = false
axios.defaults.baseURL = process.env.VUE_APP_URL;
axios.defaults.headers.get['Accepts'] = 'application/json'
new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')