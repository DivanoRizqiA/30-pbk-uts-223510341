<template>
    <main class="app">
      <div>
        <h2>Posts</h2>
        <label for="userSelect">Pilih Pengguna: </label>
        <select id="userSelect" v-model="selectedUser" @change="handleUserChange">
          <option value="">Semua Pengguna</option>
          <option v-for="user in users" :value="user.id" :key="user.id">{{ user.name }}</option>
        </select>
        <template v-if="selectedUser || !selectedUser && users.length === 0">
          <h3 style="color: orange;">Pengguna: {{ getUser(selectedUser).name }}</h3>
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Pengguna</th>
                <th>ID</th>
                <th>Judul</th>
                <th>Isi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="post in userPostsByUser(selectedUser)" :key="post.id">
                <td>{{ post.userId }}</td>
                <td>{{ getUser(post.userId).name }}</td>
                <td>{{ post.id }}</td>
                <td>{{ post.title }}</td>
                <td>{{ post.body }}</td>
              </tr>
            </tbody>
          </table>
        </template>
  
        <template v-else>
          <template v-for="user in users">
            <br><br>
            <table>
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Pengguna</th>
                  <th>ID</th>
                  <th>Judul</th>
                  <th>Isi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="post in userPostsByUser(user.id)" :key="post.id">
                  <td>{{ post.userId }}</td>
                  <td>{{ user.name }}</td>
                  <td>{{ post.id }}</td>
                  <td>{{ post.title }}</td>
                  <td>{{ post.body }}</td>
                </tr>
              </tbody>
            </table>
          </template>
        </template>
      </div>
      <div>
        <footer class="">
          <slot name="footer"></slot>
        </footer>
      </div>
    </main>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from "vue";
  const props = defineProps({
    selectedComponent: String
  });
  const emit = defineEmits(['user-changed']);
  const selectedUser = ref(null);
  const userPosts = ref([]);
  const fetchUserPosts = async () => {
    try {
      let url = 'https://jsonplaceholder.typicode.com/posts';
      if (selectedUser.value) {
        url += `?userId=${selectedUser.value}`;
      } else if (window.location.search) {
        const params = new URLSearchParams(window.location.search);
        const userId = params.get('userId');
        if (userId) {
          url += `?userId=${userId}`;
        }
      }
      const response = await fetch(url);
      userPosts.value = await response.json();
    } catch (error) {
      console.error('Error fetching user posts:', error);
    }
  };
  
  const users = ref([]);
  const fetchUsers = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      users.value = await response.json();
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  const getUser = userId => {
    return users.value.find(user => user.id === userId) || { name: 'Unknown' };
  };
  const userPostsByUser = userId => {
    if (!userId) {
      return userPosts.value;
    }
    return userPosts.value.filter(post => post.userId === userId);
  };
  const handleUserChange = () => {
    emit('user-changed', selectedUser.value);
    fetchUserPosts();
  };
  onMounted(() => {
    fetchUsers();
    fetchUserPosts();
  });
  </script>
  
  <style>
  @import '../main.css';
  @import '../style.css';
</style>