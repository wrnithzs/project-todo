import Vue from 'vue'
import VueRouter from 'vue-router'
import TodoList from '../components/TodoList.vue'
import Create from '../components/CreateTodo.vue'
import Edit from '../components/EditTodo.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'TodoList',
    component: TodoList
  },
  {
    path: '/create',
    name: 'Create',
    component: Create
  },
  {
    path: '/edit',
    name: 'Edit',
    component: Edit
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
