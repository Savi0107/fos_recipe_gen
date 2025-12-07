<template>
  <div class="input-container">
    <h2 class="title">Generate Your Recipe</h2>

    <div class="field">
      <label>Ingredients</label>
      <textarea v-model="ingredients" placeholder="E.g., tomatoes, onions, garlic"></textarea>
    </div>

    <div class="field">
      <label>Cuisine</label>
      <input v-model="cuisine" placeholder="Indian, Italian, Chinese..." />
    </div>

    <div class="field">
      <label>Preferences</label>
      <input v-model="preferences" placeholder="Spicy, sweet, vegetarian..." />
    </div>

    <div class="field">
      <label>Time (mins)</label>
      <input v-model="time" type="number" placeholder="10" />
    </div>

    <div class="checkbox-row">
      <input type="checkbox" v-model="fireless" />
      <span class="checkbox-text">No-fire only</span>
    </div>

    <button class="submit-btn" @click="submitForm">Generate Recipe</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const ingredients = ref('')
const cuisine = ref('')
const preferences = ref('')
const time = ref('')
const fireless = ref(false)

const emit = defineEmits(['recipe-generated'])

const submitForm = () => {
  const recipeData = {
    ingredients: ingredients.value.split(',').map(i => i.trim()), // <-- split into words
    cuisine: cuisine.value,
    preferences: preferences.value,
    time: time.value,
    fireless: fireless.value
  }
  emit('recipe-generated', recipeData)
}
</script>

<style scoped>
.input-container {
  max-width: 420px;
  margin: auto;
  padding: 20px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}

.title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 22px;
  color: #211207;
}

.field {
  margin-bottom: 16px;
}

.field label {
  font-weight: 600;
  display: block;
  margin-bottom: 6px;
  color: #211207;
}

input, textarea {
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #218838; 
  font-size: 15px;
  color: #ffffff;      
  caret-color: #ffffff; 
  box-sizing: border-box;
}

textarea {
  height: 90px;
}

.checkbox-row {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  color: #211207;
}

.checkbox-row input[type="checkbox"] {
  margin: 0;
  width: 16px;
  height: 16px;
  accent-color: #218838;
}

.checkbox-row .checkbox-text {
  margin-left: 4px;
  white-space: nowrap;
}

.submit-btn {
  width: 100%;
  padding: 14px;
  background: #218838; 
  color: #f7ebda;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

.submit-btn:hover {
  background: #1c642cff;
  transform: translateY(-2px);
}

ul, ol {
  padding-left: 20px; 
  margin-left: 0; 
}

li {
  text-align: left;  
  margin-bottom: 6px; 
}
</style>