<template>
    <div>
      <h2 style="color: green; text-align: center; font-weight: bold;">Albums</h2>
      <div v-if="albums.length">
        <table class="album-table">
          <tbody>
            <tr v-for="album in albums" :key="album.id" @click="viewAlbum(album.id)" class="album-item" style="cursor: pointer;">
              <td class="album-id">{{ album.id }}</td>
              <td class="album-title">{{ album.title }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else style="text-align: center; margin-top: 20px;">
        <p>No albums available.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useAlbumsStore } from '../stores/album'
  import { useRouter } from 'vue-router'
  
  const albumsStore = useAlbumsStore()
  const albums = ref([])
  const router = useRouter()
  
  const fetchAlbums = async () => {
    await albumsStore.fetchAlbums()
    albums.value = albumsStore.albums
  }
  
  const viewAlbum = (id) => {
    router.push(`/albums/${id}`)
  }
  
  onMounted(fetchAlbums)
  </script>
  
  <style>
  .album-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 10px;
  }
  
  .album-item {
    transition: background-color 0.3s, color 0.3s;
  }
  
  .album-item:hover {
    background-color:green;
    color: white;
  }
  
  .album-id, .album-title {
    padding: 10px;
    border: 1px solid green;
  }
  
  .album-id {
    font-weight: bold;
  }
  
  .album-title {
    font-family: 'Arial', sans-serif; 
  }
  </style>