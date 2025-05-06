import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {

  const users = ref([])
  const currentUser = ref(null)
  const isAuthenticated = ref(false)

  const loggedIn = computed(() => isAuthenticated.value)
  const userInfo = computed(() => currentUser.value)
  
  function registerUser(email, password) {
    const existingUser = users.value.find(user => user.email === email)
    
    if (existingUser) {
      return { success: false, message: 'Email already registered' }
    }
    
    const newUser = {
      id: Date.now().toString(),
      email,
      password
    }
    
    users.value.push(newUser)
    
    return { success: true, message: 'Registration successful' }
  }
  
  function login(email, password) {
    const user = users.value.find(user => user.email === email)

    if (user && user.password === password) {
      currentUser.value = {
        id: user.id,
        email: user.email
      }
      isAuthenticated.value = true
      
      return { success: true, message: 'Login successful' }
    }
    
    return { success: false, message: 'Invalid email or password' }
  }
  
  function logout() {
    currentUser.value = null
    isAuthenticated.value = false
  }
  
  return { 
    users, 
    currentUser, 
    isAuthenticated, 
    loggedIn, 
    userInfo, 
    registerUser, 
    login, 
    logout 
  }
})