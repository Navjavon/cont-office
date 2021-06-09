<template>
  <v-app class="grey lighten-4">
    <Navbar />
    <v-content class="mx-4 my-2">
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar/Navbar';
export default {
  data() {
    return {
      isOpen: true
    };
  },
  name: 'main-layout',
  components: {
    Navbar
  }
};
</script>
