<template>
  <nav>
    <img :src="require('../../assets/nasa-logo.svg')" />
    <ul class="nav-items">
      <li>
        <router-link to="/potd" class="btn-link"> POTD </router-link>
      </li>
      <li>
        <router-link to="/potd/archive" class="btn-link"> ARCHIVE </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;

  img {
    width: 3rem;
  }

  .nav-items {
    display: flex;
    align-items: center;
    list-style: none;

    li {
      font-weight: bold;
      font-size: 14px;
      &:not(:last-child) {
        margin-right: 2rem;
      }

      a {
        &.router-link-exact-active {
          text-decoration: underline;
          text-decoration-thickness: 3px;
        }
        &:not(.router-link-exact-active) {
          opacity: 0.7;
        }
        &:hover,
        &:focus {
          opacity: 1;
        }
      }
    }
  }
}
</style>
