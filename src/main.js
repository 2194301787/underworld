import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'nprogress/nprogress.css'
import App from './App.vue'
import router from './router'
import store from './store'
import utils from './utils'
import echarts from 'echarts'
import LuckDraw from 'vue-luck-draw'


Vue.prototype.$echarts = echarts
Vue.prototype.$utils = utils
Vue.use(LuckDraw)
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
