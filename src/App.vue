<template>
  <div>
    <header class="header">
      <nav class="menu">
        <ul>
          <li><router-link to="/todos">Todos</router-link></li>
          <li><router-link to="/posts">Posts</router-link></li>
          <li><router-link to="/albums">Albums</router-link></li>
        </ul>
      </nav>
    </header>
    <router-view></router-view>
  </div>
</template>

<style>
@import './main.css';
@import './style.css';
</style>
