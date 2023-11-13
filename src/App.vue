<template>
  <v-app>
    <BaseLayout>
      <router-view/>
    </BaseLayout>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import BaseLayout from './layouts/BaseLayout.vue';

export default Vue.extend({
    name: "App",
    data: () => ({
    //
    }),
    components: { BaseLayout }
});
</script>
