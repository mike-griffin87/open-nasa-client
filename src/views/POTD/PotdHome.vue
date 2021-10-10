<template>
  <div class="potd">
    <div class="right" v-if="potd">
      <img
        v-if="potd.media_type === 'image'"
        :src="potd.url"
        @click="openInNewTab(potd.hdurl)"
      />
      <div v-if="potd.media_type === 'video'" class="embed-container">
        <iframe :src="potd.url" frameborder="0" allowfullscreen></iframe>
      </div>

      <aside class="pb-0">{{ potd.copyright }}</aside>
    </div>

    <div class="left-bg"></div>
    <div class="left">
      <h1>
        {{ potd.title }}
      </h1>
      <div>{{ potd.explanation }}</div>

      <div>
        <button text @click="changePotd('previous')">Previous</button>

        <button @click="changePotd('next')" :disabled="todayIsSelected">
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import dayjs from "dayjs";

export default {
  name: "Home",
  data() {
    return {
      fetching: true,
      menu: false,
      selectedDate: this.$route.params.date || dayjs().format("YYYY-MM-DD"),
      todaysDate: dayjs().format("YYYY-MM-DD"),
    };
  },
  methods: {
    ...mapActions("potd", ["fetchPotd"]),
    async changePotd(direction) {
      const date = dayjs(this.selectedDate);
      const nextDate = date.add(1, "day").format("YYYY-MM-DD");
      const newDate =
        direction === "next"
          ? this.isAfterToday(nextDate)
            ? this.selectedDate
            : nextDate
          : date.subtract(1, "day").format("YYYY-MM-DD");
      this.selectedDate = newDate;

      this.$router.push(`/potd/${newDate}`);
    },
    isAfterToday(date) {
      return dayjs().isBefore(date);
    },
    openInNewTab(url) {
      window.open(url, "_blank");
    },
  },
  computed: {
    ...mapGetters("potd", ["potd"]),
    todayIsSelected() {
      return this.todaysDate === this.selectedDate;
    },
  },
  watch: {
    selectedDate: {
      handler() {
        this.fetching = true;
        console.log("this.selectedDate");
        this.fetchPotd(this.selectedDate);
        this.fetching = false;
        this.menu = false;
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss">
.potd {
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-areas: "left right";

  .left {
    grid-area: left;
    padding: 3rem 4rem;
    position: relative;
  }

  .left-bg {
    grid-area: left;
    filter: blur(10px);
    backdrop-filter: blur(5px);
  }

  .right {
    grid-area: right;
    align-items: center;

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }

    aside {
      text-align: right;

      &::before {
        content: "\00a9";
        margin-right: 0.25rem;
      }
    }
  }

  h1 {
    font-size: 72px;
    border-bottom: 5px solid var(--font-main-dark);
    margin-bottom: 2rem;
    padding-bottom: 2rem;
  }
}

.embed-container {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  max-width: 100%;
}
.embed-container iframe,
.embed-container object,
.embed-container embed {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
