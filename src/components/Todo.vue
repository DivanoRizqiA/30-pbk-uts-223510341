<template>
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
  
      <div class="filter-section">
        <button @click="filterShowAll">Semua</button>
        <button @click="filterShowCompleted">Sudah Selesai</button>
        <button @click="filterShowPending">Belum Selesai</button>
      </div>
        <footer>
      <slot name="footer"></slot>
    </footer>
    </main>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from "vue";
  const props = defineProps({
    selectedComponent: String
  });
  const todos = ref([]);
  const text = ref("");
  const showAll = ref(true);
  const showCompleted = ref(false);
  const showPending = ref(false);
  const addTodo = () => {
    if (text.value.trim() === "") return;
    
    todos.value.unshift({
      id: Date.now(),
      todo: text.value,
      done: false,
    });
    text.value = "";
  };
  const deleteTodo = (todo) => {
    todos.value = todos.value.filter((x) => x !== todo);
  };
  
  onMounted(() => {
    todos.value = JSON.parse(localStorage.getItem("todos")) || [];
  });
  
  const filteredTodos = computed(() => {
    if (showAll.value) return todos.value;
    if (showCompleted.value) return todos.value.filter(todo => todo.done);
    if (showPending.value) return todos.value.filter(todo => !todo.done);
  });
  const filterShowAll = () => {
    showAll.value = true;
    showCompleted.value = false;
    showPending.value = false;
  };
  const filterShowCompleted = () => {
    showAll.value = false;
    showCompleted.value = true;
    showPending.value = false;
  };
  const filterShowPending = () => {
    showAll.value = false;
    showCompleted.value = false;
    showPending.value = true;
  };
  </script>
  