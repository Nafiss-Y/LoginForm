import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {

  state: () => ({
    users: [], 
    currentUser: null, 
    isAuthenticated: false
  }),
  
  getters: {
    loggedIn: (state) => state.isAuthenticated,
    userInfo: (state) => state.currentUser
  },
  
  actions: {
    registerUser(email, password) {
      const existingUser = this.users.find(user => user.email === email)
      
      if (existingUser) {
        return { success: false, message: 'Email already registered' }
      }
      
      const newUser = {
        id: Date.now().toString(),
        email,
        password
      }
      
      this.users.push(newUser)
      
      return { success: true, message: 'Registration successful' }
    },
    
    login(email, password) {
      const user = this.users.find(user => user.email === email)

      if (user && user.password === password) {
        this.currentUser = {
          id: user.id,
          email: user.email
        }
        this.isAuthenticated = true
        
        return { success: true, message: 'Login successful' }
      }
      
      return { success: false, message: 'Invalid email or password' }
    },
    
    logout() {
      this.currentUser = null
      this.isAuthenticated = false
    }
  }
})