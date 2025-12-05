<script setup>
const props = defineProps({ recipe: Object })
const emit = defineEmits(['try-again'])
</script>

<template>
  <div>
    <h2>{{ props.recipe.title }}</h2>
    <ul>
      <li v-for="i in props.recipe.ingredients" :key="i">{{ i }}</li>
    </ul>
    <ol>
      <li v-for="(s, idx) in props.recipe.steps" :key="idx">{{ s }}</li>
    </ol>

    <button @click="emit('try-again')">Try Again</button>
  </div>
</template>
