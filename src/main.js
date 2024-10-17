import { createApp } from 'vue'
import './app.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import MainPage from './pages/MainPage.vue'
import AboutPage from './pages/AboutPage.vue'
import MemoryPage from './pages/MemoryPage.vue'
import './lib/appData'
import { useReactiveState } from './lib/localStorage'

const routes = [
    { path: '/', component: MainPage },
    { path: '/:index', component: MainPage },
    { path: '/memory', component: MemoryPage },
    { path: '/about', component: AboutPage },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

const currentRevision = useReactiveState('CURRENT_REVISION', 0)
router.beforeEach((to, from, next) => {
    if (to.path === '/') {
        currentRevision.value = 0
    }

    if (to.params.index !== undefined) {
        currentRevision.value = to.params.index
    }

    next()
})

const app = createApp(App).use(router).mount('#app')