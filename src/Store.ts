import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {

  const users = ref<Array<{id: string, email: string, password: string}>>([])
  const currentUser = ref<{id: string, email: string} | null>(null)
  const isAuthenticated = ref<boolean>(false)
  
  const registerUser = (email: string, password: string): { success: boolean, message: string } => {
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
  
  const login = (email: string, password: string): { success: boolean, message: string } => {
    const user = users.value.find(user => user.email === email)

    if (user?.password === password) {
      currentUser.value = {
        id: user.id,
        email: user.email
      }
      isAuthenticated.value = true
      
      return { success: true, message: 'Login successful' }
    }
    
    return { success: false, message: 'Invalid email or password' }
  }
  
  const logout = (): void => {
    currentUser.value = null
    isAuthenticated.value = false
  }
  
  return { 
    users, 
    currentUser, 
    isAuthenticated, 
    registerUser, 
    login, 
    logout 
  }
})