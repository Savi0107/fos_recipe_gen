<script setup>
const props = defineProps({ recipe: Object })
const emit = defineEmits(['try-again'])
</script>

<template>
  <div class="card-container">
    <h2 class="recipe-title">{{ props.recipe.title || "Your Recipe" }}</h2>

```
<div class="section">
  <h3>Ingredients</h3>
  <ul>
    <li v-for="(i, idx) in props.recipe.ingredients || []" :key="idx">{{ i }}</li>
  </ul>
</div>

<div class="section">
  <h3>Steps</h3>
  <ol>
    <li v-for="(s, idx) in props.recipe.steps || []" :key="idx">{{ s }}</li>
  </ol>
</div>

<button class="try-again-btn" @click="emit('try-again')">Try Again</button>
```

  </div>
</template>

<style scoped>
.card-container {
  background: #ffffff;
  color: #211207;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  max-width: 420px;
  margin: auto;
}

.recipe-title {
  text-align: center;
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 16px;
}

.section {
  margin-bottom: 16px;
}

.section h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
}

ul, ol {
  padding-left: 20px;
}

li {
  margin-bottom: 6px;
}

.try-again-btn {
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

.try-again-btn:hover {
  background: #1c642cff;
  transform: translateY(-2px);
}
</style>