import { createApp } from 'vue'
import { i18n } from './lang';
import './style.css'
// import 'ramp-pcar/dist/ramp.css';
import App from './App.vue'

createApp(App).use(i18n).mount('#app')
