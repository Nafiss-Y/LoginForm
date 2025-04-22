<template>
<div class="home-container">
    <h1>Get Started</h1>
    <div class="nav-buttons">
    <button class="buttons" @click="navigateTo('/login')">Login</button>
    <button class="buttons" @click="navigateTo('/register')">Register</button>
    </div>
</div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateTo = (path: string) => {
router.push(path);
};
</script>

<style scoped>
.home-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.nav-buttons {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}
.buttons{
    padding: 10px 20px;
    background-color: #3b8fe9;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}
.buttons:hover {
    background-color: #09478a;
}
</style>