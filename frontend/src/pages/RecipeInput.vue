<script setup>
import { ref } from 'vue'
import axios from 'axios'

const emit = defineEmits(['recipe-generated'])

const ingredients = ref('')
const cuisine = ref('')
const preferences = ref('')
const time = ref('')
const fireless = ref(false)

const submitForm = async () => {
  const payload = {
    ingredients: ingredients.value,
    cuisine: cuisine.value,
    preferences: preferences.value,
    time: time.value,
    fireless: fireless.value,
  }

  const res = await axios.post('http://127.0.0.1:5000/app/generate', payload)
  emit('recipe-generated', res.data)
}
</script>

<template>
  <div>
    <h2>Ingredient Input</h2>

    <label>Ingredients</label>
    <textarea v-model="ingredients"></textarea>

    <label>Cuisine</label>
    <input v-model="cuisine" />

    <label>Preferences</label>
    <input v-model="preferences" />

    <label>Time (mins)</label>
    <input v-model="time" type="number" />

    <label>
      <input type="checkbox" v-model="fireless" />
      No-fire only
    </label>

    <button @click="submitForm">Generate Recipe</button>
  </div>
</template>

<!-- Sample test case -->
{
    methi
}
