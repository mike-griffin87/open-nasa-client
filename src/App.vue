<template>
  <div class="app">
    <SpaceBackground :moons="5" />
    <Navbar />

    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import SpaceBackground from "./components/SpaceBackground";

export default {
  components: {
    Navbar,
    SpaceBackground,
  },
  name: "App",

  data: () => ({
    //
  }),
};
</script>
