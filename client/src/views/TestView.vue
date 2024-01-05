<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'

const dataRef = ref<string | null>(null)
async function getData() {
  const { data } = (await axios.get<{ data: string }>('http://127.0.0.1:3000')).data
  dataRef.value = data
}

getData()
</script>

<template>
  <main>
    <h1>Data</h1>
    <p>{{ dataRef }}</p>
  </main>
</template>
