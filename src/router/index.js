import { createRouter, createWebHistory } from 'vue-router'
import TodoList from '../components/Todo.vue'
import PostList from '../components/Post.vue'
import AlbumList from '../components/AlbumList.vue'
import AlbumDetails from '../components/AlbumDetail.vue'


const routes = [
  { path: '/', redirect: '/home' },
  { path: '/todos', component: TodoList },
  { path: '/posts', component: PostList },
  { path: '/albums', component: AlbumList },
  { path: '/albums/:id', component: AlbumDetails }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router