  <template>
    <div>
      <button @click="selectedComponent = 'todo'">Tampilkan Daftar Kegiatan</button>
      <button @click="selectedComponent = 'post'">Tampilkan Posting</button>

      <template v-if="selectedComponent === 'todo'">
          <main class="app">
            <section class="greeting">
              <h3 class="title">Daftar Kegiatan</h3>
            </section>

            <div class="input-section">
              <section class="create-todo">
                <form @submit.prevent="addTodo">
                  <h3>Tambahkan Kegiatan🙂?</h3>
                  <input
                    type="text"
                    placeholder="Kegiatan"
                    v-model="text"
                  />

                  <input type="submit" value="Tambahkan" />
                </form>
              </section>
            </div>

            <div class="todo-section">
              <section class="todo-list">
                <h2 v-show="todos.length === 0">Belum ada kegiatan😞</h2>

                <div class="list">
                  <div
                    v-for="todo in filteredTodos"
                    :class="`todo-item ${todo.done && 'done'}`"
                    :key="todo.id"
                  >
                    <label>
                      <input type="checkbox" v-model="todo.done" />
                    </label>

                    <div class="todo-content">
                      <input type="text" v-model="todo.todo" />
                    </div>

                    <div class="actions">
                      <button class="delete" @click="deleteTodo(todo)">Delete</button>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <!-- Filter Section -->
            <div class="filter-section">
              <button @click="filterShowAll">Semua</button>
              <button @click="filterShowCompleted">Sudah Selesai</button>
              <button @click="filterShowPending">Belum Selesai</button>
            </div>
          </main>
      </template>

      <template v-if="selectedComponent === 'post'">
      <main class="app">
        <div>
          <h2>Posts</h2>
          <label for="userSelect">Pilih Pengguna: </label>
          <select id="userSelect" v-model="selectedUser" @change="fetchUserPosts">
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
                  <td>{{ post.postId }}</td>
                  <td>{{ post.title }}</td>
                  <td>{{ post.body }}</td>
                </tr>
              </tbody>
            </table>
          </template>

          <template v-else>
            <template v-for="user in users"><br><br>
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
                    <td>{{ post.postId }}</td>
                    <td>{{ post.title }}</td>
                    <td>{{ post.body }}</td>
                  </tr>
                </tbody>
              </table>
            </template>
          </template>
        </div>
      </main>
    </template>





    </div>
  </template>

  <script setup>
  import { ref, onMounted, computed } from "vue";

  const selectedComponent = ref('todo'); // Default menampilkan komponen todo
  const todos = ref([]);
  const text = ref("");
  const showAll = ref(true);
  const showCompleted = ref(false);
  const showPending = ref(false);

  const addTodo = () => {
    if (text.value.trim() === "") {
      return;
    }

    todos.value.unshift({
      id: Date.now(),
      todo: text.value,
      done: false,
    });

    text.value = "";
  }

  const deleteTodo = (todo) => {
    todos.value = todos.value.filter((x) => x !== todo);
  }

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
    const fetchedPosts = await response.json();
    userPosts.value = fetchedPosts.map(post => ({
      userId: post.userId,
      id: post.id,
      title: post.title,
      body: post.body,
      postId: post.id,
      userId: post.userId 
    }));
    console.log('User posts:', userPosts.value);
  } catch (error) {
    console.error('Error fetching user posts:', error);
  }
};


  onMounted(() => {
    todos.value = JSON.parse(localStorage.getItem("todos")) || [];
  });

  const filteredTodos = computed(() => {
    if (showAll.value) {
      return todos.value;
    } else if (showCompleted.value) {
      return todos.value.filter(todo => todo.done);
    } else if (showPending.value) {
      return todos.value.filter(todo => !todo.done);
    }
  });

  const filterShowAll = () => {
    showAll.value = true;
    showCompleted.value = false;
    showPending.value = false;
  }

  const filterShowCompleted = () => {
    showAll.value = false;
    showCompleted.value = true;
    showPending.value = false;
  }

  const filterShowPending = () => {
    showAll.value = false;
    showCompleted.value = false;
    showPending.value = true;
  }

  const users = ref([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      users.value = await response.json();
      console.log('Fetched users:', users.value);
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

  onMounted(() => {
    fetchUsers();
  });

  </script>

