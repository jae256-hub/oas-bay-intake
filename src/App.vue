<script setup>
import {useRoute} from 'vue-router';
const route = useRoute();
</script>

<template>
 <div>
  <nav v-if="route.name !== 'Login'" class="navbar navbar-expand bg-light border-bottom px-3">
    <ul class="navbar-nav">
      <li class="nav-item">
        <RouterLink class="nav-link" to="/intake">Intake</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink class="nav-link" to="/bays">Bay Board</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink class="nav-link" to="/parts">Parts</RouterLink>
      </li>
    </ul>
  </nav>
  <router-view/>
 </div>
</template>

<style>
body{
  background-color:#f4f6f9;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
.stat-card{
  border:none;
  border-radius: 10px;
  transition: transform 0.2s ease;
}
.stat-card:hover{
  transform: translateY(-3px);
}
.badge-vehicle{
  font-size:0.8rem;
}
</style>