<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          maxheight="32"
          width="100"
          :src="require('./assets/nasa-logo.png')"
        ></v-img>
      </div>

      <v-spacer></v-spacer>

      <v-btn href="#" text> POTD </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
