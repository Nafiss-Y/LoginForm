<template>
    <div class="login-container">
      <div v-if="!isRegistered">
        <h2 class="login-title">Register</h2>
        <p>Create your account</p>
        <form @submit.prevent="handleSubmit" class="login-form">
          <div v-if="error" class="error-message">
            <p :style="{ color: 'red', fontSize:'small'}">{{ error }}</p>
          </div>
          <div class="form-group">
            <input
              type="email"
              id="email"
              v-model="email"
              @input="validateEmail"
              class="form-input"
              placeholder="Email"
              required
            />
            <input
              type="password"
              id="password"
              @input="validatePassword"
              v-model="password"
              class="form-input"
              placeholder="Password"
              required
            />
            <input
              type="password"
              id="confirmPassword"
              v-model="confirmPassword"
              @input="validateConfirmPassword"
              class="form-input"
              placeholder="Confirm Password"
              required
            />
          </div>
  
          <button type="submit" class="submit-button">Register</button>
        </form>
  
        <div class="register-section">
          <span>Already have an account? </span>
          <RouterLink to="/login" class="register-link">Login</RouterLink>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { RouterLink, useRouter  } from 'vue-router'
  import { useUserStore } from '../Store.js'
  

  const router = useRouter();
  const userStore = useUserStore();

  const email = ref('');
  const password = ref('');
  const confirmPassword = ref('');
  const error = ref('');
  const isRegistered = ref(false);
  
  const logout = () => {
    isRegistered.value = false;
    email.value = '';
    password.value = '';
    confirmPassword.value = '';
    error.value = '';
  }
  
  const validateEmail = () => {
    const emailForm = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailForm.test(email.value)) {
      error.value = 'Invalid email format!';
    } else {
      error.value = '';
    }
  };
  
  const validatePassword = () => {
    if (password.value.length < 8) {
      error.value = 'Password must be at least 8 characters long!';
    } else {
      error.value = '';
    }
  };
  
  const validateConfirmPassword = () => {
    if (password.value !== confirmPassword.value) {
      error.value = 'Passwords do not match!';
    } else {
      error.value = '';
    }
  };
  
  const handleSubmit = () => {
    error.value = '';
    
    if (!email.value || !password.value || !confirmPassword.value) {
      error.value = 'All fields are required';
      return;
    }
    
    if (password.value !== confirmPassword.value) {
      error.value = 'Passwords do not match!';
      return;
    }
    
    if (password.value.length < 8) {
      error.value = 'Password must be at least 8 characters long!';
      return;
    }
    
    const result = userStore.registerUser(email.value, password.value);
  
    if (result.success){
      router.push({ 
        path: '/login', 
        query: { registered: 'success' }
      });
    }
    else 
      error.value = result.message;
  }
  </script>


<style scoped>

.login-container {
  width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.login-title {
  text-align: start;
  color: #1a1a1a;
  font-weight: 600;
}

p{
  text-align: start;
  color: #4a4a4a;
  font-size: large;
}
.forgot-password{
  width: 100%;
  text-decoration: none;
  color: #646cff;
}
.forgot-password:hover {
  text-decoration: underline;
}
.form-group {
  margin-bottom: 1.5rem;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.form-input {
  width: 90%;
  height: 2.5rem;
  padding: 0.8rem;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  margin-bottom: 2rem;
  color: black;
  background: white;
}


.form-input:focus {
  outline: none;
  border-color: #646cff;
}


.submit-button {
  width: 100%;
  padding: 1rem;
  background-color: #646cff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.logout-button{
  width: 100px;
  height: 30px;
  color: white;
  border-radius: 4px;
  border: none;
  transition: .5s ease;
  font-size: 1rem;
  font-weight: 500;
  background-color: #ce4249;

}
.logout-button:hover {
  background-color: #b32a2f;
}

.submit-button:hover {
  background-color: #535bf2;
}

.register-section {
  text-align: center;
  margin-top: 1.5rem;
  color: #4a4a4a;
}

.register-link {
  color: #646cff;
  text-decoration: none;
  font-weight: 500;
}
.register-link:hover {
  text-decoration: underline;
}
</style>