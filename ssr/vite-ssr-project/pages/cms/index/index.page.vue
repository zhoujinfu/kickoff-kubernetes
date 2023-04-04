<template>
  <span>cms/index</span>
  <button @click="handleEcho">Echo</button>
  <Welcome />
</template>
<script setup lang="ts">
import Welcome from '../components/Welcome.vue'
import { sayHello } from '~/proto_web/index'

function handleEcho() {
  sayHello('BBaa.')
}
</script>