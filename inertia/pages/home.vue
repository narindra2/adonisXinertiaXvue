<script setup lang="ts">
import { Head  } from '@inertiajs/vue3'

defineProps<{ version: number }>()
</script>

<template>
  <Head title="Homepage" />

  <div class="container">
    <div class="title">AdonisJS {{ version }} x Inertia x Vue.js</div>

    <span>
      Learn more about AdonisJS and Inertia.js by visiting the
      <Link  href="/">Home page </Link >  || 
      <Link  href="/articles">Articles</Link >.
    </span>
  </div>
</template>