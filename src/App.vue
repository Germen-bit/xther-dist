<script setup>
import NavBarView from './components/layout/NavBar.vue'
import { onBeforeMount } from 'vue';
import checkUsuario from './js/checkUsuario'
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore()
const usuario = computed(() => store.getters.getUsuario)
onBeforeMount(checkUsuario)

</script>

<template>
  <div id="main" class="container d-flex align-self justify-content-center">

    <div id="" class="mb-3">
      <NavBarView v-if="usuario.length !== 0"/>       
    </div>
    
    <div id="center-content" class="col-12 mt-5 d-flex justify-content-center">
      <RouterView />
    </div>

  </div>
</template>

<style scoped>

</style>
