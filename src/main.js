import { createApp } from 'vue'
import './app.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import InputTablesPage from './pages/InputTablesPage.vue'
import ForcastPage from './pages/ForcastPage.vue'

const routes = [
    { path: '/', component: InputTablesPage },
    { path: '/forecast', component: ForcastPage },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

createApp(App).use(router).mount('#app')
