<template>
<div class="dashboard-container">
    <div class="user-profile">
    <h1>Welcome to Your Dashboard</h1>
    <div class="user-info">
        <div class="user-avatar">
        <div class="avatar-circle">
            {{ userInitial }}
        </div>
        </div>
        <div class="user-details">
        <h2>{{ userStore.currentUser.email }}</h2>
        <p>User ID: {{ userStore.currentUser.id }}</p>
        <p>Last login: {{ currentDate }}</p>
        </div>
    </div>
    
    <div class="dashboard-actions">
        <button @click="handleLogout" class="logout-button">Logout</button>
    </div>
    </div>
</div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useUserStore } from '../Store.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()
const currentDate = ref(new Date().toLocaleString())

onMounted(() => {
if (!userStore.isAuthenticated) {
    router.push('/login')
}
})


const userInitial = computed(() => {
if (userStore.currentUser?.email) {
    return userStore.currentUser.email[0].toUpperCase()
}
return '?'
})

const handleLogout = () => {
    router.push('/login').then(() => {
    userStore.logout()
    })
}
</script>

<style scoped>
.dashboard-container {
width: 600px;
margin: 2rem auto;
padding: 2rem;
background: #ffffff;
border-radius: 8px;
box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.user-profile {
display: flex;
flex-direction: column;
}

.user-info {
display: flex;
align-items: center;
margin: 1rem 0 2rem;
padding: 1.5rem;
background: #f9f9f9;
border-radius: 8px;
}

.avatar-circle {
width: 80px;
height: 80px;
border-radius: 50%;
background-color: #646cff;
color: white;
display: flex;
align-items: center;
justify-content: center;
font-size: 2.5rem;
font-weight: 600;
}

.user-details {
margin-left: 2rem;
}

.user-details h2 {
margin-bottom: 0.5rem;
color: #1a1a1a;
}

.user-details p {
color: #555;
margin: 0.5rem 0;
}

.dashboard-actions {
margin-top: 2rem;
display: flex;
justify-content: flex-end;
}

.logout-button {
padding: 0.75rem 1.5rem;
background-color: #ce4249;
color: white;
border: none;
border-radius: 4px;
font-size: 1rem;
cursor: pointer;
transition: background-color 0.3s ease;
}

.logout-button:hover {
background-color: #b32a2f;
}
</style>