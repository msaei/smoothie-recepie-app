import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import AddRecepie from '@/components/AddRecepie'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'Index',
            component: Index
        },
        {
            path: '/add-recepie',
            name: 'AddRecepie',
            component: AddRecepie
        }
    ]
})