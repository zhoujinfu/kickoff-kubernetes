<template>
  <span>cms/index</span>
  <button @click="handleEcho">Echo</button>
  <Welcome />
</template>
<script setup lang="ts">
import Welcome from '../components/Welcome.vue'
import { sayHello } from '~/proto_web/index'

async function handleEcho() {
  const resp: any = await sayHello('BBaa.')
  console.log(resp.array)
}
</script>