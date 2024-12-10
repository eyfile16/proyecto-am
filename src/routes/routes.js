import Articulos from '../components/Articulos.vue'
import Categorias from '../components/Categorias.vue'
import Usuarios from '../components/Usuarios.vue'
import Movimientos from '../components/Movimientos.vue'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import Terceros from '../components/Terceros.vue'

import { createRouter, createWebHashHistory } from 'vue-router'


const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login

    },
    {
        path: '/Articulos',
        name: 'Articulos',
        component: Articulos
    },
    {
        path: '/Categorias',
        name: 'Categorias',
        component: Categorias
    },
    {
        path: '/Movimientos',
        name: 'Movimientos',
        component: Movimientos
    },
    {
        path: '/Usuarios',
        name: 'Usuarios',
        component: Usuarios
    },
    {
        path: '/Terceros',
        name: 'Terceros',
        component: Terceros
    },
    {
        path: '/Home',
        name: 'Home',
        component: Home,
        children: [
            
        ]
    }
]
export const router = createRouter({
    history: createWebHashHistory(),
    routes
})