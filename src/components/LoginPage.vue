<template>
  <div class="login-container">

    <div v-if="isLoggedIn" class="welcome-message">
      <h2>Welcome!</h2>
      <p>You have successfully signed in</p>
      <button @click="logout" class="logout-button">Logout</button>
    </div>
    <div v-if="registrationSuccess" class="success-message">
      <p>Registration successful!</p>
    </div>
    <div v-if="!isLoggedIn">
      <h2 class="login-title">Login</h2>
      <p>to get started</p>
      <form @submit.prevent="handleSubmit" class="login-form">
        <div v-if="error" class="error-message">
          <p :style="{ color: 'red',  fontSize:'small'}">{{ error }}</p>
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
          <a href="#" class="forgot-password">Forgot Password?</a>
        </div>

        <button type="submit" class="submit-button">Continue</button>
      </form>

      <div class="register-section">
        <span>New User? </span>
        <RouterLink to="/register" class="register-link">Register</RouterLink>
      </div>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { ref , onMounted } from 'vue'
import { useUserStore } from '../Store.js'
import { useRoute, useRouter } from 'vue-router'



const route = useRoute();
const userStore = useUserStore();
const router = useRouter();


const email = ref('');
const password = ref('');
const error = ref('');
const isLoggedIn = ref(false);
const registrationSuccess = ref(false)

const logout = () => {
  isLoggedIn.value = false;
  email.value = '';
  password.value = '';
  error.value = '';
}

onMounted(() => {
  if (route.query.registered === 'success') {
    registrationSuccess.value = true
  }
})

setTimeout(() => {
  registrationSuccess.value = false
}, 3000)

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

const handleSubmit = () => {
  error.value = '';

  const result = userStore.login(email.value, password.value);
  
  if (result.success) {
    router.push('/dashboard');
  } else {
    error.value = result.message;
  }
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
.success-message {
  padding: 10px;
  background-color: #d4edda;
  color: #155724;
  border-radius: 4px;
  margin-bottom: 20px;
  text-align: center;
  transition:  0.5s ease-in-out;
}
</style>