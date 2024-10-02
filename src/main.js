import { createApp } from 'vue'
import './app.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import MainPage from './pages/MainPage.vue'
import AboutPage from './pages/AboutPage.vue'
import MemoryPage from './pages/MemoryPage.vue'

const routes = [
    { path: '/', component: MainPage },
    { path: '/memory', component: MemoryPage },
    { path: '/about', component: AboutPage },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

const app = createApp(App).use(router).mount('#app')