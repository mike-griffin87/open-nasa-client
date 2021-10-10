<template>
  <svg
    width="643"
    height="472"
    viewBox="0 0 643 472"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="236"
      cy="236"
      r="233.5"
      stroke="currentColor"
      stroke-width="5"
    />
    <circle cx="220" cy="377" r="2.5" stroke="currentColor" />
    <circle
      cx="149.5"
      cy="414.5"
      r="9"
      fill="currentColor"
      stroke="currentColor"
    />
    <circle
      cx="491"
      cy="132"
      r="2.5"
      fill="currentColor"
      stroke="currentColor"
    />
    <circle
      cx="424"
      cy="271"
      r="4.5"
      fill="currentColor"
      stroke="currentColor"
    />
    <circle cx="638" cy="199" r="4.5" stroke="currentColor" />
  </svg>
</template>

<script>
export default {
  name: "SpaceBackground",
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
