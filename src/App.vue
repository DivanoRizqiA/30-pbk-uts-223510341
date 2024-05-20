<template>
  <div>
    <button @click="setSelectedComponent('todo')">Tampilkan Daftar Kegiatan</button>
    <button @click="setSelectedComponent('post')">Tampilkan Posting</button>

    <Todo  v-if="selectedComponent === 'todo'" :selectedComponent="selectedComponent" />
    <Post v-if="selectedComponent === 'post'" :selectedComponent="selectedComponent" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Todo from './components/Todo.vue';
import Post from './components/Post.vue';

const selectedComponent = ref('todo');
const setSelectedComponent = (component) => {
  selectedComponent.value = component;
};
</script>
