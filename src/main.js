import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueSweetalert2 from 'vue-sweetalert2'
import axios from 'axios'

import 'sweetalert2/dist/sweetalert2.min.css';
// import './assets/main.css'
import '../src/assets/css/bootstrap.min.css';
import '../src/assets/js/bootstrap.min.js';

axios.defaults.baseURL ="http://127.0.0.1:8000/api"

const app = createApp(App)

app.use(router)
app.use(VueSweetalert2)

app.mount('#app')
