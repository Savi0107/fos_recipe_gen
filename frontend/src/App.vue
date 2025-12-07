<script setup>
import { ref } from 'vue'
import RecipeInput from './pages/RecipeInput.vue'
import RecipeCard from './components/RecipeCard.vue'

const page = ref('login')
const recipe = ref(null)

const handleLogin = () => {
  page.value = 'input'
}

const handleRecipeGenerated = (data) => {
  recipe.value = data
  page.value = 'result'
}
</script>

<template>
  <div class="app-container">
    <h1>🍽️ Pantry Chef</h1>

    <!-- LOGIN SCREEN -->
    <div v-if="page === 'login'" class="screen login-screen">
      <p>Welcome to FOS! Ready to create your perfect recipe?</p>
      <button class="main-btn" @click="handleLogin">Login</button>
    </div>

    <!-- INPUT SCREEN -->
    <div v-if="page === 'input'" class="screen input-screen">
      <RecipeInput @recipe-generated="handleRecipeGenerated" />
    </div>

    <!-- RESULT SCREEN -->
    <div v-if="page === 'result'" class="screen result-screen">
      <RecipeCard :recipe="recipe" @try-again="page='input'" />
    </div>
  </div>
</template>

<style scoped>
.app-container {
  max-width: 420px;
  margin: 1rem auto;
  padding: 2rem;
  font-family: 'Operator Mono', sans-serif;
  background-color: #f7ebda;
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
}

h1 {
  text-align: center;
  font-size: 28px;
  color: #211207;
  margin-bottom: 2rem;
  letter-spacing: 1px;
}

.screen {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: #ffffff;
  color: #211207;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.screen:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(0,0,0,0.15);
}

.main-btn {
  padding: 14px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  background: #218838;
  color: #f7ebda;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.main-btn:hover {
  background: #1c642cff;
  transform: translateY(-2px);
}

.screen p {
  font-size: 16px;
  line-height: 1.6;
  text-align: center;
}

@media (max-width: 480px) {
  .app-container {
    margin: 0.5rem;
    padding: 1rem;
  }

  h1 {
    font-size: 24px;
  }

  .screen {
    padding: 16px;
  }

  .main-btn {
    padding: 12px;
    font-size: 15px;
  }
}
</style>