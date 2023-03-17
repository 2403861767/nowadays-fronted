import {createApp} from 'vue'
import App from './App.vue'
import './assets/global.css'
import router from "./config/route";
import 'vant/es/toast/style';
import Vant from 'vant';
import Varlet from '@varlet/ui'
import '@varlet/ui/es/style'
import 'vant/lib/index.css';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)


app.use(ElementPlus)
app.use(Vant)
app.use(Varlet)
app.use(router)

app.mount('#app')
