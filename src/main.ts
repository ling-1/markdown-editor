import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'mavon-editor/dist/css/index.css'
import mavonEditor from 'mavon-editor'

createApp(App).use(mavonEditor).use(store).use(router).mount('#app')
