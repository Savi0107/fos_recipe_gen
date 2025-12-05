<!-- <script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style> -->

<script setup>
import { ref } from 'vue'

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
  <div style="max-width:460px; margin:auto; padding:1.5rem;" font-family="Operator Mono, sans-serif">
    <h1>FOS Recipe App</h1>

    <!-- LOGIN SCREEN -->
    <div v-if="page === 'login'">
      <p>Welcome to FOS!</p>
      <button @click="handleLogin">Login</button>
    </div>

    <div>
        I am Sahana. Hello HelloWorld! Awesome candle.
    </div>

    <!-- INPUT SCREEN -->
    <div v-if="page === 'input'">
      <RecipeInput @recipe-generated="handleRecipeGenerated" />
    </div>

    <!-- RESULT SCREEN -->
    <div v-if="page === 'result'">
      <RecipeCard :recipe="recipe" @try-again="page='input'" />
    </div>
</div>
</template>
