<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <div class="app-wrapper">
    <transition name="fade" mode="out-in">
      <RouterView />
    </transition>
  </div>
</template>

<style scoped>
.app-wrapper {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.7s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>