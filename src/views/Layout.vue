<template>
  <div>
    <v-container class="pt-3">
      <v-layout row>
        <v-flex>
          <v-slide-y-transition mode="out-in">
            <router-view />
          </v-slide-y-transition>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: null
    };
  }
};
</script>

<style scoped></style>
