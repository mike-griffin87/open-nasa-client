<template>
  <svg
    width="643"
    height="472"
    viewBox="0 0 643 472"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      :cx="236"
      cy="236"
      r="233.5"
      stroke="currentColor"
      stroke-width="5"
    />
    <circle
      v-for="i in moons"
      :key="i"
      :cx="random(50, 400)"
      :cy="random(50, 400)"
      :r="random(2, 15)"
      :fill="random(0, 10) > 5 ? 'currentColor' : 'transparent'"
      stroke="currentColor"
    />
  </svg>
</template>

<script>
export default {
  name: "SpaceBackground",
  props: {
    moons: {
      type: Number,
      default: 5,
    },
  },
  methods: {
    random: (min, max) => Math.floor(Math.random() * (max - min + 1) + min),
  },
};
</script>

<style lang="scss" scoped>
svg {
  position: absolute;
  top: 1rem;
  transform: translateX(-10rem);
  z-index: -1;
}
</style>
