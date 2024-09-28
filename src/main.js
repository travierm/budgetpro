import { createApp } from 'vue'
import './app.css'
import App from './App.vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import InputTablesPage from './pages/InputTablesPage.vue'

const routes = [
    { path: '/', component: InputTablesPage },
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

createApp(App).use(router).mount('#app')
