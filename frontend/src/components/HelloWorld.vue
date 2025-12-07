<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <div class="hello-container">
    <h1>{{ msg }}</h1>

```
<div class="card">
  <button type="button" @click="count++" class="count-btn">
    count is {{ count }}
  </button>
  <p>
    Edit me in
    <code>frontend/src/components/HelloWorld.vue</code> to test HMR {{ count }}
  </p>
</div>

<p class="links">
  Check out
  <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank">create-vue</a>,
  the official Vue + Vite starter
</p>
<p class="links">
  Learn more about IDE Support for Vue in the
  <a href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support" target="_blank">Vue Docs Scaling up Guide</a>.
</p>
<p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
```

  </div>
</template>

<style scoped>
.hello-container {
  max-width: 420px;
  margin: 1rem auto;
  padding: 2rem;
  background-color: #f7ebda;
  border-radius: 20px;
  font-family: 'Operator Mono', sans-serif;
  color: #211207;
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
}

h1 {
  text-align: center;
  font-size: 28px;
  margin-bottom: 1.5rem;
}

.card {
  background: #ffffff;
  padding: 16px;
  border-radius: 16px;
  margin-bottom: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}

.count-btn {
  display: inline-block;
  padding: 12px 16px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  background: #218838;  
  color: #f7ebda;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 8px;
}

.count-btn:hover {
  background: #1c642cff;
  transform: translateY(-2px);
}

.links a {
  color: #211207;
  text-decoration: underline;
}

.read-the-docs {
  text-align: center;
  color: #888;
  margin-top: 1rem;
}
</style>